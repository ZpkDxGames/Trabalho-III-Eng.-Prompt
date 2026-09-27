import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div>
          <Link href="/#inicio" className="footer-brand">
            RAG <span>+</span> MCP <em>Lab</em>
          </Link>
          <p>
            Um percurso visual sobre evidência, integração e os limites de
            aplicações de IA.
          </p>
        </div>
        <nav aria-label="Links do rodapé">
          <strong>Revisitar</strong>
          <Link href="/#rag">Recuperação RAG</Link>
          <Link href="/#mcp">Protocolo MCP</Link>
          <Link href="/#integracao">Caso integrado</Link>
        </nav>
        <nav aria-label="Informações do projeto">
          <strong>Projeto</strong>
          <Link href="/#fontes">Fontes</Link>
          <Link href="/#producao">Transparência</Link>
          <Link href="/creditos">
            Créditos <ArrowUpRight size={14} />
          </Link>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>Trabalho III · Engenharia de Prompts Aplicada à IA</span>
        <span>Demonstrações fictícias, processadas localmente.</span>
      </div>
    </footer>
  );
}
