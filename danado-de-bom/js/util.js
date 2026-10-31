/* Funções de apoio */
const formatarBRL = (n) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/* Converte "50", "50,00" ou "1.050,50" em número. Retorna NaN se não for válido. */
const parseValor = (texto) => {
  let t = String(texto).replace(/[^\d,.]/g, "");
  if (t.includes(",")) t = t.replace(/\./g, "").replace(",", ".");
  return parseFloat(t);
};
