import { ShieldCheck, AlertCircle } from "lucide-react";
import { risks } from "@/data/content";

export function SecurityMatrix() {
  return (
    <section
      id="seguranca"
      className="section section--safety"
      aria-labelledby="security-title"
    >
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <span className="section-kicker">Confiabilidade</span>
            <h2 id="security-title">
              A evidência também
              <br />
              precisa ser verificada.
            </h2>
          </div>
          <p>
            Recuperar dados e conectar ferramentas não torna uma resposta
            automaticamente segura ou correta. Cada etapa pede controles
            próprios.
          </p>
        </div>
        <div className="risk-grid">
          {risks.map((risk) => (
            <article className="risk" key={risk.title}>
              <span
                className={`risk__kind risk__kind--${risk.kind.toLowerCase()}`}
              >
                {risk.kind}
              </span>
              <h3>
                <AlertCircle size={20} />
                {risk.title}
              </h3>
              <p>{risk.description}</p>
              <div>
                <ShieldCheck size={19} />
                <span>
                  <strong>Mitigação</strong>
                  {risk.mitigation}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
