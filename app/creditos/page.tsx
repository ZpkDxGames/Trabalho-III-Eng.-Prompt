import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Créditos | RAG + MCP Lab",
  description: "Integrantes do Trabalho III de Engenharia de Prompts.",
};

function PixelAvatar({ person }: { person: "julia" | "antonio" | "matheus" }) {
  const palette = {
    julia: {
      hair: "#303048",
      skin: "#DFA889",
      shirt: "#7865C9",
      accent: "#A38DF4",
    },
    antonio: {
      hair: "#2E3549",
      skin: "#D69A72",
      shirt: "#237A8C",
      accent: "#5AC5C8",
    },
    matheus: {
      hair: "#49372F",
      skin: "#C99373",
      shirt: "#4C617C",
      accent: "#829FB4",
    },
  }[person];
  return (
    <svg
      viewBox="0 0 128 128"
      role="img"
      aria-label={`Avatar ilustrativo em pixel art de ${person === "julia" ? "Júlia" : person === "antonio" ? "Antônio" : "Matheus"}`}
      shapeRendering="crispEdges"
    >
      <rect width="128" height="128" rx="20" fill="#E7E8E2" />
      <rect x="12" y="80" width="104" height="48" fill={palette.shirt} />
      <rect x="26" y="72" width="76" height="16" fill={palette.accent} />
      <rect x="50" y="72" width="28" height="18" fill={palette.skin} />
      <rect x="34" y="28" width="60" height="52" fill={palette.skin} />
      <rect x="28" y="20" width="72" height="24" fill={palette.hair} />
      <rect
        x="28"
        y="40"
        width="12"
        height={person === "julia" ? "46" : "16"}
        fill={palette.hair}
      />
      <rect
        x="88"
        y="40"
        width="12"
        height={person === "julia" ? "46" : "16"}
        fill={palette.hair}
      />
      <rect x="46" y="51" width="9" height="6" fill="#283247" />
      <rect x="73" y="51" width="9" height="6" fill="#283247" />
      <rect x="59" y="67" width="11" height="3" fill="#9C605C" />
      {person === "antonio" && (
        <>
          <rect
            x="44"
            y="49"
            width="16"
            height="12"
            fill="none"
            stroke="#26354A"
            strokeWidth="3"
          />
          <rect
            x="69"
            y="49"
            width="16"
            height="12"
            fill="none"
            stroke="#26354A"
            strokeWidth="3"
          />
          <rect x="60" y="53" width="9" height="3" fill="#26354A" />
        </>
      )}
      {person === "julia" && (
        <>
          <rect x="23" y="62" width="10" height="37" fill={palette.hair} />
          <rect x="95" y="62" width="10" height="37" fill={palette.hair} />
        </>
      )}
    </svg>
  );
}

const team = [
  {
    id: "julia" as const,
    name: "Júlia B. Souza",
    ra: "5179343-1",
    note: "Integrante do grupo",
  },
  {
    id: "antonio" as const,
    name: "Antônio J. T. Neto",
    ra: "5178724-1",
    note: "GitHub: ZpkDxGames",
  },
  {
    id: "matheus" as const,
    name: "Matheus A. D. Barbara",
    ra: "5174907-1",
    note: "Integrante do grupo",
  },
];

export default function CreditsPage() {
  return (
    <>
      <Header />
      <main id="conteudo" className="credits-page">
        <div className="container">
          <Link className="credits-back" href="/#inicio">
            <ArrowLeft size={17} /> Voltar ao atlas
          </Link>
          <div className="credits-heading" data-reveal>
            <span className="section-kicker">Quem compõe o trabalho</span>
            <h1>
              Três perspectivas.
              <br />
              <em>Um percurso.</em>
            </h1>
            <p>
              O atlas foi preparado para comunicar os conceitos de RAG e MCP em
              uma experiência que possa ser explorada sem apresentação oral.
            </p>
          </div>
          <div className="team-grid" data-reveal>
            {team.map((person) => (
              <article
                className={`team-card team-card--${person.id}`}
                key={person.id}
              >
                <div className="team-card__avatar">
                  <PixelAvatar person={person.id} />
                </div>
                <div>
                  <span>Trabalho III</span>
                  <h2>{person.name}</h2>
                  <p>RA: {person.ra}</p>
                  {person.id === "antonio" ? (
                    <a
                      href="https://github.com/ZpkDxGames"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      <Github size={18} /> GitHub <ArrowUpRight size={16} />
                      <span className="sr-only">(abre em nova guia)</span>
                    </a>
                  ) : (
                    <small>{person.note}</small>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className="credits-note">
            <strong>Sobre os avatares</strong>
            <p>
              Os sprites são ilustrações de identificação, não reproduções da
              aparência real das pessoas. Os dados de nome e RA foram fornecidos
              pelo grupo.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
