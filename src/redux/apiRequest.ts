
import {loginStart, loginSuccess,loginFailure} from './authSlice'
import axiosInstance from '../axios/axios.interceptor';


export const loginUser = async(user:any,dispatch:any,navigate:any)=>{
    dispatch(loginStart());
    try{
        const res = await axiosInstance.post('/v1/auth/login',user);
        dispatch(loginSuccess(res.data));
        navigate("/homepage");
    }catch(err){
        dispatch(loginFailure());
    }
}