import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import {
  FaFutbol,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaIdCard,
  FaCalendarAlt,
  FaArrowLeft,
} from "react-icons/fa";

const schema = yup.object({
  membername: yup.string().required("Tên đăng nhập là bắt buộc"),
  password: yup.string().required("Mật khẩu là bắt buộc"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp"),
  name: yup.string().required("Họ và tên là bắt buộc"),
  YOB: yup
    .number()
    .required("Năm sinh là bắt buộc")
    .min(1950, "Năm sinh phải lớn hơn 1950")
    .max(new Date().getFullYear() - 13, "ít nhất 13 tuổi"),
});

const Register: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await registerUser(registerData);
      toast.success("Đăng ký thành công!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Đăng ký thất bại!");
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Ultra Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Advanced animated gradient mesh */}
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

        {/* Premium floating orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80"
          animate={{
            scale: [1, 1.3, 1.1, 1],
            rotate: [0, 180, 270, 360],
            opacity: [0.2, 0.6, 0.4, 0.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-emerald-400/30 via-teal-500/40 to-cyan-600/30 rounded-full blur-3xl"></div>
        </motion.div>

        <motion.div
          className="absolute bottom-16 left-16 w-64 h-64"
          animate={{
            scale: [1.2, 1, 1.3, 1.2],
            x: [0, 60, -20, 0],
            y: [0, -20, 15, 0],
            opacity: [0.15, 0.5, 0.3, 0.15],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-teal-400/20 to-emerald-500/20 rounded-full blur-2xl"></div>
        </motion.div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        {/* Back Button */}
        <motion.div
          className="absolute top-8 left-8 z-20"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/"
            className="group flex items-center space-x-3 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 text-white transition-all duration-300 hover:scale-105"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Về trang chủ</span>
          </Link>
        </motion.div>

        <motion.div
          className="max-w-md w-full"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Premium Card with Glassmorphism */}
          <motion.div
            className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl shadow-black/50 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 rounded-3xl"></div>

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-2000"></div>

            <div className="relative p-8 sm:p-10">
              {/* Header with Logo */}
              <motion.div
                className="text-center mb-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {/* 3D Football Logo */}
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-2xl mb-6 shadow-2xl"
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <FaFutbol className="text-3xl text-white drop-shadow-lg" />
                </motion.div>

                <motion.h2
                  className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent mb-3"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% 100%" }}
                >
                  Đăng ký tài khoản
                </motion.h2>

                <p className="text-emerald-100/80 text-lg font-medium">
                  Tham gia cộng đồng bóng đá của chúng tôi
                </p>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {/* Username Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-emerald-100">
                    Tên đăng nhập
                  </label>
                  <motion.div className="relative" whileFocus={{ scale: 1.02 }}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUser className="text-emerald-400/70" />
                    </div>
                    <input
                      {...register("membername")}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm transition-all duration-300 font-medium"
                      placeholder="Nhập tên đăng nhập"
                    />
                  </motion.div>
                  {errors.membername && (
                    <motion.p
                      className="text-red-400 text-sm font-medium"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.membername.message}
                    </motion.p>
                  )}
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-emerald-100">
                    Họ và tên
                  </label>
                  <motion.div className="relative" whileFocus={{ scale: 1.02 }}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaIdCard className="text-emerald-400/70" />
                    </div>
                    <input
                      {...register("name")}
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm transition-all duration-300 font-medium"
                      placeholder="Nhập họ và tên"
                    />
                  </motion.div>
                  {errors.name && (
                    <motion.p
                      className="text-red-400 text-sm font-medium"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.name.message}
                    </motion.p>
                  )}
                </div>

                {/* YOB Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-emerald-100">
                    Năm sinh (YOB)
                  </label>
                  <motion.div className="relative" whileFocus={{ scale: 1.02 }}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-emerald-400/70" />
                    </div>
                    <input
                      {...register("YOB")}
                      type="number"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm transition-all duration-300 font-medium"
                      placeholder="1990"
                    />
                  </motion.div>
                  {errors.YOB && (
                    <motion.p
                      className="text-red-400 text-sm font-medium"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.YOB.message}
                    </motion.p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-emerald-100">
                    Mật khẩu
                  </label>
                  <motion.div className="relative" whileFocus={{ scale: 1.02 }}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-emerald-400/70" />
                    </div>
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-12 pr-14 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm transition-all duration-300 font-medium"
                      placeholder="Nhập mật khẩu"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-400/70 hover:text-emerald-400 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </motion.div>
                  {errors.password && (
                    <motion.p
                      className="text-red-400 text-sm font-medium"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-emerald-100">
                    Xác nhận mật khẩu
                  </label>
                  <motion.div className="relative" whileFocus={{ scale: 1.02 }}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="text-emerald-400/70" />
                    </div>
                    <input
                      {...register("confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full pl-12 pr-14 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm transition-all duration-300 font-medium"
                      placeholder="Nhập lại mật khẩu"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-400/70 hover:text-emerald-400 transition-colors"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </motion.div>
                  {errors.confirmPassword && (
                    <motion.p
                      className="text-red-400 text-sm font-medium"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.confirmPassword.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 overflow-hidden"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Floating particles inside button */}
                  {[...Array(3)].map((_, i) => (
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

                  <span className="relative z-10">
                    {isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                  </span>
                </motion.button>
              </motion.form>

              {/* Login Link */}
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <p className="text-emerald-100/80 text-sm">
                  Đã có tài khoản?{" "}
                  <Link
                    to="/login"
                    className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline transition-colors duration-300"
                  >
                    Đăng nhập ngay
                  </Link>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
