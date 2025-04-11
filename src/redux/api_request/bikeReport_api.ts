import axiosInstance from "../../axios/axios.interceptor";
import { getErrorMessage } from "../../data/errorMessage";
import { createReportFailure, createReportStart, createReportSuccess } from "../slice/bikeReportSlice";

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