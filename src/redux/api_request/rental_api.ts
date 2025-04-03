import axiosInstance from "../../axios/axios.interceptor";
import { getErrorMessage } from "../../data/errorMessage";
import { createRentalFailure, createRentalStart, createRentalSuccess, getRentalDetailFailure, getRentalDetailStart, getRentalDetailSuccess, returnRentalFailure, returnRentalStart, returnRentalSuccess } from "../slice/rentalSlice"

export const createRental = async (bikeId: string, dispatch: any, navigate: any, setError: any) => {
    dispatch(createRentalStart());
    try {
        const res = await axiosInstance.post('v1/rentals', {
            bikeId
        })
        dispatch(createRentalSuccess(res.data));
        navigate('/station');
    } catch (err: any) {
        const errorCode = err.response?.data?.code;
        console.log(errorCode)
        const errorMessage = getErrorMessage(errorCode);
        setError(errorMessage);
        dispatch(createRentalFailure());
    }
}

export const returnRental = async (rentalId: string, lat: number, lon: number, dispatch: any, navigate: any) => {
    dispatch(returnRentalStart());
    try {
        const currentStation = await axiosInstance.get(`v1/stations/nearest?lat=${lat}&lon=${lon}`);
        if (currentStation.data.code == "1417") {
            dispatch(returnRentalFailure());
            return
        }

        const res = await axiosInstance.patch(`v1/rentals/return-bike`, {
            rentalId,
            endStationId: currentStation.data.result._id
        });
        dispatch(returnRentalSuccess(res.data));
        navigate('/home');
    } catch (error) {
        console.log(error);
        dispatch(returnRentalFailure());
    }
}

export const checkHaveRentalOnGoing = async (dispatch: any) => {
    dispatch(getRentalDetailStart());
    try {
        const res = await axiosInstance.get(`v1/rentals/check-user`);
        dispatch(getRentalDetailSuccess(res.data));
    } catch (error) {
        console.log(error);
        dispatch(getRentalDetailFailure());
    }
}