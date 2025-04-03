import axiosInstance from "../../axios/axios.interceptor";
import { getAllStationFailure, getAllStationStart, getAllStationSuccess } from "../slice/stationSlice"

export const getAllStation = async (dispatch: any) => {
    dispatch(getAllStationStart());
    try {
        const res = await axiosInstance.get('/v1/stations?limit=&page=')
        dispatch(getAllStationSuccess(res.data));
    } catch (err: any) {
        dispatch(getAllStationFailure());
    }
}

export const getListStationsSort = async (lat: number, lon: number, dispatch: any) => {
    dispatch(getAllStationStart());
    try {
        const res = await axiosInstance.get(`/v1/stations/sorted?lat=${lat}&lon=${lon}`);
        dispatch(getAllStationSuccess(res.data));
    } catch (error) {
        dispatch(getAllStationFailure());
    }
}

export const getStationHaveCountBike = async (dispatch: any, lat: number, lon: number) => {
    dispatch(getAllStationStart());
    try {
        const res = await axiosInstance.get(`/v1/bikes/count?lat=${lat}&lon=${lon}`);
        dispatch(getAllStationSuccess(res.data));
    } catch (err: any) {
        dispatch(getAllStationFailure());
    }
}