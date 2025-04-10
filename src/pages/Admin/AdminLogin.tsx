import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLock } from "@fortawesome/free-solid-svg-icons";
import BgAdmin from "../../assets/BgAdmin.png"

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            {/* Login Form */}
            <div className="px-8 pt-[50px] w-full flex items-center justify-center flex-col gap-10">
                <img src={BgAdmin} alt="" />
                <h2 className="text-3xl font-bold">Đăng nhập</h2>
                <form className="w-full max-w-sm">
                    <div className="space-y-6 w-full">

                        {/* Input số điện thoại */}
                        <div className="relative flex items-center">
                            <FontAwesomeIcon icon={faPhone} className="absolute left-3 text-gray-400" />
                            <input
                                type="tel"
                                placeholder="Số điện thoại"
                                className="pl-10 pr-4 py-4 rounded-lg w-full border border-none bg-[#F7F7F7]"

                            />
                        </div>

                        {/* Input mật khẩu */}
                        <div className="relative flex items-center">
                            <FontAwesomeIcon icon={faLock} className="absolute left-3 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mật khẩu"
                                className="pl-10 pr-12 py-4 rounded-lg w-full border border-none bg-[#F7F7F7]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} className="text-gray-500" /> : <Eye size={20} className="text-gray-500" />}
                            </button>
                        </div>

                        {/* Nút đăng nhập */}
                        <div className="flex justify-center">
                        <button
                            type="submit"
                            className={" px-16 py-4 rounded-lg transition-all duration-200 hover:shadow-inner-lg bg-[#FFB142] text-white shadow hover:bg-[#FFC168]"}
                        >
                            Đăng nhập
                        </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin