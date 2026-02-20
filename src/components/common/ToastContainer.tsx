import { useEffect } from 'react';
import { useUiStore } from '@/store/uiStore';

export const ToastContainer = () => {
  const { toasts, removeToast } = useUiStore();

  useEffect(() => {
    const timers = toasts.map((toast) => setTimeout(() => removeToast(toast.id), 3000));
    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  return (
    <div className="fixed right-4 top-4 z-50 flex w-80 flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg p-3 text-white shadow ${
            toast.type === 'success' ? 'bg-emerald-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-slate-700'
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};
