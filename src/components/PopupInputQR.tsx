import React, { useState } from "react";
import IconKeyboard from "../assets/keyboard.png";
import IconArrowBack from "../assets/arrow_back.png";
import IconCheck from "../assets/check_white.png";
import { useNavigate } from "react-router-dom";

interface PopupInputQRProps {
  onClose: () => void;
}

const PopupInputQR: React.FC<PopupInputQRProps> = ({ onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();
  const handleConfirm = () => {
    // Giả sử chỉ những mã có độ dài >= 4 là hợp lệ
    if (inputValue.trim().length < 4) {
      setHasError(true);
    } else {
      setHasError(false);
      // Xử lý khi mã hợp lệ
      navigate(`/info-qr/QR-${inputValue}`);
      console.log("Mã hợp lệ:", inputValue);
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <div className="relative  flex items-center">
          <img
            className="absolute left-3 w-5 text-gray-400"
            src={IconKeyboard}
          />
          <input
            type="text"
            placeholder="Nhập mã xe đạp vào đây"
            className="pl-10 pr-4 py-4 bg-[#F7F7F7] text-[10px] rounded-lg w-full"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        {/* Thông báo lỗi */}
        {hasError && (
          <p className="text-red-500 text-[11px] mt-2">Mã không hợp lệ!</p>
        )}

        <div className="flex justify-center gap-8 mt-8">
          <button
            className=" flex justify-center items-center gap-2 py-2 px-4 border border-[#102590] rounded-full"
            onClick={onClose}
          >
            <img src={IconArrowBack} alt="icon" className="w-5" />
            <span className="text-[8px] text-[#102590]">Quay về</span>
          </button>
          <button
            className=" flex justify-center items-center gap-2 py-2 px-4 bg-[#102590] rounded-full"
            onClick={handleConfirm}
          >
            <img src={IconCheck} alt="icon" className="w-5" />
            <span className="text-[8px] text-white">Xác nhận</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupInputQR;
