import React from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentFailed from '../assets/PaymentFailed.jpg'

function DepositFailed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8">Thanh toán không thành công</h1>
      
      <div className="w-64 h-64 mb-8">
        <img 
          src={PaymentFailed}
          alt="Success" 
          className="w-full h-full object-contain"
        />
      </div>

      <p className="text-lg font-medium mb-2">Có lỗi xảy ra trong quá trình thanh toán!</p>
      <p className="text-gray-500 text-sm mb-8">Vui lòng thử lại.</p>

      <button
        onClick={() => navigate('/home')}
        className="w-full py-4 bg-[#1a237e] text-white rounded-lg font-medium"
      >
        Thử lại
      </button>
    </div>
  );
}

export default DepositFailed;