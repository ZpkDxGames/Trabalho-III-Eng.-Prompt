# Trabalho III — RAG + MCP
## Especificação de implementação do microsite educacional

> **Repositório:** `ZpkDxGames/Trabalho-III-Eng.-Prompt`  
> **Produto:** microsite educacional interativo, responsivo e autossuficiente  
> **Disciplina:** Engenharia de Prompts Aplicada à Inteligência Artificial  
> **Deploy alvo:** Vercel  
> **Idioma:** Português do Brasil  
> **Status:** especificação de implementação para ChatGPT Work

---

## 1. Missão do projeto

Construir um microsite educacional de alta qualidade visual e técnica capaz de explicar, sem apresentação oral, os conceitos de **Retrieval-Augmented Generation (RAG)** e **Model Context Protocol (MCP)**, suas diferenças, exemplos individuais e uma arquitetura em que ambos são utilizados de forma complementar.

O site é o produto didático principal do Trabalho III. Ele deve transformar a pesquisa acadêmica já consolidada em uma experiência visual clara, interativa e tecnicamente rigorosa.

O objetivo não é criar um dashboard corporativo genérico nem uma landing page promocional. A experiência deve se comportar como um **laboratório didático interativo**.

---

## 2. Requisitos acadêmicos obrigatórios

A implementação só pode ser considerada completa quando o site apresentar claramente:

1. conceito de RAG;
2. conceito de MCP;
3. diferença entre RAG e MCP;
4. pelo menos um exemplo de RAG;
5. pelo menos um exemplo de MCP;
6. um exemplo utilizando RAG e MCP juntos;
7. pelo menos um diagrama ou representação visual de funcionamento;
8. ferramentas de IA utilizadas na produção;
9. fontes da pesquisa;
10. indicação do que foi produzido com IA e do que foi revisado/modificado pelo grupo.

O material deve ser autossuficiente: um avaliador deve conseguir compreender o assunto navegando apenas pelo site.

---

## 3. Fonte de verdade conceitual

### 3.1 RAG

Usar como base histórica principal:

- Lewis et al. (2020), *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*.
- https://arxiv.org/abs/2005.11401

Princípio didático:

> RAG recupera informação externa relevante e a incorpora ao contexto utilizado pelo modelo para produzir uma resposta.

Não reduzir RAG a “usar banco vetorial”. Busca vetorial é uma implementação frequente, não uma exigência conceitual. A recuperação pode envolver busca lexical, semântica, híbrida, filtros, reranking e outras técnicas.

Pipeline didático:

```text
PREPARAÇÃO
Fontes
  ↓
Extração / normalização
  ↓
Chunking
  ↓
Representação / indexação
  ↓
Índice pesquisável

CONSULTA
Pergunta
  ↓
Recuperação
  ↓
Trechos relevantes
  ↓
Reranking / filtros (opcional)
  ↓
Construção do contexto
  ↓
Contexto + pergunta
  ↓
LLM
  ↓
Resposta fundamentada + fontes
```

A interface deve diferenciar visualmente a preparação/indexação da consulta/geração.

### 3.2 MCP

Considerar como referência principal a especificação **MCP 2026-07-28**, versão final vigente durante a elaboração deste trabalho.

Referências:

- https://blog.modelcontextprotocol.io/posts/2026-07-28/
- https://ts.sdk.modelcontextprotocol.io/v2/
- https://ts.sdk.modelcontextprotocol.io/v2/protocol-versions

Princípio didático:

> MCP é um padrão aberto para conectar aplicações de IA aos sistemas onde dados, ferramentas e outras capacidades estão disponíveis.

Arquitetura conceitual:

```text
Usuário
  ↓
Host de IA
  ↓
Cliente MCP
  ⇄
Servidor MCP
  ├─ Tools
  ├─ Resources
  └─ Prompts
```

Não representar o LLM como se ele necessariamente fosse o cliente MCP. O host orquestra o modelo e o cliente do protocolo.

### 3.3 Observação crítica sobre a versão MCP

A especificação 2026-07-28 inicia a era moderna/stateless do protocolo.

Não ensinar o antigo fluxo `initialize → initialized` como funcionamento atual.

Para a era moderna, apresentar de forma simplificada:

