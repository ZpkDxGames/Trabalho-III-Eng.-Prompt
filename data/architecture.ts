export interface ArchitectureNode {
  id: string;
  label: string;
  role: string;
  inputs: string[];
  outputs: string[];
  layer:
    | "user"
    | "host"
    | "mcp-client"
    | "mcp-server"
    | "tool"
    | "retriever"
    | "index"
    | "context"
    | "llm";
}

export interface IntegrationStep {
  order: number;
  layer: "usuario" | "mcp" | "rag" | "mcp-rag";
  title: string;
  description: string;
}

export const architectureNodes: ArchitectureNode[] = [
  {
    id: "usuario",
    label: "Usuário",
    layer: "user",
    role: "Formula a pergunta e avalia a resposta recebida.",
    inputs: ["Resposta fundamentada e fontes exibidas."],
    outputs: ["Pergunta sobre o estágio obrigatório."],
  },
  {
    id: "host",
    label: "Host",
    layer: "host",
    role: "Aplicação que orquestra o LLM e seus clientes MCP.",
    inputs: ["Pergunta do usuário e resultados do cliente MCP."],
    outputs: ["Chamada à capacidade escolhida e resposta ao usuário."],
  },
  {
    id: "cliente",
    label: "Cliente MCP",
    layer: "mcp-client",
    role: "Componente do host que conversa com um servidor MCP.",
    inputs: ["Solicitação do host e resultado do servidor."],
    outputs: ["Requisição MCP e resultado entregue ao host."],
  },
  {
    id: "servidor",
    label: "Servidor MCP",
    layer: "mcp-server",
    role: "Expõe capacidades externas em uma interface padronizada.",
    inputs: ["Requisição do cliente MCP."],
    outputs: ["Catálogo de capacidades ou resultado da tool."],
  },
  {
    id: "tool",
    label: "Tool",
    layer: "tool",
    role: "Executa a operação pesquisar_documentos para consultar o serviço de recuperação.",
    inputs: ["Termos de busca e autorização da chamada."],
    outputs: ["Trechos recuperados e referências de origem."],
  },
  {
    id: "retriever",
    label: "Retriever",
    layer: "retriever",
    role: "Seleciona trechos relevantes a partir de um índice pesquisável.",
    inputs: ["Pergunta e índice de documentos."],
    outputs: ["Trechos candidatos para compor o contexto."],
  },
  {
    id: "indice",
    label: "Índice",
    layer: "index",
    role: "Organiza trechos previamente preparados para busca lexical, semântica ou híbrida.",
    inputs: ["Documentos extraídos, divididos e indexados."],
    outputs: ["Trechos pesquisáveis para o retriever."],
  },
  {
    id: "contexto",
    label: "Contexto",
    layer: "context",
    role: "Insumo textual montado a partir dos trechos recuperados, injetado no prompt do LLM.",
    inputs: ["Trechos/documentos selecionados pelo retriever."],
    outputs: ["Prompt aumentado, pronto para geração."],
  },
  {
    id: "llm",
    label: "LLM",
    layer: "llm",
    role: "Sintetiza uma resposta usando pergunta e evidências, com apoio da orquestração do host.",
    inputs: ["Pergunta e contexto com fontes."],
    outputs: ["Resposta citada, que o host apresenta ao usuário."],
  },
];

export const integrationSteps: IntegrationStep[] = [
  {
    order: 1,
    layer: "usuario",
    title: "A pergunta",
    description:
      "O estagiário pergunta ao assistente: “Qual a carga horária mínima do estágio obrigatório e quais documentos preciso entregar?”",
  },
  {
    order: 2,
    layer: "mcp",
    title: "O host recebe",
    description:
      "O Host (a aplicação de chat) recebe a mensagem e a repassa ao Cliente MCP interno.",
  },
  {
    order: 3,
    layer: "mcp",
    title: "Descoberta",
    description:
      "O Cliente MCP chama server/discover para descobrir as capacidades disponíveis no Servidor MCP.",
  },
  {
    order: 4,
    layer: "mcp",
    title: "Capacidade disponível",
    description:
      "O Servidor MCP anuncia suporte a tools; o Cliente MCP consulta tools/list e encontra pesquisar_documentos.",
  },
  {
    order: 5,
    layer: "mcp",
    title: "Chamada da tool",
    description:
      "Orientado pelo Host, o LLM decide invocar pesquisar_documentos, passando os termos da pergunta como parâmetro.",
  },
  {
    order: 6,
    layer: "mcp-rag",
    title: "Passagem de camada",
    description:
      "O Servidor MCP executa a tool, que internamente aciona o serviço de RAG.",
  },
  {
    order: 7,
    layer: "rag",
    title: "Recuperação",
    description:
      "O Retriever busca, no índice de documentos institucionais (ex.: regulamento de estágio), os trechos mais relevantes.",
  },
  {
    order: 8,
    layer: "mcp-rag",
    title: "Evidências retornam",
    description:
      "O contexto recuperado é formatado e devolvido como resultado da tool ao Cliente MCP.",
  },
  {
    order: 9,
    layer: "usuario",
    title: "Resposta com fontes",
    description:
      "O LLM sintetiza a resposta final (“a carga horária mínima é de XXX horas, mediante entrega de [Documento X] e [Documento Y]”), citando as fontes recuperadas, e ela é exibida ao estagiário.",
  },
];
