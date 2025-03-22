import IconGuide from "../assets/IconGuide.png";
import IconFix from "../assets/IconFix.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBikeByQRCode } from "../redux/api_request/bike_api";
import { getBikeStatus } from "../data/statusBike";
import { getUser } from "../redux/api_request/user_api";
import { createRental } from "../redux/api_request/rental_api";

const InfoQR = () => {
  const { qrCode } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bike = useSelector((state: any) => state.bike.bikeDetail.data);
  const user = useSelector((state: any) => state.user.getUser.currentUser);
  const loadingBike = useSelector(
    (state: any) => state.bike.bikeDetail.isFetching
  );
  const loadingUser = useSelector(
    (state: any) => state.user.getUser.isFetching
  );
  useEffect(() => {
    getBikeByQRCode(qrCode!, dispatch);
    getUser(dispatch);
  }, []);
  const startRent = () => {
    createRental(bike._id, dispatch, navigate);
  };

  if (loadingBike || loadingUser || !bike || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-6 m-auto">
      <div className="mt-10 w-full">
        <h1 className="m-auto font-bold py-2 border-b">
          {bike.currentStation?.name}
        </h1>
      </div>
      <div className="flex gap-5 my-4 py-4 flex-col border-b">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-xs">
            Mã xe <span className="text-[#102590] pl-2">{bike.bikeCode}</span>
          </p>
          <p className="font-semibold text-xs">
            Trạng thái{" "}
            <span className="font-normal pl-2">
              {getBikeStatus(bike.status)}
            </span>
          </p>
        </div>
        <div className="flex justify-center">
          <button
            className="font-bold text-sm text-white py-4 px-16 rounded-lg bg-[#102590] shadow-sm"
            onClick={bike ? startRent : () => {}}
          >
            Bắt đầu
          </button>
        </div>
        <div className="flex justify-center gap-5 items-center">
          <button className=" flex justify-center items-center gap-1 py-2 px-4 border border-[#102590] rounded-full">
            <img src={IconGuide} alt="icon" className="w-5" />
            <span className="text-[8px]">Quy định sử dụng</span>
          </button>
          <button className="flex justify-center items-center gap-1 py-2 px-4 border border-[#102590] rounded-full">
            <img src={IconFix} alt="icon" className="w-5" />
            <span className="text-[8px]">Báo xe hỏng</span>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[11px]">Số dư tài khoản</p>
        <span className="text-xs font-semibold">
          {user.wallet.balance} điểm
        </span>
      </div>
    </div>
  );
};

export default InfoQR;
