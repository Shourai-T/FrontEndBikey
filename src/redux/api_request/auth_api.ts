
import {loginStart, loginSuccess,loginFailure,registerFailure, registerSuccess,registerStart} from '../slice/authSlice'
import axiosInstance from '../../axios/axios.interceptor';
import { getErrorMessage } from '../../utils/errorMessage';


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