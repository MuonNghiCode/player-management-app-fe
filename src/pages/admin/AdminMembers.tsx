import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import { memberService } from "../../services";
import { useAuth } from "../../contexts/AuthContext";
import { DEBOUNCE_DELAYS } from "../../constants";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorDisplay from "../../components/ErrorDisplay";
import EmptyState from "../../components/EmptyState";
import {
  FaUsers,
  FaSearch,
  FaTimes,
  FaUser,
  FaCalendar,
  FaIdCard,
  FaCrown,
  FaShieldAlt,
} from "react-icons/fa";
import type { Member } from "../../types";

const AdminMembers: React.FC = () => {
  const { isAdmin, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // State for members
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch members
  const fetchMembers = useCallback(
    async (search: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await memberService.getAll({ search, role: "member" });
        // Filter out current admin user
        const filteredMembers = (response.data?.members || []).filter(
          (member) => member._id !== user?._id
        );
        setMembers(filteredMembers);
      } catch (err: any) {
        setError(err.message || "Lỗi khi tải dữ liệu thành viên");
      } finally {
        setLoading(false);
      }
    },
    [user?._id]
  );

  // Debounced fetch function with search indicator
  const debouncedFetchMembers = useCallback(
    debounce((search: string) => {
      setIsSearching(false);
      fetchMembers(search);
    }, DEBOUNCE_DELAYS.SEARCH),
    [fetchMembers]
  );

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setIsSearching(true);
  };

  useEffect(() => {
    debouncedFetchMembers(searchTerm);
    return () => {
      debouncedFetchMembers.cancel();
    };
  }, [searchTerm, debouncedFetchMembers]);

  const refreshData = () => {
    fetchMembers(searchTerm);
  };

  const calculateAge = (yob: number) => {
    return new Date().getFullYear() - yob;
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 flex justify-center items-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.1),transparent_50%)]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <motion.div
            className="mb-6 p-6 bg-red-500/20 rounded-3xl border border-red-500/30"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaShieldAlt className="text-6xl text-red-400 mx-auto" />
          </motion.div>
          <h1 className="text-4xl font-bold text-red-400 mb-4">
            Truy cập bị từ chối
          </h1>
          <p className="text-red-300/80 text-lg">
            Bạn không có quyền truy cập trang này
          </p>
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
              Quản lý thành viên
            </motion.h1>
            <motion.p
              className="text-emerald-200/90 text-xl font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Xem danh sách tất cả thành viên trong hệ thống
            </motion.p>
          </motion.div>
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
                Tìm kiếm thành viên
              </motion.label>
              <div className="relative">
                <motion.input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Nhập tên hoặc username..."
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

        {/* Enhanced Members Display */}
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
                <FaUser className="text-cyan-400" />
              </motion.div>
              Danh sách thành viên ({members.length})
            </motion.h2>
          </div>

          {loading ? (
            <div className="p-12">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="p-12">
              <ErrorDisplay message={error} onRetry={refreshData} />
            </div>
          ) : members.length === 0 ? (
            <div className="p-12">
              <EmptyState
                message={
                  searchTerm
                    ? "Không tìm thấy thành viên nào"
                    : "Chưa có thành viên nào"
                }
              />
            </div>
          ) : (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member, index) => (
                  <motion.div
                    key={member._id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-emerald-800/30 via-emerald-900/30 to-cyan-800/30 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-6 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 group"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    {/* Member Avatar */}
                    <div className="text-center mb-6">
                      <motion.div
                        className="relative inline-block p-4 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full border border-emerald-400/30 mb-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", damping: 15 }}
                      >
                        <FaUser className="text-3xl text-emerald-300" />
                        {member.isAdmin && (
                          <motion.div
                            className="absolute -top-1 -right-1 bg-yellow-500 text-white p-1 rounded-full shadow-lg"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <FaCrown className="text-xs" />
                          </motion.div>
                        )}
                      </motion.div>

                      <motion.h3
                        className="text-xl font-bold text-emerald-200 mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {member.name}
                      </motion.h3>

                      <motion.p
                        className="text-emerald-400/80 text-sm flex items-center justify-center mb-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <FaIdCard className="mr-2" />@{member.membername}
                      </motion.p>
                    </div>

                    {/* Member Details */}
                    <div className="space-y-3">
                      <motion.div
                        className="flex items-center justify-between p-3 bg-emerald-900/20 rounded-lg border border-emerald-600/20"
                        whileHover={{ scale: 1.02 }}
                      >
                        <span className="text-emerald-300 font-medium flex items-center">
                          <FaCalendar className="mr-2 text-cyan-400" />
                          Tuổi
                        </span>
                        <span className="text-emerald-100 font-bold">
                          {calculateAge(member.YOB)} tuổi
                        </span>
                      </motion.div>

                      <motion.div
                        className="flex items-center justify-between p-3 bg-emerald-900/20 rounded-lg border border-emerald-600/20"
                        whileHover={{ scale: 1.02 }}
                      >
                        <span className="text-emerald-300 font-medium flex items-center">
                          <FaCalendar className="mr-2 text-yellow-400" />
                          Năm sinh
                        </span>
                        <span className="text-emerald-100 font-bold">
                          {member.YOB}
                        </span>
                      </motion.div>

                      <motion.div
                        className="flex items-center justify-between p-3 bg-emerald-900/20 rounded-lg border border-emerald-600/20"
                        whileHover={{ scale: 1.02 }}
                      >
                        <span className="text-emerald-300 font-medium flex items-center">
                          <FaShieldAlt className="mr-2 text-purple-400" />
                          Vai trò
                        </span>
                        <span
                          className={`font-bold ${
                            member.isAdmin
                              ? "text-yellow-400"
                              : "text-emerald-400"
                          }`}
                        >
                          {member.isAdmin ? "Admin" : "Thành viên"}
                        </span>
                      </motion.div>

                      {member.createdAt && (
                        <motion.div
                          className="flex items-center justify-between p-3 bg-emerald-900/20 rounded-lg border border-emerald-600/20"
                          whileHover={{ scale: 1.02 }}
                        >
                          <span className="text-emerald-300 font-medium flex items-center">
                            <FaCalendar className="mr-2 text-blue-400" />
                            Tham gia
                          </span>
                          <span className="text-emerald-100 font-bold text-sm">
                            {new Date(member.createdAt).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminMembers;
