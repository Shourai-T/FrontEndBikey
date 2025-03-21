import axiosInstance from "../../axios/axios.interceptor";
import { getAllStationFailure, getAllStationStart, getAllStationSuccess } from "../slice/stationSlice"

export const getAllStation= async (dispatch:any) =>{
    dispatch(getAllStationStart ());
    try{
        const res = await axiosInstance.get('/v1/stations?limit=&page=')
        dispatch(getAllStationSuccess(res.data));
    } catch (err:any) {
        dispatch(getAllStationFailure());
    }}

