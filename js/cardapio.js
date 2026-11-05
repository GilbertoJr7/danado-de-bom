/*
  Cardápio. Edite itens, preços e categorias só aqui.
  - preco:   número com ponto (12.99 = R$ 12,99)
  - destaque: texto opcional para a etiqueta ao lado do nome
  - adicionais (na categoria): lista de { nome, preco } oferecida em todos os itens dela.
             Sem esse campo, o item entra direto na sacola.
  - id da categoria: sem espaços nem acentos (usado no menu de navegação)
  - o nome de cada produto precisa ser único (é a chave da sacola)
*/
const CARDAPIO = [
  {
    id: "hamburgueres",
    titulo: "Hambúrgueres",
    // ATENÇÃO: nomes e preços abaixo são EXEMPLOS. Troque pelos adicionais reais da lanchonete.
    adicionais: [
      { nome: "Ovo", preco: 3.0 },
      { nome: "Mussarela", preco: 3.0 },
      { nome: "Calabresa", preco: 4.0 },
      { nome: "Bacon", preco: 5.0 },
      { nome: "Carne artesanal bovina 120g", preco: 8.0 },
      { nome: "Anéis de Cebola", preco: 3.0 },
      { nome: "Molho de Churrasco", preco: 1.5 },
      { nome: "Alface", preco: 0.25 },
      { nome: "Frango Desfiado", preco: 4.0 },
      { nome: "Presunto", preco: 1.5 },
      { nome: "Maionese da Casa", preco: 2.0 },
    ],
    itens: [
      { nome: "X-Hambúrguer", preco: 12.99, descricao: "Pão selado na chapa, carne artesanal de 120g, presunto e mussarela." },
      { nome: "X-Salada", preco: 14.99, descricao: "Pão selado na chapa, carne artesanal de 120g, presunto, mussarela, tomate e alface." },
      { nome: "X-Calabresa", preco: 17.99, descricao: "Pão selado na chapa, carne artesanal de 120g, presunto, mussarela, calabresa, tomate e alface." },
      { nome: "X-Frango", preco: 19.99, descricao: "Pão selado na chapa, carne artesanal de 120g, presunto, mussarela, frango, tomate e alface." },
      { nome: "X-Bacon", preco: 21.99, descricao: "Pão selado na chapa, carne artesanal de 120g, presunto, mussarela, bacon, tomate e alface." },
      { nome: "X-Tudo", preco: 37.90, descricao: "Pão selado na chapa, carne artesanal de 120g, ovo, calabresa, bacon, frango desfiado, molho de churrasco, alface, tomate, presunto e mussarela." },
    ],
  },
  {
    id: "pasteis",
    titulo: "Pastéis",
    itens: [
      { nome: "Pastel de Queijo", preco: 7.0, descricao: "Pastel frito com recheio de queijo." },
      // CONFIRMAR com a lanchonete os ingredientes do recheio misto e completar a descrição.
      { nome: "Pastel Misto", preco: 7.0, descricao: "Pastel frito com recheio misto." },
      { nome: "Pastel de Frango", preco: 7.0, descricao: "Pastel frito com recheio de frango." },
      { nome: "Pastel de Frango com Queijo", preco: 8.0, descricao: "Pastel frito recheado com frango e queijo." },
      { nome: "Pastel Tudão", preco: 15.0, descricao: "Pastel especial com recheio completo de milho, tomate, cebola, queijo, calabresa, frango e presunto." },
    ],
  },
  {
    id: "porcoes",
    titulo: "Porções",
    itens: [
      { nome: "Batata Frita Média (M)", preco: 10.0, descricao: "Porção de batatas fritas, tamanho médio, crocantes e preparadas para acompanhar seu lanche." },
      { nome: "Batata Frita Grande (G)", preco: 15.0, descricao: "Porção de batatas fritas, tamanho grande, ideal para compartilhar." },
    ],
  },
  {
    id: "bebidas",
    titulo: "Bebidas",
    itens: [
      { nome: "Água Mineral 500 ml", preco: 2.99, descricao: "Água mineral em garrafa de 500 ml." },
      { nome: "Água Mineral com gás 500 ml", preco: 3.99, descricao: "Água mineral com gás em garrafa de 500 ml." },
      { nome: "Coca-Cola Lata", preco: 5.99, descricao: "Refrigerante Coca-Cola em lata." },
      { nome: "Fanta Lata", preco: 5.99, descricao: "Refrigerante Fanta em lata." },
      { nome: "Sprite Lata", preco: 5.99, descricao: "Refrigerante Sprite em lata." },
    ],
  },
  {
    id: "cervejas",
    titulo: "Cervejas",
    nota: "Venda proibida para menores de 18 anos.",
    itens: [
      { nome: "Schin", preco: 4.5, descricao: "Cerveja Schin em lata." },
      { nome: "Amstel", preco: 5.5, descricao: "Cerveja Amstel Lager em lata." },
    ],
  },
];
