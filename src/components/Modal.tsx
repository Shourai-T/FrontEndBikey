import React from "react";
import IconWarning from "../assets/IconWaring.png"
import IconParking from "../assets/IconParking.png"
import IconClose from "../assets/IconClose.png"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
    actionType: "parking" | "error";
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, message, actionType }) => {
    if (!isOpen) return null;

    const getIcon = () => {
        return actionType === "parking" ? IconParking : IconWarning;
      };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg p-4 w-[300px]">
                {/* Nút đóng */}
                <img src={IconClose} className="absolute w-5 top-3 right-3" alt="Close" onClick={onClose}/>

                {/* Biểu tượng cảnh báo */}
                <div className="flex justify-center mt-5">
                    <img src={getIcon()} alt="Icon" className={actionType === "parking" ? "w-[11px]" : "w-[30px]"} />
                </div>

                {/* Nội dung */}
                <p className="text-center text-xs font-semibold mt-2">{message}</p>

                {/* Nút hành động */}
                <div className="flex justify-center gap-[30px] mt-4">
                    <button
                        className="border border-[#102590] text-[#102590] text-[8px] font-semibold px-4 py-2 rounded-full"
                        onClick={onClose}
                    >
                        Hủy
                    </button>
                    <button
                        className="bg-[#102590] text-white text-[8px] font-semibold px-4 py-2 rounded-full"
                        onClick={onConfirm}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
