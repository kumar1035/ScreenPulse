import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

export default function Toast({
  message,
  isVisible,
  onClose,
  type = "success",
  duration = 2500,
}) {
  // Auto close after duration
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  // Toast icon + colors based on type
  const styles = {
    success: {
      icon: <CheckCircle2 className="w-4 h-4" />,
      color: "text-emerald-500 bg-emerald-500/20",
    },
    error: {
      icon: <XCircle className="w-4 h-4" />,
      color: "text-red-500 bg-red-500/20",
    },
    info: {
      icon: <Info className="w-4 h-4" />,
      color: "text-blue-500 bg-blue-500/20",
    },
  };

  const current = styles[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]
            flex items-center gap-3 px-5 py-3 rounded-xl
            bg-surface/90 border border-white/10 backdrop-blur-xl
            shadow-2xl ring-1 ring-white/5 max-w-sm"
        >
          {/* Icon */}
          <div
            className={`flex items-center justify-center w-6 h-6 rounded-full ${current.color}`}
          >
            {current.icon}
          </div>

          {/* Message */}
          <span className="text-sm font-medium text-white truncate">
            {message}
          </span>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="ml-2 text-gray-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
