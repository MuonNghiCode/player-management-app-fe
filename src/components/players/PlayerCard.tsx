import React from "react";
import { motion } from "framer-motion";
import {
  FaCrown,
  FaUsers,
  FaComments,
  FaDollarSign,
  FaEye,
  FaStar,
  FaFire,
  FaGem,
  FaBolt,
} from "react-icons/fa";
import type { Player } from "../../types";
import { Link } from "react-router";

interface PlayerCardProps {
  player: Player;
}
const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent click if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      target.closest("a") ||
      target.closest("button")
    ) {
      return;
    }
    // Navigate to player detail page
    window.location.href = `/players/${player._id}`;
  };

  return (
    <motion.div
      className="group relative bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleCardClick}
    >
      {/* Premium Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative flex flex-col h-full">
        {/* Premium Image Container */}
        <div className="relative overflow-hidden flex-shrink-0">
          <motion.img
            src={player.image}
            alt={player.playerName}
            className="w-full h-48 sm:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${player.playerName}&size=400&background=10b981&color=ffffff&bold=true`;
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
          />

          {/* Premium Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Captain Badge - Premium Design */}
          {player.isCaptain && (
            <motion.div
              className="absolute top-3 right-3 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600 text-white px-3 py-1.5 rounded-xl text-xs font-black flex items-center space-x-1.5 shadow-lg backdrop-blur-sm border border-white/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaCrown className="text-sm" />
              </motion.div>
              <span>Đội trưởng</span>
            </motion.div>
          )}

          {/* Premium Price Tag */}
          <motion.div
            className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-sm font-bold flex items-center space-x-1.5 border border-white/20"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <FaDollarSign className="text-green-400" />
            <span>${player.cost.toLocaleString()}</span>
          </motion.div>

          {/* Elite Badge */}
          <motion.div
            className="absolute top-3 left-3 bg-gradient-to-br from-purple-500 to-pink-600 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center space-x-1"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
            <FaGem className="text-xs" />
            <span>ELITE</span>
          </motion.div>

          {/* Hover Action Overlay - Clickable */}
          <Link
            to={`/players/${player._id}`}
            className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-emerald-600/90 via-teal-600/50 to-transparent flex items-center justify-center cursor-pointer"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.div
                className="text-center text-white pointer-events-none"
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <FaEye className="text-2xl sm:text-3xl mx-auto mb-2" />
                <span className="text-sm font-bold">Xem chi tiết</span>
              </motion.div>
            </motion.div>
          </Link>
        </div>

        {/* Premium Content Section */}
        <div className="p-4 sm:p-6 relative z-10 flex-1 flex flex-col">
          {/* Player Name with Animation */}
          <motion.h3
            className="font-black text-lg sm:text-xl text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {player.playerName || "Chưa có tên cầu thủ"}
          </motion.h3>

          {/* Team Info with Premium Design */}
          <motion.div
            className="flex items-center text-gray-600 mb-4 group-hover:text-teal-600 transition-colors duration-300"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
              <FaUsers className="text-white text-sm" />
            </div>
            <span className="font-semibold text-sm sm:text-base">
              {player.team?.teamName || "Chưa có đội"}
            </span>
          </motion.div>

          {/* Player Description */}
          <motion.div
            className="flex-1 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors duration-300 h-16 overflow-hidden">
              {player.information ||
                "Chưa có thông tin. Hãy cập nhật thông tin cho cầu thủ này để khám phá thêm nhiều điều thú vị!"}
            </p>
          </motion.div>

          {/* Premium Footer Section */}
          <div className="mt-auto">
            <motion.div
              className="flex justify-between items-center pt-4 border-t border-gray-100 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {/* Comments Section */}
              <div className="flex items-center space-x-2 text-gray-500 group-hover:text-emerald-600 transition-colors duration-300">
                <div className="w-7 h-7 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-emerald-100 group-hover:to-teal-100 rounded-lg flex items-center justify-center transition-all duration-300">
                  <FaComments className="text-xs" />
                </div>
                <span className="text-sm font-semibold">
                  {player.commentCount || 0} bình luận
                </span>
              </div>

              {/* Premium CTA Button */}
              <Link
                to={`/players/${player._id}`}
                className="inline-block"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-700 text-white rounded-xl sm:rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-sm relative overflow-hidden group/button"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000"></div>

                  <FaBolt className="relative z-10" />
                  <span className="relative z-10">Xem chi tiết</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Premium Performance Indicators */}
            <motion.div
              className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {[
                { icon: FaStar, label: "Elite Status" },
                { icon: FaFire, label: "Hot Player" },
                { icon: FaBolt, label: "Fast Rising" },
              ].map((indicator, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-1 text-xs text-gray-400 group-hover:text-emerald-500 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <indicator.icon />
                  <span className="hidden sm:inline font-medium">
                    {indicator.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerCard;
