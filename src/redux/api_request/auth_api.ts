
import {loginStart, loginSuccess,loginFailure,registerFailure, registerSuccess,registerStart, logoutSuccess, logoutFailure} from '../slice/authSlice'
import axiosInstance from '../../axios/axios.interceptor';
import { getErrorMessage } from '../../utils/errorMessage';
import { useEffect, useState } from 'react';
import {ConfirmationResult,RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import {auth} from '../../../firebase'


export const loginUser = async(user:any,dispatch:any,navigate:any,setError:any)=>{
    dispatch(loginStart());
    try{
        const res = await axiosInstance.post('/v1/auth/login',user)
        dispatch(loginSuccess(res.data));
        navigate("/home");
    }catch(err:any){
        const errorCode = err.response?.data?.code;
        console.log(errorCode) 
        const errorMessage = getErrorMessage(errorCode);
        setError(errorMessage);
        dispatch(loginFailure());
    }
}

export const registerUser = async (user:any,dispatch:any,navigate:any,setError:any)=>{
    dispatch(registerStart());
    try{
        const res = await axiosInstance.post('/v1/auth/register',user)
        dispatch(registerSuccess(res.data));
        navigate("/register/otp");
    }catch(err:any){
        const errorCode = err.response?.data?.code;
        console.log(errorCode) 
        const errorMessage = getErrorMessage(errorCode);
        setError(errorMessage);
        dispatch(registerFailure());
    }
}
export const logout = async (user:any,dispatch:any, navigate:any)=>{
    try{
        await axiosInstance.post('/v1/auth/logout')
        dispatch(logoutSuccess());
        navigate("/login");
    }catch(err:any){
        console.log(err) 
        dispatch(logoutFailure());
    }
}


const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [message, setMessage] = useState("");
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);

  // Khởi tạo RecaptchaVerifier khi component mount
  useEffect(() => {
      const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        
      });
  
      setRecaptchaVerifier(verifier);
      return () => {
        recaptchaVerifier?.clear();
      }
  }, [auth]);

  // Gửi OTP
  const sendOTP = async () => {
    try {
      if (!recaptchaVerifier) {
        setMessage("Đang khởi tạo reCAPTCHA, vui lòng thử lại.");
        return;
      }
      console.log("recaptchaVerifier", recaptchaVerifier);
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setConfirmationResult(confirmation);
      setMessage("OTP đã được gửi!");
    } catch (error) {
      console.log("error", error);
      setMessage("Lỗi khi gửi OTP. Vui lòng thử lại.");
    }
  };
  
  // Xác minh OTP
  const verifyOTP = async () => {
    if (!confirmationResult) {
      setMessage("Vui lòng gửi OTP trước.");
      return;
    }

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      setMessage(`Xác thực thành công! Số điện thoại: ${user.phoneNumber}`);
      // Gửi idToken lên backend nếu cần
      const idToken = await user.getIdToken();
      await sendTokenToBackend(idToken);
    } catch (error:any) {
      console.log(error);
      setMessage(`Lỗi xác minh OTP: ${error}`);
    }
  };

  const sendTokenToBackend = async (idToken:any) => {
    try {
      const response = await fetch("https://b024-2405-4803-c884-7310-196b-e593-3a45-fe4e.ngrok-free.app/api/v1/otp-token/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const data = await response.json();
      console.log(data);
      setMessage(`Phản hồi từ backend: ${data.message}`);
    } catch (error:any) {
      setMessage(`Lỗi khi gửi token đến backend: ${error.message}`);
    }
  };
}
export default PhoneAuth ;