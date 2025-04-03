import React from "react";
import MarkerV2 from "../assets/MarkerV2.png"

interface CustomMarkerProps {
  bikeCount: number;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ bikeCount }) => {
  return (
    <div className="relative w-[100px] h-[100px]">
      <img src={MarkerV2} alt="Marker" className="w-full h-full" />
      <span className="absolute top-[45%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl">
        {bikeCount}
      </span>
    </div>
  );
};

export default CustomMarker;
