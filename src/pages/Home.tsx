import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaFutbol,
  FaStar,
  FaTrophy,
  FaUsers,
  FaChartLine,
  FaBolt,
} from "react-icons/fa";
import { playerService, teamService } from "../services";
import { DEBOUNCE_DELAYS } from "../constants";
import PlayerCard from "../components/players/PlayerCard";
import type { Player, Team } from "../types";

const Home: React.FC = () => {
  const [searchInput, setSearchInput] = useState(""); // Input value
  const [searchTerm, setSearchTerm] = useState(""); // Actual search term for API
  const [selectedTeam, setSelectedTeam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  // State for players
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);

  // State for teams
  const [teams, setTeams] = useState<Team[]>([]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
      setCurrentPage(1); // Reset to first page when searching
      setIsSearching(false); // Search completed
    }, DEBOUNCE_DELAYS.SEARCH), // Use constant delay
    []
  );

  // Effect to handle debounced search
  useEffect(() => {
    if (searchInput !== searchTerm) {
      setIsSearching(true); // Start searching
    }
    debouncedSearch(searchInput);

    // Cleanup function to cancel debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchInput, debouncedSearch, searchTerm]);

  // Fetch teams for filter
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await teamService.getAll();
        setTeams(response.data?.teams || []);
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };

    fetchTeams();
  }, []);

  // Fetch players with filters
  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await playerService.getAll({
          search: searchTerm,
          team: selectedTeam,
          page: currentPage,
          limit: 12,
        });
        setPlayers(response.data?.players || []);
        setPagination(response.data?.pagination);
      } catch (err: any) {
        setError(err.message || "Lỗi khi tải dữ liệu cầu thủ");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [searchTerm, selectedTeam, currentPage]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Ultra Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Advanced animated gradient mesh with neural network pattern */}
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
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
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Premium floating orbs with enhanced physics */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 sm:w-128 sm:h-128 lg:w-160 lg:h-160"
          animate={{
            scale: [1, 1.3, 1.1, 1],
            rotate: [0, 180, 270, 360],
            opacity: [0.2, 0.6, 0.4, 0.2],
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-emerald-400/30 via-teal-500/40 to-cyan-600/30 rounded-full blur-3xl"></div>
          <div className="absolute inset-12 bg-gradient-to-br from-emerald-300/20 to-teal-400/20 rounded-full blur-2xl"></div>
        </motion.div>

        <motion.div
          className="absolute bottom-16 left-16 w-64 h-64 sm:w-96 sm:h-96"
          animate={{
            scale: [1.2, 1, 1.3, 1.2],
            x: [0, 60, -20, 0],
            y: [0, -20, 15, 0],
            opacity: [0.15, 0.5, 0.3, 0.15],
            rotate: [0, -90, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-400/25 via-cyan-500/30 to-indigo-500/25 rounded-full blur-3xl"></div>
        </motion.div>

        <motion.div
          className="absolute top-1/4 left-1/2 w-48 h-48 sm:w-80 sm:h-80"
          animate={{
            y: [0, -40, 20, 0],
            scale: [1, 1.4, 0.8, 1],
            opacity: [0.1, 0.4, 0.2, 0.1],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-400/20 via-pink-500/25 to-rose-500/20 rounded-full blur-2xl"></div>
        </motion.div>

        {/* Enhanced neural network particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, rgba(255,255,255,${
                0.2 + Math.random() * 0.3
              }), rgba(16,185,129,${0.3 + Math.random() * 0.4}))`,
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
              delay: Math.random() * 6,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Premium connecting lines between particles */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {[...Array(8)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="url(#grad1)"
              strokeWidth="1"
              opacity="0.3"
              animate={{
                opacity: [0, 0.6, 0],
                strokeWidth: [0.5, 2, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.8)" />
              <stop offset="50%" stopColor="rgba(20,184,166,0.6)" />
              <stop offset="100%" stopColor="rgba(34,197,94,0.4)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Ultra Premium Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900/98 via-emerald-900/95 to-teal-900/98 backdrop-blur-3xl text-white overflow-hidden">
        {/* Ultra advanced animated patterns */}
        <div className="absolute inset-0 opacity-25">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.4) 0%, transparent 70%),
                radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.4) 0%, transparent 70%),
                radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.3) 0%, transparent 60%),
                conic-gradient(from 0deg at 50% 50%, rgba(16, 185, 129, 0.2) 0deg, transparent 120deg, rgba(20, 184, 166, 0.2) 240deg, transparent 360deg),
                linear-gradient(45deg, transparent 30%, rgba(34, 197, 94, 0.15) 50%, transparent 70%)
              `,
            }}
            animate={{
              backgroundPosition: [
                "25% 25%, 75% 75%, 50% 50%, 50% 50%, 0% 0%",
                "75% 75%, 25% 25%, 30% 70%, 50% 50%, 100% 100%",
                "50% 50%, 50% 50%, 70% 30%, 50% 50%, 50% 50%",
                "25% 25%, 75% 75%, 50% 50%, 50% 50%, 0% 0%",
              ],
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />

          {/* Neural network grid overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Ultra premium floating elements with physics */}
        <motion.div
          className="absolute top-12 right-12 sm:top-16 sm:right-16 w-28 h-28 sm:w-40 sm:h-40 lg:w-48 lg:h-48"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 0.9, 1],
            y: [0, -25, 15, 0],
            x: [0, 10, -10, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-white/15 via-emerald-500/25 to-teal-600/20 rounded-3xl sm:rounded-4xl backdrop-blur-xl border-2 border-white/20 shadow-2xl">
            <div className="absolute inset-3 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-2xl sm:rounded-3xl blur-lg"></div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-12 left-12 sm:bottom-16 sm:left-16 w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44"
          animate={{
            y: [0, -20, 10, 0],
            opacity: [0.4, 1, 0.6, 0.4],
            scale: [1, 1.2, 0.95, 1],
            rotate: [0, -15, 15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-teal-500/25 via-cyan-500/30 to-blue-500/25 rounded-full backdrop-blur-xl border-2 border-white/15 shadow-2xl">
            <div className="absolute inset-2 bg-white/10 rounded-full blur-sm"></div>
          </div>
        </motion.div>

        {/* Premium geometric shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-24 sm:h-24"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.5, 1, 1.5, 1],
            opacity: [0.2, 0.6, 0.3, 0.6, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-400/20 to-pink-500/20 transform rotate-45 border border-white/10 backdrop-blur-sm"></div>
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 xl:py-40 text-center relative z-10">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-16 sm:mb-20 lg:mb-24"
          >
            {/* Ultra Premium Logo Section */}
            <motion.div
              className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12 xl:space-x-16 mb-12 sm:mb-16 lg:mb-20"
              initial={{ scale: 0.3, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 1.5,
                type: "spring",
                stiffness: 100,
              }}
            >
              {/* Ultra Premium 3D Logo */}
              <motion.div
                className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 xl:w-52 xl:h-52"
                whileHover={{ scale: 1.15, rotate: 10 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {/* Main 3D logo container with multiple layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/40 via-teal-500/40 to-cyan-600/40 rounded-3xl sm:rounded-4xl xl:rounded-5xl backdrop-blur-2xl border-3 border-white/30 shadow-2xl transform-gpu">
                  {/* Inner premium glow layers */}
                  <div className="absolute inset-2 bg-gradient-to-br from-emerald-500/50 to-teal-600/50 rounded-2xl sm:rounded-3xl xl:rounded-4xl blur-xl"></div>
                  <div className="absolute inset-4 bg-gradient-to-br from-white/20 to-emerald-400/30 rounded-xl sm:rounded-2xl xl:rounded-3xl blur-lg"></div>
                  <div className="absolute inset-6 bg-white/10 rounded-lg sm:rounded-xl xl:rounded-2xl blur-md"></div>
                </div>

                {/* 3D Football icon with advanced animation */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    rotateY: [0, 360],
                    rotateX: [0, 15, -15, 0],
                    scale: [1, 1.08, 1.03, 1],
                  }}
                  transition={{
                    rotateY: { duration: 40, repeat: Infinity, ease: "linear" },
                    rotateX: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <FaFutbol className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white relative z-10 drop-shadow-2xl" />

                  {/* 3D shadow effect */}
                  <FaFutbol className="absolute text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-emerald-500/30 blur-sm transform translate-x-1 translate-y-1" />
                </motion.div>

                {/* Premium orbital particles */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-emerald-400 via-white to-teal-500 rounded-full shadow-lg"
                    style={{
                      left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 12)}%`,
                      top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 12)}%`,
                    }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 360],
                      x: [0, Math.cos((i * Math.PI * 2) / 12) * 10, 0],
                      y: [0, Math.sin((i * Math.PI * 2) / 12) * 10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.25,
                      ease: "easeInOut",
                    }}
                  />
                ))}

                {/* Ultra premium status badges */}
                <motion.div
                  className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl sm:rounded-3xl border-3 border-white/40 shadow-2xl backdrop-blur-sm"
                  animate={{
                    rotate: [0, 20, -20, 0],
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 20px rgba(251, 191, 36, 0.5)",
                      "0 0 40px rgba(251, 191, 36, 0.8)",
                      "0 0 20px rgba(251, 191, 36, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center justify-center h-full">
                    <FaTrophy className="text-white text-lg sm:text-2xl drop-shadow-lg" />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 rounded-xl sm:rounded-2xl border-2 border-white/30 shadow-xl backdrop-blur-sm"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <div className="flex items-center justify-center h-full">
                    <FaStar className="text-white text-sm sm:text-lg" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Ultra Premium Typography */}
              <div className="text-center lg:text-left">
                <motion.h1
                  className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl 2xl:text-10xl font-black tracking-tighter leading-none mb-4 lg:mb-6"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                >
                  <motion.span
                    className="block bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 0.5,
                    }}
                    style={{ backgroundSize: "200% 100%" }}
                  >
                    FOOTBALL
                  </motion.span>
                </motion.h1>

                {/* Dynamic subtitle with premium icons */}
                <motion.div
                  className="flex items-center justify-center lg:justify-start text-emerald-100 text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                >
                  <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent font-black">
                    Premium Sports Platform
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Ultra Premium Description */}
            <motion.div
              className="max-w-5xl lg:max-w-7xl mx-auto mb-12 sm:mb-16 lg:mb-20"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
            >
              <motion.p
                className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-emerald-50 leading-relaxed px-4 text-center"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                Khám phá thế giới bóng đá với{" "}
                <motion.span
                  className="font-black bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent"
                  style={{ backgroundSize: "200% 100%" }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  công nghệ AI tiên tiến
                </motion.span>
                , phân tích dữ liệu{" "}
                <motion.span
                  className="font-black bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent"
                  style={{ backgroundSize: "200% 100%" }}
                  animate={{
                    backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1,
                  }}
                >
                  real-time
                </motion.span>{" "}
                và trải nghiệm{" "}
                <motion.span
                  className="font-black bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent"
                  style={{ backgroundSize: "200% 100%" }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2,
                  }}
                >
                  immersive
                </motion.span>{" "}
                chưa từng có trong lịch sử bóng đá.
              </motion.p>
            </motion.div>

            {/* Ultra Premium Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 lg:space-x-12"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
            >
              {/* Primary Ultra Premium Button */}
              <motion.button
                className="group relative px-10 sm:px-16 lg:px-20 xl:px-24 py-5 sm:py-7 lg:py-8 overflow-hidden rounded-3xl sm:rounded-4xl font-black text-xl sm:text-2xl lg:text-3xl shadow-2xl transition-all duration-700"
                style={{
                  background:
                    "linear-gradient(135deg, #10b981 0%, #14b8a6 25%, #06b6d4 50%, #3b82f6 75%, #8b5cf6 100%)",
                  backgroundSize: "400% 400%",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  boxShadow:
                    "0 25px 50px rgba(16, 185, 129, 0.4), 0 0 100px rgba(20, 184, 166, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Multiple glow layers */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/60 via-teal-500/60 to-cyan-500/60 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/40 to-cyan-400/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Ultra premium shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Floating particles inside button */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/60 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0],
                      y: [0, -20, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    }}
                  />
                ))}

                <span className="relative z-10 flex items-center justify-center space-x-3 sm:space-x-4 text-white">
                  <FaBolt className="drop-shadow-lg" />
                  <span>Khám phá ngay</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.div>
                </span>
              </motion.button>

              {/* Secondary Ultra Premium Button */}
              <motion.button
                className="group relative px-8 sm:px-14 lg:px-18 xl:px-20 py-5 sm:py-7 lg:py-8 bg-white/8 hover:bg-white/15 text-white rounded-3xl sm:rounded-4xl font-bold text-xl sm:text-2xl lg:text-3xl border-2 border-white/30 hover:border-white/50 backdrop-blur-2xl shadow-2xl hover:shadow-white/20 transition-all duration-700 overflow-hidden"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glass morphism effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl sm:rounded-4xl border-2 border-transparent bg-gradient-to-r from-emerald-400/50 via-teal-500/50 to-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mask-border"></div>

                <span className="relative z-10 flex items-center justify-center space-x-3 sm:space-x-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <FaUsers className="drop-shadow-lg" />
                  </motion.div>
                  <span>Tham gia cộng đồng</span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Ultra Premium Stats Cards with Advanced 3D Effects */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-16 max-w-7xl mx-auto mt-16 sm:mt-20 lg:mt-24"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }}
          >
            {[
              {
                icon: FaUsers,
                number: "2.5K+",
                label: "Premium Players",
                color: "from-blue-500 via-cyan-500 to-blue-600",
                secondaryColor: "from-blue-400/50 to-cyan-500/50",
                glow: "blue-500/60",
                description: "Verified professionals",
                bgPattern:
                  "radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
              },
              {
                icon: FaTrophy,
                number: "150+",
                label: "Championships",
                color: "from-amber-500 via-orange-500 to-red-500",
                secondaryColor: "from-amber-400/50 to-orange-500/50",
                glow: "amber-500/60",
                description: "Tournament victories",
                bgPattern:
                  "radial-gradient(circle at 70% 70%, rgba(251, 191, 36, 0.3) 0%, transparent 70%)",
              },
              {
                icon: FaChartLine,
                number: "98%",
                label: "Success Rate",
                color: "from-purple-500 via-pink-500 to-purple-600",
                secondaryColor: "from-purple-400/50 to-pink-500/50",
                glow: "purple-500/60",
                description: "Performance analytics",
                bgPattern:
                  "radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 70%)",
              },
              {
                icon: FaStar,
                number: "24/7",
                label: "Premium Support",
                color: "from-emerald-500 via-teal-500 to-emerald-600",
                secondaryColor: "from-emerald-400/50 to-teal-500/50",
                glow: "emerald-500/60",
                description: "Premium assistance",
                bgPattern:
                  "radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="group relative text-center perspective-1000"
                initial={{ scale: 0.3, opacity: 0, y: 100, rotateY: 45 }}
                animate={{ scale: 1, opacity: 1, y: 0, rotateY: 0 }}
                transition={{
                  delay: 2 + index * 0.3,
                  duration: 1.2,
                  type: "spring",
                  stiffness: 80,
                }}
                whileHover={{
                  scale: 1.15,
                  y: -15,
                  rotateY: 5,
                  rotateX: 5,
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* 3D Card container with ultra premium effects */}
                <div className="relative p-8 sm:p-10 lg:p-12 backdrop-blur-3xl rounded-4xl border-2 border-white/20 shadow-2xl group-hover:shadow-4xl transition-all duration-700 overflow-hidden transform-gpu">
                  {/* Dynamic background pattern */}
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                    style={{ background: stat.bgPattern }}
                  />

                  {/* Advanced glassmorphism layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/3 to-transparent"></div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.secondaryColor} opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-xl`}
                  ></div>

                  {/* Premium border glow */}
                  <div
                    className={`absolute inset-0 rounded-4xl border-2 border-transparent bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-50 transition-opacity duration-700`}
                    style={{
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "xor",
                    }}
                  />

                  {/* Ultra Premium 3D Icon Container */}
                  <motion.div
                    className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 mx-auto mb-6 sm:mb-8"
                    whileHover={{
                      scale: 1.2,
                    }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* 3D Icon background with multiple layers */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl shadow-2xl transform-gpu`}
                    >
                      <div className="absolute inset-1 bg-white/20 rounded-2xl blur-lg"></div>
                      <div className="absolute inset-2 bg-white/10 rounded-xl blur-md"></div>
                      <div className="absolute inset-3 bg-gradient-to-br from-white/30 to-transparent rounded-lg"></div>
                    </div>

                    {/* Static 3D icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <stat.icon className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white relative z-10 drop-shadow-2xl" />
                    </div>

                    {/* Orbital premium particles with 3D effect */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-white via-emerald-300 to-white rounded-full shadow-lg"
                        style={{
                          left: `${50 + 50 * Math.cos((i * Math.PI * 2) / 8)}%`,
                          top: `${50 + 50 * Math.sin((i * Math.PI * 2) / 8)}%`,
                        }}
                        animate={{
                          scale: [0, 1.8, 0],
                          opacity: [0, 1, 0],
                          rotateZ: [0, 360],
                          x: [0, Math.cos((i * Math.PI * 2) / 8) * 15, 0],
                          y: [0, Math.sin((i * Math.PI * 2) / 8) * 15, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeInOut",
                        }}
                      />
                    ))}

                    {/* Premium status indicator */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full border-2 border-white/50 shadow-lg"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="absolute inset-1 bg-white/30 rounded-full blur-sm"></div>
                    </motion.div>
                  </motion.div>

                  {/* Ultra Premium Stats Content */}
                  <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2 + index * 0.3, duration: 0.8 }}
                  >
                    {/* Animated number with premium typography */}
                    <motion.div
                      className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-white mb-3 sm:mb-4"
                      style={{
                        backgroundSize: "200% 100%",
                        filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
                      }}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      whileHover={{ scale: 1.2, rotateZ: 5 }}
                    >
                      {stat.number}
                    </motion.div>

                    <div className="text-emerald-100 font-bold text-base sm:text-lg lg:text-xl mb-2 sm:mb-3">
                      {stat.label}
                    </div>
                    <div className="text-white/70 text-sm sm:text-base font-medium">
                      {stat.description}
                    </div>
                  </motion.div>

                  {/* Ultra premium shine effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-2000"></div>
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-emerald-400/10 to-transparent skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-2500"></div>

                  {/* Floating micro particles */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/40 rounded-full"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        {/* Ultra Premium Search & Filter Section */}
        <motion.div
          className="relative bg-white/5 backdrop-blur-3xl rounded-3xl sm:rounded-4xl border border-white/10 p-8 sm:p-12 lg:p-16 mb-12 sm:mb-16 lg:mb-20 shadow-2xl overflow-hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10"></div>
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-cyan-400/15 to-blue-500/15 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Header */}
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.div
                className="flex items-center justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500/30 to-teal-600/30 rounded-2xl sm:rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl">
                  <FaSearch className="text-white text-2xl sm:text-3xl" />
                  <div className="absolute inset-0 bg-emerald-500/30 rounded-2xl sm:rounded-3xl blur-xl opacity-50"></div>
                </div>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent">
                  TÌM KIẾM CẦU THỦ
                </span>
              </h2>
              <p className="text-emerald-200 text-lg sm:text-xl lg:text-2xl font-semibold max-w-3xl mx-auto">
                Khám phá các cầu thủ chuyên nghiệp với công nghệ tìm kiếm tiên
                tiến
              </p>
            </motion.div>

            {/* Search & Filter Forms */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Search Input */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="group"
              >
                <label className="flex items-center space-x-3 text-white text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                  <FaSearch className="text-emerald-400" />
                  <span>Tìm kiếm cầu thủ</span>
                </label>

                <div className="relative">
                  <motion.input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Nhập tên cầu thủ hoặc keyword..."
                    className="w-full px-6 sm:px-8 py-4 sm:py-6 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl sm:rounded-3xl focus:ring-4 focus:ring-emerald-500/50 focus:border-emerald-400 transition-all duration-500 text-white text-lg sm:text-xl font-medium placeholder-white/50 shadow-2xl group-hover:shadow-emerald-500/20"
                    whileFocus={{ scale: 1.02 }}
                  />

                  {/* Search loading indicator */}
                  {isSearching && (
                    <div className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2">
                      <motion.div
                        className="w-6 h-6 sm:w-8 sm:h-8 border-3 border-emerald-400 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </div>
                  )}

                  {/* Input glow effect */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-emerald-400/50 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm"></div>
                </div>
              </motion.div>

              {/* Team Filter */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="group"
              >
                <label className="flex items-center space-x-3 text-white text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                  <FaFilter className="text-teal-400" />
                  <span>Lọc theo đội bóng</span>
                </label>

                <div className="relative">
                  <motion.select
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    className="w-full px-6 sm:px-8 py-4 sm:py-6 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl sm:rounded-3xl focus:ring-4 focus:ring-teal-500/50 focus:border-teal-400 transition-all duration-500 text-white text-lg sm:text-xl font-medium shadow-2xl appearance-none cursor-pointer group-hover:shadow-teal-500/20"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="" className="bg-gray-900 text-white">
                      🏆 Tất cả đội bóng
                    </option>
                    {teams.map((team: Team) => (
                      <option
                        key={team._id}
                        value={team._id}
                        className="bg-gray-900 text-white"
                      >
                        ⚽ {team.teamName}
                      </option>
                    ))}
                  </motion.select>

                  {/* Custom dropdown arrow */}
                  <div className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <motion.div
                      animate={{ rotate: selectedTeam ? 180 : 0 }}
                      transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <svg
                        className="w-6 h-6 sm:w-8 sm:h-8 text-white/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Clear filters button */}
            <AnimatePresence>
              {(searchInput || selectedTeam) && (
                <motion.div
                  className="mt-8 sm:mt-12 text-center"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <motion.button
                    onClick={() => {
                      setSearchInput("");
                      setSearchTerm("");
                      setSelectedTeam("");
                      setCurrentPage(1);
                      setIsSearching(false);
                    }}
                    className="group relative flex items-center space-x-3 sm:space-x-4 px-6 sm:px-10 py-3 sm:py-5 bg-gradient-to-r from-red-500/20 via-pink-500/20 to-red-600/20 hover:from-red-500/40 hover:via-pink-500/40 hover:to-red-600/40 text-white rounded-2xl sm:rounded-3xl font-bold shadow-2xl hover:shadow-red-500/30 transition-all duration-500 border border-red-400/30 backdrop-blur-xl text-lg sm:text-xl overflow-hidden"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTimes className="text-red-400" />
                    <span>Xóa bộ lọc</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Players Results Section */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
        >
          {/* Loading State */}
          {loading && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="inline-block w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <h3 className="text-2xl font-bold text-white mb-2">
                Đang tải dữ liệu...
              </h3>
              <p className="text-emerald-200">Vui lòng chờ trong giây lát</p>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-red-500/20 backdrop-blur-xl rounded-3xl border border-red-400/30 p-8 max-w-md mx-auto">
                <div className="text-6xl mb-4">❌</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Có lỗi xảy ra
                </h3>
                <p className="text-red-200 mb-6">{error}</p>
                <motion.button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-red-500 hover:bg-red-400 text-white rounded-xl font-bold transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Thử lại
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Players Grid */}
          {!loading && !error && players.length > 0 && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.h3
                className="text-3xl sm:text-4xl font-black text-white mb-8 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Kết quả tìm kiếm ({players.length} cầu thủ)
                </span>
              </motion.h3>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {players.map((player) => (
                  <motion.div
                    key={player._id}
                    variants={{
                      hidden: { opacity: 0, y: 50, scale: 0.9 },
                      show: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <PlayerCard player={player} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && !error && players.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 max-w-md mx-auto">
                <div className="text-6xl mb-6">⚽</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Không tìm thấy cầu thủ
                </h3>
                <p className="text-emerald-200 mb-6">
                  Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                </p>
                <motion.button
                  onClick={() => {
                    setSearchInput("");
                    setSearchTerm("");
                    setSelectedTeam("");
                  }}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Xóa bộ lọc
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Pagination */}
          {!loading && !error && pagination && pagination.totalPages > 1 && (
            <motion.div
              className="flex justify-center items-center space-x-4 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:text-white/30 text-white rounded-xl font-bold backdrop-blur-xl border border-white/20 transition-all duration-300"
                whileHover={{ scale: currentPage > 1 ? 1.05 : 1 }}
                whileTap={{ scale: currentPage > 1 ? 0.95 : 1 }}
              >
                ← Trước
              </motion.button>

              <div className="flex space-x-2">
                {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  const isActive = pageNum === currentPage;
                  return (
                    <motion.button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-12 h-12 rounded-xl font-bold backdrop-blur-xl border transition-all duration-300 ${
                        isActive
                          ? "bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/50"
                          : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {pageNum}
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pagination.totalPages}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:text-white/30 text-white rounded-xl font-bold backdrop-blur-xl border border-white/20 transition-all duration-300"
                whileHover={{
                  scale: currentPage < pagination.totalPages ? 1.05 : 1,
                }}
                whileTap={{
                  scale: currentPage < pagination.totalPages ? 0.95 : 1,
                }}
              >
                Sau →
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