- núcleo stateless;
- `server/discover` para descoberta/negociação quando aplicável;
- versão e capacidades associadas às requisições;
- diferença explícita em relação à era de handshake de 2025 e anteriores.

Se houver uma nota histórica, rotulá-la claramente como “MCP até 2025”.

---

## 4. Regra conceitual central

**RAG e MCP não são concorrentes e não são substitutos diretos.**

A comparação deve comunicar:

| Dimensão | RAG | MCP |
|---|---|---|
| Pergunta principal | Como fornecer conhecimento externo relevante ao modelo? | Como conectar uma aplicação de IA a capacidades externas de forma padronizada? |
| Natureza | Arquitetura/técnica de recuperação + geração | Protocolo/interface de integração |
| Componentes típicos | fontes, índice, retriever, contexto, LLM | host, cliente, servidor, capabilities/primitives |
| Banco vetorial | comum, não obrigatório | não exigido |
| Ações externas | não são o objetivo principal | tools podem consultar ou executar ações |
| Pode existir sozinho? | sim | sim |

Evitar qualquer linguagem de “RAG vs MCP — qual é melhor?”.

---

## 5. Caso didático integrado

O fio narrativo principal será um **Assistente Universitário Inteligente**.

Pergunta de demonstração:

> “Qual é a carga horária mínima do estágio obrigatório e quais documentos preciso entregar?”

Fluxo:

```text
Usuário
  ↓ pergunta
Host de IA
  ↓ identifica necessidade de conhecimento institucional
Cliente MCP
  ↓ tool call
Servidor MCP
  ↓
Tool: pesquisar_documentos
  ↓
Serviço de recuperação / RAG
  ↓
Índice da base universitária
  ↓ trechos + metadados
Servidor MCP
  ↓ resultado estruturado
Cliente MCP / Host
  ↓ monta contexto
LLM
  ↓
Resposta fundamentada + fontes
  ↓
Usuário
```

Separação conceitual obrigatória:

- **MCP:** interface entre host/cliente e servidor/capacidade externa.
- **RAG:** recuperação de evidências + incorporação dessas evidências ao contexto + geração fundamentada.

Texto recomendado:

> “MCP pode fornecer à aplicação uma interface padronizada para acessar um serviço de recuperação que participa de um pipeline RAG.”

Nunca escrever “MCP faz RAG” como explicação principal.

Como extensão opcional do exemplo, uma segunda tool MCP pode representar “salvar resumo no workspace”. Essa ação deve aparecer visualmente separada do pipeline RAG.

---

## 6. Experiência narrativa do site

Preferir **single-page storytelling** com navegação por âncoras e progressão clara.

### 6.1 Header

- logotipo/wordmark textual: “RAG + MCP Lab” ou equivalente;
- navegação: Início, RAG, MCP, Comparação, Juntos, Produção, Fontes;
- indicador discreto de progresso da leitura;
- botão de alternância de tema apenas se ficar excelente e não comprometer o prazo;
- header sticky com backdrop blur moderado.

### 6.2 Hero

Título:

> **RAG & MCP**  
> Conhecimento e conexões para aplicações de IA

Subtítulo curto explicando que o visitante explorará como aplicações de IA recuperam conhecimento e acessam capacidades externas.

CTA primário: **Explorar a arquitetura**  
CTA secundário: **Começar por RAG**

Visual principal:
- rede/fluxo animado;
- nós representando usuário, host, conhecimento e ferramentas;
- movimento sutil de partículas ou pulsos nas conexões;
- sem animações excessivas.

Adicionar badges:
- RAG — Retrieval-Augmented Generation
- MCP — Model Context Protocol
- MCP Spec — 2026-07-28

### 6.3 “O problema do LLM isolado”

Mostrar um LLM central e três capacidades bloqueadas/ausentes:

- documentos privados;
- informações atualizadas;
- ferramentas externas.

Interação: ao rolar ou clicar, RAG resolve a necessidade de **conhecimento recuperável** e MCP resolve a necessidade de **integração padronizada**.

Não sugerir que qualquer uma das tecnologias resolve todos os problemas de LLMs.

### 6.4 Seção RAG

Componentes:

1. definição curta;
2. “por que existe?”;
3. pipeline interativo;
4. separação “Preparação” vs “Consulta”;
5. exemplo universitário;
6. benefícios;
7. limitações e riscos;
8. mini-card “RAG ≠ banco vetorial”;
9. mini-card “RAG ≠ fine-tuning”.

