import React from 'react';
import { useNavigate } from 'react-router-dom';
import BgHisEmpty from '../assets/HistoryEmpty.jpg'

function HistoryEmpty() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8">Lịch sử giao dịch</h1>
      
      <div className="w-64 h-64 mb-8">
        <img 
          src={BgHisEmpty}
          alt="Success" 
          className="w-full h-full object-contain"
        />
      </div>

      <p className="text-lg font-medium mb-2">Có vẻ bạn chưa có giao dịch nào....</p>
      <p className="text-gray-500 text-sm mb-8">Khi bạn thực hiện giao dịch, chúng sẽ hiển thị tại đây.</p>

      <button
        onClick={() => navigate('/home')}
        className="w-full py-4 bg-[#1a237e] text-white rounded-lg font-medium"
      >
        Tạo giao dịch ngay!
      </button>
    </div>
  );
}

export default HistoryEmpty