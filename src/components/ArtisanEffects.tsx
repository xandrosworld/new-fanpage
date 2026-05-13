"use client";

import { useEffect } from "react";

export function ArtisanEffects() {
  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const spotlight = target.closest<HTMLElement>("[data-spotlight]");
      if (spotlight) {
        const rect = spotlight.getBoundingClientRect();
        spotlight.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
        spotlight.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
        spotlight.style.setProperty("--spotlight-hue", spotlight.dataset.hue || "174");
      }

      const magnetic = target.closest<HTMLElement>("[data-magnetic]");
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.2;
        magnetic.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const magnetic = target.closest<HTMLElement>("[data-magnetic]");
      if (!magnetic) return;

      const nextTarget = event.relatedTarget;
      if (!(nextTarget instanceof Node) || !magnetic.contains(nextTarget)) {
        magnetic.style.transform = "";
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
    };
  }, []);

  return null;
}
