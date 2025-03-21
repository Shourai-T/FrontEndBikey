import axiosInstance from "../../axios/axios.interceptor";
import { getAllTransactionFailure, getAllTransactionStart, getAllTransactionSuccess } from "../slice/transactionSlice";

export const getAllTransaction = async (dispatch:any)=>{
    dispatch(getAllTransactionStart());
    try{
        const res = await axiosInstance.get('/v1/transactions')
        dispatch(getAllTransactionSuccess(res.data));
    } catch (err:any) {
        dispatch(getAllTransactionFailure());
    }
}
