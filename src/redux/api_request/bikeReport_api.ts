import axiosInstance from "../../axios/axios.interceptor";
import { getErrorMessage } from "../../data/errorMessage";
import { createReportFailure, createReportStart, createReportSuccess, getReportListFailure, getReportListStart, getReportListSuccess, updateReportFailure, updateReportStart, updateReportSuccess } from "../slice/bikeReportSlice";

export const createBikeReport = async (data: any, dispatch: any, navigate: any, setError: any) => {
    dispatch(createReportStart());
    try {
        const response = await axiosInstance.post('v1/bike-report', {
            bike: data.bike,
            location: data.location,
        });
        dispatch(createReportSuccess(response.data));
        navigate("/report");
    } catch (err: any) {
        const errorCode = err.response?.data?.code;
        console.log(errorCode)
        const errorMessage = getErrorMessage(errorCode);
        setError(errorMessage);
        dispatch(createReportFailure());
    }
}

export const getReportToday = async (dispatch: any) => {
    dispatch(getReportListStart())
    try {
        const response = await axiosInstance.get('v1/bike-report/today');
        dispatch(getReportListSuccess(response.data));
    } catch (err: any) {
        const errorCode = err.response?.data?.code;
        console.log(errorCode)
        dispatch(getReportListFailure());
    }
}

export const getReportTodayPending = async (dispatch: any) => {
    dispatch(getReportListStart())
    try {
        const response = await axiosInstance.get('v1/bike-report/today/pending');
        dispatch(getReportListSuccess(response.data));
    } catch (err: any) {
        const errorCode = err.response?.data?.code;
        console.log(errorCode)
        dispatch(getReportListFailure());
    }
}

export const getAllReport = async (dispatch: any) => {
    dispatch(getReportListStart())
    try {
        const response = await axiosInstance.get('v1/bike-report');
        dispatch(getReportListSuccess(response.data));
    } catch (err: any) {
        const errorCode = err.response?.data?.code;
        console.log(errorCode)
        dispatch(getReportListFailure());
    }
}

export const updateReportById = async (id: string, dispatch: any) => {
    dispatch(updateReportStart())
    try {
        const response = await axiosInstance.patch(`v1/bike-report/fixed/${id}`);
        dispatch(updateReportSuccess(response.data));
    }
    catch (err: any) {
        const errorCode = err.response?.data?.code;
        console.log(errorCode)
        dispatch(updateReportFailure());
    }
}