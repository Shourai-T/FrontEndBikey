import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStationById } from "../redux/api_request/station_api";

interface PopupContentProps {
  name: string;
  address: string;
  bikeCount: number;
  stationId: string;
  lat: number;
  lng: number;
  isAdmin?: boolean;
  dispatch: any;
}

const PopupContent: React.FC<PopupContentProps> = ({
  name,
  address,
  bikeCount,
  stationId,
  lat,
  lng,
  isAdmin = false,
  dispatch,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name,
    address,
    lat,
    lng,
    bikeCount: bikeCount || 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Gửi dữ liệu chỉnh sửa:", formData);
    const updatedData = {
      name: formData.name,
      address: formData.address,
      location: [
        parseFloat(formData.lng.toString()),
        parseFloat(formData.lat.toString()),
      ],
    };
    console.log("Dữ liệu cập nhật:", updatedData);
    updateStationById(stationId, updatedData, dispatch);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name,
      address,
      lat,
      lng,
      bikeCount: bikeCount || 1,
    });
    setIsEditing(false);
  };

  if (!isAdmin) {
    return (
      <div className="p-3">
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm">{address}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl py-8 px-6 min-w-[500px] max-h-[390px] shadow-lg">
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45"></div>

        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
              className="text-xl font-semibold mb-3 p-2 text-[#666666] rounded-lg w-full border border-none outline-none bg-[#F7F7F7]"
            />
            <p className="text-sm text-black mb-4">{formData.address}</p>

            <div className="flex gap-2 my-8">
              <div className="flex gap-2 items-center w-1/2">
                <label className="text-xs font-semibold whitespace-nowrap mb-1">
                  Kinh độ
                </label>
                <input
                  type="number"
                  name="lat"
                  value={formData.lat}
                  onChange={handleChange}
                  className="w-full px-2 py-2 text-center border border-none outline-none rounded-lg bg-[#F7F7F7] text-[10px] text-[#666666]"
                />
              </div>
              <div className="flex gap-2 items-center w-1/2">
                <label className="text-xs font-semibold whitespace-nowrap mb-1">
                  Vĩ độ
                </label>
                <input
                  type="number"
                  name="lng"
                  value={formData.lng}
                  onChange={handleChange}
                  className=" w-full px-2 py-2 text-center border border-none outline-none rounded-lg bg-[#F7F7F7] text-[10px] text-[#666666]"
                />
              </div>
            </div>

            <div className="mb-8 text-sm">
              <span className="font-medium">Số xe hiện có:</span>{" "}
              {formData.bikeCount}
            </div>

            <div className="flex justify-center gap-6">
              <button
                onClick={handleCancel}
                className="px-8 py-2 border border-[#102590] text-[#102590] rounded-full"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-[#102590] text-white rounded-full"
              >
                Thay đổi
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold mb-2">{formData.name}</h3>
            <p className="text-sm text-black mb-6">{formData.address}</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium">Số xe hiện có:</span>
              <span className="text-sm">{formData.bikeCount}</span>
            </div>
            <button
              className="w-full bg-[#FFA500] text-white py-2.5 px-4 rounded-md hover:bg-[#FF8C00] transition-colors text-sm font-medium"
              onClick={() => setIsEditing(true)}
            >
              Chỉnh sửa thông tin trạm
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PopupContent;
