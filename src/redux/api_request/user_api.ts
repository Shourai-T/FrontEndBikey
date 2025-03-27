import axiosInstance from "../../axios/axios.interceptor";
import { getErrorMessage } from "../../data/errorMessage";
import { getUserFailure, getUserStart, getUserSuccess, updateUserStart, updateUserSuccess } from "../slice/userSlice";

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

export const updateUser = async (dispatch: any, userData: any) => {
    dispatch(updateUserStart());
    try {
        const res = await axiosInstance.patch('/v1/users/update-profile', userData);
        console.log(res.data);
        dispatch(updateUserSuccess(res.data));
        alert('Cập nhật thông tin thành công');
    } catch (err: any) {
        dispatch(getUserFailure());
    }
};
