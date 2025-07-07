import React from "react";
import { motion } from "framer-motion";
import {
  FaExclamationTriangle,
  FaRedo,
  FaHome,
  FaWifi,
  FaServer,
  FaShieldAlt,
} from "react-icons/fa";

interface ErrorDisplayProps {
  type?: "page" | "inline" | "card";
  error?: string | Error;
  title?: string;
  message?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  variant?: "network" | "server" | "unauthorized" | "general";
  showActions?: boolean;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  type = "inline",
  error,
  title,
  message,
  onRetry,
  onGoHome,
  variant = "general",
  showActions = true,
}) => {
  const getErrorInfo = () => {
    const errorMessage = error instanceof Error ? error.message : error;

    switch (variant) {
      case "network":
        return {
          icon: FaWifi,
          defaultTitle: "Mất kết nối",
          defaultMessage: "Kiểm tra kết nối internet và thử lại",
          color: "from-blue-500 to-cyan-600",
          iconColor: "text-blue-400",
        };
      case "server":
        return {
          icon: FaServer,
          defaultTitle: "Lỗi máy chủ",
          defaultMessage: "Máy chủ đang gặp sự cố, vui lòng thử lại sau",
          color: "from-red-500 to-pink-600",
          iconColor: "text-red-400",
        };
      case "unauthorized":
        return {
          icon: FaShieldAlt,
          defaultTitle: "Không có quyền truy cập",
          defaultMessage: "Bạn cần đăng nhập để xem nội dung này",
          color: "from-yellow-500 to-orange-600",
          iconColor: "text-yellow-400",
        };
      default:
        return {
          icon: FaExclamationTriangle,
          defaultTitle: "Có lỗi xảy ra",
          defaultMessage: errorMessage || "Đã xảy ra lỗi không mong muốn",
          color: "from-red-500 to-red-600",
          iconColor: "text-red-400",
        };
    }
  };

  const errorInfo = getErrorInfo();
  const IconComponent = errorInfo.icon;
  const displayTitle = title || errorInfo.defaultTitle;
  const displayMessage = message || errorInfo.defaultMessage;

  if (type === "page") {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        {/* Ultra Premium Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{
              background: `
                repeating-linear-gradient(
                  45deg,
                  rgba(239, 68, 68, 0.1) 0px,
                  rgba(239, 68, 68, 0.1) 2px,
                  transparent 2px,
                  transparent 20px
                )
              `,
            }}
          />

          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(circle at 20% 80%, rgba(239, 68, 68, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(220, 38, 127, 0.3) 0%, transparent 50%),
                linear-gradient(45deg, rgba(239, 68, 68, 0.1) 0%, transparent 25%, rgba(220, 38, 127, 0.1) 50%, transparent 75%, rgba(239, 68, 68, 0.1) 100%)
              `,
            }}
            animate={{
              backgroundPosition: [
                "20% 80%, 80% 20%, 0% 0%",
                "60% 60%, 20% 80%, 100% 100%",
                "20% 80%, 80% 20%, 0% 0%",
              ],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Error Content */}
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 200,
              duration: 0.8,
            }}
          >
            <motion.div
              className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${errorInfo.color} rounded-2xl flex items-center justify-center shadow-2xl`}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <IconComponent className={`text-white text-4xl`} />
            </motion.div>

            <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-4">
              {displayTitle}
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {displayMessage}
            </p>

            {showActions && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {onRetry && (
                  <motion.button
                    onClick={onRetry}
                    className={`group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r ${errorInfo.color} text-white font-bold rounded-2xl shadow-2xl transition-all duration-500`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaRedo className="text-xl group-hover:rotate-180 transition-transform duration-500" />
                    <span>Thử lại</span>
                  </motion.button>
                )}

                {onGoHome && (
                  <motion.button
                    onClick={onGoHome}
                    className="group flex items-center space-x-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white font-medium rounded-2xl border border-white/20 shadow-xl transition-all duration-500"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaHome className="text-xl group-hover:scale-110 transition-transform duration-300" />
                    <span>Về trang chủ</span>
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  if (type === "card") {
    return (
      <motion.div
        className="relative bg-gradient-to-br from-black/90 via-gray-900/95 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl"></div>

        <div className="relative z-10 text-center">
          <motion.div
            className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${errorInfo.color} rounded-2xl flex items-center justify-center shadow-xl`}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <IconComponent className="text-white text-2xl" />
          </motion.div>

          <h3 className="text-xl font-bold text-white mb-2">{displayTitle}</h3>

          <p className="text-gray-300 mb-6">{displayMessage}</p>

          {showActions && (onRetry || onGoHome) && (
            <div className="flex justify-center space-x-3">
              {onRetry && (
                <motion.button
                  onClick={onRetry}
                  className={`flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${errorInfo.color} text-white font-medium rounded-2xl shadow-xl transition-all duration-300`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaRedo className="text-sm" />
                  <span>Thử lại</span>
                </motion.button>
              )}

              {onGoHome && (
                <motion.button
                  onClick={onGoHome}
                  className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-2xl border border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaHome className="text-sm" />
                  <span>Trang chủ</span>
                </motion.button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // Default inline error
  return (
    <motion.div
      className="text-center py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-6xl mb-4"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        😞
      </motion.div>

      <h3 className="text-xl font-bold text-red-300 mb-2">{displayTitle}</h3>

      <p className="text-gray-400 mb-6">{displayMessage}</p>

      {showActions && onRetry && (
        <motion.button
          onClick={onRetry}
          className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${errorInfo.color} text-white rounded-2xl font-medium shadow-xl transition-all duration-300`}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaRedo className="text-sm" />
          <span>Thử lại</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default ErrorDisplay;
