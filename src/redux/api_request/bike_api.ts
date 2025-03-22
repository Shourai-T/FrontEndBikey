import axiosInstance from "../../axios/axios.interceptor"
import { countBikeEachStationFailure, countBikeEachStationStart, countBikeEachStationSuccess, getBikeByQRCodeFailure, getBikeByQRCodeStart, getBikeByQRCodeSuccess } from "../slice/bikeSlice"
export const countBikeEachStation = async (dispatch: any) => {
    dispatch(countBikeEachStationStart())
    try {
        const res = await axiosInstance.get('/v1/bikes/count')
        dispatch(countBikeEachStationSuccess(res.data))
    } catch (err: any) {
        dispatch(countBikeEachStationFailure())
        console.log(err)
    }

}

export const getBikeByQRCode = async (qrCode: string, dispatch: any) => {
    dispatch(getBikeByQRCodeStart())
    try {
        const res = await axiosInstance.get(`/v1/bikes/qr-code/${qrCode}`)
        dispatch(getBikeByQRCodeSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(getBikeByQRCodeFailure())
    }
}