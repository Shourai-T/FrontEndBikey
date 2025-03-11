import React, { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react';
import BgPayment from '../assets/BgPayment.png'
import IconZalopay from '../assets/IconZalopay.png'
import check from '../assets/check.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Deposit = () => {
    const [amount, setAmount] = useState<number>(0);
    const predefinedAmounts = [20000, 50000, 100000, 200000];
    const [showRules, setShowRules] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
      setIsClicked(true);
      setShowRules(true);
    
      // Reset hiệu ứng sau 200ms
      setTimeout(() => setIsClicked(false), 200);
    };
  
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, '');
      setAmount(Number(value));
    };
  
    const formatAmount = (value: number) => {
      return value.toLocaleString('vi-VN');
    };
  
    return (
      <div className="min-h-screen bg-white p-6 mt-8">
        {/* Header */}
        <div className="flex justify-end mb-6"
        onClick={() => {handleClick()}}
        >
          <h2 
          className={`flex justify-end mb-6 rounded-md px-2 py-1 transition-all duration-200 font-bold ${isClicked ? 'shadow-inner bg-gray-200' : ''}`} >Quy định</h2>
        </div>

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setAmount(Number(value));
  };

  const formatAmount = (value: number) => {
    return value.toLocaleString('vi-VN');
  };

  const handleSubmit = () => {
    if (amount >= 20000) {
      navigate('/deposit-success');
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 mt-8">
      {/* Header */}
      <div className="flex justify-end mb-6"
        onClick={() => setShowRules(true)}
      >
        <h2 className="text-lg font-medium">Quy định</h2>
      </div>

      {/* Rules Dialog */}
      {showRules && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setShowRules(false)}
              className="absolute right-4 top-4"
            >
              <X size={20} />
            </button>

            <div className="space-y-4">
              <div className="text-2xl font-bold mb-6">
                10.000 <span className="text-gray-500 text-lg">điểm/lượt</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Thời lượng: 60 phút / lượt</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Thời hạn: 60 phút</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex items-center text-[#102590] justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={faCreditCard} />
                </div>
                <div>
                  <p className="font-medium">Cước phí quá thời lượng: 3.000 điểm / 15 phút</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#F79009]">
                <div className="w-6 h-6 flex-shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium">Để sử dụng dịch vụ, cần có tối thiểu 20.000 điểm trong tài khoản.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
  
        {/* Payment Card */}
        <div className="h-[178px] text-white rounded-2xl p-6 mb-6 bg-cover bg-center"
        style={{ backgroundImage: `url(${BgPayment})` }}
        >
          <p className="text-sm mb-2">Số tiền muốn nạp (VND)</p>
          <div className="relative mb-6">
            <input
              type="text"
              value={formatAmount(amount)}
              onChange={handleAmountChange}
              className={`w-full bg-transparent text-4xl text-center focus:outline-none 
    ${amount === 0 ? "opacity-50" : "opacity-100"}`}
              placeholder="0"
            />
          </div>
          
          {/* Amount Buttons */}
          <div className="grid grid-cols-4 gap-3 pt-3 border-t">
            {predefinedAmounts.map((value) => (
              <button
                key={value}
                onClick={() => setAmount(value)}
                className={`py-2 px-1 rounded-full text-[8px] ${
                  amount === value 
                    ? 'bg-white text-blue-600' 
                    : 'bg-white/10'
                }`}
              >
                {(value/1000).toLocaleString()}K
              </button>
            ))}
          </div>
        </div>
  
        {/* Warning Message */}
        <div className="flex items-center gap-2 mb-6 text-xs text-[#F79009]">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <p>Số tiền nạp tối thiểu là 20.000 VND. Tiền nạp vào sẽ không thể hoàn lại được.</p>
        </div>
  
        {/* Payment Method */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Phương thức thanh toán</h3>
          <div className="border-b py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={IconZalopay}
                alt="ZaloPay" 
                className="w-8 h-8 rounded"
              />
              <span>Ví ZaloPay</span>
            </div>
            <img src={check} alt="checkpoint" className='w-5' />

      {/* Payment Card */}
      <div className="h-[178px] text-white rounded-2xl p-6 mb-6 bg-cover bg-center"
        style={{ backgroundImage: `url(${BgPayment})` }}
      >
        <p className="text-sm mb-2">Số tiền muốn nạp (VND)</p>
        <div className="relative mb-6">
          <input
            type="text"
            value={formatAmount(amount)}
            onChange={handleAmountChange}
            className="w-full bg-transparent text-4xl font-bold text-center focus:outline-none"
            placeholder="0"
          />
        </div>

        {/* Amount Buttons */}
        <div className="grid grid-cols-4 gap-3 pt-3 border-t">
          {predefinedAmounts.map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
              className={`py-2 px-1 rounded-full text-[8px] ${amount === value
                  ? 'bg-white text-blue-600'
                  : 'bg-white/10'
                }`}
            >
              {(value / 1000).toLocaleString()}K
            </button>
          ))}
        </div>
      </div>

      {/* Warning Message */}
      <div className="flex items-center gap-2 mb-6 text-xs text-[#F79009]">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <p>Số tiền nạp tối thiểu là 20.000 VND. Tiền nạp vào sẽ không thể hoàn lại được.</p>
      </div>

      {/* Payment Method */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Phương thức thanh toán</h3>
        <div className="border-b py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={IconZalopay}
              alt="ZaloPay"
              className="w-8 h-8 rounded"
            />
            <span>Ví ZaloPay</span>
          </div>
          <img src={check} alt="checkpoint" className='w-5' />

        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className={`w-full mt-64 py-4 rounded-lg text-[#666666] font-medium ${amount >= 20000
            ? 'bg-blue-600 text-white'
            : 'bg-[#E5E5E5] text-[#666666]'
          }`}
        disabled={amount < 20000}
      >
        Nạp tiền
      </button>
    </div>
  );
}

export default Deposit