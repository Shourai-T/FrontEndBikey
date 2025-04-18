import axiosInstance from "../../axios/axios.interceptor"
import { countBikeEachStationFailure, countBikeEachStationStart, countBikeEachStationSuccess, getBikeByQRCodeFailure, getBikeByQRCodeStart, getBikeByQRCodeSuccess, getBikeListStart, getBikeListSuccess } from "../slice/bikeSlice"
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

export const getBikeList = async (dispatch: any) => {
    dispatch(getBikeListStart())
    try {
        const res = await axiosInstance.get('/v1/bikes')
        dispatch(getBikeListSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(getBikeByQRCodeFailure())
    }
}

export const printQrCode = async (id: string) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/v1/print?bikeId=${id}`;
        window.open(url, '_blank');
    } catch (error) {
        console.log(error)
    }
}