#### Simulador RAG

Criar uma demonstração determinística, sem necessidade de API real.

Exibir três documentos fictícios claramente rotulados como **conteúdo demonstrativo**, por exemplo:

- Regulamento Acadêmico;
- Manual de Estágio;
- Calendário Institucional.

Ao usuário selecionar/enviar a pergunta de exemplo:

1. animar a consulta;
2. destacar os documentos pesquisados;
3. mostrar 2–3 “trechos recuperados” fictícios;
4. mover os trechos para a área “Contexto”;
5. exibir uma resposta demonstrativa;
6. mostrar chips de fonte.

**Não inventar uma carga horária real de estágio.** Usar placeholders didáticos como “XXX horas” ou dados explicitamente marcados como fictícios.

### 6.5 Seção MCP

Explicar:

- Host;
- Cliente MCP;
- Servidor MCP;
- Tools;
- Resources;
- Prompts.

Diagrama interativo com nós clicáveis.

Ao clicar em um nó, abrir painel lateral/popover com:
- “O que é”;
- “Qual o papel”;
- “O que não é”.

#### Demonstração MCP

Cenário: assistente de programação/IDE.

Solicitação:

> “Localize onde a função de autenticação é definida e resuma os pontos que precisam de teste.”

Animar:

```text
Usuário → Host → Cliente MCP → Servidor MCP → Tool → resultado → Host/LLM → resposta
```

Mostrar um payload visual simplificado de tool call, sem transformar a seção em documentação de API.

### 6.6 Seção “RAG × MCP”

Criar comparação visual altamente legível.

Preferir:
- dois painéis simétricos;
- linhas de comparação;
- pequeno resumo “Eles resolvem problemas diferentes”.

Não usar placar, vencedor, nota ou ranking.

Adicionar bloco:

> **Podem existir separadamente?**  
> RAG sem MCP: sim.  
> MCP sem RAG: sim.  
> RAG acessado por MCP: sim.

### 6.7 Seção “RAG + MCP”

Esta deve ser o ápice visual da página.

Usar o Assistente Universitário Inteligente.

Criar arquitetura animada em duas cores sem depender somente delas:
- camada MCP identificada por rótulos/contornos;
- camada RAG identificada por rótulos/contornos.

Ao avançar pelos passos, destacar:

1. pergunta;
2. decisão do host;
3. chamada MCP;
4. tool `pesquisar_documentos`;
5. recuperação RAG;
6. trechos/metadados;
7. construção do contexto;
8. geração;
9. resposta + fontes.

Adicionar seletor/stepper “1 de 9”.

### 6.8 “Explore a arquitetura”

Mapa de componentes reutilizando os nós dos diagramas.

Cada componente deve ser selecionável:
- Usuário
- Host
- Cliente MCP
- Servidor MCP
- Tool
- Retriever
- Índice
- Contexto
- LLM

Para cada um:
- descrição curta;
- pertence principalmente a RAG, MCP ou aplicação;
- entrada;
- saída.

### 6.9 Segurança e limites

Seção compacta, não alarmista.

RAG:
- recuperação irrelevante;
- conteúdo desatualizado;
- prompt injection indireta;
- resposta não sustentada pela evidência.

MCP:
- ferramentas com efeitos reais;
- autorização;
- dados sensíveis;
- validação;
- menor privilégio;
- confirmação para ações sensíveis.

Mensagem central:

> “Conectar e recuperar informação não elimina a necessidade de validação e segurança.”

### 6.10 “Como este trabalho foi produzido”

Registrar de forma transparente:

**ChatGPT — GPT-5.6 Sol**
- análise do enunciado;
- organização;
- síntese;
- revisão conceitual;
- planejamento;
- especificação de implementação.

**Deep Research**
- levantamento e síntese de fontes técnicas.

**ChatGPT Work**
- registrar aqui apenas se efetivamente utilizado na implementação final.

**GitHub**
- controle de versão.

**Vercel**
- deploy/hospedagem.

Criar duas colunas:
- “Produzido com apoio de IA”
- “Revisado/decidido pelo grupo”

Não afirmar ferramentas ainda não utilizadas como se já tivessem sido utilizadas.

### 6.11 Fontes

