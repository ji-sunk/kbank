import React, { createContext, useContext, useMemo, useState } from "react";

type Toast = { id: number; message: string };
type ToastCtx = { push: (msg: string, duration?: number) => void };

const Ctx = createContext<ToastCtx | null>(null);

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("ToastProvider로 감싸주세요.");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const api = useMemo<ToastCtx>(
    () => ({
      push(message: string, duration = 2200) {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message }]);
        window.setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      },
    }),
    []
  );

  return (
    <Ctx.Provider value={api}>
      {children}
      <div className="toast-stack" aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <div key={t.id} className="toast-item">
            {t.message}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
