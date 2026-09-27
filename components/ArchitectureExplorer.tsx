"use client";

import { useState } from "react";
import { architectureNodes } from "@/data/architecture";
import { ArrowDownLeft, ArrowUpRight, Component } from "lucide-react";

export function ArchitectureExplorer() {
  const [selected, setSelected] = useState(0);
  const node = architectureNodes[selected];
  return (
    <section
      id="arquitetura"
      className="section section--paper"
      aria-labelledby="architecture-title"
    >
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <span className="section-kicker">Inspecione as peças</span>
            <h2 id="architecture-title">Quem recebe o quê?</h2>
          </div>
          <p>
            Selecione um componente para ver o seu papel, o que entra e o que
            sai. O host, o cliente e o servidor pertencem à integração; o índice
            e o retriever pertencem à recuperação.
          </p>
        </div>
        <div className="explorer">
          <div
            className="explorer-grid"
            role="group"
            aria-label="Componentes da arquitetura integrada"
          >
            {architectureNodes.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={
                  selected === index
                    ? `explorer-tile explorer-tile--active explorer-tile--${item.layer}`
                    : `explorer-tile explorer-tile--${item.layer}`
                }
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                <span className="explorer-tile__mark">
                  <Component size={17} />
                </span>
                <strong>{item.label}</strong>
                <span>
                  {["retriever", "index", "context"].includes(item.layer)
                    ? "RAG"
                    : ["mcp-client", "mcp-server", "tool"].includes(item.layer)
                      ? "MCP"
                      : "Aplicação"}
                </span>
              </button>
            ))}
          </div>
          <div className="explorer-detail" aria-live="polite">
            <div className="explorer-detail__head">
              <span>Componente selecionado</span>
              <span>
                {["retriever", "index", "context"].includes(node.layer)
                  ? "RAG"
                  : ["mcp-client", "mcp-server", "tool"].includes(node.layer)
                    ? "MCP"
                    : "Aplicação"}
              </span>
            </div>
            <h3>{node.label}</h3>
            <div className="detail-row">
              <strong>Papel</strong>
              <p>{node.role}</p>
            </div>
            <div className="detail-row">
              <strong>
                <ArrowDownLeft size={17} /> Entradas
              </strong>
              <p>{node.inputs.join(" ")}</p>
            </div>
            <div className="detail-row">
              <strong>
                <ArrowUpRight size={17} /> Saídas
              </strong>
              <p>{node.outputs.join(" ")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
