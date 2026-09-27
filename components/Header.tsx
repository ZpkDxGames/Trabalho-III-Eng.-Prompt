"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  Menu,
  Settings2,
  X,
  Sun,
  Moon,
  Monitor,
  ArrowUpRight,
} from "lucide-react";
import { navigation } from "@/data/content";

type Theme = "system" | "light" | "dark";

const subscribeSettings = (callback: () => void) => {
  window.addEventListener("lab-settings", callback);
  return () => window.removeEventListener("lab-settings", callback);
};

function readTheme(): Theme {
  const value = localStorage.getItem("lab-theme");
  return value === "light" || value === "dark" ? value : "system";
}

function writeSetting(key: string, value: string) {
  localStorage.setItem(key, value);
  if (key === "lab-theme") document.documentElement.dataset.theme = value;
  if (key === "lab-reduced-motion")
    document.documentElement.dataset.motion =
      value === "true" ? "reduced" : "system";
  window.dispatchEvent(new Event("lab-settings"));
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const theme = useSyncExternalStore(
    subscribeSettings,
    readTheme,
    () => "system" as Theme,
  );
  const reduced = useSyncExternalStore(
    subscribeSettings,
    () => localStorage.getItem("lab-reduced-motion") === "true",
    () => false,
  );
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("inicio");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.motion = reduced ? "reduced" : "system";
    window.dispatchEvent(new Event("lab-settings"));
  }, [theme, reduced]);

  useEffect(() => {
    const update = () => {
      const size = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(
        size > 0
          ? Math.min(100, Math.max(0, (window.scrollY / size) * 100))
          : 0,
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: [0, 0.2, 0.5] },
    );
    navigation.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <div className="header-shell">
          <Link
            href="/#inicio"
            className="wordmark"
            aria-label="RAG + MCP Lab, voltar ao início"
          >
            <span className="brand-symbol" aria-hidden="true">
              <i />
              <i />
            </span>
            <span>
              RAG <b>+</b> MCP <em>Lab</em>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Seções do site">
            {navigation
              .filter(({ id }) =>
                [
                  "inicio",
                  "rag",
                  "mcp",
                  "comparacao",
                  "integracao",
                  "fontes",
                ].includes(id),
              )
              .map((item) => (
                <a
                  key={item.id}
                  className={active === item.id ? "is-active" : ""}
                  href={`/#${item.id}`}
                >
                  {item.label}
                </a>
              ))}
            <Link href="/creditos">Créditos</Link>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              type="button"
              aria-label="Abrir configurações"
              aria-expanded={settingsOpen}
              onClick={() => {
                setSettingsOpen(!settingsOpen);
                setMenuOpen(false);
              }}
            >
              <Settings2 size={19} />
            </button>
            <button
              className="icon-button mobile-toggle"
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              onClick={() => {
                setMenuOpen(!menuOpen);
                setSettingsOpen(false);
              }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="menu-mobile"
            className="mobile-nav"
            aria-label="Navegação móvel"
          >
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link href="/creditos" onClick={() => setMenuOpen(false)}>
              Créditos <ArrowUpRight size={16} />
            </Link>
          </nav>
        )}
        {settingsOpen && (
          <div
            className="settings-panel"
            role="group"
            aria-label="Configurações da página"
          >
            <div className="settings-panel__top">
              <strong>Preferências de leitura</strong>
              <button
                type="button"
                className="icon-button"
                aria-label="Fechar configurações"
                onClick={() => setSettingsOpen(false)}
              >
                <X size={17} />
              </button>
            </div>
            <p>Estas escolhas ficam salvas neste navegador.</p>
            <fieldset>
              <legend>Aparência</legend>
              <div className="settings-options">
                {(
                  [
                    ["system", "Sistema", Monitor],
                    ["light", "Claro", Sun],
                    ["dark", "Escuro", Moon],
                  ] as const
                ).map(([value, label, Icon]) => (
                  <button
                    className={theme === value ? "selected" : ""}
                    type="button"
                    key={value}
                    aria-pressed={theme === value}
                    onClick={() => writeSetting("lab-theme", value)}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="motion-toggle">
              <span>
                <strong>Reduzir animações</strong>
                <small>Desativa movimento não essencial.</small>
              </span>
              <input
                type="checkbox"
                checked={reduced}
                onChange={(event) =>
                  writeSetting(
                    "lab-reduced-motion",
                    String(event.target.checked),
                  )
                }
              />
            </label>
          </div>
        )}
        <span
          className="reading-progress"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </header>
    </>
  );
}
