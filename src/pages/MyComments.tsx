import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaStar,
  FaComments,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaCalendarAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { memberService } from "../services";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import {
  ConfirmModal,
  LoadingSpinner,
  ErrorDisplay,
  EmptyState,
} from "../components";

interface MyComment {
  _id: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  player: {
    _id: string;
    playerName: string;
    image: string;
    team?: {
      teamName: string;
      image: string;
    };
  };
}

const MyComments: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [comments, setComments] = useState<MyComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );

  // Fetch user's comments
  const fetchMyComments = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);
    try {
      const response = await memberService.getMyComments();
      if (response.success) {
        setComments((response.data?.comments as unknown as MyComment[]) || []);
      } else {
        setError(response.message || "Không thể tải bình luận");
      }
    } catch (error: any) {
      setError(error.message || "Có lỗi xảy ra khi tải bình luận");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchMyComments();
  }, [isAuthenticated, navigate]);

  // Handle edit comment
  const handleEditComment = (comment: MyComment) => {
    setEditingCommentId(comment._id);
    setEditComment(comment.content);
    setEditRating(comment.rating);
  };

  const handleUpdateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCommentId || !editComment.trim()) return;

    setIsUpdating(true);
    try {
      const comment = comments.find((c) => c._id === editingCommentId);
      if (!comment) return;

      const response = await memberService.updateComment(
        comment.player._id,
        editingCommentId,
        {
          content: editComment,
          rating: editRating,
        }
      );

      if (response.success) {
        setEditingCommentId(null);
        setEditComment("");
        setEditRating(1);
        fetchMyComments();
        toast.success("Cập nhật bình luận thành công!");
      }
    } catch (error: any) {
      console.error("Error updating comment:", error);
      toast.error(error.message || "Có lỗi xảy ra khi cập nhật bình luận!");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle delete comment
  const handleDeleteComment = (commentId: string) => {
    setDeletingCommentId(commentId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteComment = async () => {
    if (!deletingCommentId) return;

    setIsDeleting(true);
    try {
      const comment = comments.find((c) => c._id === deletingCommentId);
      if (!comment) return;

      const response = await memberService.deleteComment(
        comment.player._id,
        deletingCommentId
      );

      if (response.success) {
        fetchMyComments();
        toast.success("Xóa bình luận thành công!");
      }
    } catch (error: any) {
      console.error("Error deleting comment:", error);
      toast.error(error.message || "Có lỗi xảy ra khi xóa bình luận!");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
      setDeletingCommentId(null);
    }
  };

  const cancelDelete = () => {
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

  if (loading) {
    return (
      <LoadingSpinner
        type="page"
        message="Đang tải bình luận của bạn..."
        variant="football"
        size="xl"
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
        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/")}
          className="absolute top-8 left-8 z-50 group flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 text-white font-medium transition-all duration-500 shadow-xl hover:shadow-2xl"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Về trang chủ</span>
        </motion.button>

        <div className="container mx-auto px-4 py-16 lg:py-24">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl"
                animate={{
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity },
                }}
              >
                <FaComments className="text-white text-4xl" />
              </motion.div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent mb-4">
                Bình luận của tôi
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Quản lý tất cả bình luận và đánh giá của bạn về các cầu thủ
              </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Total Comments */}
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-emerald-500/20 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 text-center">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <FaComments className="text-white text-xl" />
                    </motion.div>
                    <div className="text-3xl font-black text-white mb-2">
                      {comments.length}
                    </div>
                    <div className="text-emerald-200 font-medium">
                      Tổng bình luận
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Average Rating */}
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05, rotateY: -5 }}
                style={{ transformStyle: "preserve-3d" }}
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
                      {comments.length > 0
                        ? (
                            comments.reduce((sum, c) => sum + c.rating, 0) /
                            comments.length
                          ).toFixed(1)
                        : "0.0"}
                    </div>
                    <div className="text-yellow-200 font-medium">
                      Đánh giá TB
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-blue-500/20 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 text-center">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <FaCalendarAlt className="text-white text-xl" />
                    </motion.div>
                    <div className="text-3xl font-black text-white mb-2">
                      {comments.length > 0
                        ? new Date(
                            Math.max(
                              ...comments.map((c) =>
                                new Date(c.updatedAt).getTime()
                              )
                            )
                          ).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                          })
                        : "--"}
                    </div>
                    <div className="text-blue-200 font-medium">
                      Hoạt động gần đây
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Comments List */}
            {error ? (
              <ErrorDisplay
                type="inline"
                error={error}
                onRetry={fetchMyComments}
                variant="general"
              />
            ) : comments.length === 0 ? (
              <EmptyState
                type="comments"
                onAction={() => navigate("/")}
                size="lg"
              />
            ) : (
              <div className="space-y-6">
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment._id}
                    className="relative group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
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
                              disabled={isUpdating}
                              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 disabled:opacity-50"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {isUpdating ? "Đang cập nhật..." : "Cập nhật"}
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
                          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
                            {/* Player Info */}
                            <div className="flex items-center space-x-4 mb-6 lg:mb-0">
                              <Link
                                to={`/players/${comment.player._id}`}
                                className="group"
                              >
                                <motion.div
                                  className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-300"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  <img
                                    src={comment.player.image}
                                    alt={comment.player.playerName}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </motion.div>
                              </Link>

                              <div>
                                <Link
                                  to={`/players/${comment.player._id}`}
                                  className="group"
                                >
                                  <h4 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                                    {comment.player.playerName}
                                  </h4>
                                </Link>
                                {comment.player.team && (
                                  <div className="flex items-center space-x-2 mt-1">
                                    <FaShieldAlt className="text-emerald-400 text-sm" />
                                    <span className="text-gray-300 text-sm">
                                      {comment.player.team.teamName}
                                    </span>
                                  </div>
                                )}
                                <div className="flex items-center space-x-2 mt-2">
                                  {renderStars(comment.rating)}
                                  <span className="text-gray-400 text-sm">
                                    {new Date(comment.createdAt).toLocaleString(
                                      "vi-VN"
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Comment Content */}
                            <div className="flex-1">
                              <p className="text-gray-200 text-lg leading-relaxed mb-4">
                                {comment.content}
                              </p>

                              {/* Action Buttons */}
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
                                  disabled={isDeleting}
                                  className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-xl border border-red-400/30 hover:bg-red-500/30 transition-all duration-300 disabled:opacity-50"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <FaTrash className="text-sm" />
                                  <span className="text-sm font-medium">
                                    {isDeleting ? "Đang xóa..." : "Xóa"}
                                  </span>
                                </motion.button>
                              </div>
                            </div>
                          </div>
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
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default MyComments;
