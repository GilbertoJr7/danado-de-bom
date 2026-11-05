/* Ligação entre dados, sacola e tela. */
(() => {
  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, txt) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt !== undefined) e.textContent = txt;
    return e;
  };

  function feedback(btn) {
    btn.textContent = "Adicionado ✓";
    setTimeout(() => (btn.textContent = "Adicionar à sacola"), 900);
  }

  /* ---------- Cardápio ---------- */
  function renderCardapio() {
    const nav = $("#menu-categorias");
    const main = $("#cardapio");

    CARDAPIO.forEach((cat) => {
      const li = el("li");
      const link = el("a", null, cat.titulo);
      link.href = "#" + cat.id;
      li.append(link);
      nav.append(li);

      const sec = el("section", "categoria");
      sec.id = cat.id;
      sec.append(el("h2", null, cat.titulo));
      if (cat.nota) sec.append(el("p", "nota", cat.nota));

      const grade = el("div", "grade");
      cat.itens.forEach((item) => {
        const art = el("article", "item");

        const h3 = el("h3", null, item.nome);
        if (item.destaque) h3.append(" ", el("span", "tag", item.destaque));
        const btn = el("button", "add", "Adicionar à sacola");
        btn.type = "button";
        btn.addEventListener("click", () => {
          if (cat.adicionais?.length) {
            abrirAdicionais(item, cat.adicionais, btn);
          } else {
            Sacola.adicionar(item.nome, item.preco);
            renderSacola();
            feedback(btn);
          }
        });

        const info = el("div", "item-info");
        info.append(h3, el("p", null, item.descricao));
        const lado = el("div", "item-lado");
        lado.append(el("span", "preco", formatarBRL(item.preco)), btn);
        art.append(info, lado);
        grade.append(art);
      });
      sec.append(grade);
      main.append(sec);
    });
  }

  /* ---------- Sacola ---------- */
  const dlg = $("#sacola");

  const entregaAtiva = () => document.querySelector('input[name="tipo"]:checked').value === "Entrega";

  function valores() {
    const subtotal = Sacola.totais().valor;
    const taxa = entregaAtiva() ? CONFIG.taxaEntrega : 0;
    return { subtotal, taxa, total: subtotal + taxa };
  }

  function renderSacola() {
    const { qtd, valor } = Sacola.totais();
    $("#barra").hidden = qtd === 0;
    $("#qtd").textContent = qtd;
    $("#barraTotal").textContent = formatarBRL(valor);
    const v = valores();
    $("#subtotal").textContent = formatarBRL(v.subtotal);
    $("#linha-taxa").hidden = v.taxa === 0;
    $("#taxa").textContent = formatarBRL(v.taxa);
    $("#total").textContent = formatarBRL(v.total);
    $("#vazia").hidden = qtd > 0;
    $("#conteudo").hidden = qtd === 0;

    const ul = $("#linhas");
    ul.innerHTML = "";
    Sacola.lista().forEach((d) => {
      const li = el("li");
      const extras = d.adicionais.length ? "+ " + d.adicionais.map((a) => (a.qtd > 1 ? a.qtd + "x " : "") + a.nome).join(", ") + " · " : "";
      li.append(el("span", "n", d.nome), el("span", "sub", `${extras}${formatarBRL(d.preco)} cada · ${formatarBRL(d.preco * d.qtd)}`));

      const qt = el("div", "qt");
      const menos = el("button", null, "−");
      const mais = el("button", null, "+");
      menos.type = mais.type = "button";
      menos.setAttribute("aria-label", "Diminuir");
      mais.setAttribute("aria-label", "Aumentar");
      menos.onclick = () => { Sacola.alterar(d.chave, -1); renderSacola(); };
      mais.onclick = () => { Sacola.alterar(d.chave, 1); renderSacola(); };
      qt.append(menos, el("span", null, String(d.qtd)), mais);

      li.append(qt);
      ul.append(li);
    });

    if (qtd === 0 && dlg.open) dlg.close();
  }

  $("#abrir").onclick = () => dlg.showModal();
  $("#fechar").onclick = () => dlg.close();
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  $("#limpar").onclick = () => { Sacola.esvaziar(); renderSacola(); };

  /* ---------- Adicionais ---------- */
  const dlgAdic = $("#personalizar");
  let pendente = null; // { item, lista, btn }

  const selecionados = () =>
    pendente.lista.map((a, i) => ({ ...a, qtd: pendente.qtds[i] })).filter((a) => a.qtd > 0);

  function atualizarTotalAdic() {
    const sel = selecionados();
    const base = pendente.item.preco;
    const soma = sel.reduce((s, a) => s + a.preco * a.qtd, 0);
    const ok = $("#adic-confirmar");
    ok.disabled = sel.length === 0;
    ok.textContent = sel.length ? `Adicionar com adicionais · ${formatarBRL(base + soma)}` : "Escolha um adicional";
    $("#adic-sem").textContent = `Sem adicionais · ${formatarBRL(base)}`;
  }

  function abrirAdicionais(item, lista, btn) {
    pendente = { item, lista, btn, qtds: lista.map(() => 0) };
    $("#adic-nome").textContent = item.nome;
    const ul = $("#adic-lista");
    ul.innerHTML = "";

    lista.forEach((a, i) => {
      const li = el("li", "adic-linha");
      const info = el("div", "adic-info");
      info.append(el("span", "adic-nome", a.nome), el("span", "adic-preco", "+ " + formatarBRL(a.preco)));

      const menos = el("button", null, "−");
      const mais = el("button", null, "+");
      const num = el("span", null, "0");
      menos.type = mais.type = "button";
      menos.setAttribute("aria-label", `Diminuir ${a.nome}`);
      mais.setAttribute("aria-label", `Aumentar ${a.nome}`);
      const mudar = (delta) => {
        pendente.qtds[i] = Math.max(0, pendente.qtds[i] + delta);
        num.textContent = pendente.qtds[i];
        li.classList.toggle("ativo", pendente.qtds[i] > 0);
        atualizarTotalAdic();
      };
      menos.onclick = () => mudar(-1);
      mais.onclick = () => mudar(1);

      const qt = el("div", "qt");
      qt.append(menos, num, mais);
      li.append(info, qt);
      ul.append(li);
    });
    atualizarTotalAdic();
    dlgAdic.showModal();
  }

  function confirmarAdic(adicionais) {
    const { item, btn } = pendente;
    Sacola.adicionar(item.nome, item.preco, adicionais);
    renderSacola();
    dlgAdic.close();
    feedback(btn);
  }
  $("#adic-confirmar").onclick = () => confirmarAdic(selecionados());
  $("#adic-sem").onclick = () => confirmarAdic([]);
  $("#adic-fechar").onclick = () => dlgAdic.close();
  dlgAdic.addEventListener("click", (e) => { if (e.target === dlgAdic) dlgAdic.close(); });

  /* ---------- Formulário ---------- */
  const camposEntrega = [$("#rua"), $("#bairro")];

  function atualizarTipo() {
    const entrega = document.querySelector('input[name="tipo"]:checked').value === "Entrega";
    $("#endereco").hidden = !entrega;
    camposEntrega.forEach((c) => (c.required = entrega));
    renderSacola();
  }
  document.querySelectorAll('input[name="tipo"]').forEach((r) => r.addEventListener("change", atualizarTipo));

  /* Pagamento: se for dinheiro, pergunta sobre troco */
  const campoTroco = $("#troco");

  function atualizarPagamento() {
    const pag = document.querySelector('input[name="pagamento"]:checked')?.value;
    const dinheiro = pag === "Dinheiro";
    const sim = dinheiro && document.querySelector('input[name="precisaTroco"]:checked').value === "Sim";
    $("#bloco-troco").hidden = !dinheiro;
    $("#valor-troco").hidden = !sim;
    campoTroco.required = sim;
  }
  document.querySelectorAll('input[name="pagamento"], input[name="precisaTroco"]')
    .forEach((r) => r.addEventListener("change", atualizarPagamento));
  campoTroco.addEventListener("input", () => campoTroco.setCustomValidity(""));

  $("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const v = (k) => (f.get(k) || "").toString().trim();
    const { subtotal, taxa, total } = valores();
    let troco = null;
    if (v("pagamento") === "Dinheiro" && v("precisaTroco") === "Sim") {
      troco = parseValor(v("troco"));
      if (!(troco > total)) {
        campoTroco.setCustomValidity(`Informe um valor maior que o total (${formatarBRL(total)}).`);
        campoTroco.reportValidity();
        return;
      }
    }
    const dados = {
      nome: v("nome"), sobrenome: v("sobrenome"), tipo: v("tipo"),
      rua: v("rua"), bairro: v("bairro"), ref: v("ref"), obs: v("obs"),
      pagamento: v("pagamento"), troco,
    };
    Pedido.enviar(Pedido.montarMensagem(dados, Sacola.lista(), { subtotal, taxa, total }));
  });

  /* ---------- Início ---------- */
  renderCardapio();
  atualizarTipo();
  atualizarPagamento();
  renderSacola();
})();
