import { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";
import React, { useRef, useState, useEffect } from "react";
import { auth } from "../../firebase";
import { sendOTP, verifyOtp } from "../redux/api_request/auth_api";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


const OTP: React.FC= () => {
  const { phoneNumber } = useParams();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (recaptchaVerifier && phoneNumber) {
      sendOTP(recaptchaVerifier, phoneNumber, setConfirmationResult, dispatch);
    }
  }, [recaptchaVerifier, phoneNumber]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (!recaptchaVerifier) {
      const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
      setRecaptchaVerifier(verifier);
    }
    return () => {
      recaptchaVerifier?.clear();
    };
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

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length === 6 && confirmationResult) {
      verifyOtp(otpString, dispatch, navigation, confirmationResult);
    } else {
      console.log("ConfirmationResult chưa được thiết lập!");
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
      <div id="recaptcha-container"></div>
      <button
        onClick={handleVerify}
        className="px-8 py-3 bg-blue-600 text-white rounded-lg"
      >
        Xác thực
      </button>
    </div>
  );
};

export default OTP;
