"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useMotionPreference } from "@/lib/useMotionPreference";

type QuestionPickerProps = {
  questions: readonly string[];
  selected: number;
  onSelect: (index: number) => void;
};

export function QuestionPicker({
  questions,
  selected,
  onSelect,
}: QuestionPickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const manualReducedMotion = useMotionPreference();
  const reduceMotion = prefersReducedMotion || manualReducedMotion;

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() =>
      optionsRef.current[selected]?.focus(),
    );
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, selected]);

  const focusOption = (index: number) => {
    optionsRef.current[(index + questions.length) % questions.length]?.focus();
  };

  return (
    <div
      className={`question-picker${open ? " question-picker--open" : ""}`}
      ref={rootRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        id="rag-question"
        ref={triggerRef}
        type="button"
        className="question-picker__trigger"
        aria-labelledby="rag-question-label rag-question-value"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? "rag-question-options" : undefined}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
            event.preventDefault();
            setOpen(true);
          }
          if (event.key === "Escape") setOpen(false);
        }}
      >
        <span className="question-picker__value" id="rag-question-value">
          <small>Exemplo {String(selected + 1).padStart(2, "0")}</small>
          <span>{questions[selected]}</span>
        </span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="rag-question-options"
            role="listbox"
            aria-labelledby="rag-question-label"
            aria-hidden={!open}
            inert={!open}
            className="question-picker__options"
            initial={reduceMotion ? false : { opacity: 0, y: -7, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: -5, scale: 0.98 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
          >
            {questions.map((question, index) => (
              <button
                key={question}
                ref={(element) => {
                  optionsRef.current[index] = element;
                }}
                type="button"
                role="option"
                aria-selected={selected === index}
                tabIndex={selected === index ? 0 : -1}
                className="question-picker__option"
                onClick={() => {
                  onSelect(index);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                    event.preventDefault();
                    focusOption(index + (event.key === "ArrowDown" ? 1 : -1));
                  } else if (event.key === "Home" || event.key === "End") {
                    event.preventDefault();
                    focusOption(
                      event.key === "Home" ? 0 : questions.length - 1,
                    );
                  } else if (event.key === "Escape") {
                    event.preventDefault();
                    setOpen(false);
                    triggerRef.current?.focus();
                  }
                }}
              >
                <span className="question-picker__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{question}</span>
                {selected === index && <Check size={17} aria-hidden="true" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
