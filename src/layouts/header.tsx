import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFutbol,
  FaUser,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaHome,
  FaUsers,
  FaCog,
  FaComments,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaUserShield,
  FaCrown,
  FaShieldAlt,
  FaGlobe,
  FaTrophy,
  FaFire,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import ConfirmModal from "../components/ConfirmModal";

const Header: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Advanced scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close modal when user is logged out
  useEffect(() => {
    if (!isAuthenticated && showLogoutModal) {
      setShowLogoutModal(false);
    }
  }, [isAuthenticated, showLogoutModal]);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate("/");
  };

  const menuItems = [{ name: "Trang chủ", path: "/", icon: FaHome }];

  const adminMenuItems = [
    { name: "Quản lý cầu thủ", path: "/admin/players", icon: FaUsers },
    { name: "Quản lý đội bóng", path: "/admin/teams", icon: FaFutbol },
    { name: "Quản lý thành viên", path: "/account", icon: FaUserShield },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-1000 transition-all duration-700 ease-out lg:rounded-b-4xl ${
          scrolled
            ? "bg-white/85 backdrop-blur-2xl shadow-xl border-b border-gray-200/50"
            : "bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100/30"
        }`}
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
          mass: 1,
        }}
      >
        {/* Premium gradient border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20">
            {/* Premium Logo Section - Mobile Responsive */}
            <motion.div
              className="flex items-center space-x-2 sm:space-x-3 lg:space-x-5"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                to="/"
                className="flex items-center space-x-2 sm:space-x-3 lg:space-x-5 group"
              >
                <div className="relative">
                  {/* Main logo container with premium effects - Mobile Responsive */}
                  <motion.div
                    className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-md sm:shadow-lg lg:shadow-2xl group-hover:shadow-emerald-500/25 transition-all duration-700 overflow-hidden"
                    whileHover={{
                      rotate: [0, -5, 5, 0],
                      scale: 1.1,
                      boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.4)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/80 via-teal-500/80 to-cyan-600/80 animate-pulse"></div>

                    {/* Premium shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out"></div>

                    {/* Football icon with breathing animation - Mobile Responsive */}
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <FaFutbol className="text-white text-xs sm:text-sm md:text-lg lg:text-2xl relative z-10" />
                    </motion.div>

                    {/* Floating premium particles - Mobile Responsive */}
                    <motion.div
                      className="absolute top-1 right-1 sm:top-2 sm:right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-300 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-orange-400 rounded-full"
                      animate={{
                        y: [0, -3, 0],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                  </motion.div>

                  {/* Premium floating badge - Mobile Responsive */}
                  <motion.div
                    className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-lg sm:rounded-xl opacity-95 shadow-md sm:shadow-lg"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="flex items-center justify-center h-full">
                      <FaTrophy className="text-white text-xs" />
                    </div>
                  </motion.div>

                  {/* Pulsing ring effect - Mobile Responsive */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-emerald-500/30 sm:border-2 animate-ping"></div>
                </div>

                {/* Premium Text Content - Mobile Responsive */}
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <h1 className="text-sm sm:text-base md:text-lg lg:text-2xl font-black bg-gradient-to-r from-gray-900 via-emerald-700 to-teal-600 bg-clip-text text-transparent tracking-tight leading-tight">
                      <span className="hidden sm:inline">Football Manager</span>
                      <span className="sm:hidden">FM Elite</span>
                    </h1>
                    <motion.div
                      className="text-xs sm:text-xs md:text-sm font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent flex items-center space-x-1 sm:space-x-2 mt-0.5"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{ backgroundSize: "200% 200%" }}
                    >
                      <span className="hidden sm:inline">
                        Elite Sports Platform
                      </span>
                      <span className="sm:hidden">Elite Sports</span>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      ></motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </Link>
            </motion.div>

            {/* Premium Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    to={item.path}
                    className="relative flex items-center space-x-3 px-5 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-500 group text-gray-700 hover:text-emerald-600 font-medium border border-transparent hover:border-emerald-100/50"
                  >
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <item.icon className="text-lg text-emerald-500" />
                      <div className="absolute inset-0 bg-emerald-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    </motion.div>
                    <span className="font-semibold tracking-wide">
                      {item.name}
                    </span>

                    {/* Premium underline effect */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full group-hover:w-3/4 transition-all duration-500"></div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 transition-opacity duration-500"></div>
                  </Link>
                </motion.div>
              ))}

              {/* Premium Admin Menu */}
              {isAuthenticated && isAdmin && (
                <motion.div
                  className="relative group"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center space-x-3 px-5 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 transition-all duration-500 cursor-pointer text-gray-700 hover:text-yellow-600 group font-medium border border-transparent hover:border-white/10 relative overflow-hidden backdrop-blur-xl">
                    {/* Premium background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <motion.div
                      className="relative z-10"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FaCrown className="text-lg text-yellow-400" />
                      <div className="absolute inset-0 bg-yellow-400/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    </motion.div>
                    <span className="font-semibold tracking-wide relative z-10">
                      Elite Control
                    </span>
                    <motion.div
                      className="relative z-10"
                      animate={{ rotate: 0 }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaChevronDown className="text-sm" />
                    </motion.div>

                    {/* Premium shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>

                  {/* Premium dropdown menu */}
                  <div className="absolute top-full left-0 mt-4 w-80 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-100/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 overflow-hidden">
                    {/* Gradient header */}
                    <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-100/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                          <FaCrown className="text-white text-sm" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">
                            Administrator Panel
                          </h4>
                          <p className="text-xs text-amber-600">
                            Full system access
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3">
                      {adminMenuItems.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            to={item.path}
                            className="flex items-center space-x-4 px-4 py-4 rounded-2xl text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-600 transition-all duration-300 group relative overflow-hidden"
                          >
                            <motion.div
                              className="relative"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <item.icon className="text-emerald-500 group-hover:text-emerald-600" />
                              <div className="absolute inset-0 bg-emerald-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                            </motion.div>
                            <span className="font-semibold tracking-wide">
                              {item.name}
                            </span>

                            {/* Hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </nav>

            {/* Premium User Menu - Mobile Responsive */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-5">
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 lg:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl lg:rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-500 text-gray-700 border border-gray-200/50 hover:border-gray-300/50 backdrop-blur-xl shadow-sm sm:shadow-md lg:shadow-lg hover:shadow-xl relative overflow-hidden group min-h-[44px] touch-manipulation"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Premium background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 flex items-center space-x-2 sm:space-x-3">
                      <div className="relative">
                        <motion.div
                          className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-md sm:rounded-lg lg:rounded-xl flex items-center justify-center shadow-md sm:shadow-lg lg:shadow-xl relative overflow-hidden"
                          whileHover={{ rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {/* Animated background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/80 to-teal-600/80 animate-pulse"></div>
                          <FaUser className="text-white text-xs sm:text-sm relative z-10" />

                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </motion.div>

                        {/* Premium admin badge - Mobile Responsive */}
                        {isAdmin && (
                          <motion.div
                            className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-md sm:rounded-lg md:rounded-xl border border-white sm:border-2 shadow-sm sm:shadow-lg flex items-center justify-center"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <FaCrown className="text-white text-xs" />
                          </motion.div>
                        )}

                        {/* Status indicator - Mobile Responsive */}
                        <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border border-white sm:border-2 shadow-sm">
                          <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
                        </div>
                      </div>

                      <div className="hidden sm:block text-left">
                        <div className="font-bold text-gray-800 text-xs sm:text-sm lg:text-base tracking-wide truncate max-w-16 sm:max-w-20 lg:max-w-none">
                          {user?.name}
                        </div>
                        <div className="text-xs lg:text-sm text-emerald-600 font-semibold flex items-center space-x-1">
                          {isAdmin ? (
                            <>
                              <FaShieldAlt className="text-amber-500" />
                              <span className="hidden md:inline">
                                Elite Admin
                              </span>
                              <span className="md:hidden">Admin</span>
                            </>
                          ) : (
                            <>
                              <FaGlobe className="text-blue-500" />
                              <span className="hidden md:inline">
                                Premium Member
                              </span>
                              <span className="md:hidden">Member</span>
                            </>
                          )}
                        </div>
                      </div>

                      <motion.div
                        animate={{ rotate: isProfileDropdownOpen ? 180 : 0 }}
                        transition={{
                          duration: 0.3,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="hidden sm:block"
                      >
                        <FaChevronDown className="text-xs sm:text-sm text-gray-400" />
                      </motion.div>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {isProfileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          duration: 0.3,
                        }}
                        className="absolute right-0 mt-2 sm:mt-4 w-72 sm:w-80 bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-100/50 overflow-hidden z-50 cursor-pointer"
                      >
                        {/* Premium profile header - Mobile Responsive */}
                        <div className="p-4 sm:p-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-b border-gray-100/50 relative overflow-hidden">
                          {/* Background pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-2xl sm:blur-3xl"></div>
                          </div>

                          <div className="flex items-center space-x-3 sm:space-x-5 relative z-10">
                            <motion.div
                              className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg sm:shadow-xl relative overflow-hidden"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/80 to-teal-600/80 animate-pulse"></div>
                              <FaUser className="text-white text-lg sm:text-xl relative z-10" />

                              {/* Shine effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
                            </motion.div>

                            <div className="flex-1 min-w-0">
                              <p className="text-lg sm:text-xl font-bold text-gray-900 tracking-wide truncate">
                                {user?.name}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                {isAdmin ? (
                                  <>
                                    <FaCrown className="text-amber-500" />
                                    <span className="text-xs sm:text-sm text-amber-600 font-bold">
                                      Elite Administrator
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <FaFire className="text-blue-500" />
                                    <span className="text-xs sm:text-sm text-emerald-600 font-bold">
                                      Premium Member
                                    </span>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center mt-2 space-x-2">
                                <motion.div
                                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                                <span className="text-xs text-gray-500 font-medium">
                                  Online & Active
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Premium menu items - Mobile Responsive */}
                        <div className="p-2 sm:p-3">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Link
                              to="/profile"
                              className="flex items-center space-x-3 sm:space-x-4 px-3 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-600 transition-all duration-300 group relative overflow-hidden"
                              onClick={() => setIsProfileDropdownOpen(false)}
                            >
                              <motion.div
                                className="relative"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <FaCog className="text-emerald-500 group-hover:text-emerald-600" />
                                <div className="absolute inset-0 bg-emerald-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                              </motion.div>
                              <span className="font-semibold tracking-wide text-sm sm:text-base">
                                Account Settings
                              </span>

                              {/* Hover effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                          </motion.div>

                          {!isAdmin && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              <Link
                                to="/my-comments"
                                className="flex items-center space-x-3 sm:space-x-4 px-3 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-600 transition-all duration-300 group relative overflow-hidden"
                                onClick={() => setIsProfileDropdownOpen(false)}
                              >
                                <motion.div
                                  className="relative"
                                  whileHover={{ scale: 1.2, rotate: 5 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                  }}
                                >
                                  <FaComments className="text-blue-500 group-hover:text-blue-600" />
                                  <div className="absolute inset-0 bg-blue-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                                </motion.div>
                                <span className="font-semibold tracking-wide text-sm sm:text-base">
                                  My Activity
                                </span>

                                {/* Hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </Link>
                            </motion.div>
                          )}

                          <hr className="my-2 sm:my-3 border-gray-100" />

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <button
                              onClick={() => {
                                setIsProfileDropdownOpen(false);
                                setShowLogoutModal(true);
                              }}
                              className="w-full flex items-center space-x-3 sm:space-x-4 px-3 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300 group relative overflow-hidden cursor-pointer"
                            >
                              <motion.div
                                className="relative"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <FaSignOutAlt className="text-red-500 group-hover:text-red-600" />
                                <div className="absolute inset-0 bg-red-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                              </motion.div>
                              <span className="font-semibold tracking-wide text-sm sm:text-base cursor-pointer">
                                Đăng xuất
                              </span>

                              {/* Hover effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  className="hidden sm:flex items-center space-x-2 md:space-x-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 md:space-x-3 px-3 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-500 group text-gray-600 hover:text-gray-800 border border-gray-200/50 hover:border-gray-300/50 backdrop-blur-sm shadow-md md:shadow-lg hover:shadow-xl relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-gray-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <FaSignInAlt className="group-hover:text-gray-800 relative z-10 text-sm" />
                      </motion.div>
                      <span className="font-semibold tracking-wide relative z-10 text-sm md:text-base">
                        Sign In
                      </span>
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/register"
                      className="flex items-center space-x-2 md:space-x-3 px-4 md:px-8 py-2 md:py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-700 rounded-xl md:rounded-2xl transition-all duration-500 text-white font-semibold shadow-lg md:shadow-xl hover:shadow-2xl transform hover:scale-105 relative overflow-hidden group"
                    >
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/80 to-cyan-600/80 animate-pulse"></div>

                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative z-10"
                      >
                        <FaUserPlus className="text-sm" />
                      </motion.div>
                      <span className="tracking-wide relative z-10 text-sm md:text-base">
                        <span className="hidden md:inline">Join Elite</span>
                        <span className="md:hidden">Join</span>
                      </span>
                    </Link>
                  </motion.div>
                </motion.div>
              )}

              {/* Premium Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-500 text-gray-600 border border-gray-200/50 hover:border-gray-300/50 backdrop-blur-xl shadow-md hover:shadow-lg relative overflow-hidden group min-h-[44px] min-w-[44px] touch-manipulation"
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -2 }}
              >
                {/* Premium background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-gray-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                  className="relative z-10"
                >
                  {isMobileMenuOpen ? (
                    <FaTimes className="text-lg sm:text-xl" />
                  ) : (
                    <FaBars className="text-lg sm:text-xl" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Premium Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="lg:hidden border-t border-gray-200/50 mt-2 sm:mt-4 pt-4 sm:pt-6 pb-4 sm:pb-6 overflow-hidden bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl mx-2 sm:mx-4 shadow-lg sm:shadow-xl"
              >
                <div className="space-y-2 sm:space-y-3 px-2 sm:px-4">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Link
                        to={item.path}
                        className="flex items-center space-x-3 sm:space-x-4 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 text-gray-700 hover:text-emerald-600 group relative overflow-hidden min-h-[44px] touch-manipulation"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <item.icon className="text-lg text-emerald-500" />
                        </motion.div>
                        <span className="font-semibold tracking-wide">
                          {item.name}
                        </span>

                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    </motion.div>
                  ))}

                  {/* Premium Mobile Admin Menu */}
                  {isAuthenticated && isAdmin && (
                    <div className="space-y-3 pt-4 border-t border-gray-200/50">
                      <motion.div
                        className="px-6 py-3 text-sm font-bold text-amber-600 flex items-center space-x-3"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                          <FaCrown className="text-white text-sm" />
                        </div>
                        <span>Elite Control Panel</span>
                      </motion.div>
                      {adminMenuItems.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: (index + 4) * 0.1,
                            duration: 0.5,
                          }}
                        >
                          <Link
                            to={item.path}
                            className="flex items-center space-x-4 px-8 py-4 rounded-2xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300 text-gray-700 hover:text-amber-600 group relative overflow-hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <item.icon className="text-lg text-amber-500" />
                            </motion.div>
                            <span className="font-semibold tracking-wide">
                              {item.name}
                            </span>

                            {/* Hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {!isAuthenticated && (
                    <div className="space-y-3 pt-4 border-t border-gray-200/50">
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <Link
                          to="/login"
                          className="flex items-center space-x-4 px-6 py-4 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 text-gray-700 hover:text-gray-800 group relative overflow-hidden"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <FaSignInAlt className="text-lg" />
                          </motion.div>
                          <span className="font-semibold tracking-wide">
                            Sign In
                          </span>

                          {/* Hover effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-gray-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <Link
                          to="/register"
                          className="flex items-center space-x-4 px-6 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-700 rounded-2xl text-white font-semibold mx-4 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {/* Animated background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/80 to-cyan-600/80 animate-pulse"></div>

                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative z-10"
                          >
                            <FaUserPlus className="text-lg" />
                          </motion.div>
                          <span className="tracking-wide relative z-10">
                            Join Elite Platform
                          </span>
                        </Link>
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Xác nhận đăng xuất"
        message="Bạn có chắc chắn muốn đăng xuất khỏi tài khoản không?"
        confirmText="Đăng xuất"
        cancelText="Hủy"
      />
    </>
  );
};

export default Header;
