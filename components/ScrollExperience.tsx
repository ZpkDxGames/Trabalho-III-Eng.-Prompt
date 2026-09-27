"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollExperience() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (
      !elements.length ||
      !window.IntersectionObserver ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      root.dataset.motion === "reduced"
    ) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );

    elements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
        element.classList.add("is-revealed");
      } else {
        observer.observe(element);
      }
    });
    root.dataset.scrollMotion = "ready";

    return () => {
      observer.disconnect();
      delete root.dataset.scrollMotion;
    };
  }, [pathname]);

  return null;
}
