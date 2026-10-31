/* Estado da sacola e persistência no aparelho (localStorage). Não mexe na tela. */
const Sacola = (() => {
  let itens = {}; // { "Nome": { preco, qtd } }

  try { itens = JSON.parse(localStorage.getItem(CONFIG.chaveSacola)) || {}; } catch (e) { itens = {}; }
  const salvar = () => { try { localStorage.setItem(CONFIG.chaveSacola, JSON.stringify(itens)); } catch (e) {} };

  return {
    adicionar(nome, preco) {
      itens[nome] = { preco, qtd: (itens[nome]?.qtd || 0) + 1 };
      salvar();
    },
    alterar(nome, delta) {
      if (!itens[nome]) return;
      itens[nome].qtd += delta;
      if (itens[nome].qtd <= 0) delete itens[nome];
      salvar();
    },
    esvaziar() { itens = {}; salvar(); },
    lista() { return Object.entries(itens).map(([nome, d]) => ({ nome, ...d })); },
    totais() {
      const l = this.lista();
      return {
        qtd: l.reduce((s, i) => s + i.qtd, 0),
        valor: l.reduce((s, i) => s + i.qtd * i.preco, 0),
      };
    },
  };
})();
