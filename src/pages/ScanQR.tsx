import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import ArrowIcon from "../assets/arrow_back_ios.png";
import Keyboard from "../assets/keyboard_alt.png";
import { useNavigate } from "react-router-dom";
import PopupInputQR from "../components/PopupInputQR";

const QRScanner = () => {
  const navigate = useNavigate();
  const [showPopupInputQR, setShowPopupInputQR] = useState(false); 
  const handleResult = (result: any, error: any) => {
    if (result) {
      navigate(`/info-qr/${result?.text}`);
      console.log("QR Code Data:", result?.text);
    }
    if (error) {
      console.error("Error scanning QR code:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Camera wrapper */}
      <div className="flex-1 flex justify-center items-center min-h-[80vh] bg-black">
        <div className="w-[80%] h-[50%] max-w-[400px] max-h-[500px]">
          <QrReader
            onResult={handleResult}
            constraints={{ facingMode: "environment" }}
            containerStyle={{
              width: "100%",
              height: "100%",
            }}
            videoStyle={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      {/* Button container */}
      <div className="h-[34vh] bg-white flex justify-evenly items-center">
        <button className="flex items-center rounded-full border-2 border-black px-4 py-2 gap-1"
        onClick={
          () => navigate(-1)
        }>
          <img src={ArrowIcon} alt="" className="w-6" />
          Quay lại
        </button>
        <button 
        className="flex items-center rounded-full border-2 border-black px-4 py-2 gap-1"
        onClick={() => setShowPopupInputQR(true)}
        >
          <img src={Keyboard} alt="" className="w-6" />
          Nhập mã xe
        </button>
      </div>

      {showPopupInputQR && <PopupInputQR onClose={() => setShowPopupInputQR(false)} />}
    </div>
  );
};

export default QRScanner;
