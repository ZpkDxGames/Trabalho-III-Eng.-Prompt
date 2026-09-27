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
            A coluna de revisão humana contém campos a serem preenchidos e
            validados pelo grupo. Eles não representam decisões que já tenham
            sido confirmadas.
          </p>
        </div>
        <div className="production-table" data-reveal>
          <div className="production-table__head">
            <span>Ferramenta</span>
            <span>Produzido com apoio de IA / ferramenta</span>
            <span>Revisado ou decidido pelo grupo</span>
          </div>
          {productionRows.map((row) => (
            <div className="production-table__row" key={row.tool}>
              <strong>{row.tool}</strong>
              <p>{row.ai}</p>
              <p className="production-placeholder">{row.human}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
