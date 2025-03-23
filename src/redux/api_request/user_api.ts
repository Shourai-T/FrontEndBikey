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