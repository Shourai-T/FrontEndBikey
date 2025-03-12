import { useState } from "react";
import SearchIcon from "../assets/search-icon.png";
import NoStation from "../assets/HistoryEmpty.jpg"
import Location from "../assets/location-icon.png"
import Nearme from "../assets/near-icon.png"

const stations = [
  { id: 1, name: "Trạm xe Hà Nội", location:"123 Nguyễn Huệ, quận 1, TP.HCM" },
  { id: 2, name: "Trạm xe Sài Gòn",location:"123 Nguyễn Huệ, quận 1, TP.HCM" },
  { id: 3, name: "Trạm xe Đà Nẵng" ,location:"123 Nguyễn Huệ, quận 1, TP.HCM"},
  { id: 4, name: "Trạm xe Hải Phòng" ,location:"123 Nguyễn Huệ, quận 1, TP.HCM"},
  { id: 5, name: "Trạm xe Cần Thơ" ,location:"123 Nguyễn Huệ, quận 1, TP.HCM"},
];

const SearchStation = () => {
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);

  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = () => {
    setShowList(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowList(true);
    }
  };

  return (
    <div className="relative w-full pt-8 px-8">
      {/* Ô tìm kiếm */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Tìm trạm xe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown} // Bắt sự kiện Enter
          className="pl-3 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
        />
        {/* Icon search */}
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 cursor-pointer"
          onClick={handleSearch} // Click button search
        >
          <img src={SearchIcon} alt="Search" />
        </button>
      </div>

      {/* Danh sách trạm xe - Luôn hiển thị sau khi tìm kiếm */}
      {showList && (
        <div
            className={`w-full mt-2 bg-white rounded-lg ${
            filteredStations.length > 0 ? "border-b border-gray-200 shadow-lg" : ""
            }`}
        >
            {filteredStations.length > 0 ? (
            <ul>
                {filteredStations.map((station) => (
                <li
                    key={station.id}
                    className="px-4 hover:bg-gray-100 cursor-pointer text-black"
                    onClick={() => setSearch(station.name)}
                >
                    <div className="flex items-center justify-between border-b border-gray-200 border-1 py-2">
                        <div className="flex items-center gap-2">
                            <div className="rounded-full bg-[#102590] w-fit p-1 h-fit">
                                <img src={Location} alt="Location" className='w-[20px]' />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="">{station.name}</p>
                                <span className="text-xs text-gray-500">{station.location}</span>
                            </div>
                        </div>
                        <div className="items-center">
                            <img src={Nearme} alt="Nearme" className='w-[20px]' />
                        </div>

                    </div>
                </li>
                ))}
            </ul>
            ) : (
            <div className="w-full text-center p-4">
                <img
                src={NoStation}
                alt="No Station"
                className="w-full h-full mx-auto"
                style={{
                    objectFit: "cover",
                    objectPosition: "center",
                }}
                />
                <p className="text-black text-xl mt-4">Không tìm thấy trạm xe.</p>
                <span className="text-gray-500 text-xs">Vui lòng kiểm tra tên/địa chỉ hoặc thử tìm kiếm khác.</span>
            </div>
            )}
        </div>
        )}

    </div>
  );
};

export default SearchStation;
