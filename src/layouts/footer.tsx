import React from "react";
import { motion } from "framer-motion";
import {
  FaFutbol,
  FaHeart,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUsers,
  FaShieldAlt,
  FaTrophy,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaArrowUp,
  FaRocket,
  FaStar,
  FaBolt,
  FaGlobe,
  FaChartLine,
} from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const premiumStats = [
    {
      icon: FaUsers,
      number: "2,500+",
      label: "Elite Athletes",
      color: "from-blue-500 to-cyan-500",
      description: "Professional players managed",
      trend: "+12% this month",
    },
    {
      icon: FaTrophy,
      number: "150+",
      label: "Championship Teams",
      color: "from-emerald-500 to-teal-500",
      description: "Teams achieving excellence",
      trend: "+8% this quarter",
    },
    {
      icon: FaRocket,
      number: "24/7",
      label: "Elite Support",
      color: "from-amber-500 to-orange-500",
      description: "Premium assistance available",
      trend: "99.9% uptime",
    },
    {
      icon: FaChartLine,
      number: "98%",
      label: "Success Rate",
      color: "from-purple-500 to-pink-500",
      description: "Performance improvement",
      trend: "Industry leading",
    },
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      href: "#",
      name: "GitHub",
      color: "hover:text-gray-800",
      bg: "hover:bg-gray-100",
      gradient: "from-gray-600 to-gray-800",
    },
    {
      icon: FaLinkedin,
      href: "#",
      name: "LinkedIn",
      color: "hover:text-blue-600",
      bg: "hover:bg-blue-50",
      gradient: "from-blue-500 to-blue-700",
    },
    {
      icon: FaTwitter,
      href: "#",
      name: "Twitter",
      color: "hover:text-sky-500",
      bg: "hover:bg-sky-50",
      gradient: "from-sky-400 to-sky-600",
    },
    {
      icon: FaInstagram,
      href: "#",
      name: "Instagram",
      color: "hover:text-pink-500",
      bg: "hover:bg-pink-50",
      gradient: "from-pink-500 to-purple-600",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Premium gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-teal-900/20 to-cyan-900/20"></div>

        {/* Floating premium orbs - Mobile Responsive */}
        <motion.div
          className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-16 right-16 w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-xl sm:blur-2xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 4 }}
        />
      </div>

      {/* Premium Stats Section */}
      <div className="relative">
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: "20px 20px",
              }}
            ></div>
          </div>

          {/* Floating elements - Mobile Responsive */}
          <motion.div
            className="absolute top-6 right-6 sm:top-10 sm:right-10 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/10 rounded-xl sm:rounded-2xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white/10 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-8 sm:mb-12 lg:mb-16"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <motion.h2
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-3 sm:mb-4 lg:mb-6 tracking-tight"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="bg-gradient-to-r from-white via-emerald-100 to-cyan-100 bg-clip-text text-transparent">
                  Elite Football Excellence
                </span>
              </motion.h2>
              <motion.p
                className="text-emerald-100 text-sm sm:text-base lg:text-lg xl:text-xl max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Revolutionizing sports management with cutting-edge technology
                and unparalleled expertise. Join the elite community that
                defines the future of football.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {premiumStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group cursor-pointer"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="relative inline-block mb-4 sm:mb-6">
                    <motion.div
                      className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${stat.color} rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl sm:shadow-2xl group-hover:shadow-3xl transition-all duration-500 relative overflow-hidden`}
                      whileHover={{ rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-white/10 rounded-2xl sm:rounded-3xl"></div>

                      {/* Icon with breathing animation */}
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <stat.icon className="text-2xl sm:text-3xl lg:text-4xl text-white relative z-10" />
                      </motion.div>

                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200"></div>
                    </motion.div>

                    {/* Floating badge - Mobile Responsive */}
                    <motion.div
                      className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm border border-white/30"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <div className="flex items-center justify-center h-full">
                        <FaStar className="text-white text-xs sm:text-sm" />
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-emerald-100 font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">
                    {stat.label}
                  </div>
                  <div className="text-emerald-200/80 text-xs sm:text-sm mb-1">
                    {stat.description}
                  </div>
                  <motion.div
                    className="text-emerald-300 text-xs font-semibold flex items-center justify-center space-x-1"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaBolt className="text-yellow-300" />
                    <span>{stat.trend}</span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Premium Main Footer Content */}
      <div className="relative bg-white/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
            {/* Premium Brand Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 sm:space-x-5 mb-6 sm:mb-8">
                <motion.div
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl sm:shadow-2xl relative overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/80 to-teal-600/80 animate-pulse"></div>

                  {/* Icon with breathing animation */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaFutbol className="text-white text-xl sm:text-2xl relative z-10" />
                  </motion.div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1200"></div>
                </motion.div>

                <div>
                  <motion.h3
                    className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-gray-900 via-emerald-700 to-teal-600 bg-clip-text text-transparent"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    Football Manager Elite
                  </motion.h3>
                  <motion.div
                    className="flex items-center space-x-2 text-emerald-600 text-xs sm:text-sm font-bold mt-1"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <span>Premium Sports Platform</span>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    ></motion.div>
                  </motion.div>
                </div>
              </div>

              <motion.p
                className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Revolutionizing football management with cutting-edge
                technology, premium analytics, and unparalleled user experience.
                Join thousands of elite clubs and managers who trust our
                platform for their success.
              </motion.p>

              {/* Premium Contact Info - Mobile Responsive */}
              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    icon: FaPhone,
                    text: "+1 (555) 123-4567",
                    label: "24/7 Elite Support",
                  },
                  {
                    icon: FaEnvelope,
                    text: "elite@footballmanager.com",
                    label: "Premium Contact",
                  },
                  {
                    icon: FaMapMarkerAlt,
                    text: "Silicon Valley, CA 94000",
                    label: "Global Headquarters",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 sm:space-x-4 group cursor-pointer"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <item.icon className="text-xs sm:text-sm" />
                    </motion.div>
                    <div>
                      <div className="text-gray-800 font-semibold text-sm sm:text-base">
                        {item.text}
                      </div>
                      <div className="text-emerald-600 text-xs sm:text-sm font-medium">
                        {item.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Premium Quick Links */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <motion.h4
                className="text-lg sm:text-xl font-black text-gray-800 mb-4 sm:mb-6 flex items-center space-x-2"
                whileHover={{ x: 5 }}
              >
                <FaRocket className="text-emerald-500" />
                <span>Quick Access</span>
              </motion.h4>
              <div className="space-y-2 sm:space-y-3">
                {[
                  "Elite Dashboard",
                  "Player Analytics",
                  "Team Management",
                  "Performance Reports",
                  "Premium Features",
                  "Elite Support",
                ].map((link, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="block text-gray-600 hover:text-emerald-600 transition-all duration-300 text-sm sm:text-base font-medium group relative"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    whileHover={{ x: 10, color: "#059669" }}
                  >
                    <span className="relative">
                      {link}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-500"></div>
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Premium Social & Updates */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.h4
                className="text-lg sm:text-xl font-black text-gray-800 mb-4 sm:mb-6 flex items-center space-x-2"
                whileHover={{ x: 5 }}
              >
                <FaGlobe className="text-blue-500" />
                <span>Stay Connected</span>
              </motion.h4>

              {/* Social Links - Mobile Responsive */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-gray-200 ${social.bg} ${social.color} transition-all duration-500 group relative overflow-hidden min-h-[44px] touch-manipulation`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Premium background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative z-10"
                    >
                      <social.icon className="text-sm sm:text-base" />
                    </motion.div>
                    <span className="font-semibold text-xs sm:text-sm relative z-10">
                      {social.name}
                    </span>

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </motion.a>
                ))}
              </div>

              {/* Newsletter signup - Mobile Responsive */}
              <motion.div
                className="p-3 sm:p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl border border-emerald-100"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <FaBolt className="text-white text-xs sm:text-sm" />
                  </div>
                  <span className="font-bold text-gray-800 text-xs sm:text-sm">
                    Elite Updates
                  </span>
                </div>
                <p className="text-emerald-700 text-xs sm:text-sm mb-2 sm:mb-3">
                  Get premium insights & updates
                </p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-emerald-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <motion.button
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-lg min-h-[36px] touch-manipulation"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Premium Bottom Bar */}
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-black border-t border-gray-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <motion.div
              className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="flex items-center space-x-1 sm:space-x-2">
                <FaHeart className="text-red-500" />
                <span>Made with passion</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>© {currentYear} Football Manager Elite</span>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-3 sm:space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-emerald-400">
                <FaShieldAlt />
                <span className="hidden sm:inline">Enterprise Security</span>
                <span className="sm:hidden">Secure</span>
              </div>

              <motion.button
                onClick={scrollToTop}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 min-h-[36px] touch-manipulation"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaArrowUp />
                <span className="hidden sm:inline">Back to Top</span>
                <span className="sm:hidden">Top</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
