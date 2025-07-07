import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaUser,
  FaImage,
  FaDollarSign,
  FaUsers,
  FaInfoCircle,
  FaTrophy,
  FaSave,
  FaPlus,
} from "react-icons/fa";
import type {
  CreatePlayerRequest,
  UpdatePlayerRequest,
  Player,
  Team,
} from "../../types";

interface PlayerFormProps {
  player?: Player | null;
  teams: Team[];
  onSubmit: (data: CreatePlayerRequest | UpdatePlayerRequest) => Promise<void>;
  onClose: () => void;
  isSubmitting?: boolean;
}

const schema = yup.object().shape({
  playerName: yup.string().required("Tên cầu thủ là bắt buộc"),
  image: yup.string().required("URL hình ảnh là bắt buộc"),
  cost: yup
    .number()
    .required("Giá trị cầu thủ là bắt buộc")
    .min(0, "Giá trị phải lớn hơn 0"),
  team: yup.string().required("Đội bóng là bắt buộc"),
  information: yup.string().required("Thông tin cầu thủ là bắt buộc"),
  isCaptain: yup.boolean().default(false),
});

const PlayerForm: React.FC<PlayerFormProps> = ({
  player,
  teams,
  onSubmit,
  onClose,
  isSubmitting = false,
}) => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isCaptain, setIsCaptain] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreatePlayerRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      playerName: "",
      image: "",
      cost: 0,
      team: "",
      information: "",
      isCaptain: false,
    },
  });

  // Watch image input for preview
  const watchedImage = watch("image");

  // Update image preview when URL changes
  useEffect(() => {
    if (watchedImage && watchedImage.trim()) {
      setImagePreview(watchedImage);
    } else {
      setImagePreview("");
    }
  }, [watchedImage]);

  // Load player data for editing
  useEffect(() => {
    if (player) {
      setValue("playerName", player.playerName);
      setValue("image", player.image);
      setValue("cost", player.cost);
      setValue("team", player.team?._id || "");
      setValue("information", player.information);
      setValue("isCaptain", player.isCaptain);
      setIsCaptain(player.isCaptain);
      setImagePreview(player.image);
    } else {
      reset();
      setIsCaptain(false);
      setImagePreview("");
    }
  }, [player, setValue, reset]);

  const handleFormSubmit = async (data: CreatePlayerRequest) => {
    // Override isCaptain with state value
    const submitData = { ...data, isCaptain };
    await onSubmit(submitData);
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
          className="relative bg-gradient-to-br from-emerald-900/95 via-emerald-950/95 to-teal-900/95 backdrop-blur-2xl rounded-3xl border border-emerald-500/30 w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl shadow-emerald-500/20"
          style={{ transformStyle: "preserve-3d" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Enhanced Football-themed background */}
          <div className="absolute inset-0">
            {/* Multi-layer gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-emerald-900 to-teal-600/30"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-green-500/10 via-transparent to-emerald-400/10"></div>

            {/* Football field pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,185,129,0.3)_1px,transparent_1px),linear-gradient(rgba(16,185,129,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(34,197,94,0.1)_0px,rgba(34,197,94,0.1)_2px,transparent_2px,transparent_10px)]"></div>
            </div>

            {/* Floating football icons */}
            <div className="absolute inset-0">
              {Array.from({ length: 12 }).map((_, i) => (
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

            {/* Glowing orbs */}
            <motion.div
              className="absolute top-10 right-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-10 left-10 w-24 h-24 bg-teal-400/20 rounded-full blur-xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
          </div>

          {/* Header */}
          <motion.div
            className="relative z-10 flex justify-between items-center p-8 border-b border-emerald-500/30"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h3
              className="text-3xl font-bold bg-gradient-to-r from-emerald-200 via-teal-200 to-green-200 bg-clip-text text-transparent flex items-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", damping: 15 }}
            >
              {player ? (
                <>
                  <motion.div
                    className="mr-4 p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg"
                    animate={{ rotateY: [0, 360] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <FaUser className="text-white text-xl" />
                  </motion.div>
                  Sửa thông tin cầu thủ
                </>
              ) : (
                <>
                  <motion.div
                    className="mr-4 p-3 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-lg"
                    animate={{ rotateY: [0, 360] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <FaPlus className="text-white text-xl" />
                  </motion.div>
                  Thêm cầu thủ mới
                </>
              )}
            </motion.h3>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              disabled={isSubmitting}
              className="text-emerald-400 hover:text-emerald-300 p-3 rounded-2xl bg-emerald-800/30 hover:bg-emerald-800/50 transition-all duration-200 disabled:opacity-50 border border-emerald-600/30"
            >
              <FaTimes className="text-xl" />
            </motion.button>
          </motion.div>

          {/* Form Content */}
          <motion.div
            className="relative z-10 p-8 overflow-y-auto max-h-[calc(85vh-160px)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-8"
            >
              {/* Player Name */}
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
                    <FaUser className="text-emerald-400" />
                  </motion.div>
                  Tên cầu thủ *
                </label>
                <motion.input
                  {...register("playerName")}
                  type="text"
                  className="w-full px-6 py-4 bg-emerald-900/30 backdrop-blur-xl border border-emerald-600/40 rounded-2xl text-emerald-100 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400/60 transition-all duration-500 hover:bg-emerald-900/40"
                  placeholder="Nhập tên cầu thủ"
                  whileFocus={{ scale: 1.02 }}
                />
                {errors.playerName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-3 flex items-center bg-red-900/20 p-2 rounded-lg"
                  >
                    <FaInfoCircle className="mr-2" />
                    {errors.playerName.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Image URL */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="flex items-center text-lg font-medium text-emerald-200 mb-4">
                  <motion.div
                    className="mr-3 p-2 bg-purple-600/30 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <FaImage className="text-purple-400" />
                  </motion.div>
                  URL hình ảnh *
                </label>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Input */}
                  <div>
                    <motion.input
                      {...register("image")}
                      type="url"
                      className="w-full px-6 py-4 bg-emerald-900/30 backdrop-blur-xl border border-emerald-600/40 rounded-2xl text-emerald-100 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400/60 transition-all duration-500 hover:bg-emerald-900/40"
                      placeholder="https://example.com/image.jpg"
                      whileFocus={{ scale: 1.02 }}
                    />
                    {errors.image && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-3 flex items-center bg-red-900/20 p-2 rounded-lg"
                      >
                        <FaInfoCircle className="mr-2" />
                        {errors.image.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Image Preview */}
                  <div className="flex items-center justify-center">
                    <motion.div
                      className="w-32 h-32 rounded-2xl overflow-hidden bg-emerald-900/30 border border-emerald-600/40 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", damping: 20 }}
                    >
                      {imagePreview ? (
                        <motion.img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            target.parentElement!.innerHTML = `
                              <div class="text-red-400 text-center p-4">
                                <div class="text-2xl mb-2">❌</div>
                                <div class="text-xs">Lỗi tải ảnh</div>
                              </div>
                            `;
                          }}
                        />
                      ) : (
                        <div className="text-emerald-400/50 text-center">
                          <FaImage className="text-3xl mb-2 mx-auto" />
                          <div className="text-xs">Xem trước</div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Cost */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="flex items-center text-lg font-medium text-emerald-200 mb-4">
                  <motion.div
                    className="mr-3 p-2 bg-yellow-600/30 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <FaDollarSign className="text-yellow-400" />
                  </motion.div>
                  Giá trị cầu thủ (VND) *
                </label>
                <motion.input
                  {...register("cost", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  step="1000000"
                  className="w-full px-6 py-4 bg-emerald-900/30 backdrop-blur-xl border border-emerald-600/40 rounded-2xl text-emerald-100 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400/60 transition-all duration-500 hover:bg-emerald-900/40"
                  placeholder="100,000,000"
                  whileFocus={{ scale: 1.02 }}
                />
                {errors.cost && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-3 flex items-center bg-red-900/20 p-2 rounded-lg"
                  >
                    <FaInfoCircle className="mr-2" />
                    {errors.cost.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Team */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="flex items-center text-lg font-medium text-emerald-200 mb-4">
                  <motion.div
                    className="mr-3 p-2 bg-blue-600/30 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <FaUsers className="text-blue-400" />
                  </motion.div>
                  Đội bóng *
                </label>
                <motion.select
                  {...register("team")}
                  className="w-full px-6 py-4 bg-emerald-900/30 backdrop-blur-xl border border-emerald-600/40 rounded-2xl text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400/60 transition-all duration-500 hover:bg-emerald-900/40"
                  whileFocus={{ scale: 1.02 }}
                >
                  <option value="" className="bg-emerald-900 text-emerald-100">
                    Chọn đội bóng
                  </option>
                  {teams.map((team) => (
                    <option
                      key={team._id}
                      value={team._id}
                      className="bg-emerald-900 text-emerald-100"
                    >
                      {team.teamName}
                    </option>
                  ))}
                </motion.select>
                {errors.team && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-3 flex items-center bg-red-900/20 p-2 rounded-lg"
                  >
                    <FaInfoCircle className="mr-2" />
                    {errors.team.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <label className="flex items-center text-lg font-medium text-emerald-200 mb-4">
                  <motion.div
                    className="mr-3 p-2 bg-cyan-600/30 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <FaInfoCircle className="text-cyan-400" />
                  </motion.div>
                  Thông tin cầu thủ *
                </label>
                <motion.textarea
                  {...register("information")}
                  rows={4}
                  className="w-full px-6 py-4 bg-emerald-900/30 backdrop-blur-xl border border-emerald-600/40 rounded-2xl text-emerald-100 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400/60 transition-all duration-500 resize-none hover:bg-emerald-900/40"
                  placeholder="Nhập thông tin về cầu thủ..."
                  whileFocus={{ scale: 1.02 }}
                />
                {errors.information && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-3 flex items-center bg-red-900/20 p-2 rounded-lg"
                  >
                    <FaInfoCircle className="mr-2" />
                    {errors.information.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Is Captain Switch */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-gradient-to-r from-emerald-900/30 to-yellow-900/30 p-6 rounded-2xl border border-emerald-600/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <motion.div
                      className="mr-4 p-3 bg-yellow-600/30 rounded-xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <FaTrophy className="text-yellow-400 text-xl" />
                    </motion.div>
                    <div>
                      <h4 className="text-lg font-bold text-emerald-200">
                        Đội trưởng
                      </h4>
                      <p className="text-sm text-emerald-400/70">
                        Cầu thủ này có phải là đội trưởng không?
                      </p>
                    </div>
                  </div>

                  {/* Custom Switch */}
                  <motion.div
                    className={`relative w-16 h-8 rounded-full cursor-pointer transition-all duration-300 ${
                      isCaptain
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg shadow-yellow-500/30"
                        : "bg-emerald-800/50 border border-emerald-700/50"
                    }`}
                    onClick={() => {
                      setIsCaptain(!isCaptain);
                      setValue("isCaptain", !isCaptain);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={`absolute top-1 w-6 h-6 rounded-full shadow-lg transition-all duration-300 ${
                        isCaptain ? "left-9 bg-white" : "left-1 bg-emerald-400"
                      }`}
                      animate={{
                        x: isCaptain ? 0 : 0,
                        scale: isCaptain ? 1.1 : 1,
                      }}
                      transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 300,
                      }}
                    >
                      {isCaptain && (
                        <motion.div
                          className="w-full h-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <FaTrophy className="text-yellow-500 text-xs" />
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Form Actions */}
              <motion.div
                className="flex justify-end space-x-6 pt-8 border-t border-emerald-600/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-8 py-4 text-emerald-300 border border-emerald-600/50 rounded-2xl hover:bg-emerald-800/30 hover:border-emerald-500/70 disabled:opacity-50 transition-all duration-300 font-bold text-lg backdrop-blur-lg"
                >
                  Hủy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 transition-all duration-300 font-bold shadow-2xl flex items-center text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" />
                      {player ? "Cập nhật" : "Tạo mới"}
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

export default PlayerForm;
