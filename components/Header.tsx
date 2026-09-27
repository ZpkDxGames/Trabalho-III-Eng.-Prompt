"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
import { useMotionPreference } from "@/lib/useMotionPreference";

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
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const manualReducedMotion = useMotionPreference();
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
  const [active, setActive] = useState<string>("inicio");
  const [scrolled, setScrolled] = useState(false);
  const activeIndex = navigation.findIndex((item) => item.id === active);
  const currentLabel =
    pathname === "/creditos"
      ? "Créditos"
      : (navigation[activeIndex]?.label ?? "Início");
  const currentNumber =
    pathname === "/creditos" ? "—" : String(activeIndex + 1).padStart(2, "0");
  const reduceMotion = prefersReducedMotion || manualReducedMotion;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.motion = reduced ? "reduced" : "system";
    window.dispatchEvent(new Event("lab-settings"));
  }, [theme, reduced]);

  useEffect(() => {
    let frame = 0;
    const sections =
      pathname === "/"
        ? navigation.map(({ id }) => document.getElementById(id))
        : [];
    const update = () => {
      const size = document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        size > 0 ? Math.min(1, Math.max(0, window.scrollY / size)) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
      setScrolled(window.scrollY > 48);

      if (pathname !== "/") return;
      const marker = Math.min(180, window.innerHeight * 0.3);
      let current = 0;
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= marker) {
          current = index;
        }
      });
      if (progress >= 0.995) current = navigation.length - 1;
      setActive(navigation[current].id);
    };
    const scheduleUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen && !settingsOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
        setSettingsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (settingsOpen) settingsButtonRef.current?.focus();
      if (menuOpen) menuButtonRef.current?.focus();
      setMenuOpen(false);
      setSettingsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, settingsOpen]);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header
        ref={headerRef}
        className={`site-header${scrolled ? " site-header--scrolled" : ""}${menuOpen || settingsOpen ? " site-header--panel-open" : ""}`}
      >
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
                  className={
                    pathname === "/" && active === item.id ? "is-active" : ""
                  }
                  aria-current={
                    pathname === "/" && active === item.id
                      ? "location"
                      : undefined
                  }
                  href={`/#${item.id}`}
                >
                  {item.label}
                </a>
              ))}
            <Link
              href="/creditos"
              className={pathname === "/creditos" ? "is-active" : ""}
              aria-current={pathname === "/creditos" ? "page" : undefined}
            >
              Créditos
            </Link>
          </nav>
          <div
            className="header-context"
            aria-label={`Seção atual: ${currentLabel}`}
          >
            <span className="header-context__dot" aria-hidden="true" />
            <span className="header-context__label">{currentLabel}</span>
            <span className="header-context__number" aria-hidden="true">
              {currentNumber} /{" "}
              {pathname === "/creditos" ? "—" : navigation.length}
            </span>
          </div>
          <div className="header-actions">
            <button
              ref={settingsButtonRef}
              className="icon-button"
              type="button"
              aria-label="Abrir configurações"
              aria-expanded={settingsOpen}
              aria-controls="settings-panel"
              onClick={() => {
                setSettingsOpen(!settingsOpen);
                setMenuOpen(false);
              }}
            >
              <Settings2 size={19} />
            </button>
            <button
              ref={menuButtonRef}
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
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.nav
              id="menu-mobile"
              className="mobile-nav"
              aria-label="Navegação móvel"
              aria-hidden={!menuOpen}
              inert={!menuOpen}
              initial={
                reduceMotion ? false : { opacity: 0, y: -9, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -7, scale: 0.98 }
              }
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
            >
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  className={
                    pathname === "/" && active === item.id ? "is-active" : ""
                  }
                  aria-current={
                    pathname === "/" && active === item.id
                      ? "location"
                      : undefined
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/creditos"
                className={pathname === "/creditos" ? "is-active" : ""}
                aria-current={pathname === "/creditos" ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                Créditos <ArrowUpRight size={16} />
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {settingsOpen && (
            <motion.div
              id="settings-panel"
              className="settings-panel"
              role="group"
              aria-label="Configurações da página"
              aria-hidden={!settingsOpen}
              inert={!settingsOpen}
              initial={
                reduceMotion ? false : { opacity: 0, y: -9, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -7, scale: 0.98 }
              }
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
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
            </motion.div>
          )}
        </AnimatePresence>
        <span
          ref={progressRef}
          className="reading-progress"
          aria-hidden="true"
        />
      </header>
    </>
  );
}
