import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { debounce } from "lodash";
import { teamService } from "../../services";
import { useAuth } from "../../contexts/AuthContext";
import { DEBOUNCE_DELAYS } from "../../constants";
import ConfirmModal from "../../components/ConfirmModal";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorDisplay from "../../components/ErrorDisplay";
import EmptyState from "../../components/EmptyState";
import TeamForm from "../../components/teams/TeamForm";
import TeamDetail from "../../components/teams/TeamDetail";
import toast from "react-hot-toast";
import {
  FaUsers,
  FaSearch,
  FaTimes,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCrown,
  FaDollarSign,
  FaCalendar,
  FaTrophy,
  FaEye,
} from "react-icons/fa";
import type { Team, CreateTeamRequest, UpdateTeamRequest } from "../../types";

const AdminTeams: React.FC = () => {
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [viewingTeam, setViewingTeam] = useState<Team | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingTeam, setDeletingTeam] = useState<Team | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for teams
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch teams
  const fetchTeams = useCallback(async (search: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await teamService.getAll({ search });
      setTeams(response.data?.teams || []);
    } catch (err: any) {
      setError(err.message || "Lỗi khi tải dữ liệu đội bóng");
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced fetch function with search indicator
  const debouncedFetchTeams = useCallback(
    debounce((search: string) => {
      setIsSearching(false); // Search completed
      fetchTeams(search);
    }, DEBOUNCE_DELAYS.SEARCH),
    [fetchTeams]
  );

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setIsSearching(true); // Start searching
  };

  useEffect(() => {
    debouncedFetchTeams(searchTerm);

    // Cleanup function to cancel debounce on unmount
    return () => {
      debouncedFetchTeams.cancel();
    };
  }, [searchTerm, debouncedFetchTeams]);

  const refreshData = () => {
    fetchTeams(searchTerm);
  };

  const handleDeleteTeam = async (id: string) => {
    const team = teams.find((t) => t._id === id);
    if (!team) return;

    setDeletingTeam(team);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteTeam = async () => {
    if (!deletingTeam) return;

    setIsDeleting(true);
    try {
      const response = await teamService.deleteById(deletingTeam._id);
      if (response.success) {
        toast.success("Xóa đội bóng thành công!");
        refreshData(); // Refresh data
        setShowDeleteConfirm(false);
        setDeletingTeam(null);
      }
    } catch (error: any) {
      toast.error(error.message || "Xóa đội bóng thất bại!");
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDeleteTeam = () => {
    setShowDeleteConfirm(false);
    setDeletingTeam(null);
  };

  const handleSubmitForm = async (
    data: CreateTeamRequest | UpdateTeamRequest
  ) => {
    setIsSubmitting(true);
    try {
      if (editingTeam) {
        // Update team
        const response = await teamService.update(editingTeam._id, data);
        if (response.success) {
          toast.success("Cập nhật đội bóng thành công!");
          setEditingTeam(null);
          refreshData();
        }
      } else {
        // Create new team
        const response = await teamService.create(data as CreateTeamRequest);
        if (response.success) {
          toast.success("Thêm đội bóng thành công!");
          setShowCreateForm(false);
          refreshData();
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
    setEditingTeam(null);
  };

  const handleEditTeam = (team: Team) => {
    setEditingTeam(team);
  };

  const handleViewTeam = (team: Team) => {
    setViewingTeam(team);
  };

  const handleCloseTeamDetail = () => {
    setViewingTeam(null);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 flex justify-center items-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(16,185,129,0.05),rgba(6,182,212,0.05),rgba(16,185,129,0.05))]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative z-10 text-center bg-emerald-900/20 backdrop-blur-2xl rounded-3xl p-12 border border-emerald-500/20 shadow-2xl max-w-md mx-4"
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🚫
          </motion.div>
          <motion.h2
            className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Truy cập bị từ chối
          </motion.h2>
          <motion.p
            className="text-emerald-200/80 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Chỉ Admin mới có thể truy cập trang này.
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 relative overflow-hidden">
      {/* Advanced Background */}
      <div className="absolute inset-0">
        {/* Multiple gradient layers */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(16,185,129,0.1),rgba(6,182,212,0.1),rgba(16,185,129,0.1))]"></div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,185,129,0.3)_1px,transparent_1px),linear-gradient(rgba(16,185,129,0.3)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h1
              className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent mb-4 flex items-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", damping: 20 }}
            >
              <motion.div
                className="mr-4 p-4 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-2xl shadow-2xl"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <FaUsers className="text-white text-2xl" />
              </motion.div>
              Quản lý đội bóng
            </motion.h1>
            <motion.p
              className="text-emerald-200/90 text-xl font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Thêm, sửa, xóa đội bóng trong hệ thống
            </motion.p>
          </motion.div>

          <motion.button
            onClick={() => setShowCreateForm(true)}
            className="group bg-gradient-to-r from-emerald-500 to-cyan-600 text-white px-8 py-4 rounded-2xl hover:from-emerald-600 hover:to-cyan-700 transition-all duration-300 flex items-center space-x-3 font-bold text-lg shadow-2xl hover:shadow-emerald-500/25 hover:scale-105"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="p-1 bg-white/20 rounded-lg"
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <FaPlus className="text-lg" />
            </motion.div>
            <span>Thêm đội bóng</span>
          </motion.button>
        </motion.div>

        {/* Enhanced Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-emerald-900/20 backdrop-blur-2xl rounded-3xl border border-emerald-500/20 p-8 mb-12 shadow-2xl"
        >
          <div className="flex items-center space-x-6">
            <div className="flex-1">
              <motion.label
                className="flex items-center text-lg font-medium text-emerald-200 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.div
                  className="mr-3 p-2 bg-emerald-600/30 rounded-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <FaSearch className="text-emerald-400" />
                </motion.div>
                Tìm kiếm đội bóng
              </motion.label>
              <div className="relative">
                <motion.input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Nhập tên đội bóng..."
                  className="w-full px-6 py-4 bg-emerald-900/30 backdrop-blur-xl border border-emerald-600/40 rounded-2xl text-emerald-100 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400/60 transition-all duration-500 text-lg"
                  whileFocus={{ scale: 1.02 }}
                />
                {isSearching && (
                  <motion.div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full"></div>
                  </motion.div>
                )}
              </div>
            </div>
            {searchTerm && (
              <motion.button
                onClick={() => setSearchTerm("")}
                className="mt-7 px-6 py-4 bg-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/30 font-medium rounded-2xl border border-red-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <FaTimes className="inline mr-2" />
                Xóa
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Enhanced Teams Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-emerald-900/20 backdrop-blur-2xl rounded-3xl border border-emerald-500/20 shadow-2xl overflow-hidden"
        >
          <div className="px-8 py-6 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-800/30 to-cyan-800/30">
            <motion.h2
              className="text-2xl font-bold text-emerald-200 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.div
                className="mr-3 p-2 bg-cyan-600/30 rounded-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <FaTrophy className="text-cyan-400" />
              </motion.div>
              Danh sách đội bóng
            </motion.h2>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorDisplay message={error} />
          ) : teams.length === 0 ? (
            <EmptyState message="Không tìm thấy đội bóng nào" />
          ) : (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {teams.map((team: Team, index) => (
                  <motion.div
                    key={team._id}
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-gradient-to-br from-emerald-800/40 via-emerald-900/30 to-cyan-900/40 backdrop-blur-xl rounded-3xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-105"
                    whileHover={{ y: -5 }}
                  >
                    {/* Team Avatar */}
                    <motion.div
                      className="text-center mb-6"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <motion.div
                        className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl group-hover:shadow-emerald-500/30 transition-shadow duration-500"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <span className="text-white font-bold text-2xl">
                          {team.teamName?.charAt(0)?.toUpperCase() || "?"}
                        </span>
                      </motion.div>
                      <motion.h3
                        className="text-xl font-bold text-emerald-200 group-hover:text-emerald-100 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {team.teamName}
                      </motion.h3>
                    </motion.div>

                    {/* Team Stats */}
                    <div className="space-y-3 mb-6">
                      <motion.div
                        className="flex justify-between items-center p-3 bg-emerald-800/20 rounded-xl"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center text-emerald-300">
                          <FaUsers className="mr-2 text-blue-400" />
                          <span className="text-sm">Số cầu thủ:</span>
                        </div>
                        <span className="font-bold text-emerald-200">
                          {team.playerCount || 0}
                        </span>
                      </motion.div>

                      <motion.div
                        className="flex justify-between items-center p-3 bg-yellow-800/20 rounded-xl"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center text-emerald-300">
                          <FaCrown className="mr-2 text-yellow-400" />
                          <span className="text-sm">Đội trưởng:</span>
                        </div>
                        <span className="font-bold text-emerald-200">
                          {team.captainCount || 0}
                        </span>
                      </motion.div>

                      <motion.div
                        className="flex justify-between items-center p-3 bg-green-800/20 rounded-xl"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center text-emerald-300">
                          <FaDollarSign className="mr-2 text-green-400" />
                          <span className="text-sm">Tổng chi phí:</span>
                        </div>
                        <span className="font-bold text-green-300">
                          {(team.totalCost || 0).toLocaleString()} VNĐ
                        </span>
                      </motion.div>

                      <motion.div
                        className="flex justify-between items-center p-3 bg-purple-800/20 rounded-xl"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center text-emerald-300">
                          <FaCalendar className="mr-2 text-purple-400" />
                          <span className="text-sm">Tạo:</span>
                        </div>
                        <span className="font-medium text-emerald-200 text-xs">
                          {team.createdAt
                            ? new Date(team.createdAt).toLocaleDateString(
                                "vi-VN"
                              )
                            : "N/A"}
                        </span>
                      </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={() => handleViewTeam(team)}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2.5 px-3 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 text-sm font-bold shadow-lg flex items-center justify-center"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaEye className="mr-1.5" />
                        Xem
                      </motion.button>
                      <motion.button
                        onClick={() => handleEditTeam(team)}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 px-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 text-sm font-bold shadow-lg flex items-center justify-center"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaEdit className="mr-1.5" />
                        Sửa
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteTeam(team._id)}
                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-2.5 px-3 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 text-sm font-bold shadow-lg flex items-center justify-center"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaTrash className="mr-1.5" />
                        Xóa
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Team Form Modal */}
      <AnimatePresence>
        {(showCreateForm || editingTeam) && (
          <TeamForm
            team={editingTeam}
            onSubmit={handleSubmitForm}
            onClose={handleCloseForm}
            isSubmitting={isSubmitting}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Xóa đội bóng"
        message={`Bạn có chắc chắn muốn xóa đội bóng "${deletingTeam?.teamName}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={confirmDeleteTeam}
        onCancel={cancelDeleteTeam}
        isLoading={isDeleting}
      />

      {/* Team Detail Modal */}
      <AnimatePresence>
        {viewingTeam && (
          <TeamDetail team={viewingTeam} onClose={handleCloseTeamDetail} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminTeams;
