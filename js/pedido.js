/* Monta a mensagem do pedido e abre o WhatsApp. */
const Pedido = {
  montarMensagem(dados, itens, valores) {
    const entrega = dados.tipo === "Entrega";
    let m = `*Novo pedido - ${CONFIG.loja}*\n\n`;
    m += `*Cliente:* ${dados.nome} ${dados.sobrenome}\n`;
    m += `*Recebimento:* ${dados.tipo}\n`;
    if (entrega) {
      m += `*Endereço:* ${dados.rua}, ${dados.bairro}\n`;
      if (dados.ref) m += `*Referência:* ${dados.ref}\n`;
    }
    m += `\n*Itens:*\n`;
    itens.forEach((i) => { m += `${i.qtd}x ${i.nome} (${formatarBRL(i.preco * i.qtd)})\n`; });
    if (entrega) {
      m += `\n*Subtotal:* ${formatarBRL(valores.subtotal)}`;
      m += `\n*Taxa de entrega:* ${formatarBRL(valores.taxa)}`;
    }
    m += `\n*Total:* ${formatarBRL(valores.total)}`;
    m += `\n\n*Pagamento:* ${dados.pagamento}`;
    if (dados.pagamento === "Dinheiro") {
      m += dados.troco ? `\n*Troco:* sim, para ${formatarBRL(dados.troco)}` : `\n*Troco:* não precisa`;
    }
    if (dados.obs) m += `\n\n*Observações:* ${dados.obs}`;
    return m;
  },

  enviar(mensagem) {
    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  },
};
