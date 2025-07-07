import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle, FaSpinner } from "react-icons/fa";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  type?: "danger" | "warning" | "info";
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  onConfirm,
  onCancel,
  isLoading = false,
  type = "danger",
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          iconColor: "text-red-400",
          buttonClass:
            "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
          glowClass: "shadow-red-500/25",
        };
      case "warning":
        return {
          iconColor: "text-yellow-400",
          buttonClass:
            "from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700",
          glowClass: "shadow-yellow-500/25",
        };
      case "info":
        return {
          iconColor: "text-blue-400",
          buttonClass:
            "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
          glowClass: "shadow-blue-500/25",
        };
      default:
        return {
          iconColor: "text-red-400",
          buttonClass:
            "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
          glowClass: "shadow-red-500/25",
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Ultra Premium Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onCancel}
          >
            {/* Premium Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  background: `
                    repeating-linear-gradient(
                      45deg,
                      rgba(16, 185, 129, 0.05) 0px,
                      rgba(16, 185, 129, 0.05) 2px,
                      transparent 2px,
                      transparent 30px
                    )
                  `,
                }}
              />
            </div>

            {/* Modal Container */}
            <motion.div
              className="relative bg-gradient-to-br from-black/90 via-gray-900/95 to-black/90 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-md border border-white/10 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.4,
              }}
              onClick={(e) => e.stopPropagation()}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Title */}
                <motion.div
                  className="flex items-center mb-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div
                    className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center ${typeStyles.glowClass} shadow-xl`}
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <FaExclamationTriangle
                      className={`text-xl ${typeStyles.iconColor}`}
                    />
                  </motion.div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                      {title}
                    </h3>
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div
                  className="mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gray-300 leading-relaxed">{message}</p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex justify-end space-x-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Cancel Button */}
                  <motion.button
                    onClick={onCancel}
                    disabled={isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-medium rounded-2xl border border-gray-600 shadow-lg hover:shadow-gray-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {cancelText}
                  </motion.button>

                  {/* Confirm Button */}
                  <motion.button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className={`px-6 py-3 bg-gradient-to-r ${typeStyles.buttonClass} text-white font-bold rounded-2xl shadow-xl ${typeStyles.glowClass} transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2`}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <FaSpinner className="text-sm" />
                      </motion.div>
                    )}
                    <span>{isLoading ? "Đang xử lý..." : confirmText}</span>
                  </motion.button>
                </motion.div>
              </div>

              {/* Premium Border Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-transparent to-teal-500/20 opacity-50 blur-xl"></div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
