import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import {
  FaUser,
  FaLock,
  FaEdit,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaCrown,
  FaCalendarAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { LoadingSpinner, ErrorDisplay } from "../components";

const profileSchema = yup.object({
  name: yup.string().required("Họ và tên là bắt buộc"),
  YOB: yup
    .number()
    .required("Năm sinh là bắt buộc")
    .min(1950, "Năm sinh phải lớn hơn 1950")
    .max(new Date().getFullYear() - 13, "Phải ít nhất 13 tuổi"),
});

const passwordSchema = yup.object({
  currentPassword: yup.string().required("Mật khẩu hiện tại là bắt buộc"),
  newPassword: yup
    .string()
    .required("Mật khẩu mới là bắt buộc")
    .min(6, "Mật khẩu phải ít nhất 6 ký tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Mật khẩu không trùng khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

const Profile: React.FC = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      YOB: user?.YOB || new Date().getFullYear() - 20,
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPasswordForm,
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const onProfileSubmit = async (data: any) => {
    try {
      const success = await updateProfile(data);
      if (success) {
        toast.success("Cập nhật thông tin thành công!");
      } else {
        toast.error("Cập nhật thông tin thất bại!");
      }
    } catch (error: any) {
      toast.error(error.message || "Cập nhật thông tin thất bại!");
    }
  };

  const onPasswordSubmit = async (data: any) => {
    try {
      const success = await changePassword(
        data.currentPassword,
        data.newPassword
      );
      if (success) {
        toast.success("Đổi mật khẩu thành công!");
        resetPasswordForm();
      } else {
        toast.error("Đổi mật khẩu thất bại!");
      }
    } catch (error: any) {
      toast.error(error.message || "Đổi mật khẩu thất bại!");
    }
  };

  if (!user) {
    return (
      <ErrorDisplay
        type="page"
        title="Không tìm thấy thông tin người dùng"
        message="Vui lòng đăng nhập lại để xem thông tin cá nhân."
        variant="unauthorized"
        onGoHome={() => (window.location.href = "/")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
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

      {/* Main Content */}
      <div className="relative min-h-screen">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Profile Header */}
            <motion.div
              className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl mb-8 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl"></div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                {/* Avatar */}
                <motion.div
                  className="relative"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 200,
                    delay: 0.4,
                  }}
                >
                  <motion.div
                    className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/30"
                    animate={{
                      rotateY: [0, 360],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      rotateY: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: { duration: 4, repeat: Infinity },
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <span className="text-white font-black text-4xl lg:text-5xl">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </motion.div>

                  {/* Status Badge */}
                  <motion.div
                    className="absolute -bottom-2 -right-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl ${
                        user.isAdmin
                          ? "bg-gradient-to-br from-red-500 to-pink-600"
                          : "bg-gradient-to-br from-green-500 to-emerald-600"
                      }`}
                    >
                      {user.isAdmin ? (
                        <FaCrown className="text-white text-xl" />
                      ) : (
                        <FaShieldAlt className="text-white text-xl" />
                      )}
                    </div>
                  </motion.div>
                </motion.div>

                {/* User Info */}
                <div className="flex-1 text-center lg:text-left">
                  <motion.h1
                    className="text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent mb-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {user.name}
                  </motion.h1>

                  <motion.p
                    className="text-xl text-gray-300 mb-6"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    @{user.membername}
                  </motion.p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <motion.div
                      className={`flex items-center space-x-2 px-4 py-2 rounded-2xl font-bold shadow-lg ${
                        user.isAdmin
                          ? "bg-gradient-to-r from-red-500/20 to-pink-600/20 text-red-300 border border-red-500/30"
                          : "bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-green-300 border border-green-500/30"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      {user.isAdmin ? (
                        <FaCrown className="text-lg" />
                      ) : (
                        <FaShieldAlt className="text-lg" />
                      )}
                      <span>
                        {user.isAdmin ? "Quản trị viên" : "Thành viên"}
                      </span>
                    </motion.div>

                    <motion.div
                      className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-2xl text-gray-300 border border-white/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <FaCalendarAlt className="text-lg" />
                      <span>Tuổi: {new Date().getFullYear() - user.YOB}</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tabs Section */}
            <motion.div
              className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl"></div>

              {/* Tab Navigation */}
              <div className="relative z-10 border-b border-white/20">
                <nav className="flex">
                  <motion.button
                    onClick={() => setActiveTab("profile")}
                    className={`relative flex-1 py-6 px-8 text-lg font-bold transition-all duration-300 ${
                      activeTab === "profile"
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <FaUser className="text-xl" />
                      <span>Thông tin cá nhân</span>
                    </div>
                    {activeTab === "profile" && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-full"
                        layoutId="activeTab"
                        transition={{
                          type: "spring",
                          damping: 30,
                          stiffness: 300,
                        }}
                      />
                    )}
                  </motion.button>

                  <motion.button
                    onClick={() => setActiveTab("password")}
                    className={`relative flex-1 py-6 px-8 text-lg font-bold transition-all duration-300 ${
                      activeTab === "password"
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <FaLock className="text-xl" />
                      <span>Đổi mật khẩu</span>
                    </div>
                    {activeTab === "password" && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-full"
                        layoutId="activeTab"
                        transition={{
                          type: "spring",
                          damping: 30,
                          stiffness: 300,
                        }}
                      />
                    )}
                  </motion.button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="relative z-10 p-8 lg:p-12">
                {activeTab === "profile" ? (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center space-x-4 mb-8">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl"
                        animate={{ rotateY: [0, 360] }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <FaEdit className="text-white text-2xl" />
                      </motion.div>
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white">
                          Cập nhật thông tin cá nhân
                        </h2>
                        <p className="text-gray-300">
                          Chỉnh sửa thông tin của bạn
                        </p>
                      </div>
                    </div>

                    <form
                      onSubmit={handleProfileSubmit(onProfileSubmit)}
                      className="space-y-8"
                    >
                      {/* Username Field (Disabled) */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className="block text-lg font-bold text-white mb-4">
                          Tên đăng nhập
                        </label>
                        <div className="relative">
                          <FaUserCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                          <input
                            type="text"
                            value={user.membername}
                            disabled
                            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-gray-400 cursor-not-allowed backdrop-blur-xl placeholder-gray-500"
                          />
                        </div>
                        <p className="text-sm text-gray-400 mt-2 ml-2">
                          🔒 Tên đăng nhập không thể thay đổi
                        </p>
                      </motion.div>

                      {/* Name Field */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="block text-lg font-bold text-white mb-4">
                          Họ và tên *
                        </label>
                        <div className="relative">
                          <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                          <input
                            {...registerProfile("name")}
                            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-xl transition-all duration-300 hover:bg-white/15"
                            placeholder="Nhập họ và tên"
                          />
                        </div>
                        {profileErrors.name && (
                          <motion.p
                            className="text-red-400 text-sm mt-2 ml-2 flex items-center space-x-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <span>⚠️</span>
                            <span>{profileErrors.name.message}</span>
                          </motion.p>
                        )}
                      </motion.div>

                      {/* YOB Field */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="block text-lg font-bold text-white mb-4">
                          Năm sinh *
                        </label>
                        <div className="relative">
                          <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                          <input
                            {...registerProfile("YOB")}
                            type="number"
                            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-xl transition-all duration-300 hover:bg-white/15"
                            placeholder="Nhập năm sinh"
                          />
                        </div>
                        {profileErrors.YOB && (
                          <motion.p
                            className="text-red-400 text-sm mt-2 ml-2 flex items-center space-x-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <span>⚠️</span>
                            <span>{profileErrors.YOB.message}</span>
                          </motion.p>
                        )}
                      </motion.div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isProfileSubmitting}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {isProfileSubmitting ? (
                          <LoadingSpinner
                            type="button"
                            message="Đang cập nhật..."
                            size="sm"
                            variant="spinner"
                          />
                        ) : (
                          <>
                            <FaSave className="text-xl" />
                            <span>Cập nhật thông tin</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="password"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center space-x-4 mb-8">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl"
                        animate={{ rotateY: [0, 360] }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <FaLock className="text-white text-2xl" />
                      </motion.div>
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white">
                          Đổi mật khẩu
                        </h2>
                        <p className="text-gray-300">
                          Thay đổi mật khẩu đăng nhập của bạn
                        </p>
                      </div>
                    </div>

                    <form
                      onSubmit={handlePasswordSubmit(onPasswordSubmit)}
                      className="space-y-8"
                    >
                      {/* Current Password */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className="block text-lg font-bold text-white mb-4">
                          Mật khẩu hiện tại *
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                          <input
                            {...registerPassword("currentPassword")}
                            type={showCurrentPassword ? "text" : "password"}
                            className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-xl transition-all duration-300 hover:bg-white/15"
                            placeholder="Nhập mật khẩu hiện tại"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                          >
                            {showCurrentPassword ? (
                              <FaEyeSlash className="text-xl" />
                            ) : (
                              <FaEye className="text-xl" />
                            )}
                          </button>
                        </div>
                        {passwordErrors.currentPassword && (
                          <motion.p
                            className="text-red-400 text-sm mt-2 ml-2 flex items-center space-x-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <span>⚠️</span>
                            <span>
                              {passwordErrors.currentPassword.message}
                            </span>
                          </motion.p>
                        )}
                      </motion.div>

                      {/* New Password */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="block text-lg font-bold text-white mb-4">
                          Mật khẩu mới *
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                          <input
                            {...registerPassword("newPassword")}
                            type={showNewPassword ? "text" : "password"}
                            className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-xl transition-all duration-300 hover:bg-white/15"
                            placeholder="Nhập mật khẩu mới"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                          >
                            {showNewPassword ? (
                              <FaEyeSlash className="text-xl" />
                            ) : (
                              <FaEye className="text-xl" />
                            )}
                          </button>
                        </div>
                        {passwordErrors.newPassword && (
                          <motion.p
                            className="text-red-400 text-sm mt-2 ml-2 flex items-center space-x-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <span>⚠️</span>
                            <span>{passwordErrors.newPassword.message}</span>
                          </motion.p>
                        )}
                      </motion.div>

                      {/* Confirm Password */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="block text-lg font-bold text-white mb-4">
                          Xác nhận mật khẩu mới *
                        </label>
                        <div className="relative">
                          <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                          <input
                            {...registerPassword("confirmPassword")}
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-xl transition-all duration-300 hover:bg-white/15"
                            placeholder="Xác nhận mật khẩu mới"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                          >
                            {showConfirmPassword ? (
                              <FaEyeSlash className="text-xl" />
                            ) : (
                              <FaEye className="text-xl" />
                            )}
                          </button>
                        </div>
                        {passwordErrors.confirmPassword && (
                          <motion.p
                            className="text-red-400 text-sm mt-2 ml-2 flex items-center space-x-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <span>⚠️</span>
                            <span>
                              {passwordErrors.confirmPassword.message}
                            </span>
                          </motion.p>
                        )}
                      </motion.div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isPasswordSubmitting}
                        className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-red-500/30 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {isPasswordSubmitting ? (
                          <LoadingSpinner
                            type="button"
                            message="Đang đổi mật khẩu..."
                            size="sm"
                            variant="spinner"
                          />
                        ) : (
                          <>
                            <FaLock className="text-xl" />
                            <span>Đổi mật khẩu</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
