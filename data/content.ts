export const navigation = [
  { id: "inicio", label: "Início" },
  { id: "problema", label: "O problema" },
  { id: "rag", label: "RAG" },
  { id: "mcp", label: "MCP" },
  { id: "comparacao", label: "Comparação" },
  { id: "integracao", label: "Juntos" },
  { id: "arquitetura", label: "Arquitetura" },
  { id: "seguranca", label: "Limites" },
  { id: "producao", label: "Produção" },
  { id: "fontes", label: "Fontes" },
] as const;

export const comparisons = [
  {
    dimension: "Natureza",
    rag: "Arquitetura de recuperação e geração com evidências.",
    mcp: "Protocolo de integração entre aplicações e capacidades externas.",
  },
  {
    dimension: "Problema que resolve",
    rag: "Como levar conhecimento relevante à geração.",
    mcp: "Como expor e chamar recursos de modo padronizado.",
  },
  {
    dimension: "Componentes",
    rag: "Fontes, índice, retriever, contexto e LLM.",
    mcp: "Host, cliente, servidor, tools, resources e prompts.",
  },
  {
    dimension: "Fluxo típico",
    rag: "Pergunta → busca → trechos → contexto → resposta.",
    mcp: "Host → cliente → servidor → capacidade → resultado.",
  },
  {
    dimension: "Quando usar",
    rag: "Quando a resposta precisa apoiar-se em fontes externas.",
    mcp: "Quando a aplicação precisa descobrir e acessar capacidades externas.",
  },
  {
    dimension: "Exemplo isolado",
    rag: "Responder sobre a biblioteca com trechos do guia.",
    mcp: "Uma IDE consulta a localização de código por uma tool.",
  },
];

export const risks = [
  {
    title: "Prompt injection indireta",
    description:
      "Um documento recuperado pode conter instruções que tentam controlar o LLM.",
    mitigation:
      "Tratar trechos como dados, isolar o contexto e não promovê-los a instruções do sistema.",
    kind: "RAG",
  },
  {
    title: "Alucinação residual",
    description:
      "Mesmo com fontes, a resposta pode afirmar algo que os trechos não sustentam.",
    mitigation:
      "Exibir citações verificáveis, avaliar a resposta contra as fontes e admitir quando a evidência faltar.",
    kind: "RAG",
  },
  {
    title: "Execução indevida de ferramentas",
    description:
      "Uma chamada MCP pode consultar dados sensíveis ou provocar efeitos reais.",
    mitigation:
      "Validar parâmetros e permissões; exigir confirmação humana para ações sensíveis.",
    kind: "MCP",
  },
  {
    title: "Privilégio mínimo",
    description:
      "Um servidor com acesso amplo aumenta o impacto de erros ou abuso.",
    mitigation:
      "Conceder somente escopos necessários, limitar credenciais e registrar o uso das tools.",
    kind: "MCP",
  },
];

export const sources = [
  {
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    author: "Lewis et al.",
    date: "2020",
    type: "Artigo",
    href: "https://arxiv.org/abs/2005.11401",
  },
  {
    title: "Model Context Protocol, revisão 2026-07-28",
    author: "MCP",
    date: "2026",
    type: "Especificação",
    href: "https://modelcontextprotocol.io/specification/2026-07-28",
  },
  {
    title: "MCP TypeScript SDK v2: versões do protocolo",
    author: "MCP",
    date: "2026",
    type: "Documentação",
    href: "https://ts.sdk.modelcontextprotocol.io/v2/protocol-versions",
  },
  {
    title: "Retrieval Augmented Generation (RAG) in Azure AI Search",
    author: "Microsoft Learn",
    date: "Documentação",
    type: "Documentação",
    href: "https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview",
  },
  {
    title: "LLM01: Prompt Injection",
    author: "OWASP GenAI Security Project",
    date: "2025",
    type: "Segurança",
    href: "https://genai.owasp.org/llmrisk/llm01-prompt-injection/",
  },
  {
    title: "NIST IR 8579, rascunho público inicial",
    author: "NIST",
    date: "2025",
    type: "Segurança",
    href: "https://csrc.nist.gov/pubs/ir/8579/ipd",
  },
];

export const productionRows = [
  {
    tool: "ChatGPT — GPT-5.6 Sol",
    ai: "Apoio à análise do enunciado, síntese e especificação.",
    human: "[Descrever como o grupo conferiu e ajustou a especificação.]",
  },
  {
    tool: "Deep Research",
    ai: "Apoio ao levantamento de fontes técnicas.",
    human: "[Indicar as fontes conferidas diretamente pelo grupo.]",
  },
  {
    tool: "ChatGPT Work",
    ai: "Apoio à implementação e verificação deste microsite.",
    human:
      "[Descrever a revisão de texto, interações e visual feita pelo grupo.]",
  },
  {
    tool: "GitHub",
    ai: "Registro das versões e alterações do código.",
    human: "[Indicar as decisões de revisão e aprovação do grupo.]",
  },
  {
    tool: "Vercel",
    ai: "Hospedagem planejada para a entrega.",
    human: "[Inserir URL e confirmar o acesso público após o deploy.]",
  },
];
