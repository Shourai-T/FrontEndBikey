import axiosInstance from "../../axios/axios.interceptor";
import { createReportFailure, createReportStart, createReportSuccess } from "../slice/bikeReportSlice";

export const createBikeReport = async (data: any, dispatch: any) => {
    dispatch(createReportStart());
    try {
        const response = await axiosInstance.post('v1/bike-report', {
            bike: data.bike,
            location: data.location,
        });
        dispatch(createReportSuccess(response.data));
    } catch (error) {
        dispatch(createReportFailure());
    }
}