import React from "react";

const shimmerAnimation =
  "animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300";

const PlayerCardSkeleton: React.FC = () => {
  return (
    <div className="w-40 h-64 bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-between">
      {/* Avatar hình tròn */}
      <div className={`w-20 h-20 rounded-full ${shimmerAnimation}`} />

      {/* Tên cầu thủ */}
      <div className={`w-24 h-4 rounded ${shimmerAnimation}`} />

      {/* Vị trí */}
      <div className={`w-16 h-3 rounded ${shimmerAnimation}`} />

      {/* Các chỉ số */}
      <div className="flex flex-col gap-2 mt-4 w-full">
        <div className={`w-full h-3 rounded ${shimmerAnimation}`} />
        <div className={`w-3/4 h-3 rounded ${shimmerAnimation}`} />
        <div className={`w-2/4 h-3 rounded ${shimmerAnimation}`} />
      </div>
    </div>
  );
};

export default PlayerCardSkeleton;
