/* Estado da sacola e persistência no aparelho (localStorage). Não mexe na tela. */
const Sacola = (() => {
  let itens = {}; // { chave: { nome, preco (unitário, já com adicionais), adicionais, qtd } }

  try { itens = JSON.parse(localStorage.getItem(CONFIG.chaveSacola)) || {}; } catch (e) { itens = {}; }
  const salvar = () => { try { localStorage.setItem(CONFIG.chaveSacola, JSON.stringify(itens)); } catch (e) {} };
  const arredondar = (n) => Math.round(n * 100) / 100;

  return {
    /* O mesmo produto com adicionais diferentes vira linhas separadas. */
    adicionar(nome, preco, adicionais = []) {
      const extras = adicionais.map((a) => ({ nome: a.nome, preco: a.preco, qtd: a.qtd ?? 1 }));
      const chave = [nome, ...extras.map((a) => `${a.qtd}x${a.nome}`).sort()].join("+");
      const unitario = arredondar(preco + extras.reduce((s, a) => s + a.preco * a.qtd, 0));
      itens[chave] = { nome, preco: unitario, adicionais: extras, qtd: (itens[chave]?.qtd || 0) + 1 };
      salvar();
    },
    alterar(chave, delta) {
      if (!itens[chave]) return;
      itens[chave].qtd += delta;
      if (itens[chave].qtd <= 0) delete itens[chave];
      salvar();
    },
    esvaziar() { itens = {}; salvar(); },
    lista() {
      return Object.entries(itens).map(([chave, d]) => ({
        chave, nome: d.nome ?? chave, preco: d.preco, qtd: d.qtd, adicionais: (d.adicionais ?? []).map((a) => ({ ...a, qtd: a.qtd ?? 1 })),
      }));
    },
    totais() {
      const l = this.lista();
      return {
        qtd: l.reduce((s, i) => s + i.qtd, 0),
        valor: arredondar(l.reduce((s, i) => s + i.qtd * i.preco, 0)),
      };
    },
  };
})();
