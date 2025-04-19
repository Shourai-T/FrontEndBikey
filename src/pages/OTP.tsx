import { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";
import React, { useRef, useState, useEffect } from "react";
import { sendOTP, verifyOtp } from "../redux/api_request/auth_api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { auth } from "../../firebase";

const OTP: React.FC = () => {
  const { phoneNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Changed from 'navigation' to 'navigate'
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);

  // Initialize recaptcha only after component is mounted
  useEffect(() => {
    // Clear any existing reCAPTCHA widget
    const recaptchaElements = document.querySelectorAll(".grecaptcha-badge");
    recaptchaElements.forEach((el) => el.parentNode?.removeChild(el));

    // Important: Use a string ID instead of a DOM reference to avoid DOM-related issues
    if (!recaptchaVerifier) {
      try {
        const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA solved");
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired");
            // Recreate the reCAPTCHA if it expires
            if (recaptchaVerifier) {
              setRecaptchaVerifier(null);
            }
          },
        });

        setRecaptchaVerifier(verifier);
      } catch (error) {
        console.error("Error creating RecaptchaVerifier:", error);
      }
    }

    return () => {
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
      }
    };
  }, []);

  // Send OTP after recaptchaVerifier is initialized
  useEffect(() => {
    if (recaptchaVerifier && phoneNumber) {
      // Small delay to ensure reCAPTCHA is fully initialized
      const timer = setTimeout(() => {
        sendOTP(
          recaptchaVerifier,
          phoneNumber,
          setConfirmationResult,
          dispatch
        );
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [recaptchaVerifier, phoneNumber, dispatch]);

  // Focus first input when component mounts
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
      verifyOtp(otpString, dispatch, navigate, confirmationResult); // Changed 'navigation' to 'navigate'
    } else {
      console.log("ConfirmationResult chưa được thiết lập!");
    }
  };

  // const loading = useSelector((state: any) => state.auth.sendOTP.isFetching);
  // if (loading) return <LoadingScreen />;

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
      {/* Use an ID instead of a ref for reCAPTCHA */}
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
