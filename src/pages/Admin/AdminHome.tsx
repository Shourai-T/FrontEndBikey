import React, { useEffect, useState } from "react";
import MapboxMap from "../../components/MapboxMaps";
import { useDispatch, useSelector } from "react-redux";
import QRIcon from "../../assets/Qr_scanner.png";
import { format, toZonedTime } from "date-fns-tz";
import PopupQR from "../../components/PopupQR";
import QRImage from "../../assets/QrDemo.png";
import { Dropdown } from "../../components/Dropdown";
import { getStationHaveCountBike } from "../../redux/api_request/station_api";
import LoadingScreenAdmin from "../../components/LoadingScreenAdmin";
import { getBikeList, printQrCode } from "../../redux/api_request/bike_api";
import {
  getAllReport,
  getReportToday,
  getReportTodayPending,
  updateReportById,
} from "../../redux/api_request/bikeReport_api";
import { getUser } from "../../redux/api_request/user_api";

type Section = "stations" | "vehicles" | "reports";

const AdminHome = () => {
  const [station, setStation] = useState<any>(null);
  const listStations = useSelector(
    (state: any) => state.station.getAllStation.data
  );
  const bikeList = useSelector((state: any) => state.bike.bikeList.data);
  const reportList = useSelector(
    (state: any) => state.bikeReport.getReportList.data
  );

  const user = useSelector((state: any) => state.user.getUser.currentUser);
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState<Section>("stations");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedReportLocation, setSelectedReportLocation] = useState<
    [number, number] | undefined
  >(undefined);
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const options = [
    "Tất cả báo cáo trong ngày",
    "Tất cả báo cáo",
    "Báo cáo chưa được xử lý ngày hôm nay",
  ];
  useEffect(() => {
    getUser(dispatch);
  }, [dispatch]);
  function getStatusBikeLabel(status: string): string {
    switch (status) {
      case "available":
        return "Sẵn sàng";
      case "inuse":
        return "Đang sử dụng";
      case "maintenance":
        return "Bảo trì";
      default:
        return "Không xác định";
    }
  }
  function getReportByFilter(filter: string) {
    switch (filter) {
      case "Tất cả báo cáo trong ngày":
        return getReportToday(dispatch);
      case "Tất cả báo cáo":
        return getAllReport(dispatch);
      case "Báo cáo chưa được xử lý ngày hôm nay":
        return getReportTodayPending(dispatch);
      default:
        return getReportToday(dispatch);
    }
  }

  function formatToVietnamTime(isoString: string): string {
    const vietnamTimeZone = "Asia/Ho_Chi_Minh";
    const date = new Date(isoString);
    const zonedDate = toZonedTime(date, vietnamTimeZone);

    return format(zonedDate, "dd/MM/yyyy HH:mm:ss", {
      timeZone: vietnamTimeZone,
    });
  }

  useEffect(() => {
    setIsLoading(true);
    getReportToday(dispatch).finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Add a small delay for better UX
    });
  }, []);
  useEffect(() => {
    setIsLoading(true);
    getBikeList(dispatch).finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Add a small delay for better UX
    });
  }, []);
  useEffect(() => {
    setIsLoading(true);
    getStationHaveCountBike(dispatch, undefined, undefined).finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Add a small delay for better UX
    });
  }, []);

  useEffect(() => {
    if (listStations && listStations.length > 0) {
      const defaultStation = listStations.find((s: any) => s._id === 1);
      setStation(defaultStation);
    }
  }, [listStations]);

  const print = async (qrCode: string) => {
    await printQrCode(qrCode);
  };

  const handleUpdateToFixed = async (id: string) => {
    await updateReportById(id, dispatch);
    setShowMap(false);
  };
  const ReportMap = () => {
    return (
      <MapboxMap
        latitude={station?.location[1]}
        longitude={station?.location[0]}
        stations={listStations}
        isAdmin={true}
        reportLocation={selectedReportLocation}
      />
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "stations":
        return (
          <div className="flex-1 relative">
            <MapboxMap
              latitude={station?.location[1]}
              longitude={station?.location[0]}
              stations={listStations}
              isAdmin={true}
              // reportLocation={selectedReportLocation}
            />
          </div>
        );
      case "vehicles":
        return (
          <div className="flex-1 p-16">
            <div className="bg-white shadow-[0_0_10px_2px_#00000040]">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b border-black">
                    <th className="text-xl text-center py-4 px-4 font-semibold">
                      Mã xe
                    </th>
                    <th className="text-xl text-center py-4 px-4 font-semibold">
                      Trạng thái
                    </th>
                    <th className="text-xl text-center py-4 px-4 font-semibold">
                      Trạm hiện tại
                    </th>
                    <th className="text-xl text-center py-4 px-4 font-semibold">
                      QRCode
                    </th>
                  </tr>
                </thead>
              </table>

              {/* tbody */}
              <div className="max-h-[520px] overflow-y-auto">
                <table className="w-full table-fixed">
                  <tbody>
                    {bikeList.map((vehicle: any) => (
                      <tr key={vehicle._id} className="">
                        <td className="text-lg py-4 px-4 text-center">
                          {vehicle.bikeCode}
                        </td>
                        <td className="text-lg py-4 px-4 text-center">
                          {getStatusBikeLabel(vehicle.status)}
                        </td>
                        <td className="text-lg py-4 px-4 text-center">
                          {vehicle.currentStation.name}
                        </td>
                        <td className="text-lg py-4 px-4 flex justify-center">
                          <button
                            className="px-4 py-1.5 border border-[#102590] text-[#102590] rounded-full text-sm flex items-center gap-2"
                            onClick={() => print(vehicle._id)}
                          >
                            <img src={QRIcon} alt="Icon Qr" className="w-5" />
                            In mã QR
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "reports":
        return (
          <div className={`flex-1 ${showMap ? "relative" : "p-16"}`}>
            <div className={`${showMap ? "hidden" : ""}`}>
              <div className="flex items-center justify-end pb-8">
                <Dropdown
                  options={options}
                  defaultValue={options[0]}
                  onChange={getReportByFilter}
                />
              </div>
              <div className="bg-white shadow-[0_0_10px_2px_#00000040]">
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="border-b border-black">
                      <th className="text-xl text-center py-4 px-4 font-semibold">
                        Người báo cáo
                      </th>
                      <th className="text-xl text-center py-4 px-4 font-semibold">
                        Mã xe
                      </th>
                      <th className="text-xl text-center py-4 px-4 font-semibold">
                        Địa điểm báo cáo
                      </th>
                      <th className="text-xl text-center py-4 px-4 font-semibold">
                        Thời gian báo cáo
                      </th>
                      <th className="text-xl text-center py-4 px-4 font-semibold">
                        Đã xử lý
                      </th>
                    </tr>
                  </thead>
                </table>

                {/* tbody */}
                <div className="max-h-[520px] overflow-y-auto">
                  <table className="w-full table-fixed">
                    <tbody>
                      {reportList.map((report: any, index: number) => (
                        <tr key={index} className="">
                          <td className="text-lg py-4 px-4 text-center">
                            {report.userId.fullName}
                          </td>
                          <td className="text-lg py-4 px-4 text-center">
                            {report.bike?.bikeCode}
                          </td>
                          <td className="text-lg py-4 px-4 text-center">
                            <a
                              href="#"
                              className="underline"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedReportLocation(
                                  report.location as [number, number]
                                );
                                setShowMap(true);
                              }}
                            >
                              Xem vị trí
                            </a>
                          </td>
                          <td className="text-lg py-4 px-4 flex justify-center">
                            {formatToVietnamTime(report.createdAt)}
                          </td>
                          <td className="text-lg py-4 px-4 text-center">
                            {report.status === "fixed" ? (
                              <span className="text-green-500 font-semibold">
                                Đã xử lý
                              </span>
                            ) : (
                              <button
                                className="text-red-500 font-semibold underline hover:text-red-700"
                                onClick={() => handleUpdateToFixed(report._id)}
                              >
                                Chưa xử lý
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {showMap && <ReportMap />}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {isLoading ? (
        <LoadingScreenAdmin />
      ) : (
        <>
          {/* Mobile Header (chỉ hiển thị khi <768px) */}
          <div className="h-14 px-6 bg-white flex items-center md:hidden">
            <p>
              Xin chào, <strong>Nguyễn Văn A</strong>
            </p>
          </div>

          {/* Desktop Sidebar (chỉ hiển thị khi ≥768px) */}
          <div className="hidden z-20 md:flex md:w-[300px] bg-white px-6 py-8 shadow-[0_2px_10px_1px_#00000040]">
            <div className="w-full">
              <p className="text-lg">
                Xin chào,{" "}
                <strong className="font-medium">{user.fullName}</strong>
              </p>
              <hr className="mt-4 mb-8 border-black" />
              <ul className="space-y-6 text-gray-600 flex flex-col items-center gap-3">
                <li
                  className={`cursor-pointer hover:text-black transition-colors w-full text-center py-2 rounded-lg ${
                    activeSection === "stations" ? "underline" : ""
                  }`}
                  onClick={() => {
                    setActiveSection("stations");
                    setShowMap(false);
                  }}
                >
                  Quản lý trạm
                </li>
                <li
                  className={`cursor-pointer hover:text-black transition-colors w-full text-center py-2 rounded-lg ${
                    activeSection === "vehicles" ? "underline" : ""
                  }`}
                  onClick={() => {
                    setActiveSection("vehicles");
                    setShowMap(false);
                  }}
                >
                  Quản lý xe
                </li>
                <li
                  className={`cursor-pointer hover:text-black transition-colors w-full text-center py-2 rounded-lg ${
                    activeSection === "reports" ? "underline" : ""
                  }`}
                  onClick={() => {
                    setActiveSection("reports");
                    setShowMap(false);
                  }}
                >
                  Quản lý báo cáo
                </li>
              </ul>
            </div>
          </div>

          {/* Section */}
          {renderContent()}

          {/* QR Popup */}
          {showPopup && (
            <PopupQR qrImage={QRImage} onClose={() => setShowPopup(false)} />
          )}
        </>
      )}
    </div>
  );
};

export default AdminHome;
