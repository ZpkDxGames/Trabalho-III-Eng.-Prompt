import { Check, Split } from "lucide-react";
import { comparisons } from "@/data/content";

export function ComparisonMatrix() {
  return (
    <section
      id="comparacao"
      className="section section--paper"
      aria-labelledby="comparison-title"
    >
      <div className="container">
        <div className="section-heading" data-reveal>
          <span className="section-kicker">Duas perguntas diferentes</span>
          <h2 id="comparison-title">Onde cada ideia atua?</h2>
          <p>
            RAG trata de conhecimento para a resposta. MCP trata da interface de
            acesso a capacidades externas. Eles podem funcionar juntos ou
            separadamente.
          </p>
        </div>
        <div
          className="comparison"
          data-reveal
          role="table"
          aria-label="Comparação entre RAG e MCP"
        >
          <div className="comparison__head" role="row">
            <span role="columnheader">Dimensão</span>
            <strong role="columnheader">
              RAG <small>evidências para geração</small>
            </strong>
            <strong role="columnheader">
              MCP <small>interface de integração</small>
            </strong>
          </div>
          {comparisons.map((item) => (
            <div className="comparison__row" role="row" key={item.dimension}>
              <strong role="rowheader">{item.dimension}</strong>
              <span role="cell">{item.rag}</span>
              <span role="cell">{item.mcp}</span>
            </div>
          ))}
        </div>
        <div className="compatibility">
          <Split size={28} />
          <div>
            <strong>Podem existir separadamente?</strong>
            <p>
              Sim. RAG pode ocorrer sem MCP; MCP pode expor capacidades sem RAG;
              e uma tool MCP pode acessar um serviço que participa de um
              pipeline RAG.
            </p>
          </div>
          <Check size={23} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
