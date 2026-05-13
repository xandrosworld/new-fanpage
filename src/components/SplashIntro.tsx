"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function SplashIntro() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      queueMicrotask(() => setIsVisible(false));
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem("hasSeenIntro", "true");
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background text-foreground"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(17_88%_64%/0.12),transparent_34%),linear-gradient(245deg,hsl(205_92%_67%/0.1),transparent_38%)]" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:44px_44px]" />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center px-6 text-center"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.05] text-primary shadow-[0_20px_70px_hsl(17_88%_64%/0.2)]">
              <Sparkles className="h-7 w-7" />
            </div>

            <h1 className="display-title mb-3 text-4xl md:text-6xl">
              MXH Resource Hub
            </h1>
            <p className="max-w-xl text-sm font-semibold text-muted-foreground md:text-base">
              Source code, reels, nhiệm vụ và cộng đồng creator trong một không gian boutique.
            </p>

            <div className="mt-9 h-1.5 w-64 overflow-hidden rounded-[4px] border border-white/10 bg-white/[0.05]">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.45, ease: "easeInOut" }}
                className="h-full bg-[linear-gradient(90deg,hsl(17_88%_64%),hsl(348_66%_48%),hsl(205_92%_67%))]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
