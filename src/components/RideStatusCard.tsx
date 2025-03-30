import React, { useState } from "react";
import IconParking from "../assets/IconParking.png";
import IconFixBlack from "../assets/IconFixBlack.png";
import Modal from "./Modal";
import UserDot from "../assets/UserLocation.png"
import { useNavigate } from "react-router-dom";

interface RideStatusCardProps {
  rideId: string;
  status: string;
  duration: string;
  onReturn: () => void;
  onReport: () => void;
}

const RideStatusCard: React.FC<RideStatusCardProps> = ({
  rideId,
  status,
  duration,
  onReturn,
  onReport,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    message: string;
    type: "parking" | "error";
  }>({
    title: "",
    message: "",
    type: "parking", // Mặc định
  });

  const handleOpenModal = (type: "return" | "fix") => {
    if (type === "return") {
      setModalContent({
        title: "Trả xe",
        message: "Bạn có chắc chắn muốn trả xe không?",
        type: "parking",
      });
    } else {
      setModalContent({
        title: "Báo xe hỏng",
        message: "Bạn có chắc chắn muốn báo hỏng xe không?",
        type: "error",
      });
    }
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (modalContent.type === "parking") {
      onReturn();
    } else {
      onReport();
      navigate("/report"); // Điều hướng đến /report khi báo xe hỏng
    }
    setIsModalOpen(false);
  };

  return (
    <div className="fixed z-10 bottom-0 left-0 right-0 bg-white w-full h-[233px] rounded-t-2xl shadow-[0px_-4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col p-8">
      {/* Tiêu đề */}
      <h3 className="text-sm font-semibold text-[#102590]">
        {rideId}{" "}
        <span className="text-xs text-black font-normal">{status}</span>
      </h3>

      {/* Thời gian di chuyển */}
      <div className="flex items-start justify-center py-4 border-b border-[#E5E5E5]">
        <div className="flex flex-col gap-[10px] justify-center items-center">
          <h2 className="font-semibold text-xs">Thời gian đã đi</h2>
          <p className="font-normal text-[11px]">{duration}</p>
        </div>
      </div>

      {/* Nút Hành động */}
      <div className="flex justify-center py-4 gap-7">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => handleOpenModal("return")}
        >
          <img src={IconParking} alt="" className="w-[11px] pb-1 pt-0.5" />
          <p className="text-[8px] font-semibold">Trả xe</p>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => handleOpenModal("fix")}
        >
          <img src={IconFixBlack} alt="" className="w-[18px] pb-1" />
          <p className="text-[8px] font-semibold">Báo xe hỏng</p>
        </div>
      </div>

      {/* Hiển thị Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // onConfirm={modalContent.type === "parking" ? onReturn : onReport}
        onConfirm={handleConfirm}
        message={modalContent.message}
        actionType={modalContent.type}
      />
    </div>
  );
};

export default RideStatusCard;
