import axiosInstance from "../../axios/axios.interceptor";
import { getErrorMessage } from "../../data/errorMessage";
import { getUserFailure, getUserStart, getUserSuccess } from "../slice/userSlice";

export const getUser = async (dispatch: any) => {
    dispatch(getUserStart());
    try {
        const res = await axiosInstance.get('/v1/users/get-my-info')
        dispatch(getUserSuccess(res.data));

    } catch (err: any) {
        const errorCode = err.response?.data?.code;
        dispatch(getUserFailure());
    }
}

export const updateUser = async(dispatch:any)=>{
    dispatch(getUserStart());
    try{
        const res = await axiosInstance.patch('/v1/users/update-my-info')
        console.log(res.data);
        dispatch(getUserSuccess(res.data));
        alert('User information updated successfully');
    }catch(err:any){
        const errorCode = err.response?.data?.code;
        console.log(errorCode) 
        dispatch(getUserFailure());
    }
}