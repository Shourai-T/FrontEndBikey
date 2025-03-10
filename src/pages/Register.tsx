import React, { useState } from 'react';
import BgRegister from '../assets/BgRegister.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    // e.preventDefault();
    navigate("/register/otp");
  };
  

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-7"
      style={{ backgroundImage: `url(${BgRegister})` }}
    >
      <div className="rounded-lg w-full max-w-md mb-32">
        <h2 className="text-3xl font-bold text-center mb-16">Đăng ký</h2>
        <form className="space-y-4">
          <input
            type="tel"
            placeholder="Số điện thoại"
            className="w-full bg-gray-100 px-4 py-3.5 border placeholder:text-xs rounded-md focus:outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Họ và tên"
            className="w-full bg-gray-100 px-4 py-3 border placeholder:text-xs rounded-md focus:outline-none"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="date"
            className="w-full bg-gray-100 px-4 py-3 border placeholder:text-xs rounded-md focus:outline-none"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <div className="relative">
            <select
              className="w-full bg-gray-100 px-4 py-3 border placeholder:text-xs rounded-md focus:outline-none appearance-none"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className='absolute size-3 right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600'
            />
          </div>
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full bg-gray-100 px-4 py-3 border placeholder:text-xs rounded-md focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            className="w-full bg-gray-100 px-3 py-3 border placeholder:text-xs rounded-md focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            onSubmit={handleRegister}
            type="submit"
            className="w-[185px] h-[51px] mx-auto block bg-[#FFB142] text-white text-sm py-3 rounded-md transition"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
