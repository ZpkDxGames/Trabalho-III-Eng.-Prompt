import { productionRows } from "@/data/content";

export function TransparencyTable() {
  return (
    <section
      id="producao"
      className="section section--paper"
      aria-labelledby="production-title"
    >
      <div className="container">
        <div className="section-heading" data-reveal>
          <span className="section-kicker">Método de produção</span>
          <h2 id="production-title">
            Como este trabalho
            <br />
            foi preparado.
          </h2>
          <p>
            A terceira coluna traz um roteiro genérico de conferência para o
            grupo adaptar e executar. Ela não registra revisões humanas como já
            concluídas.
          </p>
        </div>
        <div className="production-table" data-reveal>
          <div className="production-table__head">
            <span>Ferramenta</span>
            <span>Produzido com apoio de IA / ferramenta</span>
            <span>Pontos para validação pelo grupo</span>
          </div>
          {productionRows.map((row) => (
            <div className="production-table__row" key={row.tool}>
              <strong>{row.tool}</strong>
              <p data-label="Apoio da ferramenta">{row.ai}</p>
              <p className="production-review" data-label="Validação do grupo">
                {row.human}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
