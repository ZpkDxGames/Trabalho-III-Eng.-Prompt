# Verificação da reconstrução

Executado localmente em 27/09/2026, antes da publicação do branch. O conteúdo demonstrativo foi comparado com [`docs/SKILL.md`](SKILL.md) e [`TRABALHO_III_SITE_WORK_SPEC.md`](../TRABALHO_III_SITE_WORK_SPEC.md).

## Engenharia

- `npm run lint`: passou, sem erros.
- `npm run typecheck`: passou em modo estrito.
- `npm run build`: passou; `/` e `/creditos` foram pré-renderizadas.
- Nenhum segredo, API de runtime ou variável de ambiente é exigido.

## Navegador

Verificação em Chromium com Playwright, incluindo as dez seções, as etapas e fontes do simulador RAG, nós/payloads MCP, o passo 9 da integração, o explorer, créditos, índice completo, link de pular para o conteúdo via teclado e persistência de tema/redução de movimento após recarregar. Não houve erro de console, erro de página ou requisição externa durante a visita.

| Largura | Overflow horizontal da página |
| ------: | ----------------------------: |
|  360 px |                          0 px |
|  390 px |                          0 px |
|  768 px |                          0 px |
| 1366 px |                          0 px |
| 1920 px |                          0 px |

As capturas finais estão em `preview-desktop.jpg`, `preview-mobile.jpg`, `preview-dark.jpg` e `preview-credits.jpg`.

## Lighthouse

Auditoria do build de produção local. Pontuação na ordem Performance / Acessibilidade / Boas práticas / SEO:

| Perfil  | Pontuação                          | CLS | LCP |
| ------- | ---------------------------------- | --: | --: |
| Mobile  | 93 / 100 / 100 / 100 |   0 | 3,11 s |
| Desktop | 100 / 100 / 100 / 100 |   0 | 0,69 s |

Os números de produção hospedada podem variar conforme ambiente e rede. A URL pública da Vercel ainda não foi definida; por isso, o preview e a proteção de acesso do deployment não foram verificados nesta execução.
