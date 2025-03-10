import React, { useRef, useState, useEffect } from 'react';

interface OTPInputProps {
  onComplete?: (otp: string) => void;
}

const OTP: React.FC<OTPInputProps> = ({ onComplete }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last character
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Focus button if all fields are filled
    if (value && index === 5) {
      buttonRef.current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
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
            ref={el => inputRefs.current[index] = el}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            className="w-12 h-12 text-center bg-[#F7F7F7] text-xl font-semibold border-2 rounded-lg 
                     focus:border-blue-500 focus:outline-none transition-colors"
          />
        ))}
      </div>

      <button
        ref={buttonRef}
        onClick={handleVerify}
        className="w-[190px] h-[51px] px-8 py-3 bg-[#102590] text-white rounded-lg font-medium
                 hover:bg-blue-600 focus:outline-none focus:ring-2 
                 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Xác thực
      </button>
    </div>
  );
};

export default OTP;