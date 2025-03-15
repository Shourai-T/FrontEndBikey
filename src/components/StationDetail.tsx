import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { stations } from "../data";
import SearchInput from "../components/SearchInput";
import IconParking from "../assets/IconParking.png"
import IconFixBlack from "../assets/IconFixBlack.png"
import RideStatusCard from "./RideStatusCard";

function StationDetail() {
    const { id } = useParams();
    const [search, setSearch] = useState("");

    const station = stations.find((s) => s.id === Number(id));

    return (
        <div className="relative w-[393px] h-[852px] mx-auto">
            {/* Ô tìm kiếm */}
            <div className="absolute top-10 left-0 w-full px-4 z-10">
                <SearchInput value={search} onChange={setSearch} onSearch={() => { }} onKeyDown={() => { }} />
            </div>

            {/* Bản đồ Google Maps */}
            {station ? (
                <iframe
                    src={`https://www.google.com/maps?q=${station.latitude},${station.longitude}&output=embed`}
                    width="393"
                    height="852"
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ border: 0 }}
                    loading="lazy"
                ></iframe>
            ) : (
                <p className="text-red-500 text-center mt-4">Không tìm thấy trạm xe.</p>
            )}

            {/* Component RideStatusCard */}
            <RideStatusCard
                rideId="123xyx-bjfbej"
                status="đang di chuyển"
                duration="5p12s"
                onReturn={() => console.log("Trả xe")}
                onReport={() => console.log("Báo xe hỏng")}
            />

            {/* <div className="fixed bottom-0 left-0 right-0 bg-white w-full h-[233px] rounded-t-2xl shadow-[0px_-4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col p-8">
                    <h3 className="text-sm font-semibold text-[#102590]">123xyx-bjfbej <span className="text-xs text-black font-normal">đang di chuyển</span></h3>
                    <div className="flex items-start py-4 border-b broder-[#E5E5E5]">
                        <div className="flex flex-col gap-[10px] justify-center items-center">
                            <h2 className="font-semibold text-xs">Thời gian đã đi</h2>
                            <p className="font-normal text-[11px]">5p12s</p>
                        </div>
                    </div>
                    <div className="flex justify-center py-4 gap-7">
                        <div className="flex flex-col items-center">
                            <img src={IconParking} alt="" className="w-[11px] pb-1 pt-0.5" />
                            <p className="text-[8px] font-semibold">Trả xe</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={IconFixBlack} alt="" className="w-[18px] pb-1" />
                            <p className="text-[8px] font-semibold">Báo xe hỏng</p>
                        </div>
                    </div>
                </div> */}
        </div>
    );
}

export default StationDetail;