Exibir referências em cards compactos com:
- título;
- organização/autores;
- ano/data;
- tipo: artigo / especificação / documentação / segurança;
- link externo.

Fontes mínimas:
- Lewis et al. 2020;
- MCP 2026-07-28;
- MCP TypeScript SDK v2;
- Microsoft Learn sobre RAG;
- OWASP LLM01 Prompt Injection;
- NIST IR 8579.

---

## 7. Direção visual

### 7.1 Personalidade

Misturar:
- laboratório de IA;
- visual acadêmico contemporâneo;
- interface tecnológica refinada;
- alta legibilidade.

Evitar:
- aparência de template SaaS genérico;
- excesso de glassmorphism;
- neon exagerado;
- grids sem função;
- textos minúsculos;
- animações puramente decorativas.

### 7.2 Paleta

Base inspirada na identidade acadêmica anterior:

- azul profundo;
- azul médio;
- ciano;
- violeta como acento;
- neutros frios.

Usar gradientes apenas como destaque.

### 7.3 Tipografia

Preferir fonte sans-serif moderna e muito legível.

Sugestão:
- headings: Geist / Manrope / equivalente;
- body: Geist / Inter / equivalente;
- código: Geist Mono / JetBrains Mono.

Carregar fontes de forma otimizada.

### 7.4 Cards e superfícies

- bordas suaves;
- radius consistente;
- sombras discretas;
- linhas de conexão;
- pequenos indicadores de categoria;
- boa densidade de informação.

---

## 8. Stack técnica recomendada

Implementação preferencial:

- **Next.js** com App Router;
- **TypeScript** em modo strict;
- **Tailwind CSS**;
- **Motion** para animações;
- **Lucide** para ícones;
- SVG/HTML/CSS para diagramas;
- React Flow apenas se trouxer ganho real de interação e acessibilidade.

Evitar dependências pesadas para efeitos que podem ser feitos com CSS/SVG.

Não é necessário backend para a primeira versão. As demonstrações devem ser determinísticas e executadas no cliente.

O site deve funcionar em deploy estático/serverless normal da Vercel sem segredos.

---

## 9. Arquitetura sugerida

```text
app/
  layout.tsx
  page.tsx
  globals.css

components/
  layout/
    Header.tsx
    Footer.tsx
    Section.tsx

  hero/
    Hero.tsx
    HeroArchitecture.tsx

  isolated-llm/
    IsolatedLLM.tsx

  rag/
    RagSection.tsx
    RagPipeline.tsx
    RagDemo.tsx

  mcp/
    McpSection.tsx
    McpArchitecture.tsx
    McpDemo.tsx

  comparison/
    RagMcpComparison.tsx

  integration/
    IntegratedArchitecture.tsx
    ArchitectureStepper.tsx

  explorer/
    ArchitectureExplorer.tsx

  safety/
    SafetySection.tsx

  production/
    ProductionDisclosure.tsx

  sources/
    SourcesSection.tsx

  ui/
    ...

data/
  content.ts
  sources.ts
  architecture.ts
  demo.ts

lib/
  constants.ts
  utils.ts

public/
  ...
```

Não criar abstrações artificiais apenas para aumentar o número de arquivos. Ajustar a estrutura se uma composição mais simples produzir código melhor.

---

## 10. Modelo de conteúdo

Separar conteúdo acadêmico de componentes sempre que razoável.

Criar estruturas tipadas para:
- fontes;
- etapas RAG;
- primitivas MCP;
- comparação;
- passos RAG + MCP;
- disclosure de IA.

Isso facilita revisão textual sem alterar lógica de interface.

---

## 11. Animações

Princípio: **animação deve ensinar**.

Usar:
- reveal por seção;
- pulsos percorrendo conexões;
- nós ativos;
- transferência visual de “chunks”;
- stepper da arquitetura;
- transições suaves entre estados;
- microinterações de hover/focus.

Evitar:
- parallax agressivo;
- rotação contínua sem função;
- partículas excessivas;
- animações que atrasem a leitura.

Implementar `prefers-reduced-motion`.

---

## 12. Responsividade

Validar pelo menos:

- 360 × 800;
- 390 × 844;
- 768 × 1024;
- 1366 × 768;
- 1440 × 900;
- 1920 × 1080.

