# Direção visual

O site usa a metáfora de um laboratório editorial: a página conduz a leitura, enquanto os painéis interativos mostram o fluxo de dados. O hero apresenta as duas rotas que se encontram no host; RAG tem ciano, MCP tem violeta e a aplicação usa azul profundo. Cor é acompanhada por rótulos e estados textuais.

## Tokens principais

| Papel          | Claro     | Escuro    |
| -------------- | --------- | --------- |
| Fundo          | `#F6F4EF` | `#0B172A` |
| Superfície     | `#FFFEFA` | `#14253D` |
| Texto          | `#12233D` | `#EAF2F4` |
| Evidência RAG  | `#07717D` | `#69D3D5` |
| Integração MCP | `#5D4BB5` | `#AB9AF7` |

Os dois acentos foram escurecidos no tema claro após a medição de contraste para texto normal. O título usa Fraunces; texto corrido usa IBM Plex Sans; JSON e dados técnicos usam JetBrains Mono. As fontes são servidas localmente por `next/font/local`.

## Estrutura e movimento

O percurso é composto por problema, conceitos isolados, comparação, integração, inspeção de componentes, limites, transparência e fontes. Os laboratórios apresentam estados navegáveis por botões e teclado. A entrada dos nós no hero é a animação de assinatura; transições posteriores marcam mudança de etapa, sem movimento repetido a cada scroll.

`prefers-reduced-motion` e a preferência manual eliminam movimento não essencial. O cabeçalho reúne atalhos e um índice com todas as âncoras; em telas pequenas, a navegação principal fica no índice. As preferências de tema e movimento são guardadas apenas no navegador.
