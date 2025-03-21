import axiosInstance from "../../axios/axios.interceptor"
import { countBikeEachStationFailure, countBikeEachStationStart, countBikeEachStationSuccess } from "../slice/bikeSlice"
import { Dispatch } from "redux"
export const countBikeEachStation = async (dispatch:any) =>{
    dispatch(countBikeEachStationStart())
    try{
        const res = await axiosInstance.get('/v1/bikes/count')
        dispatch(countBikeEachStationSuccess(res.data))
    }catch(err:any){
        dispatch(countBikeEachStationFailure())
        console.log(err)
     }

}