Diagramas devem reorganizar a estrutura no mobile, não apenas reduzir a escala até ficarem ilegíveis.

Em telas estreitas:
- converter fluxos horizontais em verticais;
- permitir stepper;
- manter rótulos legíveis;
- evitar scroll horizontal da página.

---

## 13. Acessibilidade

Meta: WCAG 2.2 AA sempre que aplicável.

Obrigatório:
- landmarks semânticos;
- headings em ordem lógica;
- contraste adequado;
- foco visível;
- navegação por teclado;
- `aria-label` em controles icon-only;
- modais/popovers com foco controlado;
- nenhum significado transmitido somente por cor;
- animações reduzidas quando solicitado;
- links externos identificáveis;
- SVGs informativos com alternativa textual;
- skip link.

---

## 14. Performance

Objetivos:
- evitar JS desnecessário;
- componentes client apenas onde há interação;
- lazy-load para módulos realmente pesados;
- imagens otimizadas;
- sem vídeos de background;
- evitar layout shift;
- animações preferencialmente em transform/opacity;
- excelente experiência em hardware intermediário.

Executar Lighthouse antes da conclusão.

Alvos orientativos:
- Performance ≥ 90;
- Accessibility ≥ 95;
- Best Practices ≥ 95;
- SEO ≥ 90.

Não falsificar métricas. Registrar apenas resultados medidos.

---

## 15. SEO e metadados

Configurar:
- title;
- description;
- Open Graph;
- favicon;
- lang=`pt-BR`;
- metadata do Next.js;
- canonical quando houver URL final.

Título sugerido:
**RAG + MCP Lab | Trabalho III — Engenharia de Prompts**

Descrição:
**Experiência educacional interativa sobre Retrieval-Augmented Generation, Model Context Protocol e como as duas abordagens podem trabalhar juntas.**

---

## 16. Segurança e privacidade

Primeira versão não deve:
- solicitar credenciais;
- coletar dados pessoais;
- depender de API keys no navegador;
- executar ferramentas MCP reais;
- enviar perguntas do visitante para serviços externos sem necessidade.

Se analytics forem adicionados, usar somente se solicitado e documentar.

---

## 17. Regras de conteúdo

### Deve fazer

- usar Português do Brasil;
- explicar siglas na primeira ocorrência;
- usar frases curtas nos diagramas;
- preservar rigor técnico;
- sinalizar demonstrações fictícias;
- citar fontes;
- informar versão MCP;
- distinguir fatos de analogias.

### Não deve fazer

- chamar MCP de RAG;
- tratar MCP como banco de dados;
- dizer que RAG exige banco vetorial;
- dizer que RAG elimina alucinações;
- dizer que MCP torna integrações automaticamente seguras;
- ensinar `initialize/initialized` como fluxo atual do MCP 2026-07-28;
- inventar regulamentos universitários;
- inventar benchmarks;
- usar texto lorem ipsum;
- deixar seções acadêmicas como placeholders na entrega.

---

## 18. Git e fluxo de trabalho

Branch principal: `main`.

Durante a implementação:
1. trabalhar em branch de feature/build;
2. commits pequenos e descritivos;
3. executar lint/typecheck/build;
4. revisar diff;
5. abrir PR para `main`;
6. incluir resumo e evidências de teste no PR.

Sugestões de commits:
- `chore: bootstrap educational microsite`
- `feat: build interactive RAG learning flow`
- `feat: add MCP architecture explorer`
- `feat: add integrated RAG MCP walkthrough`
- `feat: add AI disclosure and sources`
- `fix: improve responsive diagram layouts`
- `a11y: refine keyboard navigation and reduced motion`

Não fazer force-push em `main`.

---

## 19. Vercel

Preparar o projeto para importação direta do GitHub.

Antes de considerar a entrega pronta:
- `npm run lint`;
- `npm run typecheck` se houver script;
- `npm run build`;
- verificar deployment preview;
- verificar produção;
- testar navegação direta por âncoras;
- testar refresh;
- testar mobile.

A URL final deverá posteriormente ser adicionada:
- ao README;
- ao documento Word;
- à seção de resultado final do trabalho.

---

## 20. README final

O README do repositório deve incluir:

