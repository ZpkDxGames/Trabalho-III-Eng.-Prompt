"use client";

import { useState } from "react";
import {
  ArrowRight,
  Braces,
  Monitor,
  Network,
  Server,
  Wrench,
  Database,
  MessageSquareText,
} from "lucide-react";
import { mcpExamples } from "@/data/demo";
import { Badge } from "./ui/Badge";
import { JsonViewer } from "./ui/JsonViewer";

const nodes = [
  {
    id: "host",
    label: "Host",
    icon: Monitor,
    role: "Aplicação de IA que orquestra o modelo e mantém clientes MCP.",
    no: "O host não é o servidor de ferramentas.",
    payload: {
      application: "IDE fictícia",
      client: "cliente MCP interno",
      question: "Localize a função de autenticação",
    },
  },
  {
    id: "client",
    label: "Cliente MCP",
    icon: Network,
    role: "Componente do host que envia requisições ao servidor MCP.",
    no: "O LLM não precisa ser o cliente do protocolo.",
    payload: mcpExamples[0].requestPayload,
  },
  {
    id: "server",
    label: "Servidor MCP",
    icon: Server,
    role: "Publica capacidades descobertas pela aplicação.",
    no: "O servidor não é um LLM nem um banco de dados obrigatório.",
    payload: mcpExamples[0].responsePayload,
  },
  {
    id: "tool",
    label: "Tools",
    icon: Wrench,
    role: "Operações que o host pode permitir que o modelo invoque.",
    no: "Uma tool não é executada sem chamada e autorização da aplicação.",
    payload: {
      name: "buscar_codigo",
      description: "Busca um termo em arquivos do projeto fictício.",
      inputSchema: {
        type: "object",
        properties: { termo: { type: "string" } },
        required: ["termo"],
      },
    },
  },
  {
    id: "resources",
    label: "Resources",
    icon: Database,
    role: "Dados que um servidor disponibiliza para leitura contextual.",
    no: "Um resource não é necessariamente uma operação com efeito.",
    payload: {
      uri: "repo://guia/testes",
      name: "Guia de testes",
      mimeType: "text/plain",
    },
  },
  {
    id: "prompts",
    label: "Prompts",
    icon: MessageSquareText,
    role: "Modelos de interação disponibilizados pelo servidor.",
    no: "Um prompt não substitui as instruções de segurança do host.",
    payload: {
      name: "revisar_testes",
      arguments: [{ name: "arquivo", required: true }],
    },
  },
];

export function McpExplorer() {
  const [selected, setSelected] = useState(0);
  const [view, setView] = useState<"contexto" | "chamada" | "retorno">(
    "contexto",
  );
  const node = nodes[selected];
  const payload =
    view === "chamada"
      ? mcpExamples[1].requestPayload
      : view === "retorno"
        ? mcpExamples[1].responsePayload
        : node.payload;
  return (
    <section
      id="mcp"
      className="section section--mcp"
      aria-labelledby="mcp-title"
    >
      <div className="container">
        <div className="section-heading section-heading--split" data-reveal>
          <div>
            <span className="section-kicker">Conectar para agir</span>
            <h2 id="mcp-title">
              MCP define a interface
              <br />
              entre sistemas.
            </h2>
          </div>
          <p>
            Model Context Protocol é um padrão aberto para conectar aplicações
            de IA a tools, resources e prompts. O host orquestra o LLM; um
            cliente MCP se comunica com o servidor.
          </p>
        </div>
        <div className="mcp-principle" data-reveal>
          <div>
            <Badge tone="mcp">Revisão 2026-07-28</Badge>
            <h3>Uma requisição se explica sozinha.</h3>
          </div>
          <p>
            O núcleo do protocolo é stateless: a versão e as capacidades do
            cliente acompanham cada requisição. <code>server/discover</code>{" "}
            pode anunciar capacidades antes das demais chamadas, mas é opcional.
            O antigo <code>initialize/initialized</code> pertence às revisões de
            2025 e anteriores.
          </p>
        </div>
        <div className="mcp-lab" data-reveal>
          <div className="mcp-lab__intro">
            <span>Exemplo isolado · IDE fictícia</span>
            <p>
              “Localize onde a função de autenticação é definida e resuma os
              pontos que precisam de teste.”
            </p>
          </div>
          <div className="mcp-lab__layout">
            <div
              className="mcp-nodes"
              role="group"
              aria-label="Componentes da arquitetura MCP"
            >
              {nodes.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={
                    selected === index
                      ? "mcp-node mcp-node--active"
                      : "mcp-node"
                  }
                  aria-pressed={selected === index}
                  onClick={() => {
                    setSelected(index);
                    setView("contexto");
                  }}
                >
                  <item.icon size={19} />
                  <span>{item.label}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className="mcp-detail" aria-live="polite">
              <div className="mcp-detail__eyebrow">Componente selecionado</div>
              <h3>{node.label}</h3>
              <p>{node.role}</p>
              <div className="mcp-detail__note">
                <strong>O que não é</strong>
                <span>{node.no}</span>
              </div>
              <div
                className="mcp-tabs"
                role="group"
                aria-label="Exemplos de dados MCP"
              >
                <button
                  type="button"
                  aria-pressed={view === "contexto"}
                  onClick={() => setView("contexto")}
                >
                  Componente
                </button>
                <button
                  type="button"
                  aria-pressed={view === "chamada"}
                  onClick={() => setView("chamada")}
                >
                  Chamada
                </button>
                <button
                  type="button"
                  aria-pressed={view === "retorno"}
                  onClick={() => setView("retorno")}
                >
                  Resultado
                </button>
              </div>
              <JsonViewer
                title={
                  view === "contexto"
                    ? node.label
                    : view === "chamada"
                      ? "tools/call · buscar_codigo"
                      : "resultado da tool"
                }
                value={payload}
              />
              <p className="json-caption">
                <Braces size={15} /> Payload didático local. Nenhuma tool é
                executada.
              </p>
            </div>
          </div>
        </div>
        <p className="mcp-outro">
          MCP organiza o acesso. A IDE deste exemplo usa uma tool de busca de
          código; o estudo de caso do estágio, mais adiante, usa outra tool para
          consultar um serviço de RAG.
        </p>
      </div>
    </section>
  );
}
