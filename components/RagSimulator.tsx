"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  Database,
  FileSearch,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { ragExamples } from "@/data/demo";
import { Badge } from "./ui/Badge";
import { StepIndicator } from "./ui/StepIndicator";
import { useMotionPreference } from "@/lib/useMotionPreference";

const phases = ["Fontes", "Recuperação", "Contexto", "Resposta"];

export function RagSimulator() {
  const [exampleIndex, setExampleIndex] = useState(0);
  const [phase, setPhase] = useState(0);
  const [inspected, setInspected] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const manualReduced = useMotionPreference();
  const example = ragExamples[exampleIndex];
  const cited = example.retrievedDocs.filter((doc) =>
    example.citedDocIds.includes(doc.id),
  );
  const inspectedDoc = example.retrievedDocs.find(
    (doc) => doc.id === inspected,
  );

  return (
    <section
      id="rag"
      className="section section--rag"
      aria-labelledby="rag-title"
    >
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <span className="section-kicker">Recuperar para responder</span>
            <h2 id="rag-title">
              RAG dá evidências
              <br />à geração.
            </h2>
          </div>
          <p>
            Retrieval-Augmented Generation recupera informação externa relevante
            e a inclui no contexto usado pelo LLM. O método de busca pode ser
            lexical (como BM25), semântico ou híbrido, com reranking quando
            útil.
          </p>
        </div>
        <div className="rag-pipeline">
          <div>
            <div className="pipeline-label">
              <span>01</span>
              <strong>Preparação / indexação</strong>
            </div>
            <div className="pipeline-steps">
              <span>Documentos</span>
              <ArrowRight size={16} />
              <span>Divisão em trechos</span>
              <ArrowRight size={16} />
              <span>Índice pesquisável</span>
            </div>
            <p>
              O conteúdo é extraído, normalizado e indexado. Embeddings são uma
              opção; um índice lexical também pode servir.
            </p>
          </div>
          <div>
            <div className="pipeline-label">
              <span>02</span>
              <strong>Consulta / geração</strong>
            </div>
            <div className="pipeline-steps">
              <span>Pergunta</span>
              <ArrowRight size={16} />
              <span>Recuperação</span>
              <ArrowRight size={16} />
              <span>Contexto + LLM</span>
            </div>
            <p>
              Os trechos selecionados entram no contexto. O LLM produz uma
              resposta que pode indicar as fontes.
            </p>
          </div>
        </div>
        <div className="lab">
          <div className="lab__top">
            <div>
              <Badge tone="rag">Laboratório RAG</Badge>
              <h3>Uma pergunta à biblioteca</h3>
              <p>
                Dados inteiramente fictícios. Nenhuma consulta sai deste
                navegador.
              </p>
            </div>
            <StepIndicator current={phase + 1} total={4} label="Etapa" />
          </div>
          <div className="rag-controls">
            <label htmlFor="rag-question">Pergunta de exemplo</label>
            <div className="rag-controls__row">
              <select
                id="rag-question"
                value={exampleIndex}
                onChange={(event) => {
                  setExampleIndex(Number(event.target.value));
                  setPhase(0);
                  setInspected(null);
                }}
              >
                {ragExamples.map((item, index) => (
                  <option value={index} key={item.query}>
                    {item.query}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="button button--dark"
                onClick={() => {
                  setPhase((value) => (value + 1) % 4);
                  setInspected(null);
                }}
              >
                {phase === 3 ? (
                  <>
                    Reiniciar <RotateCcw size={17} />
                  </>
                ) : (
                  <>
                    Avançar <ArrowRight size={17} />
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="phase-track" aria-label="Etapas da simulação">
            {phases.map((label, index) => (
              <button
                key={label}
                type="button"
                className={phase === index ? "phase-track__active" : ""}
                aria-current={phase === index ? "step" : undefined}
                onClick={() => setPhase(index)}
              >
                <span>{index < phase ? <Check size={14} /> : index + 1}</span>
                {label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${exampleIndex}-${phase}`}
              className="rag-stage"
              initial={
                phase === 0 || reduced || manualReduced
                  ? false
                  : { opacity: 0, x: 12 }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                reduced || manualReduced ? undefined : { opacity: 0, x: -12 }
              }
              transition={{ duration: reduced || manualReduced ? 0 : 0.22 }}
              aria-live="polite"
            >
              {phase === 0 && (
                <>
                  <div className="stage-heading">
                    <Database size={20} />
                    <h4>Índice de documentos demonstrativos</h4>
                    <span>{example.retrievedDocs.length} fontes</span>
                  </div>
                  <div className="document-grid">
                    {example.retrievedDocs.map((doc) => (
                      <article key={doc.id} className="document">
                        <small>{doc.id} / FONTE FICTÍCIA</small>
                        <h5>{doc.title}</h5>
                        <p>{doc.excerpt}</p>
                      </article>
                    ))}
                  </div>
                </>
              )}
              {phase === 1 && (
                <>
                  <div className="stage-heading">
                    <FileSearch size={20} />
                    <h4>Trechos classificados por relevância</h4>
                    <span>pontuação ilustrativa</span>
                  </div>
                  <div className="retrieval-list">
                    {example.retrievedDocs.map((doc) => (
                      <div
                        className={
                          example.citedDocIds.includes(doc.id)
                            ? "retrieval retrieval--selected"
                            : "retrieval"
                        }
                        key={doc.id}
                      >
                        <span>{doc.id}</span>
                        <strong>{doc.title}</strong>
                        <div className="relevance">
                          <i
                            style={{
                              width: `${Math.round(doc.relevanceScore * 100)}%`,
                            }}
                          />
                        </div>
                        <small>{Math.round(doc.relevanceScore * 100)}%</small>
                        {example.citedDocIds.includes(doc.id) && (
                          <span className="retrieval-tag">Selecionado</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="lab-note">
                    A pontuação foi definida para a demonstração; nenhum
                    algoritmo de busca está rodando aqui.
                  </p>
                </>
              )}
              {phase === 2 && (
                <>
                  <div className="stage-heading">
                    <BookOpen size={20} />
                    <h4>Contexto aumentado</h4>
                    <span>{cited.length} trechos selecionados</span>
                  </div>
                  <div className="context-panel">
                    <span>Pergunta + evidências selecionadas</span>
                    <pre>{example.constructedContext}</pre>
                  </div>
                  <p className="lab-note">
                    Trechos recuperados são dados de origem externa, não
                    instruções para o modelo.
                  </p>
                </>
              )}
              {phase === 3 && (
                <>
                  <div className="stage-heading">
                    <Sparkles size={20} />
                    <h4>Resposta demonstrativa</h4>
                    <span>geração simulada</span>
                  </div>
                  <blockquote className="answer-panel">
                    {example.answer}
                  </blockquote>
                  <div className="source-buttons">
                    {cited.map((doc) => (
                      <button
                        type="button"
                        key={doc.id}
                        aria-pressed={inspected === doc.id}
                        onClick={() =>
                          setInspected(inspected === doc.id ? null : doc.id)
                        }
                      >
                        [{doc.id}] {doc.title}
                      </button>
                    ))}
                  </div>
                  {inspectedDoc && (
                    <div className="source-inspection">
                      <strong>Trecho da fonte {inspectedDoc.id}</strong>
                      <p>{inspectedDoc.excerpt}</p>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="rag-after">
          <p>
            <strong>RAG não é sinônimo de banco vetorial.</strong> Busca
            lexical, filtros e abordagens híbridas também podem recuperar
            trechos.
          </p>
          <p>
            <strong>RAG não é fine-tuning.</strong> Ele acrescenta contexto à
            consulta, sem alterar os pesos do modelo.
          </p>
        </div>
      </div>
    </section>
  );
}
