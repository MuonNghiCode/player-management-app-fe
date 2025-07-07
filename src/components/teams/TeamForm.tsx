import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUsers, FaInfoCircle, FaSave, FaPlus } from "react-icons/fa";
import type { CreateTeamRequest, UpdateTeamRequest, Team } from "../../types";

interface TeamFormProps {
  team?: Team | null;
  onSubmit: (data: CreateTeamRequest | UpdateTeamRequest) => Promise<void>;
  onClose: () => void;
  isSubmitting?: boolean;
}

const schema = yup.object().shape({
  teamName: yup.string().required("Tên đội bóng là bắt buộc"),
});

const TeamForm: React.FC<TeamFormProps> = ({
  team,
  onSubmit,
  onClose,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateTeamRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      teamName: "",
    },
  });

  // Load team data for editing
  useEffect(() => {
    if (team) {
      setValue("teamName", team.teamName);
    } else {
      reset();
    }
  }, [team, setValue, reset]);

  const handleFormSubmit = async (data: CreateTeamRequest) => {
    await onSubmit(data);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50, rotateX: 15 }}
          transition={{
            duration: 0.5,
            type: "spring",
            damping: 25,
            stiffness: 300,
          }}
          className="relative bg-gradient-to-br from-emerald-900/95 via-emerald-950/95 to-teal-900/95 backdrop-blur-2xl rounded-3xl border border-emerald-500/30 w-full max-w-md overflow-hidden shadow-2xl shadow-emerald-500/20"
          style={{ transformStyle: "preserve-3d" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Enhanced background */}
          <div className="absolute inset-0">
            {/* Multi-layer gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-emerald-900 to-teal-600/30"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-green-500/10 via-transparent to-emerald-400/10"></div>

            {/* Floating football icons */}
            <div className="absolute inset-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-emerald-400/15"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 12 + 10}px`,
                  }}
                  animate={{
                    y: [0, -40, 0],
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
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

          {/* Header */}
          <motion.div
            className="relative z-10 flex justify-between items-center p-6 border-b border-emerald-500/30"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h3
              className="text-2xl font-bold bg-gradient-to-r from-emerald-200 via-teal-200 to-green-200 bg-clip-text text-transparent flex items-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", damping: 15 }}
            >
              {team ? (
                <>
                  <motion.div
                    className="mr-3 p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg"
                    animate={{ rotateY: [0, 360] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <FaUsers className="text-white text-lg" />
                  </motion.div>
                  Sửa đội bóng
                </>
              ) : (
                <>
                  <motion.div
                    className="mr-3 p-2 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl shadow-lg"
                    animate={{ rotateY: [0, 360] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <FaPlus className="text-white text-lg" />
                  </motion.div>
                  Thêm đội bóng
                </>
              )}
            </motion.h3>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              disabled={isSubmitting}
              className="text-emerald-400 hover:text-emerald-300 p-2 rounded-xl bg-emerald-800/30 hover:bg-emerald-800/50 transition-all duration-200 disabled:opacity-50 border border-emerald-600/30"
            >
              <FaTimes className="text-lg" />
            </motion.button>
          </motion.div>

          {/* Form Content */}
          <motion.div
            className="relative z-10 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-6"
            >
              {/* Team Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="flex items-center text-lg font-medium text-emerald-200 mb-4">
                  <motion.div
                    className="mr-3 p-2 bg-emerald-600/30 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <FaUsers className="text-emerald-400" />
                  </motion.div>
                  Tên đội bóng *
                </label>
                <motion.input
                  {...register("teamName")}
                  type="text"
                  className="w-full px-4 py-3 bg-emerald-900/30 backdrop-blur-xl border border-emerald-600/40 rounded-xl text-emerald-100 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400/60 transition-all duration-500 hover:bg-emerald-900/40"
                  placeholder="Nhập tên đội bóng"
                  whileFocus={{ scale: 1.02 }}
                />
                {errors.teamName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-3 flex items-center bg-red-900/20 p-2 rounded-lg"
                  >
                    <FaInfoCircle className="mr-2" />
                    {errors.teamName.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Form Actions */}
              <motion.div
                className="flex space-x-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 text-emerald-300 border border-emerald-600/50 rounded-xl hover:bg-emerald-800/30 hover:border-emerald-500/70 disabled:opacity-50 transition-all duration-300 font-bold backdrop-blur-lg"
                >
                  Hủy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 transition-all duration-300 font-bold shadow-lg flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" />
                      {team ? "Cập nhật" : "Tạo mới"}
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TeamForm;
