import React from "react";
import { motion } from "framer-motion";
import { FaFootballBall, FaSpinner } from "react-icons/fa";
import { MdSportsSoccer } from "react-icons/md";

interface LoadingSpinnerProps {
  type?: "page" | "inline" | "button";
  message?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "football" | "soccer" | "spinner" | "dots";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  type = "inline",
  message = "Đang tải...",
  size = "md",
  variant = "football",
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          container: "w-8 h-8",
          text: "text-sm",
          icon: "text-lg",
        };
      case "md":
        return {
          container: "w-12 h-12",
          text: "text-base",
          icon: "text-xl",
        };
      case "lg":
        return {
          container: "w-16 h-16",
          text: "text-lg",
          icon: "text-2xl",
        };
      case "xl":
        return {
          container: "w-24 h-24",
          text: "text-xl",
          icon: "text-4xl",
        };
      default:
        return {
          container: "w-12 h-12",
          text: "text-base",
          icon: "text-xl",
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const renderSpinner = () => {
    switch (variant) {
      case "football":
        return (
          <motion.div
            className={`${sizeClasses.container} bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center shadow-2xl`}
            animate={{
              rotateY: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotateY: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity },
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <FaFootballBall className={`text-white ${sizeClasses.icon}`} />
          </motion.div>
        );

      case "soccer":
        return (
          <motion.div
            className={`${sizeClasses.container} bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl`}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity },
            }}
          >
            <MdSportsSoccer className={`text-white ${sizeClasses.icon}`} />
          </motion.div>
        );

      case "spinner":
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FaSpinner className={`text-emerald-400 ${sizeClasses.icon}`} />
          </motion.div>
        );

      case "dots":
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        );

      default:
        return renderSpinner();
    }
  };

  if (type === "page") {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex justify-center items-center">
        {/* Ultra Premium Loading Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.4) 0%, transparent 50%),
                linear-gradient(45deg, rgba(6, 182, 212, 0.1) 0%, transparent 25%, rgba(16, 185, 129, 0.1) 50%, transparent 75%, rgba(34, 197, 94, 0.1) 100%)
              `,
            }}
            animate={{
              backgroundPosition: [
                "20% 80%, 80% 20%, 0% 0%",
                "60% 60%, 20% 80%, 100% 100%",
                "20% 80%, 80% 20%, 0% 0%",
              ],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30 - Math.random() * 20, 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1 + Math.random() * 0.5, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Loading Content */}
        <div className="relative z-10 text-center">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {renderSpinner()}
          </motion.div>

          <motion.p
            className={`text-white font-bold ${sizeClasses.text}`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.p>
        </div>
      </div>
    );
  }

  if (type === "button") {
    return (
      <div className="flex items-center justify-center space-x-2">
        {renderSpinner()}
        {message && (
          <span className={`text-white font-medium ${sizeClasses.text}`}>
            {message}
          </span>
        )}
      </div>
    );
  }

  // Default inline spinner
  return (
    <div className="flex items-center justify-center space-x-3 p-8">
      {renderSpinner()}
      {message && (
        <motion.p
          className={`text-gray-300 font-medium ${sizeClasses.text}`}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;
