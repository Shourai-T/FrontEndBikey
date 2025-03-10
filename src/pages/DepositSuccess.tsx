import React from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentSuccess from '../assets/PaymentSuccess.jpg'

function DepositSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8">Thanh toán hoàn tất</h1>
      
      <div className="w-64 h-64 mb-8">
        <img 
          src={PaymentSuccess}
          alt="Success" 
          className="w-full h-full object-contain"
        />
      </div>

      <p className="text-lg font-medium mb-2">Bạn đã thực hiện giao dịch thành công!</p>
      <p className="text-gray-500 text-sm mb-8">Vào "Lịch sử giao dịch" để xem chi tiết giao dịch.</p>

      <button
        onClick={() => navigate('/home')}
        className="w-full py-4 bg-[#1a237e] text-white rounded-lg font-medium"
      >
        Quay về trang chủ
      </button>
    </div>
  );
}

export default DepositSuccess;