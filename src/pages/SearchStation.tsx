import { useEffect, useState } from "react";
import NoStation from "../assets/HistoryEmpty.jpg";
import Location from "../assets/location-icon.png";
import Nearme from "../assets/near-icon.png";
import SearchInput from "../components/SearchInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";
import previousIcon from "../assets/previous-icon.png";
import { getListStationsSort } from "../redux/api_request/station_api";

const SearchStation = () => {
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const stationList = useSelector(
    (state: any) => state.station.getAllStation.data
  );
  const loadingStation = useSelector(
    (state: any) => state.station.getAllStation.isFetching
  );
  const station = stationList?.map((station: any) => ({
    key: station._id,
    id: station._id,
    name: station.name,
    address: station.address,
    location: station.location,
  }));

  const filteredStations = station?.filter((station: any) =>
    station.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = () => {
    setShowList(true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Lỗi lấy vị trí:", error);
        alert(
          "Không thể lấy vị trí hiện tại. Vui lòng kiểm tra cài đặt định vị."
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 } // timeout 10s, cache 5s
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      getListStationsSort(
        userLocation.latitude,
        userLocation.longitude,
        dispatch
      );
    }
  }, [userLocation, dispatch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowList(true);
    }
  };
  if (loadingStation || !station || userLocation === null) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative w-full pt-8 px-8">
      <img
        src={previousIcon}
        alt="Previous"
        className="w-6 h-6 cursor-pointer absolute top-4 left-4"
        onClick={() => navigate(-1)}
      />
      <SearchInput
        value={search}
        onChange={setSearch}
        onSearch={handleSearch}
        onKeyDown={handleKeyDown}
      />
      {/* Danh sách trạm xe - Luôn hiển thị sau khi tìm kiếm */}
      {showList && (
        <div
          className={`w-full mt-2 bg-white rounded-lg ${
            filteredStations.length > 0 ? "border-b border-gray-200" : ""
          }`}
        >
          {filteredStations.length > 0 ? (
            <ul>
              {filteredStations.map((station: any) => (
                <li
                  key={station.id}
                  className=" hover:bg-gray-100 cursor-pointer text-black"
                  onClick={() => navigate(`/station/${station.id}`)}
                >
                  <div className="flex items-center justify-between border-b border-gray-200 border-1 py-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-[#102590] w-fit p-1 h-fit">
                        <img
                          src={Location}
                          alt="Location"
                          className="w-[20px]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="">{station.name}</p>
                        <span className="text-xs text-gray-500">
                          {station.address}
                        </span>
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
              <img
                src={NoStation}
                alt="No Station"
                className="w-full h-full mx-auto bg-center bg-cover"
              />
              <p className="text-black text-xl mt-4">Không tìm thấy trạm xe.</p>
              <span className="text-gray-500 text-xs">
                Vui lòng kiểm tra tên/địa chỉ hoặc thử tìm kiếm khác.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchStation;
