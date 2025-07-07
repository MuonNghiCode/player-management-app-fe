import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { debounce } from "lodash";
import { playerService } from "../../services";
import { useAuth } from "../../contexts/AuthContext";
import { DEBOUNCE_DELAYS } from "../../constants";
import LoadingSpinner from "../LoadingSpinner";
import ErrorDisplay from "../ErrorDisplay";
import EmptyState from "../EmptyState";
import PlayerForm from "../players/PlayerForm";
import ConfirmModal from "../ConfirmModal";
import toast from "react-hot-toast";
import {
  FaTimes,
  FaUsers,
  FaPlus,
  FaEdit,
  FaTrash,
  FaStar,
  FaDollarSign,
  FaCrown,
  FaUser,
  FaSearch,
} from "react-icons/fa";
import type {
  Team,
  Player,
  CreatePlayerRequest,
  UpdatePlayerRequest,
} from "../../types";

interface TeamDetailProps {
  team: Team;
  onClose: () => void;
}

const TeamDetail: React.FC<TeamDetailProps> = ({ team, onClose }) => {
  const { isAdmin } = useAuth();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Player form states
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete confirmation states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingPlayer, setDeletingPlayer] = useState<Player | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch players in this team
  const fetchPlayers = useCallback(
    async (search: string = "") => {
      setLoading(true);
      setError(null);
      try {
        const response = await playerService.getAll({
          search,
          team: team._id,
        });
        setPlayers(response.data?.players || []);
      } catch (err: any) {
        setError(err.message || "Lỗi khi tải dữ liệu cầu thủ");
      } finally {
        setLoading(false);
      }
    },
    [team._id]
  );

  // Debounced search
  const debouncedFetchPlayers = useCallback(
    debounce((search: string) => {
      setIsSearching(false);
      fetchPlayers(search);
    }, DEBOUNCE_DELAYS.SEARCH),
    [fetchPlayers]
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setIsSearching(true);
  };

  useEffect(() => {
    debouncedFetchPlayers(searchTerm);
    return () => {
      debouncedFetchPlayers.cancel();
    };
  }, [searchTerm, debouncedFetchPlayers]);

  const refreshData = () => {
    fetchPlayers(searchTerm);
  };

  // Player CRUD handlers
  const handleSubmitForm = async (
    data: CreatePlayerRequest | UpdatePlayerRequest
  ) => {
    setIsSubmitting(true);
    try {
      if (editingPlayer) {
        const response = await playerService.update(editingPlayer._id, data);
        if (response.success) {
          toast.success("Cập nhật cầu thủ thành công!");
          setEditingPlayer(null);
          refreshData();
        }
      } else {
        // Set team for new player
        const playerData = { ...data, team: team._id } as CreatePlayerRequest;
        const response = await playerService.create(playerData);
        if (response.success) {
          toast.success("Thêm cầu thủ thành công!");
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
    setEditingPlayer(null);
  };

  const handleEditPlayer = (player: Player) => {
    setEditingPlayer(player);
  };

  const handleDeletePlayer = (player: Player) => {
    setDeletingPlayer(player);
    setShowDeleteConfirm(true);
  };

  const confirmDeletePlayer = async () => {
    if (!deletingPlayer) return;

    setIsDeleting(true);
    try {
      const response = await playerService.deleteById(deletingPlayer._id);
      if (response.success) {
        toast.success("Xóa cầu thủ thành công!");
        setShowDeleteConfirm(false);
        setDeletingPlayer(null);
        refreshData();
      }
    } catch (error: any) {
      toast.error(error.message || "Xóa cầu thủ thất bại!");
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDeletePlayer = () => {
    setShowDeleteConfirm(false);
    setDeletingPlayer(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
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
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-gradient-to-br from-emerald-900/95 via-emerald-950/95 to-teal-900/95 backdrop-blur-2xl rounded-3xl border border-emerald-500/30 w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl shadow-emerald-500/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-emerald-900 to-teal-600/30"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,185,129,0.3)_1px,transparent_1px),linear-gradient(rgba(16,185,129,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            </div>
            {/* Floating particles */}
            <div className="absolute inset-0">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-emerald-400/15"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 12 + 8}px`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    rotate: [0, 360],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
                    repeat: Infinity,
                    delay: Math.random() * 3,
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
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-200 via-teal-200 to-green-200 bg-clip-text text-transparent flex items-center">
                <motion.div
                  className="mr-4 p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <FaUsers className="text-white text-xl" />
                </motion.div>
                {team.teamName}
              </h2>
              <p className="text-emerald-300/80 mt-2 flex items-center space-x-4">
                <span className="flex items-center">
                  <FaUser className="mr-2" />
                  {team.playerCount || 0} cầu thủ
                </span>
                <span className="flex items-center">
                  <FaCrown className="mr-2 text-yellow-400" />
                  {team.captainCount || 0} đội trưởng
                </span>
                <span className="flex items-center">
                  <FaDollarSign className="mr-2 text-green-400" />
                  {formatCurrency(team.totalCost || 0)}
                </span>
              </p>
            </motion.div>

            <div className="flex items-center space-x-4">
              {isAdmin && (
                <motion.button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-gradient-to-r from-emerald-500 to-cyan-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-cyan-700 transition-all duration-300 flex items-center space-x-2 font-bold shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <FaPlus />
                  <span>Thêm cầu thủ</span>
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-emerald-400 hover:text-emerald-300 p-3 rounded-xl bg-emerald-800/30 hover:bg-emerald-800/50 transition-all duration-200 border border-emerald-600/30"
              >
                <FaTimes className="text-xl" />
              </motion.button>
            </div>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 p-6 border-b border-emerald-500/20"
          >
            <div className="relative">
              <motion.input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Tìm kiếm cầu thủ trong đội..."
                className="w-full px-6 py-3 bg-emerald-900/30 backdrop-blur-xl border border-emerald-600/40 rounded-xl text-emerald-100 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400/60 transition-all duration-500"
                whileFocus={{ scale: 1.02 }}
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-emerald-400/60" />
              {isSearching && (
                <motion.div
                  className="absolute right-12 top-1/2 transform -translate-y-1/2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full"></div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Players Content */}
          <motion.div
            className="relative z-10 p-6 overflow-y-auto max-h-[calc(90vh-240px)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorDisplay message={error} onRetry={refreshData} />
            ) : players.length === 0 ? (
              <EmptyState
                message={
                  searchTerm
                    ? "Không tìm thấy cầu thủ nào"
                    : "Chưa có cầu thủ nào trong đội"
                }
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {players.map((player, index) => (
                  <motion.div
                    key={player._id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-emerald-900/20 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-6 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 group"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    {/* Player Image */}
                    <div className="relative mb-4 mx-auto w-24 h-24 rounded-full overflow-hidden bg-emerald-800/30 border-2 border-emerald-500/30">
                      {player.image ? (
                        <img
                          src={player.image}
                          alt={player.playerName}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            target.parentElement!.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center">
                                <i class="fas fa-user text-2xl text-emerald-400/50"></i>
                              </div>
                            `;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaUser className="text-2xl text-emerald-400/50" />
                        </div>
                      )}
                      {player.isCaptain && (
                        <motion.div
                          className="absolute -top-2 -right-2 bg-yellow-500 text-white p-1 rounded-full shadow-lg"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <FaCrown className="text-xs" />
                        </motion.div>
                      )}
                    </div>

                    {/* Player Info */}
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-emerald-200 mb-2">
                        {player.playerName}
                      </h3>
                      <p className="text-emerald-400 text-sm mb-3 flex items-center justify-center">
                        <FaDollarSign className="mr-1" />
                        {formatCurrency(player.cost)}
                      </p>

                      {/* Rating */}
                      {player.avgRating && (
                        <div className="flex items-center justify-center mb-3">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="text-emerald-300 text-sm">
                            {player.avgRating.toFixed(1)} (
                            {player.commentCount || 0})
                          </span>
                        </div>
                      )}

                      {/* Actions */}
                      {isAdmin && (
                        <div className="flex space-x-2 mt-4">
                          <motion.button
                            onClick={() => handleEditPlayer(player)}
                            className="flex-1 bg-blue-500/20 text-blue-400 hover:text-blue-300 hover:bg-blue-500/30 py-2 px-3 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaEdit className="mr-1" />
                            Sửa
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeletePlayer(player)}
                            className="flex-1 bg-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/30 py-2 px-3 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaTrash className="mr-1" />
                            Xóa
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Player Form Modal */}
      <AnimatePresence>
        {(showCreateForm || editingPlayer) && (
          <PlayerForm
            player={editingPlayer}
            teams={[team]} // Only current team
            onSubmit={handleSubmitForm}
            onClose={handleCloseForm}
            isSubmitting={isSubmitting}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Xóa cầu thủ"
        message={`Bạn có chắc chắn muốn xóa cầu thủ "${deletingPlayer?.playerName}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={confirmDeletePlayer}
        onCancel={cancelDeletePlayer}
        isLoading={isDeleting}
      />
    </AnimatePresence>
  );
};

export default TeamDetail;
