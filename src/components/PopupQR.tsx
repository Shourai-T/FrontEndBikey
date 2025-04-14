import React from 'react';
import IConClose from "../assets/IconClose.png"
type PopupQRProps = {
    onClose: () => void;
    qrImage: string;
};


const PopupQR: React.FC<PopupQRProps> = ({ onClose, qrImage }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white max-w-[328px] p-4 relative">
                {/* Close button */}
                <div className="flex justify-end">
                    <img onClick={onClose} src={IConClose} alt="" className='w-[30px]' />
                </div>

                {/* QR Code image */}
                <div className="flex justify-center my-4">
                    <img
                        src={qrImage}
                        alt="QR Code"
                        className="w-[296px] h-[296px] object-cover"
                    />
                </div>

                {/* Download button */}
                <button
                    onClick={() => {
                        // Demo
                        const link = document.createElement('a');
                        link.href = qrImage;
                        link.download = 'qr-code.pdf';
                        link.click();
                    }}
                    className="bg-[#102590] text-white w-full py-4 rounded-lg text-center text-sm font-bold"
                >
                    Tải ảnh (.pdf)
                </button>
            </div>
        </div>
    );
};

export default PopupQR;
