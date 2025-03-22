import axiosInstance from "../../axios/axios.interceptor";
import { createTransactionFailure, createTransactionStart, createTransactionSuccess, getAllTransactionFailure, getAllTransactionStart, getAllTransactionSuccess } from "../slice/transactionSlice";

export const getAllTransaction = async (dispatch: any) => {
    dispatch(getAllTransactionStart());
    try {
        const res = await axiosInstance.get('/v1/transactions')
        dispatch(getAllTransactionSuccess(res.data));
    } catch (err: any) {
        dispatch(getAllTransactionFailure());
    }
}

export const createTransactionWithZalopay = async (amount: any, dispatch: any) => {
    dispatch(createTransactionStart());
    try {
        const res = await axiosInstance.post('/v1/zalopay-payment', { amount });

        if (res.data?.result?.order_url) {
            window.location.href = res.data.result.order_url; // Chuyển hướng đến trang thanh toán
        }
        dispatch(createTransactionSuccess(res.data));
    } catch (err: any) {
        console.log(err);
        dispatch(createTransactionFailure());
    }
};
