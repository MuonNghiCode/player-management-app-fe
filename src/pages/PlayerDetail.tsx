import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaStar,
  FaCrown,
  FaComments,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaTrophy,
  FaFutbol,
  FaShieldAlt,
  FaUser,
  FaHeart,
  FaEye,
  FaDollarSign,
} from "react-icons/fa";
import { playerService, memberService } from "../services";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";

const PlayerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(1);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(1);
  const [isUpdatingComment, setIsUpdatingComment] = useState(false);
  const [isDeletingComment, setIsDeletingComment] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );

  // State for player data
  const [player, setPlayer] = useState<any>(null);
  const [playerLoading, setPlayerLoading] = useState(false);
  const [playerError, setPlayerError] = useState<string | null>(null);

  // Fetch player details
  const fetchPlayer = async () => {
    if (!id) return;

    setPlayerLoading(true);
    setPlayerError(null);
    try {
      const response = await playerService.getById(id);
      setPlayer(response.data?.player);
    } catch (error: any) {
      setPlayerError(error.message || "Lỗi khi tải thông tin cầu thủ");
    } finally {
      setPlayerLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayer();
  }, [id]);

  // Get comments from player data
  const playerComments = player?.comments || [];

  // Check if current user has already commented
  const userComment = playerComments.find(
    (comment: any) =>
      comment.author?._id === user?._id || comment.author === user?._id
  );

  // Submit new comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      const response = await memberService.addComment(id, {
        content: newComment,
        rating: newRating,
      });

      if (response.success) {
        setNewComment("");
        setNewRating(1);
        fetchPlayer();
        toast.success("Thêm bình luận thành công!");
      }
    } catch (error: any) {
      console.error("Error submitting comment:", error);
      toast.error(error.message || "Có lỗi xảy ra khi thêm bình luận!");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Edit comment
  const handleEditComment = (comment: any) => {
    setEditingCommentId(comment._id);
    setEditComment(comment.content);
    setEditRating(comment.rating);
  };

  const handleUpdateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !editingCommentId || !editComment.trim()) return;

    setIsUpdatingComment(true);
    try {
      const response = await memberService.updateComment(id, editingCommentId, {
        content: editComment,
        rating: editRating,
      });

      if (response.success) {
        setEditingCommentId(null);
        setEditComment("");
        setEditRating(1);
        fetchPlayer();
        toast.success("Cập nhật bình luận thành công!");
      }
    } catch (error: any) {
      console.error("Error updating comment:", error);
      toast.error(error.message || "Có lỗi xảy ra khi cập nhật bình luận!");
    } finally {
      setIsUpdatingComment(false);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId: string) => {
    setDeletingCommentId(commentId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteComment = async () => {
    if (!id || !deletingCommentId) return;

    setIsDeletingComment(true);
    try {
      const response = await memberService.deleteComment(id, deletingCommentId);
      if (response.success) {
        fetchPlayer();
        toast.success("Xóa bình luận thành công!");
      }
    } catch (error: any) {
      console.error("Error deleting comment:", error);
      toast.error(error.message || "Có lỗi xảy ra khi xóa bình luận!");
    } finally {
      setIsDeletingComment(false);
      setShowDeleteConfirm(false);
      setDeletingCommentId(null);
    }
  };

  const cancelDeleteComment = () => {
    setShowDeleteConfirm(false);
    setDeletingCommentId(null);
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditComment("");
    setEditRating(1);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3].map((star) => (
          <span
            key={star}
            className={`text-xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderStarInput = (
    rating: number,
    onChange: (rating: number) => void
  ) => {
    return (
      <div className="flex space-x-2">
        {[1, 2, 3].map((star) => (
          <motion.button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`text-3xl ${
              star <= rating ? "text-yellow-400" : "text-gray-500"
            } hover:text-yellow-500 transition-colors duration-200`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            ★
          </motion.button>
        ))}
      </div>
    );
  };

  if (playerLoading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex justify-center items-center">
        {/* Ultra Premium Loading Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.4) 0%, transparent 50%),
                linear-gradient(45deg, rgba(6, 182, 212, 0.1) 0%, transparent 25%, rgba(16, 185, 129, 0.1) 50%, transparent 75%, rgba(34, 197, 94, 0.1) 100%)
              `,
            }}
            animate={{
              backgroundPosition: [
                "20% 80%, 80% 20%, 0% 0%",
                "60% 60%, 20% 80%, 100% 100%",
                "20% 80%, 80% 20%, 0% 0%",
              ],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* 3D Loading Spinner */}
        <motion.div
          className="relative z-10"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center shadow-2xl">
            <FaFutbol className="text-white text-3xl" />
          </div>
        </motion.div>

        <motion.p
          className="absolute bottom-1/3 text-white text-xl font-bold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Đang tải thông tin cầu thủ...
        </motion.p>
      </div>
    );
  }

  if (playerError || !player) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex justify-center items-center">
        {/* Ultra Premium Error Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: `
                radial-gradient(circle at 20% 80%, rgba(239, 68, 68, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(220, 38, 38, 0.4) 0%, transparent 50%),
                linear-gradient(45deg, rgba(239, 68, 68, 0.1) 0%, transparent 25%, rgba(220, 38, 38, 0.1) 50%, transparent 75%, rgba(185, 28, 28, 0.1) 100%)
              `,
            }}
            animate={{
              backgroundPosition: [
                "20% 80%, 80% 20%, 0% 0%",
                "60% 60%, 20% 80%, 100% 100%",
                "20% 80%, 80% 20%, 0% 0%",
              ],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 text-center max-w-lg mx-auto px-6">
          <motion.div
            className="text-8xl mb-6"
            animate={{
              scale: [1, 1.1, 1],
              rotateY: [0, 10, -10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            😞
          </motion.div>

          <motion.h2
            className="text-4xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Không tìm thấy cầu thủ
          </motion.h2>

          <motion.p
            className="text-gray-300 text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {playerError || "Cầu thủ không tồn tại"}
          </motion.p>

          <motion.button
            onClick={() => navigate("/")}
            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <FaArrowLeft />
              <span>Về trang chủ</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Ultra Premium Background with Team Flag Effect and Football Field Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Team Flag Background */}
        {player?.team?.image && (
          <motion.div
            className="absolute inset-0 opacity-15"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <img
              src={player.team.image}
              alt={player.team.teamName}
              className="w-full h-full object-cover blur-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
          </motion.div>
        )}

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

        {/* Stadium Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-15"
          animate={{
            backgroundPosition: ["0% 0%", "50% 50%", "0% 0%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{
            background: `
              linear-gradient(0deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Tech Circuit Hexagon Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{
            background: `
              radial-gradient(circle at 15% 15%, rgba(16, 185, 129, 0.3) 2px, transparent 2px),
              radial-gradient(circle at 85% 85%, rgba(20, 184, 166, 0.3) 2px, transparent 2px),
              radial-gradient(circle at 15% 85%, rgba(34, 197, 94, 0.2) 2px, transparent 2px),
              radial-gradient(circle at 85% 15%, rgba(6, 182, 212, 0.2) 2px, transparent 2px)
            `,
            backgroundSize: "60px 60px, 80px 80px, 100px 100px, 120px 120px",
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
          className="absolute bottom-16 left-16 w-64 h-64 lg:w-96 lg:h-96"
          animate={{
            scale: [1.1, 1, 1.2, 1.1],
            x: [0, 40, -20, 0],
            y: [0, -20, 10, 0],
            opacity: [0.1, 0.4, 0.2, 0.1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-teal-400/20 to-emerald-500/20 rounded-full blur-3xl"></div>
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

      {/* Ultra Premium Hero Section */}
      <div className="relative min-h-screen">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/")}
          className="absolute top-8 left-8 z-10 group flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 text-white font-medium transition-all duration-500 shadow-xl hover:shadow-2xl cursor-pointer"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Quay lại</span>
        </motion.button>

        <div className="container mx-auto px-4 py-8 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen">
            {/* Left Side - Player Info (3D Cards) */}
            <motion.div
              className="space-y-8 lg:pr-8"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
              {/* Player Name Card */}
              <motion.div
                className="relative group"
                whileHover={{
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 2,
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-700 overflow-hidden">
                  {/* Glassmorphism layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/2 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.h1
                      className="text-4xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent mb-4"
                      style={{ backgroundSize: "200% 100%" }}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {player.playerName}
                    </motion.h1>

                    <div className="flex items-center space-x-4 text-emerald-200 text-xl lg:text-2xl">
                      <FaShieldAlt className="text-emerald-400" />
                      <span className="font-bold">{player.team?.teamName}</span>
                      {player.isCaptain && (
                        <motion.div
                          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-full border border-yellow-500/30"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <FaCrown className="text-yellow-400" />
                          <span className="text-yellow-300 font-bold">
                            Đội trưởng
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </motion.div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Price Card */}
                <motion.div
                  className="relative group"
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    rotateX: 5,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-green-500/20 transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 text-center">
                      <motion.div
                        className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1, rotateY: 180 }}
                        transition={{ duration: 0.6 }}
                      >
                        <FaDollarSign className="text-white text-xl" />
                      </motion.div>
                      <div className="text-3xl font-black text-white mb-2">
                        {player.cost
                          ? `đ${player.cost.toLocaleString()}`
                          : "đ0"}
                      </div>
                      <div className="text-green-200 font-medium">Giá tiền</div>
                      <div className="text-white/60 text-sm mt-1">
                        Triệu VND
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Rating Card */}
                <motion.div
                  className="relative group"
                  whileHover={{
                    scale: 1.05,
                    rotateY: -10,
                    rotateX: 5,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-yellow-500/20 transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 text-center">
                      <motion.div
                        className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1, rotateY: 180 }}
                        transition={{ duration: 0.6 }}
                      >
                        <FaStar className="text-white text-xl" />
                      </motion.div>
                      <div className="text-3xl font-black text-white mb-2">
                        {player.avgRating?.toFixed(1) || "0.0"}
                      </div>
                      <div className="text-yellow-200 font-medium">
                        Đánh giá
                      </div>
                      <div className="flex justify-center mt-2">
                        {renderStars(player.avgRating || 0)}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Comments Card */}
                <motion.div
                  className="relative group"
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    rotateX: -5,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-emerald-500/20 transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 text-center">
                      <motion.div
                        className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1, rotateY: 180 }}
                        transition={{ duration: 0.6 }}
                      >
                        <FaComments className="text-white text-xl" />
                      </motion.div>
                      <div className="text-3xl font-black text-white mb-2">
                        {player.commentCount || 0}
                      </div>
                      <div className="text-emerald-200 font-medium">
                        Bình luận
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Trophy Card (if captain) */}
                {player.isCaptain && (
                  <motion.div
                    className="relative group"
                    whileHover={{
                      scale: 1.05,
                      rotateY: -10,
                      rotateX: -5,
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                  >
                    <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-purple-500/20 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative z-10 text-center">
                        <motion.div
                          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
                          whileHover={{ scale: 1.1, rotateY: 180 }}
                          transition={{ duration: 0.6 }}
                        >
                          <FaTrophy className="text-white text-xl" />
                        </motion.div>
                        <div className="text-2xl font-black text-white mb-2">
                          Đội trưởng
                        </div>
                        <div className="text-purple-200 font-medium">
                          Vai trò
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Right Side - Player Image (3D) with Enhanced Diagonal Patterns */}
            <motion.div
              className="relative flex justify-center items-center min-h-screen lg:pl-12"
              style={{ perspective: "1000px" }}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            >
              {/* Enhanced eSports Diagonal Background Pattern with 3D Effects */}
              <div
                className="absolute inset-0 overflow-hidden rounded-3xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Main 3D Diagonal Lines Layer 1 */}
                <motion.div
                  className="absolute inset-0 opacity-40"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    rotateX: [0, 2, 0],
                    rotateY: [0, 1, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    background: `
                      repeating-linear-gradient(
                        45deg,
                        rgba(16, 185, 129, 0.8) 0px,
                        rgba(16, 185, 129, 0.8) 8px,
                        transparent 8px,
                        transparent 60px
                      ),
                      repeating-linear-gradient(
                        -45deg,
                        rgba(20, 184, 166, 0.6) 0px,
                        rgba(20, 184, 166, 0.6) 6px,
                        transparent 6px,
                        transparent 55px
                      )
                    `,
                    transform: "translateZ(20px) rotateX(5deg)",
                    filter: "drop-shadow(0 10px 30px rgba(16, 185, 129, 0.4))",
                  }}
                />

                {/* Secondary 3D Diagonal Pattern Layer 2 */}
                <motion.div
                  className="absolute inset-0 opacity-35"
                  animate={{
                    backgroundPosition: ["100% 0%", "0% 100%", "100% 0%"],
                    rotateX: [0, -1, 0],
                    rotateY: [0, -2, 0],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    background: `
                      repeating-linear-gradient(
                        135deg,
                        rgba(34, 197, 94, 0.7) 0px,
                        rgba(34, 197, 94, 0.7) 5px,
                        transparent 5px,
                        transparent 40px
                      ),
                      repeating-linear-gradient(
                        -135deg,
                        rgba(6, 182, 212, 0.5) 0px,
                        rgba(6, 182, 212, 0.5) 4px,
                        transparent 4px,
                        transparent 38px
                      )
                    `,
                    transform: "translateZ(15px) rotateX(-3deg)",
                    filter: "drop-shadow(0 8px 25px rgba(34, 197, 94, 0.3))",
                  }}
                />

                {/* Tech Grid Overlay 3D Layer 3 */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  animate={{
                    backgroundPosition: ["0% 0%", "50% 50%", "0% 0%"],
                    rotateX: [0, 1, 0],
                    rotateY: [0, 2, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    background: `
                      linear-gradient(0deg, rgba(16, 185, 129, 0.4) 3px, transparent 3px),
                      linear-gradient(90deg, rgba(16, 185, 129, 0.4) 3px, transparent 3px)
                    `,
                    backgroundSize: "50px 50px",
                    transform: "translateZ(25px) rotateX(2deg)",
                    filter: "drop-shadow(0 6px 20px rgba(16, 185, 129, 0.5))",
                  }}
                />

                {/* Enhanced Corner Tech Accents with 3D */}
                <motion.div
                  className="absolute top-4 right-4 w-12 h-12 border-r-4 border-t-4 border-emerald-400 opacity-60"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-12 h-12 border-l-4 border-b-4 border-teal-400 opacity-60"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                />

                {/* Hexagon Tech Elements */}
                <motion.div
                  className="absolute top-1/4 left-1/4 w-8 h-8 border-2 border-emerald-300 opacity-40"
                  style={{
                    clipPath:
                      "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-1/4 right-1/4 w-6 h-6 border-2 border-teal-300 opacity-40"
                  style={{
                    clipPath:
                      "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
                  }}
                  animate={{
                    rotate: [360, 0],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
              </div>

              <motion.div
                className="relative group"
                whileHover={{
                  scale: 1.05,
                  rotateY: -10,
                  rotateX: 5,
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* 3D Player Image Container - Larger Full Width Rectangle */}
                <div className="relative w-full h-[70vh] lg:h-[80vh] xl:h-[90vh] 2xl:h-[95vh]">
                  {/* Football Field Pattern Background */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    style={{
                      background: `
                        repeating-linear-gradient(
                          45deg,
                          rgba(16, 185, 129, 0.1) 0px,
                          rgba(16, 185, 129, 0.1) 2px,
                          transparent 2px,
                          transparent 12px
                        ),
                        repeating-linear-gradient(
                          -45deg,
                          rgba(20, 184, 166, 0.08) 0px,
                          rgba(20, 184, 166, 0.08) 2px,
                          transparent 2px,
                          transparent 15px
                        ),
                        radial-gradient(circle at center, rgba(34, 197, 94, 0.1) 0%, transparent 70%)
                      `,
                    }}
                  />

                  {/* eSports Grid Pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-15"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      background: `
                        linear-gradient(0deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: "20px 20px",
                    }}
                  />

                  {/* Hexagon Tech Pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 60,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      background: `
                        radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.3) 2px, transparent 2px),
                        radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.3) 2px, transparent 2px)
                      `,
                      backgroundSize: "30px 30px",
                    }}
                  />

                  {/* Multiple depth layers for 3D effect */}
                  <motion.div
                    className="absolute inset-4 bg-gradient-to-br from-emerald-500/30 to-teal-600/30 rounded-2xl blur-2xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  <motion.div
                    className="absolute inset-2 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-2xl blur-xl"
                    animate={{
                      scale: [1.1, 1, 1.1],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />

                  {/* Main Image with Enhanced Football Field Effects - Full Rectangle */}
                  <motion.div
                    className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl"
                    style={{
                      boxShadow:
                        "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(16, 185, 129, 0.3)",
                    }}
                  >
                    {/* Football Field Lines Behind Image */}
                    <motion.div
                      className="absolute inset-0 opacity-25"
                      animate={{
                        backgroundPosition: ["0% 0%", "50% 50%", "0% 0%"],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        background: `
                          repeating-linear-gradient(
                            90deg,
                            rgba(255, 255, 255, 0.1) 0px,
                            rgba(255, 255, 255, 0.1) 1px,
                            transparent 1px,
                            transparent 40px
                          ),
                          repeating-linear-gradient(
                            0deg,
                            rgba(255, 255, 255, 0.08) 0px,
                            rgba(255, 255, 255, 0.08) 1px,
                            transparent 1px,
                            transparent 40px
                          )
                        `,
                      }}
                    />

                    {/* eSports Diagonal Lines */}
                    <motion.div
                      className="absolute inset-0 opacity-20"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                      }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        background: `
                          repeating-linear-gradient(
                            45deg,
                            rgba(16, 185, 129, 0.3) 0px,
                            rgba(16, 185, 129, 0.3) 3px,
                            transparent 3px,
                            transparent 25px
                          )
                        `,
                      }}
                    />

                    {/* Tech Circuit Pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-15"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 45,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        background: `
                          radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.4) 1px, transparent 1px),
                          radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.4) 1px, transparent 1px),
                          radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                          radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize:
                          "25px 25px, 30px 30px, 35px 35px, 40px 40px",
                      }}
                    />

                    <img
                      src={player.image}
                      alt={player.playerName}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 relative z-10"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center top",
                      }}
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20"></div>

                    {/* eSports Corner Accents */}
                    <motion.div
                      className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-emerald-400 opacity-60 z-30"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-teal-400 opacity-60 z-30"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.div
                      className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-emerald-400 opacity-60 z-30"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    <motion.div
                      className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-teal-400 opacity-60 z-30"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                    />

                    {/* Floating particles around image */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full z-25"
                        style={{
                          left: `${10 + (i % 4) * 25}%`,
                          top: `${10 + Math.floor(i / 4) * 80}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          x: [0, Math.sin(i) * 10, 0],
                          opacity: [0.3, 1, 0.3],
                          scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 3 + i * 0.2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background:
                        "radial-gradient(ellipse, rgba(16, 185, 129, 0.4) 0%, transparent 70%)",
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>

                {/* Floating stats around image */}
                <motion.div
                  className="absolute -top-8 -left-8 bg-white/10 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/20"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="text-center">
                    <FaEye className="text-teal-400 text-xl mx-auto mb-1" />
                    <div className="text-white font-bold text-sm">1.2K</div>
                    <div className="text-white/60 text-xs">Lượt xem</div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-8 -right-8 bg-white/10 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/20"
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <div className="text-center">
                    <FaHeart className="text-red-400 text-xl mx-auto mb-1" />
                    <div className="text-white font-bold text-sm">845</div>
                    <div className="text-white/60 text-xs">Yêu thích</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ultra Premium Comments Section */}
      <div className="relative bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 backdrop-blur-3xl">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Comments Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent mb-4">
                Bình luận & Đánh giá
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Chia sẻ ý kiến và đánh giá của bạn về cầu thủ
              </p>
            </motion.div>

            {/* Add Comment Form - Only for authenticated members (not admin) */}
            {isAuthenticated && !isAdmin && !userComment && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5"></div>

                  <form
                    onSubmit={handleSubmitComment}
                    className="relative z-10 space-y-6"
                  >
                    <div>
                      <label className="block text-lg font-bold text-white mb-4">
                        Đánh giá của bạn
                      </label>
                      {renderStarInput(newRating, setNewRating)}
                    </div>

                    <div>
                      <label className="block text-lg font-bold text-white mb-4">
                        Bình luận
                      </label>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={4}
                        className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-xl resize-none"
                        placeholder="Chia sẻ ý kiến của bạn về cầu thủ này..."
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmittingComment}
                      className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 disabled:opacity-50 overflow-hidden"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                        <FaComments />
                        <span>
                          {isSubmittingComment
                            ? "Đang gửi..."
                            : "Gửi bình luận"}
                        </span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Message for users who already commented */}
            {isAuthenticated && !isAdmin && userComment && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="relative bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent backdrop-blur-2xl rounded-3xl p-8 border border-blue-400/20 shadow-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
                      <FaUser className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-200 mb-2">
                        Bạn đã bình luận
                      </h3>
                      <p className="text-blue-100">
                        Mỗi thành viên chỉ có thể bình luận một lần cho mỗi cầu
                        thủ.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Message for admin */}
            {isAuthenticated && isAdmin && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="relative bg-gradient-to-br from-yellow-500/10 via-yellow-400/5 to-transparent backdrop-blur-2xl rounded-3xl p-8 border border-yellow-400/20 shadow-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center">
                      <FaShieldAlt className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-200 mb-2">
                        Quản trị viên
                      </h3>
                      <p className="text-yellow-100">
                        Quản trị viên không thể bình luận hoặc đánh giá cầu thủ.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Message for guests */}
            {!isAuthenticated && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="relative bg-gradient-to-br from-gray-500/10 via-gray-400/5 to-transparent backdrop-blur-2xl rounded-3xl p-8 border border-gray-400/20 shadow-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center">
                      <FaUser className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-200 mb-2">
                        Yêu cầu đăng nhập
                      </h3>
                      <p className="text-gray-100">
                        Vui lòng{" "}
                        <motion.button
                          onClick={() => navigate("/login")}
                          className="text-emerald-400 hover:text-emerald-300 underline font-bold"
                          whileHover={{ scale: 1.05 }}
                        >
                          đăng nhập
                        </motion.button>{" "}
                        để bình luận và đánh giá cầu thủ.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Comments List */}
            {playerComments.length === 0 ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-8xl mb-6"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  💬
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-300 mb-4">
                  Chưa có bình luận nào
                </h3>
                <p className="text-gray-400">
                  Hãy là người đầu tiên chia sẻ ý kiến về cầu thủ này!
                </p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {playerComments.map((comment: any, index: number) => (
                  <motion.div
                    key={comment._id}
                    className="relative group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {editingCommentId === comment._id ? (
                        <form
                          onSubmit={handleUpdateComment}
                          className="relative z-10 space-y-6"
                        >
                          <div>
                            <label className="block text-lg font-bold text-white mb-4">
                              Đánh giá
                            </label>
                            {renderStarInput(editRating, setEditRating)}
                          </div>
                          <div>
                            <label className="block text-lg font-bold text-white mb-4">
                              Bình luận
                            </label>
                            <textarea
                              value={editComment}
                              onChange={(e) => setEditComment(e.target.value)}
                              rows={4}
                              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-xl resize-none"
                              required
                            />
                          </div>
                          <div className="flex space-x-4">
                            <motion.button
                              type="submit"
                              disabled={isUpdatingComment}
                              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 disabled:opacity-50"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {isUpdatingComment
                                ? "Đang cập nhật..."
                                : "Cập nhật"}
                            </motion.button>
                            <motion.button
                              type="button"
                              onClick={cancelEdit}
                              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-bold shadow-lg hover:shadow-gray-500/30 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Hủy
                            </motion.button>
                          </div>
                        </form>
                      ) : (
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <div className="flex items-center space-x-4 mb-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center">
                                  <FaUser className="text-white text-lg" />
                                </div>
                                <div>
                                  <h4 className="text-xl font-bold text-white">
                                    {comment.author?.name || "Ẩn danh"}
                                  </h4>
                                  <div className="flex items-center space-x-2">
                                    {renderStars(comment.rating)}
                                    <span className="text-gray-400 text-sm">
                                      {new Date(
                                        comment.createdAt
                                      ).toLocaleString("vi-VN")}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Edit/Delete buttons - Only for comment author */}
                            {isAuthenticated &&
                              user &&
                              (comment.author?._id === user._id ||
                                comment.author === user._id) && (
                                <div className="flex space-x-3">
                                  <motion.button
                                    onClick={() => handleEditComment(comment)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-xl border border-blue-400/30 hover:bg-blue-500/30 transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <FaEdit className="text-sm" />
                                    <span className="text-sm font-medium">
                                      Sửa
                                    </span>
                                  </motion.button>
                                  <motion.button
                                    onClick={() =>
                                      handleDeleteComment(comment._id)
                                    }
                                    disabled={isDeletingComment}
                                    className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-xl border border-red-400/30 hover:bg-red-500/30 transition-all duration-300 disabled:opacity-50"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <FaTrash className="text-sm" />
                                    <span className="text-sm font-medium">
                                      {isDeletingComment
                                        ? "Đang xóa..."
                                        : "Xóa"}
                                    </span>
                                  </motion.button>
                                </div>
                              )}
                          </div>

                          <p className="text-gray-200 text-lg leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      )}

                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Xóa bình luận"
        message="Bạn có chắc chắn muốn xóa bình luận này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={confirmDeleteComment}
        onCancel={cancelDeleteComment}
      />
    </div>
  );
};

export default PlayerDetail;
