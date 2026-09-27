import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { RagSimulator } from "@/components/RagSimulator";
import { McpExplorer } from "@/components/McpExplorer";
import { ComparisonMatrix } from "@/components/ComparisonMatrix";
import { IntegrationFlow } from "@/components/IntegrationFlow";
import { ArchitectureExplorer } from "@/components/ArchitectureExplorer";
import { SecurityMatrix } from "@/components/SecurityMatrix";
import { TransparencyTable } from "@/components/TransparencyTable";
import { SourcesSection } from "@/components/SourcesSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <ProblemSection />
        <RagSimulator />
        <McpExplorer />
        <ComparisonMatrix />
        <IntegrationFlow />
        <ArchitectureExplorer />
        <SecurityMatrix />
        <TransparencyTable />
        <SourcesSection />
      </main>
      <Footer />
    </>
  );
}
