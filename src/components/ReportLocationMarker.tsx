import React from "react";
import WarningIcon from "../assets/WarningIcon.png"

interface ReportLocationMarkerProps {
    lat: number;
    lng: number;
}

const ReportLocationMarker: React.FC<ReportLocationMarkerProps> = () => {
    return (
        <div className="relative w-6 h-6 flex items-center justify-center">
            <img src={WarningIcon} alt="" className="z-20" />
            <div className="absolute w-8 h-8 bg-red-500 opacity-70 rounded-full animate-ping"></div>
            <div className="absolute w-6 h-6 bg-red-500 opacity-80 rounded-full animate-ping delay-200"></div>
            <div className="absolute w-4 h-4 bg-red-500 opacity-90 rounded-full animate-ping delay-400"></div>
        </div>
    );
};

export default ReportLocationMarker;
