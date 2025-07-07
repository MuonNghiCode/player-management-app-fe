import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaFilter,
  FaUsers,
  FaUser,
  FaFootballBall,
  FaTrophy,
  FaChartBar,
  FaArrowLeft,
  FaArrowRight,
  FaChartLine,
  FaChartPie,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { playerService, teamService } from "../../services";
import { useAuth } from "../../contexts/AuthContext";
import { DEBOUNCE_DELAYS } from "../../constants";
import PlayerForm from "../../components/players/PlayerForm";
import {
  ConfirmModal,
  LoadingSpinner,
  ErrorDisplay,
  EmptyState,
} from "../../components";
import toast from "react-hot-toast";
import type {
  Player,
  Team,
  CreatePlayerRequest,
  UpdatePlayerRequest,
} from "../../types";

const AdminPlayers: React.FC = () => {
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingPlayer, setDeletingPlayer] = useState<Player | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // State for teams
  const [teams, setTeams] = useState<Team[]>([]);

  // State for players
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  // Fetch teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log("🔍 Fetching teams...");
        const response = await teamService.getAll();
        console.log("✅ Teams response:", response);
        setTeams(response.data?.teams || []);
      } catch (err) {
        console.error("❌ Error fetching teams:", err);
      }
    };

    fetchTeams();
  }, []);

  // Fetch players
  const fetchPlayers = useCallback(
    async (search: string, team: string, page: number) => {
      setLoading(true);
      setError(null);
      try {
        console.log("🔍 Fetching players with params:", {
          search,
          team,
          page,
          limit: 10,
        });

        const response = await playerService.getAll({
          search,
          team,
          page,
          limit: 10,
        });

        console.log("✅ Players response:", response);
        setPlayers(response.data?.players || []);
        setPagination(response.data?.pagination);
        setStats(response.data?.stats);
      } catch (err: any) {
        console.error("❌ Error fetching players:", err);
        setError(err.message || "Lỗi khi tải dữ liệu cầu thủ");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Debounced fetch function with search indicator
  const debouncedFetchPlayers = useCallback(
    debounce((search: string, team: string, page: number) => {
      setIsSearching(false); // Search completed
      fetchPlayers(search, team, page);
    }, DEBOUNCE_DELAYS.SEARCH),
    [fetchPlayers]
  );

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setIsSearching(true); // Start searching
  };

  // Fetch players when params change
  useEffect(() => {
    debouncedFetchPlayers(searchTerm, selectedTeam, currentPage);

    // Cleanup function to cancel debounce on unmount
    return () => {
      debouncedFetchPlayers.cancel();
    };
  }, [searchTerm, selectedTeam, currentPage, debouncedFetchPlayers]);

  const handleDeletePlayer = async (id: string) => {
    const player = players.find((p) => p._id === id);
    if (!player) return;

    setDeletingPlayer(player);
    setShowDeleteConfirm(true);
  };

  const confirmDeletePlayer = async () => {
    if (!deletingPlayer) return;

    setIsDeleting(true);
    try {
      const response = await playerService.deleteById(deletingPlayer._id);
      console.log("Delete response:", response);

      if ((response as any).success || (response as any).status) {
        toast.success("Xóa cầu thủ thành công!");
        // Update local state immediately
        setPlayers((prev) =>
          prev.filter((player) => player._id !== deletingPlayer._id)
        );
        // Update stats
        setStats((prev: any) =>
          prev
            ? {
                ...prev,
                totalPlayers: prev.totalPlayers - 1,
                totalCaptains: deletingPlayer.isCaptain
                  ? prev.totalCaptains - 1
                  : prev.totalCaptains,
                totalCost: prev.totalCost - (deletingPlayer.cost || 0),
              }
            : null
        );
        // Update pagination
        setPagination((prev: any) =>
          prev
            ? {
                ...prev,
                totalPlayers: prev.totalPlayers - 1,
              }
            : null
        );

        // Close modal
        setShowDeleteConfirm(false);
        setDeletingPlayer(null);
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error.message || "Xóa cầu thủ thất bại!");
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDeletePlayer = () => {
    setShowDeleteConfirm(false);
    setDeletingPlayer(null);
  };

  const handleCreatePlayer = async (data: CreatePlayerRequest) => {
    setIsSubmitting(true);
    try {
      const response = await playerService.create(data);
      console.log("Create response:", response);

      if ((response as any).success || (response as any).status) {
        toast.success("Tạo cầu thủ thành công!");
        setShowCreateForm(false);
        // Add new player to local state immediately
        const newPlayer =
          (response as any).data?.player || (response as any).player;
        if (newPlayer) {
          setPlayers((prev) => [newPlayer, ...prev]);
          // Update stats
          setStats((prev: any) =>
            prev
              ? {
                  ...prev,
                  totalPlayers: prev.totalPlayers + 1,
                  totalCaptains: newPlayer.isCaptain
                    ? prev.totalCaptains + 1
                    : prev.totalCaptains,
                  totalCost: prev.totalCost + (newPlayer.cost || 0),
                }
              : null
          );
          // Update pagination
          setPagination((prev: any) =>
            prev
              ? {
                  ...prev,
                  totalPlayers: prev.totalPlayers + 1,
                }
              : null
          );
        }
      }
    } catch (error: any) {
      console.error("Create error:", error);
      toast.error(error.message || "Tạo cầu thủ thất bại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePlayer = async (data: UpdatePlayerRequest) => {
    if (!editingPlayer) return;

    setIsSubmitting(true);
    try {
      const response = await playerService.update(editingPlayer._id, data);
      console.log("Update response:", response);

      if ((response as any).success || (response as any).status) {
        toast.success("Cập nhật cầu thủ thành công!");
        setEditingPlayer(null);
        // Update player in local state immediately
        const updatedPlayer =
          (response as any).data?.player || (response as any).player;
        if (updatedPlayer) {
          setPlayers((prev) =>
            prev.map((player) =>
              player._id === editingPlayer._id ? updatedPlayer : player
            )
          );
          // Update stats if captain status changed
          const oldPlayer = editingPlayer;
          if (oldPlayer.isCaptain !== updatedPlayer.isCaptain) {
            setStats((prev: any) =>
              prev
                ? {
                    ...prev,
                    totalCaptains: updatedPlayer.isCaptain
                      ? prev.totalCaptains + 1
                      : prev.totalCaptains - 1,
                  }
                : null
            );
          }
          // Update stats if cost changed
          if (oldPlayer.cost !== updatedPlayer.cost) {
            setStats((prev: any) =>
              prev
                ? {
                    ...prev,
                    totalCost:
                      prev.totalCost -
                      (oldPlayer.cost || 0) +
                      (updatedPlayer.cost || 0),
                  }
                : null
            );
          }
        }
      }
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.message || "Cập nhật cầu thủ thất bại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (
    data: CreatePlayerRequest | UpdatePlayerRequest
  ) => {
    if (editingPlayer) {
      await handleUpdatePlayer(data as UpdatePlayerRequest);
    } else {
      await handleCreatePlayer(data as CreatePlayerRequest);
    }
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
    setEditingPlayer(null);
  };

  if (!isAdmin) {
    return (
      <ErrorDisplay
        type="page"
        title="Truy cập bị từ chối"
        message="Chỉ Admin mới có thể truy cập trang quản lý cầu thủ."
        variant="unauthorized"
        onGoHome={() => (window.location.href = "/")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 relative overflow-hidden">
      {/* Football-themed background */}
      <div className="absolute inset-0">
        {/* Football field pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              repeating-linear-gradient(
                0deg,
                rgba(16, 185, 129, 0.3) 0px,
                rgba(16, 185, 129, 0.3) 2px,
                transparent 2px,
                transparent 60px
              ),
              repeating-linear-gradient(
                90deg,
                rgba(16, 185, 129, 0.2) 0px,
                rgba(16, 185, 129, 0.2) 2px,
                transparent 2px,
                transparent 100px
              )
            `,
            }}
          ></div>

          {/* Football field center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-emerald-400/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-emerald-400/30 rounded-full"></div>

          {/* Goal areas */}
          <div className="absolute top-1/4 left-4 w-24 h-32 border-4 border-emerald-400/15 rounded-lg"></div>
          <div className="absolute top-1/4 right-4 w-24 h-32 border-4 border-emerald-400/15 rounded-lg"></div>
        </div>

        {/* Animated football particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-emerald-400/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 15}px`,
              }}
              animate={{
                y: [0, -100, 0],
                rotate: [0, 360],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            ></motion.div>
          ))}
        </div>

        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-teal-500/10"></div>

        {/* Glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-300 via-teal-300 to-green-300 bg-clip-text text-transparent"
            >
              Quản lý cầu thủ
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-emerald-200 max-w-2xl mx-auto"
            >
              Quản lý toàn diện thông tin cầu thủ trong hệ thống
            </motion.p>
          </div>
        </motion.div>

        {/* Charts Section */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            {/* Team Distribution Chart */}
            <Card className="bg-emerald-950/60 backdrop-blur-xl border-emerald-800/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-emerald-100">
                  <FaChartPie className="mr-2 text-emerald-400" />
                  Phân bố cầu thủ theo đội
                </CardTitle>
                <CardDescription className="text-emerald-300">
                  Biểu đồ tròn hiển thị số lượng cầu thủ của mỗi đội
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={teams.map((team, index) => ({
                        name: team.teamName,
                        value: players.filter((p) => p.team?._id === team._id)
                          .length,
                        fill: `hsl(${(index * 60) % 360}, 70%, 60%)`,
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${((percent || 0) * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {teams.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`hsl(${(index * 60) % 360}, 70%, 60%)`}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cost Distribution Chart */}
            <Card className="bg-emerald-950/60 backdrop-blur-xl border-emerald-800/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-emerald-100">
                  <FaChartLine className="mr-2 text-teal-400" />
                  Chi phí theo đội bóng
                </CardTitle>
                <CardDescription className="text-emerald-300">
                  Biểu đồ cột hiển thị tổng chi phí cầu thủ của mỗi đội
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={teams.map((team) => ({
                      name:
                        team.teamName.length > 10
                          ? team.teamName.substring(0, 10) + "..."
                          : team.teamName,
                      cost:
                        players
                          .filter((p) => p.team?._id === team._id)
                          .reduce((sum, p) => sum + (p.cost || 0), 0) / 1000000, // Convert to millions
                    }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#34d399"
                      opacity={0.3}
                    />
                    <XAxis dataKey="name" stroke="#6ee7b7" fontSize={12} />
                    <YAxis stroke="#6ee7b7" fontSize={12} />
                    <Tooltip
                      formatter={(value: number) => [
                        `${value.toFixed(1)}M VND`,
                        "Chi phí",
                      ]}
                      labelStyle={{ color: "#064e3b" }}
                      contentStyle={{
                        backgroundColor: "rgba(6, 78, 59, 0.95)",
                        border: "1px solid #34d399",
                        borderRadius: "8px",
                        backdropFilter: "blur(10px)",
                        color: "#6ee7b7",
                      }}
                    />
                    <Bar dataKey="cost" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Stats Cards */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative overflow-hidden rounded-2xl bg-emerald-950/60 backdrop-blur-xl border border-emerald-800/30 shadow-2xl p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <FaUsers className="text-3xl text-emerald-400" />
                  <div className="text-3xl font-bold text-emerald-300">
                    {stats.totalPlayers}
                  </div>
                </div>
                <div className="text-emerald-200 font-medium">Tổng cầu thủ</div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative overflow-hidden rounded-2xl bg-emerald-950/60 backdrop-blur-xl border border-emerald-800/30 shadow-2xl p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <FaTrophy className="text-3xl text-yellow-400" />
                  <div className="text-3xl font-bold text-yellow-300">
                    {stats.totalCaptains}
                  </div>
                </div>
                <div className="text-emerald-200 font-medium">Đội trưởng</div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative overflow-hidden rounded-2xl bg-emerald-950/60 backdrop-blur-xl border border-emerald-800/30 shadow-2xl p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <FaChartBar className="text-3xl text-green-400" />
                  <div className="text-2xl font-bold text-green-300">
                    {(stats.totalCost / 1000000).toFixed(0)}M₫
                  </div>
                </div>
                <div className="text-emerald-200 font-medium">Tổng chi phí</div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative overflow-hidden rounded-2xl bg-emerald-950/60 backdrop-blur-xl border border-emerald-800/30 shadow-2xl p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <FaFootballBall className="text-3xl text-teal-400" />
                  <div className="text-2xl font-bold text-teal-300">
                    {(stats.avgCost / 1000000).toFixed(1)}M₫
                  </div>
                </div>
                <div className="text-emerald-200 font-medium">Chi phí TB</div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative overflow-hidden rounded-2xl bg-emerald-950/60 backdrop-blur-xl border border-emerald-800/30 shadow-2xl p-6 mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-emerald-200">
                  <FaSearch className="inline mr-2" />
                  Tìm kiếm cầu thủ
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nhập tên cầu thủ..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full px-4 py-3 bg-emerald-900/50 backdrop-blur-lg border border-emerald-700/50 rounded-xl text-emerald-100 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-emerald-400 border-t-transparent"></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-emerald-200">
                  <FaFilter className="inline mr-2" />
                  Lọc theo đội bóng
                </label>
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="w-full px-4 py-3 bg-emerald-900/50 backdrop-blur-lg border border-emerald-700/50 rounded-xl text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                >
                  <option value="" className="bg-emerald-900 text-emerald-100">
                    Tất cả đội bóng
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
                </select>
              </div>

              <div className="flex items-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCreateForm(true)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <FaPlus className="inline mr-2" />
                  Thêm cầu thủ mới
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Players Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-emerald-950/60 backdrop-blur-xl border border-emerald-800/30 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/3 to-teal-500/3"></div>

          <div className="relative z-10 px-6 py-4 border-b border-emerald-800/30">
            <h2 className="text-2xl font-bold text-emerald-100 flex items-center">
              <FaUsers className="mr-3 text-emerald-400" />
              Danh sách cầu thủ
            </h2>
          </div>

          {loading ? (
            <LoadingSpinner message="Đang tải danh sách cầu thủ..." />
          ) : error ? (
            <div className="p-8">
              <ErrorDisplay
                type="card"
                title="Lỗi tải dữ liệu"
                message={error}
                variant="network"
                onRetry={() =>
                  fetchPlayers(searchTerm, selectedTeam, currentPage)
                }
              />
            </div>
          ) : players.length === 0 ? (
            <div className="p-8">
              <EmptyState
                icon={<FaFootballBall className="text-4xl" />}
                title="Chưa có cầu thủ nào"
                message={
                  searchTerm || selectedTeam
                    ? "Không tìm thấy cầu thủ phù hợp với tiêu chí tìm kiếm"
                    : "Hãy thêm cầu thủ đầu tiên vào hệ thống"
                }
                actionText="Thêm cầu thủ mới"
                onAction={() => setShowCreateForm(true)}
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-emerald-900/80 backdrop-blur-lg">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-200 uppercase tracking-wider">
                      Hình ảnh
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-200 uppercase tracking-wider">
                      Cầu thủ
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-200 uppercase tracking-wider">
                      Đội bóng
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-200 uppercase tracking-wider">
                      Chi phí
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-200 uppercase tracking-wider">
                      Đội trưởng
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-200 uppercase tracking-wider">
                      Bình luận
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-200 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-800/30">
                  <AnimatePresence>
                    {players.map((player, index) => (
                      <motion.tr
                        key={player._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-emerald-900/30 transition-all duration-300 group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-emerald-900/50 border border-emerald-700/50">
                              {player.image ? (
                                <img
                                  src={player.image}
                                  alt={player.playerName}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src =
                                      "https://via.placeholder.com/48x48/059669/ffffff?text=Player";
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-emerald-400">
                                  <FaUser className="text-lg" />
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-base font-semibold text-emerald-100 group-hover:text-emerald-300 transition-colors">
                            {player.playerName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-emerald-300">
                            {player.team?.teamName || "Chưa có đội"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-green-300">
                            {player.cost?.toLocaleString()}₫
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                              player.isCaptain
                                ? "bg-yellow-900/50 text-yellow-300 border border-yellow-700/50"
                                : "bg-emerald-900/50 text-emerald-300 border border-emerald-700/50"
                            }`}
                          >
                            {player.isCaptain ? (
                              <>
                                <FaTrophy className="mr-1" />
                                Đội trưởng
                              </>
                            ) : (
                              "Thành viên"
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-emerald-300">
                            {player.commentCount || 0} bình luận
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setEditingPlayer(player)}
                              className="text-blue-300 hover:text-blue-200 p-2 rounded-lg bg-blue-900/30 hover:bg-blue-900/50 transition-all duration-200 cursor-pointer z-10"
                            >
                              <FaEdit className="text-sm" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDeletePlayer(player._id)}
                              className="text-red-300 hover:text-red-200 p-2 rounded-lg bg-red-900/30 hover:bg-red-900/50 transition-all duration-200 cursor-pointer z-10"
                            >
                              <FaTrash className="text-sm" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-emerald-800/30 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-sm text-emerald-300">
                Hiển thị{" "}
                <span className="font-medium text-emerald-200">
                  {players.length}
                </span>{" "}
                trong{" "}
                <span className="font-medium text-emerald-200">
                  {pagination.totalPlayers}
                </span>{" "}
                cầu thủ
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center px-4 py-2 text-sm bg-emerald-900/50 text-emerald-200 rounded-lg hover:bg-emerald-900/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-emerald-700/50"
                >
                  <FaArrowLeft className="mr-2" />
                  Trước
                </motion.button>

                <div className="flex items-center space-x-1">
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1
                  )
                    .filter((page) => {
                      const delta = 2;
                      return (
                        page === 1 ||
                        page === pagination.totalPages ||
                        (page >= currentPage - delta &&
                          page <= currentPage + delta)
                      );
                    })
                    .map((page, index, array) => (
                      <React.Fragment key={page}>
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-2 text-emerald-400">...</span>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                            currentPage === page
                              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                              : "bg-emerald-900/50 text-emerald-200 hover:bg-emerald-900/70 border border-emerald-700/50"
                          }`}
                        >
                          {page}
                        </motion.button>
                      </React.Fragment>
                    ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === pagination.totalPages}
                  className="flex items-center px-4 py-2 text-sm bg-emerald-900/50 text-emerald-200 rounded-lg hover:bg-emerald-900/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-emerald-700/50"
                >
                  Sau
                  <FaArrowRight className="ml-2" />
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Create/Edit Form Modal */}
        <AnimatePresence>
          {(showCreateForm || editingPlayer) && (
            <PlayerForm
              player={editingPlayer}
              teams={teams}
              onSubmit={handleFormSubmit}
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
      </div>
    </div>
  );
};

export default AdminPlayers;
