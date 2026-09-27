import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "rag" | "mcp";
}) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}
