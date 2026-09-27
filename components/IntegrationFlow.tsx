"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  MessageCircle,
  Network,
  Search,
  Sparkles,
} from "lucide-react";
import { integrationSteps } from "@/data/architecture";
import { StepIndicator } from "./ui/StepIndicator";
import { useMotionPreference } from "@/lib/useMotionPreference";

const layerText = {
  usuario: "Pessoa / resposta",
  mcp: "Camada MCP",
  rag: "Camada RAG",
  "mcp-rag": "Passagem MCP ↔ RAG",
};
const visualNodes = [
  { label: "Pergunta", icon: MessageCircle, range: [1, 9] },
  { label: "Host e cliente", icon: Network, range: [2, 3, 5] },
  { label: "Servidor e tool", icon: Sparkles, range: [4, 6, 8] },
  { label: "Índice e busca", icon: Search, range: [7] },
  { label: "Resposta citada", icon: FileText, range: [9] },
];

export function IntegrationFlow() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const manualReduced = useMotionPreference();
  const step = integrationSteps[index];
  return (
    <section
      id="integracao"
      className="section section--integration"
      aria-labelledby="integration-title"
    >
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <span className="section-kicker">O caso integrado</span>
            <h2 id="integration-title">
              Uma resposta, duas
              <br />
              camadas de trabalho.
            </h2>
          </div>
          <p>
            O Assistente Universitário Inteligente precisa consultar normas da
            instituição. A tool <code>pesquisar_documentos</code> é oferecida
            via MCP; o serviço de RAG recupera as evidências que entram na
            resposta.
          </p>
        </div>
        <div className="integration-lab">
          <div className="integration-lab__top">
            <div>
              <span className="integration-lab__name">Percurso guiado</span>
              <h3>Da pergunta à fonte</h3>
            </div>
            <StepIndicator
              label="Passo"
              current={index + 1}
              total={integrationSteps.length}
            />
          </div>
          <div
            className="integration-map"
            aria-label="Mapa simplificado do percurso"
          >
            {visualNodes.map((node, nodeIndex) => (
              <div
                className={
                  node.range.includes(step.order)
                    ? "map-node map-node--active"
                    : "map-node"
                }
                key={node.label}
              >
                <node.icon size={21} />
                <span>{node.label}</span>
                {nodeIndex < visualNodes.length - 1 && (
                  <ArrowRight
                    className="map-arrow"
                    size={18}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="integration-lab__body">
            <div
              className="integration-rail"
              role="group"
              aria-label="Selecionar um dos nove passos"
            >
              {integrationSteps.map((item, itemIndex) => (
                <button
                  key={item.order}
                  type="button"
                  className={
                    index === itemIndex
                      ? `rail-step rail-step--active rail-step--${item.layer}`
                      : "rail-step"
                  }
                  aria-label={`Passo ${item.order}: ${item.title}`}
                  aria-current={index === itemIndex ? "step" : undefined}
                  onClick={() => setIndex(itemIndex)}
                >
                  {item.order}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className={`integration-story integration-story--${step.layer}`}
                key={step.order}
                initial={
                  index === 0 || reduced || manualReduced
                    ? false
                    : { opacity: 0, y: 10 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  reduced || manualReduced ? undefined : { opacity: 0, y: -8 }
                }
                transition={{ duration: reduced || manualReduced ? 0 : 0.22 }}
                aria-live="polite"
              >
                <span className="story-layer">{layerText[step.layer]}</span>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
                <div className="story-separation">
                  <span>
                    Antes:{" "}
                    {index === 0
                      ? "a pergunta ainda não foi enviada"
                      : integrationSteps[index - 1].title.toLowerCase()}
                  </span>
                  <span>
                    Depois:{" "}
                    {index === integrationSteps.length - 1
                      ? "o estudante confere as fontes"
                      : integrationSteps[index + 1].title.toLowerCase()}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="integration-actions">
            <button
              type="button"
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
            >
              <ArrowLeft size={17} /> Anterior
            </button>
            <span>
              Exemplo ilustrativo: XXX horas e [Documento X] são marcadores
              didáticos.
            </span>
            <button
              type="button"
              disabled={index === integrationSteps.length - 1}
              onClick={() => setIndex(index + 1)}
            >
              Próximo <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
