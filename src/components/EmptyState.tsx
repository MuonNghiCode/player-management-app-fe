import React from "react";
import { motion } from "framer-motion";
import {
  FaComments,
  FaSearch,
  FaFutbol,
  FaPlus,
  FaInbox,
} from "react-icons/fa";

interface EmptyStateProps {
  type?: "comments" | "players" | "search" | "general";
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type = "general",
  title,
  message,
  actionText,
  onAction,
  icon,
  size = "md",
}) => {
  const getEmptyStateInfo = () => {
    switch (type) {
      case "comments":
        return {
          icon: FaComments,
          emoji: "💬",
          defaultTitle: "Chưa có bình luận nào",
          defaultMessage:
            "Bạn chưa bình luận về cầu thủ nào. Hãy khám phá và chia sẻ ý kiến của bạn!",
          defaultActionText: "Khám phá cầu thủ",
          color: "from-emerald-500 to-teal-600",
          bgGradient: "from-emerald-500/10 to-teal-500/10",
        };
      case "players":
        return {
          icon: FaFutbol,
          emoji: "⚽",
          defaultTitle: "Không tìm thấy cầu thủ",
          defaultMessage:
            "Không có cầu thủ nào phù hợp với tiêu chí tìm kiếm của bạn.",
          defaultActionText: "Xem tất cả",
          color: "from-blue-500 to-cyan-600",
          bgGradient: "from-blue-500/10 to-cyan-500/10",
        };
      case "search":
        return {
          icon: FaSearch,
          emoji: "🔍",
          defaultTitle: "Không tìm thấy kết quả",
          defaultMessage:
            "Thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc.",
          defaultActionText: "Đặt lại tìm kiếm",
          color: "from-purple-500 to-pink-600",
          bgGradient: "from-purple-500/10 to-pink-500/10",
        };
      default:
        return {
          icon: FaInbox,
          emoji: "📭",
          defaultTitle: "Không có dữ liệu",
          defaultMessage: "Hiện tại chưa có dữ liệu để hiển thị.",
          defaultActionText: "Tải lại",
          color: "from-gray-500 to-gray-600",
          bgGradient: "from-gray-500/10 to-gray-600/10",
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          container: "py-8",
          emoji: "text-4xl",
          title: "text-lg",
          message: "text-sm",
          button: "px-4 py-2 text-sm",
        };
      case "lg":
        return {
          container: "py-20",
          emoji: "text-8xl",
          title: "text-3xl",
          message: "text-lg",
          button: "px-8 py-4 text-lg",
        };
      default:
        return {
          container: "py-16",
          emoji: "text-6xl",
          title: "text-2xl",
          message: "text-base",
          button: "px-6 py-3 text-base",
        };
    }
  };

  const emptyInfo = getEmptyStateInfo();
  const sizeClasses = getSizeClasses();
  const IconComponent = icon || emptyInfo.icon;
  const displayTitle = title || emptyInfo.defaultTitle;
  const displayMessage = message || emptyInfo.defaultMessage;
  const displayActionText = actionText || emptyInfo.defaultActionText;

  return (
    <motion.div
      className={`text-center ${sizeClasses.container}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated Icon/Emoji */}
      <motion.div
        className="relative mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 200,
          delay: 0.2,
        }}
      >
        {icon ? (
          <motion.div
            className={`w-20 h-20 mx-auto bg-gradient-to-br ${emptyInfo.color} rounded-2xl flex items-center justify-center shadow-2xl`}
            animate={{
              scale: [1, 1.1, 1],
              rotateY: [0, 180, 360],
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity },
              rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {typeof IconComponent === "function" ? (
              <IconComponent className="text-white text-3xl" />
            ) : (
              IconComponent
            )}
          </motion.div>
        ) : (
          <motion.div
            className={sizeClasses.emoji}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {emptyInfo.emoji}
          </motion.div>
        )}

        {/* Subtle background glow */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${emptyInfo.bgGradient} rounded-full blur-2xl opacity-50 -z-10`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      {/* Title */}
      <motion.h3
        className={`font-bold text-gray-300 mb-4 ${sizeClasses.title}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {displayTitle}
      </motion.h3>

      {/* Message */}
      <motion.p
        className={`text-gray-400 mb-8 max-w-md mx-auto leading-relaxed ${sizeClasses.message}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {displayMessage}
      </motion.p>

      {/* Action Button */}
      {onAction && (
        <motion.button
          onClick={onAction}
          className={`bg-gradient-to-r ${emptyInfo.color} text-white font-medium rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 mx-auto ${sizeClasses.button}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{
            scale: 1.05,
            y: -2,
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus className="text-sm" />
          <span>{displayActionText}</span>
        </motion.button>
      )}

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default EmptyState;
