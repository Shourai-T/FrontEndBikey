import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLock } from "@fortawesome/free-solid-svg-icons";
import BgLogin from "../assets/BgLogin.png";
import { loginUser } from "../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const isDisabled = !phone || !password; 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  interface LoginProps {}

  interface LoginState {
    showPassword: boolean;
    phone: string;
    password: string;
    isKeyboardOpen: boolean;
  }

  const handleLogin = (e:any): void => {
    e.preventDefault();
    const newUser ={
      phone: phone,
      password: password,
    };
    loginUser(newUser,dispatch,navigate);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsKeyboardOpen(window.innerHeight < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`w-screen flex items-center justify-center transition-all duration-300 ${
        isKeyboardOpen ? "h-[100vh]" : "h-screen"
      }`}
      style={{
        backgroundImage: `url(${BgLogin})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Login Form */}
      <div className="px-8 pt-[100px] w-full flex items-center justify-center flex-col gap-10">
        <h2 className="text-3xl font-bold">Đăng nhập</h2>
        <form className="w-full max-w-sm">
          <div className="space-y-6 w-full">
            
            {/* Input số điện thoại */}
            <div className="relative flex items-center">
              <FontAwesomeIcon icon={faPhone} className="absolute left-3 text-gray-400" />
              <input
                type="tel"
                placeholder="Số điện thoại"
                className="pl-10 pr-4 py-2 rounded-lg w-full border border-gray-300"
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
                className="pl-10 pr-12 py-2 rounded-lg w-full border border-gray-300"
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
            <button
              type="submit"
              className={`w-full py-2 rounded-lg transition-all duration-200 hover:shadow-inner-lg ${
                isDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-lg" : "bg-[#FFB142] text-white shadow hover:bg-[#FFC168]"
              }`}
              
              disabled={isDisabled} 
              onClick={handleLogin}
              
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
