import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: "./fonts/fraunces.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "100 900",
});
const body = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-400.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-sans-600.woff2", weight: "600" },
  ],
  variable: "--font-body",
  display: "swap",
});
const mono = localFont({
  src: "./fonts/jetbrains-mono.woff2",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RAG + MCP Lab | Trabalho III — Engenharia de Prompts",
  description:
    "Experiência educacional interativa sobre Retrieval-Augmented Generation, Model Context Protocol e como as duas abordagens podem trabalhar juntas.",
  openGraph: {
    title: "RAG + MCP Lab",
    description:
      "Um laboratório didático sobre evidências, integrações e aplicações de IA.",
    locale: "pt_BR",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-theme="system"
      data-motion="system"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
