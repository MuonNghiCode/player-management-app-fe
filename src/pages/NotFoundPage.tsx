// src/pages/NotFoundPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaFootballBall, FaExclamationTriangle } from "react-icons/fa";
import { MdSportsSoccer } from "react-icons/md";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* eSports Football Field Pattern Overlay */}
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
                rgba(16, 185, 129, 0.1) 0px,
                rgba(16, 185, 129, 0.1) 2px,
                transparent 2px,
                transparent 20px
              ),
              repeating-linear-gradient(
                -45deg,
                rgba(20, 184, 166, 0.08) 0px,
                rgba(20, 184, 166, 0.08) 2px,
                transparent 2px,
                transparent 25px
              )
            `,
          }}
        />

        {/* Advanced animated gradient mesh */}
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.2) 0%, transparent 50%),
              linear-gradient(45deg, rgba(6, 182, 212, 0.1) 0%, transparent 25%, rgba(16, 185, 129, 0.1) 50%, transparent 75%, rgba(34, 197, 94, 0.1) 100%)
            `,
          }}
          animate={{
            backgroundPosition: [
              "20% 80%, 80% 20%, 40% 40%, 0% 0%",
              "60% 60%, 20% 80%, 80% 20%, 100% 100%",
              "20% 80%, 80% 20%, 40% 40%, 0% 0%",
            ],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Premium floating orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 lg:w-128 lg:h-128"
          animate={{
            scale: [1, 1.2, 1.1, 1],
            rotate: [0, 120, 240, 360],
            opacity: [0.1, 0.3, 0.2, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-emerald-400/20 via-teal-500/30 to-cyan-600/20 rounded-full blur-3xl"></div>
        </motion.div>

        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 lg:w-144 lg:h-144"
          animate={{
            scale: [1.1, 1, 1.2, 1.1],
            rotate: [360, 240, 120, 0],
            opacity: [0.2, 0.1, 0.3, 0.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-to-tr from-teal-400/20 via-emerald-500/30 to-green-600/20 rounded-full blur-3xl"></div>
        </motion.div>

        {/* Floating footballs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30 - Math.random() * 20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1 + Math.random() * 0.5, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          >
            <FaFootballBall className="text-white/30 text-xl" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* 404 Number with 3D Effect */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotateY: -180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 200,
            duration: 1.2,
          }}
        >
          <motion.h1
            className="text-8xl lg:text-9xl xl:text-[12rem] font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent leading-none"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              textShadow: [
                "0 0 20px rgba(16, 185, 129, 0.5)",
                "0 0 40px rgba(16, 185, 129, 0.8)",
                "0 0 20px rgba(16, 185, 129, 0.5)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: "200% 200%",
              filter: "drop-shadow(0 0 30px rgba(16, 185, 129, 0.3))",
            }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Warning Icon with Animation */}
        <motion.div
          className="flex items-center justify-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-500/30"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaExclamationTriangle className="text-white text-2xl" />
          </motion.div>
          <motion.span
            className="ml-4 text-2xl font-bold text-red-400"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Trọng tài thổi phạt!
          </motion.span>
        </motion.div>

        {/* Main Message */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
            Trang bạn tìm đã bị{" "}
            <motion.span
              className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              đá lạc ra ngoài sân
            </motion.span>
            .
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Có thể cầu thủ đánh sai đường dẫn, hoặc sân bạn tìm đã bị huỷ trận.
            Hãy quay lại sân chính để tiếp tục trận đấu!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {/* Home Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-500"
            >
              <FaHome className="text-xl group-hover:scale-110 transition-transform duration-300" />
              <span>Quay lại sân chính</span>
            </Link>
          </motion.div>

          {/* Secondary Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => window.history.back()}
              className="group flex items-center space-x-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white font-medium rounded-2xl border border-white/20 shadow-xl transition-all duration-500"
            >
              <MdSportsSoccer className="text-xl group-hover:rotate-180 transition-transform duration-500" />
              <span>Quay lại trang trước</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Fun Message */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.p
            className="text-gray-400 text-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ⚽ Đừng lo! Mọi cầu thủ đều từng đá hỏng penalty... ⚽
          </motion.p>
        </motion.div>
      </div>

      {/* Premium Border Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-transparent to-teal-500/10 opacity-50 blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default NotFoundPage;
