import { useState } from "react";
import SearchIcon from "../assets/search-icon.png";
import NoStation from "../assets/HistoryEmpty.jpg"
import Location from "../assets/location-icon.png"
import Nearme from "../assets/near-icon.png"
import SearchInput from "../components/SearchInput";
import { useNavigate } from "react-router-dom";

const stations = [
  { id: 1, name: "Trạm xe Hà Nội", location:"123 Nguyễn Huệ, quận 1, TP.HCM" },
  { id: 2, name: "Trạm xe Sài Gòn",location:"123 Nguyễn Huệ, quận 1, TP.HCM" },
  { id: 3, name: "Trạm xe Đà Nẵng" ,location:"123 Nguyễn Huệ, quận 1, TP.HCM"},
  { id: 4, name: "Trạm xe Hải Phòng" ,location:"123 Nguyễn Huệ, quận 1, TP.HCM"},
  { id: 5, name: "Trạm xe Cần Thơ" ,location:"123 Nguyễn Huệ, quận 1, TP.HCM"},
];

const SearchStation = () => {
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(true);
  const navigate = useNavigate()

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
      <SearchInput value={search} onChange={setSearch} onSearch={handleSearch} onKeyDown={handleKeyDown} />

      {/* Danh sách trạm xe - Luôn hiển thị sau khi tìm kiếm */}
      {showList && (
        <div
            className={`w-full mt-2 bg-white rounded-lg ${
            filteredStations.length > 0 ? "border-b border-gray-200" : ""
            }`}
        >
            {filteredStations.length > 0 ? (
            <ul>
                {filteredStations.map((station) => (
                <li
                    key={station.id}
                    className=" hover:bg-gray-100 cursor-pointer text-black"
                    onClick={() => setSearch(station.name)}
                    // onClick={() => navigate(`/station/${station.id}`)}
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
                className="w-full h-full mx-auto bg-center bg-cover"  
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
