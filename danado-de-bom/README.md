# Danado de Bom | Cardápio digital

Cardápio online com sacola. O pedido é montado no site e confirmado pelo WhatsApp. Não usa banco de dados nem servidor: são só arquivos estáticos.

## Estrutura

```
danado-de-bom/
├── index.html            Página única (estrutura e sacola)
├── css/
│   ├── tokens.css        Cores e fontes (paleta da logo)
│   ├── base.css          Reset e regras gerais
│   ├── layout.css        Topo, categorias, itens e rodapé
│   └── sacola.css        Barra fixa, janela da sacola e formulário
├── js/
│   ├── config.js         Nome da loja e número do WhatsApp
│   ├── cardapio.js       Categorias, itens e preços
│   ├── util.js           Funções de apoio (formatar moeda)
│   ├── sacola.js         Estado da sacola e armazenamento no aparelho
│   ├── pedido.js         Mensagem do pedido e abertura do WhatsApp
│   └── main.js           Liga tudo à tela
└── assets/img/
    ├── logo.webp
    ├── favicon.png
    └── produtos/         Fotos dos itens (uma por produto)
```

## O que editar

| Quero mudar…                    | Arquivo            |
|---------------------------------|--------------------|
| Número do WhatsApp, nome da loja, taxa de entrega | `js/config.js` |
| Itens, preços, categorias       | `js/cardapio.js`   |
| Cores e fontes                  | `css/tokens.css`   |
| Horário, textos do topo e rodapé | `index.html`       |
| Logo                            | `assets/img/logo.webp` |
| Foto de um produto              | coloque o arquivo em `assets/img/produtos/` e preencha `imagem` em `js/cardapio.js` |

O número deve ter só dígitos: `55` + DDD + número (ex.: `5582999999999`).

## Testar no computador

Basta abrir o `index.html` no navegador. Se preferir um servidor local:

```
python3 -m http.server 8000
```

e acessar `http://localhost:8000`.

## Publicar

Como é um site estático, serve qualquer hospedagem gratuita: Netlify, Vercel, GitHub Pages ou Cloudflare Pages. Envie a pasta inteira, mantendo a estrutura acima.

## Próximos passos possíveis

- Forma de pagamento (Pix, cartão, dinheiro) no formulário
- Taxa de entrega por bairro
- Fotos dos itens
- Aviso automático de loja aberta ou fechada pelo horário
