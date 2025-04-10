import React from 'react';

interface PopupContentProps {
  name: string;
  address: string;
  bikeCount: number;
  stationId: string;
  isAdmin?: boolean;
}

const PopupContent: React.FC<PopupContentProps> = ({ name, address, bikeCount, stationId, isAdmin = false }) => {
  if (!isAdmin) {
    return (
      <div className="p-3">
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm">{address}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 min-w-[240px]">
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-sm text-gray-600 mb-3">{address}</p>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium">Số xe hiện có:</span>
        <span className="text-sm">{bikeCount || 1}</span>
      </div>
      <button 
        className="w-full bg-[#FFA500] text-white py-2 px-4 rounded-md hover:bg-[#FF8C00] transition-colors"
        onClick={() => window.location.href = `/edit-station/${stationId}`}
      >
        Chỉnh sửa thông tin trạm
      </button>
    </div>
  );
};

export default PopupContent;