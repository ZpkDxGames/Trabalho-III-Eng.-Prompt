import { ArrowDownRight, ArrowUpRight, BookOpenText } from "lucide-react";
import { Badge } from "./ui/Badge";
import { HeroGraph } from "./HeroGraph";

export function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero__grain" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__index">
            <BookOpenText size={17} /> Trabalho III · Engenharia de Prompts
          </div>
          <h1 id="hero-title">
            Conhecimento
            <br />
            {" "}encontra <span>conexão.</span>
          </h1>
          <p className="hero__lede">
            Entenda como uma aplicação de IA recupera evidências com RAG, acessa
            capacidades externas com MCP e combina os dois em uma resposta
            fundamentada.
          </p>
          <div className="hero__actions">
            <a className="button button--light" href="#integracao">
              Explorar o percurso <ArrowUpRight size={18} />
            </a>
            <a className="text-link text-link--light" href="#rag">
              Começar por RAG <ArrowDownRight size={18} />
            </a>
          </div>
          <div className="hero__badges">
            <Badge tone="rag">RAG · recuperação + geração</Badge>
            <Badge tone="mcp">MCP · protocolo de integração</Badge>
            <Badge>MCP 2026-07-28</Badge>
          </div>
        </div>
        <HeroGraph />
      </div>
      <div className="hero__footer container">
        <span>Um laboratório didático, sem chamadas de IA em tempo real.</span>
        <a href="#problema">
          Desça para explorar <ArrowDownRight size={17} />
        </a>
      </div>
    </section>
  );
}
