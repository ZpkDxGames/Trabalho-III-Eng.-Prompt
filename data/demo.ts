export interface RagDocument {
  id: string;
  title: string;
  excerpt: string;
  relevanceScore: number;
}

export interface RagSimulationExample {
  query: string;
  retrievedDocs: RagDocument[];
  constructedContext: string;
  answer: string;
  citedDocIds: string[];
}

export interface McpToolCallExample {
  nodeId: string;
  toolName: string;
  requestPayload: Record<string, unknown>;
  responsePayload: Record<string, unknown>;
}

// Os dois conjuntos abaixo são dados inventados e identificados como demonstração na interface.
export const ragExamples: RagSimulationExample[] = [
  {
    query: "Como faço para renovar um livro na biblioteca?",
    retrievedDocs: [
      {
        id: "B1",
        title: "Guia de empréstimo (fictício)",
        excerpt:
          "A renovação é feita no portal da biblioteca antes do vencimento, desde que não exista reserva para a obra.",
        relevanceScore: 0.98,
      },
      {
        id: "B2",
        title: "Ajuda do portal (fictícia)",
        excerpt:
          "Na área Meus empréstimos, selecione o livro e use a ação Renovar. O novo prazo aparece na confirmação.",
        relevanceScore: 0.91,
      },
      {
        id: "B3",
        title: "Horários de atendimento (fictícios)",
        excerpt:
          "O balcão de atendimento funciona em dias úteis. Dúvidas sobre empréstimo podem ser encaminhadas à equipe.",
        relevanceScore: 0.42,
      },
      {
        id: "B4",
        title: "Catálogo de periódicos (fictício)",
        excerpt:
          "A biblioteca disponibiliza periódicos digitais para consulta no catálogo temático.",
        relevanceScore: 0.17,
      },
      {
        id: "B5",
        title: "Mapa do campus (fictício)",
        excerpt: "A entrada da biblioteca fica próxima ao edifício de estudos.",
        relevanceScore: 0.09,
      },
    ],
    constructedContext:
      "[B1] A renovação é feita no portal antes do vencimento, se não houver reserva.\n[B2] Em Meus empréstimos, selecione Renovar e confira o novo prazo.",
    answer:
      "Neste exemplo fictício, entre em “Meus empréstimos” no portal, escolha “Renovar” antes do vencimento e confira o novo prazo. A renovação depende da ausência de reserva para a obra. [B1] [B2]",
    citedDocIds: ["B1", "B2"],
  },
  {
    query: "Onde encontro o prazo após renovar?",
    retrievedDocs: [
      {
        id: "B2",
        title: "Ajuda do portal (fictícia)",
        excerpt:
          "Na área Meus empréstimos, selecione o livro e use a ação Renovar. O novo prazo aparece na confirmação.",
        relevanceScore: 0.97,
      },
      {
        id: "B1",
        title: "Guia de empréstimo (fictício)",
        excerpt:
          "A renovação é feita no portal da biblioteca antes do vencimento, desde que não exista reserva para a obra.",
        relevanceScore: 0.65,
      },
      {
        id: "B3",
        title: "Horários de atendimento (fictícios)",
        excerpt:
          "O balcão de atendimento funciona em dias úteis. Dúvidas sobre empréstimo podem ser encaminhadas à equipe.",
        relevanceScore: 0.25,
      },
      {
        id: "B4",
        title: "Catálogo de periódicos (fictício)",
        excerpt:
          "A biblioteca disponibiliza periódicos digitais para consulta no catálogo temático.",
        relevanceScore: 0.11,
      },
    ],
    constructedContext:
      "[B2] O novo prazo aparece na confirmação da ação Renovar na área Meus empréstimos.",
    answer:
      "Neste exemplo fictício, o novo prazo aparece na confirmação da renovação, dentro de “Meus empréstimos”. [B2]",
    citedDocIds: ["B2"],
  },
];

const envelope = {
  "io.modelcontextprotocol/protocolVersion": "2026-07-28",
  "io.modelcontextprotocol/clientInfo": {
    name: "laboratorio-didatico",
    version: "1.0.0",
  },
  "io.modelcontextprotocol/clientCapabilities": {},
};

export const mcpExamples: McpToolCallExample[] = [
  {
    nodeId: "discover",
    toolName: "server/discover",
    requestPayload: {
      jsonrpc: "2.0",
      id: 1,
      method: "server/discover",
      params: { _meta: envelope },
    },
    responsePayload: {
      jsonrpc: "2.0",
      id: 1,
      result: {
        resultType: "complete",
        supportedVersions: ["2026-07-28"],
        capabilities: { tools: {}, resources: {}, prompts: {} },
        _meta: {
          "io.modelcontextprotocol/serverInfo": {
            name: "repositorio-codigo",
            version: "1.0.0",
          },
        },
      },
    },
  },
  {
    nodeId: "tool",
    toolName: "buscar_codigo",
    requestPayload: {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: {
        name: "buscar_codigo",
        arguments: { termo: "autenticação" },
        _meta: envelope,
      },
    },
    responsePayload: {
      jsonrpc: "2.0",
      id: 2,
      result: {
        resultType: "complete",
        content: [
          {
            type: "text",
            text: "src/auth/session.ts: função validarSessao (exemplo fictício)",
          },
        ],
        isError: false,
      },
    },
  },
];
