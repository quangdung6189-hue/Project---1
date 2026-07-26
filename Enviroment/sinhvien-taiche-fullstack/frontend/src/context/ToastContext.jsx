import { createContext, useState, useCallback } from 'react';

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`max-w-sm w-full rounded-2xl px-4 py-3 shadow-xl text-sm font-medium text-white border cursor-pointer transition-all duration-300 ${
              toast.type === 'success'
                ? 'bg-emerald-600 border-emerald-700'
                : toast.type === 'error'
                ? 'bg-rose-600 border-rose-700'
                : 'bg-slate-700 border-slate-800'
            }`}
            onClick={() => removeToast(toast.id)}
          >
            <div className="flex items-center justify-between">
              <span>{toast.message}</span>
              <i className="fa-solid fa-xmark ml-2 text-white/60"></i>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