1. nome do trabalho;
2. screenshot/preview;
3. objetivo;
4. tópicos abordados;
5. stack;
6. como executar localmente;
7. scripts;
8. fontes acadêmicas;
9. transparência sobre uso de IA;
10. link da Vercel;
11. disciplina;
12. autores/integrantes somente com os dados aprovados pelo usuário.

---

## 21. Critérios de aceitação

### Conteúdo

- [ ] RAG definido corretamente.
- [ ] MCP definido corretamente.
- [ ] versão MCP 2026-07-28 identificada.
- [ ] RAG e MCP não apresentados como concorrentes.
- [ ] exemplo de RAG.
- [ ] exemplo de MCP.
- [ ] exemplo integrado.
- [ ] limitações e segurança.
- [ ] fontes.
- [ ] disclosure de IA.

### Experiência

- [ ] hero de alta qualidade.
- [ ] navegação clara.
- [ ] pipeline RAG interativo.
- [ ] arquitetura MCP interativa.
- [ ] comparação visual.
- [ ] walkthrough RAG + MCP.
- [ ] arquitetura explorável.
- [ ] mobile funcional.
- [ ] teclado funcional.
- [ ] reduced motion.

### Engenharia

- [ ] TypeScript sem erros.
- [ ] lint sem erros.
- [ ] build de produção bem-sucedido.
- [ ] sem secrets no repositório.
- [ ] sem erros relevantes no console.
- [ ] sem dependências desnecessárias.
- [ ] README completo.
- [ ] pronto para Vercel.

---

## 22. QA obrigatório no ChatGPT Work

Antes de finalizar:

1. executar aplicação;
2. navegar por todas as seções;
3. testar todos os botões e interações;
4. inspecionar desktop e mobile;
5. corrigir overflow;
6. verificar textos truncados;
7. verificar contraste;
8. testar teclado;
9. testar reduced motion;
10. executar lint;
11. executar typecheck;
12. executar build;
13. revisar console;
14. conferir links externos;
15. comparar conteúdo implementado com esta especificação;
16. revisar tecnicamente os diagramas;
17. capturar screenshots finais;
18. deixar relatório resumido do que foi implementado e do que foi testado.

---

## 23. Instrução principal para o agente Work

Implemente o produto até um estado realmente apresentável e publicável. Não pare após criar o scaffold, não entregue componentes vazios e não considere a tarefa concluída apenas porque o build passa.

Tome decisões de implementação de baixo nível de forma autônoma quando não alterarem o conteúdo acadêmico ou o escopo. Para decisões que possam modificar conceitos, fontes, identidade acadêmica ou requisitos do trabalho, preserve esta especificação.

Prioridades, em ordem:

1. correção conceitual;
2. clareza didática;
3. acessibilidade;
4. qualidade visual;
5. responsividade;
6. performance;
7. sofisticação de animação.

O resultado final deve parecer um produto educacional deliberadamente projetado para explicar RAG e MCP — não uma coleção de cards.

---

## 24. Referências técnicas essenciais

- Lewis et al. — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks  
  https://arxiv.org/abs/2005.11401

- Model Context Protocol — The 2026-07-28 Specification  
  https://blog.modelcontextprotocol.io/posts/2026-07-28/

- MCP TypeScript SDK v2  
  https://ts.sdk.modelcontextprotocol.io/v2/

- MCP Protocol Versions  
  https://ts.sdk.modelcontextprotocol.io/v2/protocol-versions

- Microsoft Learn — Retrieval-Augmented Generation overview  
  https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview

- OWASP GenAI Security — Prompt Injection  
  https://genai.owasp.org/llmrisk/llm01-prompt-injection/

- NIST IR 8579  
  https://csrc.nist.gov/pubs/ir/8579/ipd

---

## 25. Resultado esperado

Ao concluir a implementação, um visitante deve conseguir responder, sem material externo:

- O que é RAG?
- Como RAG funciona?
- O que é MCP?
- Como MCP funciona?
- Qual é a diferença entre os dois?
- Qual é um exemplo de cada?
- Como podem ser usados juntos?
- Onde termina o papel do MCP e começa o pipeline RAG?
- Quais são limitações e cuidados básicos?
- Quais ferramentas de IA foram utilizadas para produzir o trabalho?

Se o site permitir responder essas perguntas com clareza e ainda oferecer uma experiência visual memorável, a implementação cumpriu sua função.
