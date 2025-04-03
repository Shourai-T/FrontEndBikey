import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { QrCode, Search, Clock } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import BgHeader from "../assets/BgHead.png";
import Logo from "../assets/LogoBikey.png";
import BgBalanceCard from "../assets/BgBalanceCard.png";
import IconBicycle from "../assets/IconBicycle.png";
import IconOpenBook from "../assets/IconOpenBook.png";
import IconUser from "../assets/IconUser.png";
import Banner from "../assets/Banner.png";
import account from "../assets/account.png";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/api_request/user_api"
import LoadingScreen from "../components/LoadingScreen";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getUser(dispatch);
  }, [dispatch]);

  const user = useSelector((state: any) => state.user.getUser.currentUser);
  const loadingUser = useSelector(
    (state: any) => state.user.getUser.isFetching
  );
  if (loadingUser) return <LoadingScreen />;
  return (
    <div className="min-h-screen px-6 pt-8 relative">
      {/* Header */}
      <header
        className="absolute px-6 pt-11 left-0 top-0 w-full h-[272px] bg-cover bg-center mb-4 rounded-b-[32px]"
        style={{ backgroundImage: `url(${BgHeader})` }}
      >
        <div className="flex items-center justify-between">
          <img src={Logo} alt="logo" className="w-14" />
          <div
            className="w-8 h-8 rounded-full overflow-hidden"
            onClick={() => navigate("/account")}
          >
            <img
              src={account}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <p className="text-sm mt-3 text-white">
          Xin chào, <b>{user?.fullName}</b>
        </p>
        <div
          className="relative mb-6 mt-4 items-center"
          onClick={() => navigate("/search-station")}
        >
          <input
            type="text"
            placeholder="Tìm kiếm trạm xe đạp"
            className="w-full h-9 bg-white rounded-full pb-1 px-5 pr-12 text-[#666666] border border-[#666666] placeholder-[#666666] placeholder:text-xs "
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
        </div>
      </header>
      {/* Body */}
      <div className="h-screen w-full relative top-44">
        <div
          className="relative h-[180px] shadow-md bg-cover bg-center rounded-2xl p-6 mb-6"
          style={{ backgroundImage: `url(${BgBalanceCard})` }}
        >
          <div className="flex justify-between items-center text-black">
            <div>
              <p className="text-gray-600 text-sm mb-1">Số dư hiện tại</p>
              <h2 className="text-3xl font-bold">{user?.wallet.balance} VND</h2>
            </div>
            <div
              className="flex flex-col justify-center items-center gap-2"
              onClick={() => navigate("/scanqr")}
            >
              <QrCode className="text-[#102590]" size={30} />
              <p className="text-[8px] text-[#102590] text-xs">
                Quét mã thuê xe
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={() => navigate("/deposit")}
              className="flex items-center justify-center gap-2 border border-[#102590] text-[#102590] w-[133px] h-[36px] rounded-full"
            >
              <FontAwesomeIcon icon={faCreditCard} />
              <span className="text-[8px]">Nạp tiền</span>
            </button>
            <button
              onClick={() => navigate("/history")}
              className="flex items-center justify-center gap-2 border border-[#102590] text-[#102590] w-[133px] h-[36px] rounded-full"
            >
              <Clock size={16} />
              <span className="text-[8px]">Lịch sử giao dịch</span>
            </button>
          </div>
        </div>
        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Tiện ích</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              {
                img: IconBicycle,
                label: "Trạm xe\ngần đây",
                route: "/station",
              },
              {
                img: IconOpenBook,
                label: "Hướng dẫn\nsử dụng",
                route: "/guide",
              },
              { img: IconUser, label: "Hỗ trợ\nngười dùng", route: "/guide " },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
                onClick={() => navigate(item.route)}
              >
                <div className="bg-white/10 rounded-xl mb-1">
                  <img src={item.img} alt="Icon" className="w-8" />
                </div>
                <span className="text-[8px] text-center whitespace-pre-wrap">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Promotion Banner */}
        <div className="rounded-2xl overflow-hidden border border-[#102590] relative mb-8">
          <img
            src={Banner}
            alt="Promotion"
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-3 left-14 right-0 p-6">
            <button className="text-[#102590] px-4 py-2 rounded-full text-[8px] font-medium border border-[#102590]">
              Quét mã ngay!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
