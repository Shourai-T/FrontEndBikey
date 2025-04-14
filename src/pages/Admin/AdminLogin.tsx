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
        <div className="w-full h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-5xl flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-0">

                {/*Login Form */}
                <div className="w-full md:w-1/2 px-6 md:px-12">
                    <h2 className="text-3xl font-bold text-center mb-6">ĐĂNG NHẬP</h2>
                    <form className="w-full max-w-sm mx-auto">
                        <div className="space-y-6 w-full">
                            {/* Input số điện thoại */}
                            <div className="relative flex items-center">
                                <FontAwesomeIcon icon={faPhone} className="absolute left-3 text-gray-400" />
                                <input
                                    type="tel"
                                    placeholder="Số điện thoại"
                                    className="pl-10 pr-4 py-4 rounded-lg w-full border border-none bg-[#F7F7F7]"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
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
                                    {showPassword ? (
                                        <EyeOff size={20} className="text-gray-500" />
                                    ) : (
                                        <Eye size={20} className="text-gray-500" />
                                    )}
                                </button>
                            </div>

                            {/* Nút đăng nhập */}
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="px-16 py-4 rounded-lg transition-all duration-200 hover:shadow-inner-lg bg-[#FFB142] text-white shadow hover:bg-[#FFC168]"
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/*Image */}
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <img src={BgAdmin} alt="Admin Background" className="max-w-full h-auto object-cover" />
                </div>
            </div>

        </div>
    )
}

export default AdminLogin