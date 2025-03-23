import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/api_request/user_api";
import PreviousIcon from '../assets/previous-icon.png'

const EditUser = () => {
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("male"); // Mặc định là "male"

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getUser(dispatch);
    }, [dispatch]);

    const user = useSelector((state: any) => state.user.getUser.currentUser);

    useEffect(() => {
        if (user?.dateOfBirth) {
            setBirthday(new Date(user?.dateOfBirth).toISOString().split("T")[0]);
        }
        if (user?.gender) {
            setGender(user.gender);
        }
    }, [user]);

    return (
        <div className="mt-4 px-8 min-h-screen items-center gap-12">
            {/* Header */}
            <div className="flex items-center gap-2">
                <img src={PreviousIcon} alt="Previous Icon" className="w-[20px] h-[20px] cursor-pointer" onClick={() => navigate(-1)} />
                <h3 className="font-semibold my-4 text-xl">Chỉnh sửa thông tin</h3>
            </div>

            {/* User Information */}
            <div className="space-y-8 items-center">
                {/* Số điện thoại */}
                <div className="flex gap-5 items-center">
                    <div className="w-[120px] font-semibold">
                        Số điện thoại
                    </div>
                    <div className="flex-1 text-[11px] px-4">
                        {user?.phoneNumber}
                    </div>
                </div>

                {/* Ngày sinh */}
                <div className="flex gap-5 items-center">
                    <div className="w-[120px] font-semibold">Ngày sinh</div>
                    <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        className="flex-1 text-[11px] py-2 px-4 bg-[#F7F7F7] rounded-lg outline-none"
                    />
                </div>

                {/* Giới tính */}
                <div className="flex gap-5 items-center">
                    <div className="w-[120px] font-semibold">Giới tính</div>
                    <div className="relative flex-1">
                        <select
                            required
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full bg-[#F7F7F7] py-2 px-4 placeholder:text-[10px] rounded-md focus:outline-none appearance-none text-[10px]"
                        >
                            <option value="male" className="text-xs">Nam</option>
                            <option value="female" className="text-xs">Nữ</option>
                        </select>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className="absolute size-3 right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600"
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex justify-center gap-7">
                <button
                    className="py-2 px-4 border border-[#1a237e] text-[#1a237e] rounded-full text-[8px] font-semibold"
                    onClick={() => navigate("/user")}
                >
                    Hủy
                </button>
                <button className="py-2 px-4 bg-[#1a237e] text-white rounded-full text-[8px] font-semibold">
                    Chỉnh sửa
                </button>
            </div>
        </div>
    );
};

export default EditUser;
