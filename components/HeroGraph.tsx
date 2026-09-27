import {
  BrainCircuit,
  FileText,
  Wrench,
  UserRound,
  Layers3,
} from "lucide-react";

const nodes = [
  {
    icon: UserRound,
    title: "Pergunta",
    className: "node-question",
    delay: 0.1,
  },
  {
    icon: FileText,
    title: "Evidências",
    className: "node-evidence",
    delay: 0.35,
  },
  {
    icon: BrainCircuit,
    title: "Host + LLM",
    className: "node-core",
    delay: 0.25,
  },
  { icon: Wrench, title: "Ferramentas", className: "node-tools", delay: 0.5 },
  { icon: Layers3, title: "Resposta", className: "node-answer", delay: 0.7 },
];

export function HeroGraph() {
  return (
    <div
      className="hero-graph"
      role="img"
      aria-label="Diagrama: pergunta chega ao host e LLM; evidências RAG e ferramentas MCP se conectam para produzir uma resposta com fontes."
    >
      <div className="hero-graph__caption">
        <span className="live-dot" /> MAPA DA APLICAÇÃO <span>01 / 02</span>
      </div>
      <svg
        className="hero-graph__lines"
        viewBox="0 0 600 480"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M105 130 C155 130 180 230 260 230" />
        <path d="M100 350 C175 350 180 270 260 270" className="rag-line" />
        <path d="M485 115 C410 115 415 220 350 230" className="mcp-line" />
        <path d="M350 270 C410 280 425 380 490 380" />
      </svg>
      {nodes.map((node) => (
        <div
          key={node.title}
          className={`hero-node ${node.className}`}
          style={{ animationDelay: `${node.delay}s` }}
        >
          <node.icon size={23} strokeWidth={1.8} />
          <span>{node.title}</span>
        </div>
      ))}
      <div className="hero-graph__legend">
        <span>
          <i className="legend-rag" />
          RAG / evidências
        </span>
        <span>
          <i className="legend-mcp" />
          MCP / acesso
        </span>
      </div>
    </div>
  );
}
