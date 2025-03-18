import React, { useState } from 'react';
import BgRegister from '../assets/BgRegister.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/api_request/auth_api';
import { useDispatch } from 'react-redux';

const Register = () => {
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const[phoneValidate,setPhoneValidate] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      setErrorPassword('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    if (password !== confirmPassword) {
      setErrorPassword('Mật khẩu nhập lại không đúng, vui lòng kiểm tra!');
      return;
    }

    if (phone.length !== 10) {
      setErrorPhoneNumber('Số điện thoại phải có 10 chữ số!');
      return;
    }

    // Nếu không có lỗi, xóa thông báo lỗi
    setErrorPassword('');
    setError('');
    setErrorPhoneNumber('');

    const newUser = {
      phoneNumber: phone,
      fullName: fullName,
      dateOfBirth: birthDate,
      gender: gender,
      password: password,
    };

    registerUser(newUser, dispatch, navigate, setError);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorPassword('');
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setErrorPassword('');
  };

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setErrorPhoneNumber('')
  }

  return (
    <div
      className="min-h-[100vh] flex items-center justify-center bg-cover bg-center px-7"
      style={{ backgroundImage: `url(${BgRegister})` }}
    >
      <div className="rounded-lg w-full max-w-md mb-32">
        <h2 className="text-3xl font-bold text-center mb-12">Đăng ký</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          <div className=' flex flex-col gap-[5px]'>
            <input
              type="text"
              required
              placeholder="Số điện thoại"
              className="w-full bg-gray-100 px-4 py-3.5 border text-xs placeholder:text-xs rounded-md focus:outline-none"
              value={phone}
              onChange={handlePhoneNumber}
            />
            {errorPhoneNumber && <p className="text-red-500 text-xs">{errorPhoneNumber}</p>}
          </div>
          <input
            type="text"
            required
            placeholder="Họ và tên"
            className="w-full bg-gray-100 px-4 py-3 border text-xs placeholder:text-xs rounded-md focus:outline-none"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="date"
            required
            className="w-full bg-gray-100 px-4 py-3 border placeholder:text-xs rounded-md focus:outline-none text-xs"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <div className="relative">
            <select
              required
              className="w-full bg-gray-100 px-4 py-3 border placeholder:text-xs rounded-md focus:outline-none appearance-none text-xs"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" className="text-xs">
                Chọn giới tính
              </option>
              <option value="male" className="text-xs">
                Nam
              </option>
              <option value="female" className="text-xs">
                Nữ
              </option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute size-3 right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600"
            />
          </div>
          <input
            required
            type="password"
            placeholder="Mật khẩu"
            className="w-full bg-gray-100 px-4 py-3 border placeholder:text-xs rounded-md focus:outline-none"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            required
            type="password"
            placeholder="Nhập lại mật khẩu"
            className="w-full bg-gray-100 px-3 py-3 border placeholder:text-xs rounded-md focus:outline-none"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {errorPassword && <p className="text-red-500 text-xs">{errorPassword}</p>}
          <button
            type="submit"
            className="w-[185px] h-[51px] mt-3 mx-auto block bg-[#FFB142] text-white text-sm py-3 rounded-md transition"
          >
            Đăng ký
          </button>
          {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
