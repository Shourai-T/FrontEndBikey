import React, { useRef, useState, useEffect } from 'react';

interface OTPInputProps {
  onComplete?: (otp: string) => void;
}

const OTP: React.FC<OTPInputProps> = ({ onComplete }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      onComplete?.(otpString);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center p-8">
      <h2 className="text-2xl font-bold mb-8">Nhập mã xác thực</h2>
      <div className="flex gap-3 mb-8">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center border-2 rounded-lg focus:border-blue-500"
          />
        ))}
      </div>
      <button onClick={handleVerify} className="px-8 py-3 bg-blue-600 text-white rounded-lg">
        Xác thực
      </button>
    </div>
  );
};

export default OTP;
