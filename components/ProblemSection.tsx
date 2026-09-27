"use client";

import { useState } from "react";
import {
  LockKeyhole,
  Database,
  Clock3,
  PlugZap,
  ArrowRight,
} from "lucide-react";
import { Badge } from "./ui/Badge";

const barriers = [
  {
    label: "Documentos privados",
    icon: Database,
    explanation:
      "Um modelo isolado não recebe automaticamente os arquivos internos da instituição. RAG pode recuperar trechos autorizados e inseri-los no contexto da resposta.",
    route: "RAG · recuperar evidências",
  },
  {
    label: "Informações atualizadas",
    icon: Clock3,
    explanation:
      "O conhecimento incorporado no treinamento pode estar desatualizado. Uma busca em fontes mantidas permite consultar informação recente; a qualidade da fonte ainda precisa ser avaliada.",
    route: "RAG · consultar fontes",
  },
  {
    label: "Ferramentas externas",
    icon: PlugZap,
    explanation:
      "Gerar texto não executa operações por si só. MCP padroniza a exposição de tools, resources e prompts para a aplicação de IA.",
    route: "MCP · conectar capacidades",
  },
];

export function ProblemSection() {
  const [selected, setSelected] = useState(0);
  return (
    <section
      id="problema"
      className="section section--paper"
      aria-labelledby="problem-title"
    >
      <div className="container">
        <div className="section-heading">
          <span className="section-kicker">Ponto de partida</span>
          <h2 id="problem-title">
            Um LLM não enxerga tudo
            <br />
            ao seu redor.
          </h2>
          <p>
            Sem uma integração planejada, dados externos e ações ficam fora do
            alcance da aplicação. Toque em uma barreira para entender o que
            falta.
          </p>
        </div>
        <div className="problem-layout">
          <div className="problem-system">
            <div className="problem-system__core">
              <span className="core-pulse" />
              <strong>LLM</strong>
              <small>modelo de linguagem</small>
            </div>
            <div className="problem-system__barriers">
              {barriers.map((barrier, index) => (
                <button
                  className={`barrier ${selected === index ? "barrier--active" : ""}`}
                  key={barrier.label}
                  type="button"
                  aria-pressed={selected === index}
                  onClick={() => setSelected(index)}
                >
                  <span className="barrier__icon">
                    <barrier.icon size={20} />
                  </span>
                  <span>{barrier.label}</span>
                  <LockKeyhole size={16} aria-hidden="true" />
                  <span className="sr-only">
                    Acesso indisponível sem integração
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="problem-detail" aria-live="polite">
            <div className="problem-detail__number">
              Barreira {selected + 1} de 3
            </div>
            <Badge tone={selected === 2 ? "mcp" : "rag"}>
              {barriers[selected].route}
            </Badge>
            <h3>{barriers[selected].label}</h3>
            <p>{barriers[selected].explanation}</p>
            <a className="text-link" href={selected === 2 ? "#mcp" : "#rag"}>
              Ver como funciona <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
