import { useState } from "react";
import SearchInput from "./SearchInput";
import Location from "../assets/location-icon.png";
import Nearme from "../assets/near-icon.png";
import NoStation from "../assets/HistoryEmpty.jpg";
import { useNavigate } from "react-router-dom";
import previousIcon from "../assets/previous-icon.png";
const SearchStation = ({ setSearch, setShowSearch ,stations}: { setSearch: (value: string) => void; setShowSearch: (value: boolean) => void,stations:any[] }) => {
  const [search, setLocalSearch] = useState("");

  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(search.toLowerCase())
  );
  const navigate = useNavigate();

  const handleSelectStation = (stationId: number, stationName: string) => {
    setSearch(stationName);
    setShowSearch(false);
    navigate(`/station/${stationId}`); // Chuyển đến trang trạm xe
  };

  const handleSearch = () => {
    if (filteredStations.length > 0) {
      const bestMatch = filteredStations[0]; // Chọn trạm phù hợp nhất
      console.log("bestMatch", bestMatch);
      handleSelectStation(bestMatch._id, bestMatch.name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full h-full pt-8 px-8">
      <div className="flex items-center justify-between mb-4">
        <img src={previousIcon} alt="Previous" className="w-6 h-6 cursor-pointer" onClick={() => navigate(-1)} />
        <SearchInput value={search} onChange={setLocalSearch} onSearch={handleSearch} onKeyDown={handleKeyDown}  />
      </div>

      <div className={`w-full mt-2 bg-white rounded-lg ${filteredStations.length > 0 ? "border-b border-gray-200" : ""}`}>
        {filteredStations.length > 0 ? (
          <ul>
            {filteredStations.map((station) => (
              <li key={station._id} className="hover:bg-gray-100 cursor-pointer text-black" onClick={() => handleSelectStation(station._id, station.name)}>
                <div className="flex items-center justify-between border-b border-gray-200 py-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-[#102590] w-fit p-1 h-fit">
                      <img src={Location} alt="Location" className="w-[20px]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="">{station.name}</p>
                      <span className="text-xs text-gray-500">{station.address}</span>
                    </div>
                  </div>
                  <div className="items-center">
                    <img src={Nearme} alt="Nearme" className="w-[20px]" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="w-full text-center p-4">
            <img src={NoStation} alt="No Station" className="w-full h-full mx-auto bg-center bg-cover" />
            <p className="text-black text-xl mt-4">Không tìm thấy trạm xe.</p>
            <span className="text-gray-500 text-xs">Vui lòng kiểm tra tên/địa chỉ hoặc thử tìm kiếm khác.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchStation;
