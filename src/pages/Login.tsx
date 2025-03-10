import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLock } from '@fortawesome/free-solid-svg-icons';
import BgLogin from '../assets/BgLogin.png';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="login-container bg-cover bg-center relative"
    style={{ backgroundImage: `url(${BgLogin})` }}
    >

      {/* Login Form */}
      <div className="px-8 absolute bottom-8 w-full flex items-center justify-center flex-col gap-10">
        <h2 className="text-3xl font-bold">Đăng nhập</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="space-y-7 w-full">
            <div className="relative mb-10">
              <FontAwesomeIcon 
                icon={faPhone}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="tel"
                placeholder="Số điện thoại"
                className="input-field"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="relative">
              <FontAwesomeIcon 
                icon={faLock} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mật khẩu"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button type="submit" className="login-button w-[204px]">
              Đăng nhập
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className=" mt-12 text-center">
          <span className="text-gray-600">Bạn chưa có tài khoản? </span>
          <a href="/register" className="text-black underline font-medium">Đăng kí ngay</a>
        </div>
      </div>
    </div>
  );
}

export default Login;