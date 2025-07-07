import React from "react";
import { motion } from "framer-motion";

const FootballFieldLoader: React.FC<{ message?: string }> = ({
  message = "Đang tải dữ liệu sân bóng...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8 min-h-[400px]">
      {/* Enhanced Football Field + Ball */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", damping: 20 }}
      >
        {/* Outer glow effect */}
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-emerald-500/20 rounded-2xl blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Football Field */}
        <motion.div
          className="relative w-40 h-56 bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-2xl shadow-2xl border-4 border-white/90 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", damping: 15 }}
        >
          {/* Field texture pattern */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_2px,transparent_2px,transparent_8px)]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_2px,transparent_2px,transparent_12px)]" />

          {/* Center line */}
          <motion.div
            className="absolute top-1/2 left-0 w-full h-1 bg-white shadow-sm"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          {/* Center circle */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-16 h-16 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-inner"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 0.8, duration: 1.2, type: "spring" }}
          />

          {/* Goal areas */}
          <motion.div
            className="absolute top-2 left-1/2 w-12 h-8 border-2 border-white border-b-0 -translate-x-1/2 rounded-t-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          />
          <motion.div
            className="absolute bottom-2 left-1/2 w-12 h-8 border-2 border-white border-t-0 -translate-x-1/2 rounded-b-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          />

          {/* Corner arcs */}
          {[
            { top: 0, left: 0, rotation: 0 },
            { top: 0, right: 0, rotation: 90 },
            { bottom: 0, left: 0, rotation: 270 },
            { bottom: 0, right: 0, rotation: 180 },
          ].map((corner, index) => (
            <motion.div
              key={index}
              className="absolute w-4 h-4 border-2 border-white rounded-full"
              style={{
                ...corner,
                transform: `rotate(${corner.rotation}deg)`,
                borderBottomColor: "transparent",
                borderRightColor: "transparent",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
            />
          ))}

          {/* Animated Football */}
          <motion.div
            className="absolute left-1/2 top-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 z-10"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-full h-full bg-white rounded-full shadow-lg border-[3px] border-black relative overflow-hidden">
              {/* Football pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full" />
              </div>
              <div className="absolute top-1 left-1/2 w-4 h-0.5 bg-black -translate-x-1/2 rounded" />
              <div className="absolute bottom-1 left-1/2 w-4 h-0.5 bg-black -translate-x-1/2 rounded" />
              <div className="absolute left-1 top-1/2 w-0.5 h-4 bg-black -translate-y-1/2 rounded" />
              <div className="absolute right-1 top-1/2 w-0.5 h-4 bg-black -translate-y-1/2 rounded" />
            </div>
          </motion.div>

          {/* Particle effects */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Loading Message */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.p
          className="text-lg font-semibold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            backgroundSize: "200% 100%",
          }}
        >
          {message}
        </motion.p>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-emerald-200/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          >
            ⚽
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FootballFieldLoader;
