import { createContext, useCallback, useContext, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const ACCENT = {
  success: "text-olive border-olive/50",
  error: "text-alert border-alert/50",
  info: "text-amber border-amber/50",
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (type, message) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => dismiss(id), 4200);
    },
    [dismiss]
  );

  const toast = {
    success: (m) => push("success", m),
    error: (m) => push("error", m),
    info: (m) => push("info", m),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Toast stack — bottom-right, above everything */}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[120] flex w-[min(92vw,360px)] flex-col gap-3">
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const Icon = ICONS[t.type];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className={`pointer-events-auto relative overflow-hidden rounded-md border bg-ink-850/95 px-4 py-3 shadow-panel backdrop-blur ${ACCENT[t.type]}`}
              >
                <div className="flex items-start gap-3">
                  <Icon size={18} className="mt-0.5 shrink-0" />
                  <p className="flex-1 font-body text-sm text-ink-100">{t.message}</p>
                  <button
                    onClick={() => dismiss(t.id)}
                    className="text-ink-400 transition hover:text-ink-100"
                    aria-label="Dismiss notification"
                  >
                    <X size={15} />
                  </button>
                </div>
                {/* Countdown bar */}
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 4.2, ease: "linear" }}
                  className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-current opacity-60"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
