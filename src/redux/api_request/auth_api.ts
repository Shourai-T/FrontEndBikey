
import { loginStart, loginSuccess, loginFailure, registerFailure, registerSuccess, registerStart, logoutSuccess, logoutFailure, verifyOtpStart, verifyOtpSuccess, verifyOtpFailure, sendOTPStart, sendOTPSuccess, sendOTPFailure } from '../slice/authSlice'
import axiosInstance from '../../axios/axios.interceptor';
import { getErrorMessage } from '../../data/errorMessage';
import { useEffect, useState } from 'react';
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../../firebase'


export const loginUser = async (user: any, dispatch: any, navigate: any, setError: any) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.post('/v1/auth/login', user)
    dispatch(loginSuccess(res.data));
    navigate("/home");
  } catch (err: any) {
    const errorCode = err.response?.data?.code;
    console.log(errorCode)
    const errorMessage = getErrorMessage(errorCode);
    setError(errorMessage);
    dispatch(loginFailure());
  }
}

export const registerUser = async (user: any, dispatch: any, navigate: any, setError: any) => {
  dispatch(registerStart());
  try {
    const res = await axiosInstance.post('/v1/auth/register', user)
    dispatch(registerSuccess(res.data));
    navigate(`/register/otp/${user.phoneNumber}`);
  } catch (err: any) {
    const errorCode = err.response?.data?.code;
    console.log(errorCode)
    const errorMessage = getErrorMessage(errorCode);
    setError(errorMessage);
    dispatch(registerFailure());
  }
}
export const logout = async (dispatch: any, navigate: any) => {
  try {
    await axiosInstance.post('/v1/auth/logout')
    dispatch(logoutSuccess());
    navigate("/login");
  } catch (err: any) {
    console.log(err)
    dispatch(logoutFailure());
  }
}


export const verifyOtp = async (otp: string, dispatch: any, navigate: any, confirmationResult: any) => {
  dispatch(verifyOtpStart());
  try {
    const result = await confirmationResult.confirm(otp);
    const user = result.user;

    // Gửi idToken lên backend nếu cần
    const idToken = await user.getIdToken();
    const isSucces = await sendTokenToBackend(idToken);
    if (isSucces) {
      dispatch(verifyOtpSuccess());
      console.log("Xác thực thành công! Số điện thoại: ", user.phoneNumber);
      navigate("/home");
    }

  } catch (error: any) {
    console.log(error);
    dispatch(verifyOtpFailure());
  }
};

export const sendOTP = async (recaptchaVerifier: any, phoneNumber: string, setConfirmationResult: any, dispatch: any) => {
  dispatch(sendOTPStart());
  try {
    if (!recaptchaVerifier) {
      console.log("Đang khởi tạo reCAPTCHA, vui lòng thử lại.");
      return;
    }
    console.log("recaptchaVerifier", recaptchaVerifier);

    const confirmation = await signInWithPhoneNumber(auth, formatPhoneNumber(phoneNumber), recaptchaVerifier);
    setConfirmationResult(confirmation);
    console.log("OTP đã được gửi!");
    dispatch(sendOTPSuccess());
  } catch (error) {
    console.log("error", error);
    console.log("Lỗi khi gửi OTP. Vui lòng thử lại.");
    dispatch(sendOTPFailure());
  }
};

const sendTokenToBackend = async (idToken: any) => {
  try {
    const response = await axiosInstance.post("/v1/otp-token/verify", {
      idToken,
    });
    const data = await response.data;
    return data;
  } catch (error: any) {
    console.log("SendTokenToBackend Fail:", error);
    return null
  }
};

const formatPhoneNumber = (phoneNumber: string) => {
  return "+84" + phoneNumber.substring(1);
};