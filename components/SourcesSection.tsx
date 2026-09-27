import { ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { sources } from "@/data/content";

export function SourcesSection() {
  return (
    <section
      id="fontes"
      className="section section--sources"
      aria-labelledby="sources-title"
    >
      <div className="container">
        <div className="section-heading section-heading--split" data-reveal>
          <div>
            <span className="section-kicker">Para conferir</span>
            <h2 id="sources-title">
              Fontes primárias
              <br />e documentação.
            </h2>
          </div>
          <p>
            Explore os textos que sustentam as definições, a revisão do
            protocolo e os cuidados de segurança apresentados no laboratório.
          </p>
        </div>
        <div className="sources-list" data-reveal>
          {sources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sources-list__type">{source.type}</span>
              <strong>{source.title}</strong>
              <span>
                {source.author} · {source.date}
              </span>
              <ExternalLink size={19} aria-hidden="true" />
              <span className="sr-only">Abre em nova guia</span>
            </a>
          ))}
        </div>
        <div className="sources-next" data-reveal>
          <div>
            <span>O próximo passo é humano.</span>
            <p>
              Confira as fontes, teste os exemplos e ajuste os campos de
              transparência antes da entrega acadêmica.
            </p>
          </div>
          <Link href="/creditos">
            Conheça o grupo <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
