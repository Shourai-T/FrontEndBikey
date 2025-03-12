import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

const QRScanner = ({ onScan }: { onScan: (code: string) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setScanning(true);
        }
      } catch (error) {
        console.error("Camera access denied:", error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!scanning) return;

    const scanQRCode = () => {
      if (!canvasRef.current || !videoRef.current) return;
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          onScan(code.data);
          setScanning(false);
        } else {
          requestAnimationFrame(scanQRCode);
        }
      }
    };

    requestAnimationFrame(scanQRCode);
  }, [scanning]);

  return (
    <div className="relative w-full h-screen">
      {/* Camera */}
      <video ref={videoRef} className="absolute top-0 left-0 w-full h-full object-cover" />

      {/* Overlay with "cut-out" for QR scanning */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black/30" // Lighter overlay
          style={{
            maskImage: "polygon(35% 35%, 65% 35%, 65% 65%, 35% 65%)",
            WebkitMaskImage: "polygon(35% 35%, 65% 35%, 65% 65%, 35% 65%)",
          }}
        ></div>

        {/* QR scanning border */}
        <div className="relative w-64 h-64 border-4 border-yellow-500 shadow-xl"> {/* Brighter border color and shadow */}
          {/* Corner borders */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white"></div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default QRScanner;