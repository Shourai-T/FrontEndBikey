import { createSlice } from "@reduxjs/toolkit";

const rentalState = createSlice({
    name: 'bike',
    initialState: {
        createRental: {
            data: null,
            isFetching: false,
            error: false
        },
        returnRental: {
            data: null,
            isFetching: false,
            error: false
        },
        getRentalDetail: {
            data: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        createRentalStart(state) {
            state.createRental.isFetching = true;
            state.createRental.error = false;
        },
        createRentalSuccess(state, action) {
            state.createRental.data = action.payload.result;
            state.createRental.isFetching = false;
            state.createRental.error = false;
        },
        createRentalFailure(state) {
            state.createRental.error = true;
            state.createRental.isFetching = false;
        },
        returnRentalStart(state) {
            state.returnRental.isFetching = true;
            state.returnRental.error = false;
        },
        returnRentalSuccess(state, action) {
            state.returnRental.data = action.payload.result;
            state.getRentalDetail.data = null;
            state.returnRental.isFetching = false;
            state.returnRental.error = false;
        },
        returnRentalFailure(state) {
            state.returnRental.error = true;
            state.returnRental.isFetching = false;
        },
        getRentalDetailStart(state) {
            state.getRentalDetail.isFetching = true;
            state.getRentalDetail.error = false;
        },
        getRentalDetailSuccess(state, action) {
            state.getRentalDetail.data = action.payload.result;
            state.getRentalDetail.isFetching = false;
            state.getRentalDetail.error = false;
        },
        getRentalDetailFailure(state) {
            state.getRentalDetail.error = true;
            state.getRentalDetail.isFetching = false;
        }
    }
})

export const { createRentalStart, createRentalSuccess, createRentalFailure } = rentalState.actions;

export const { returnRentalStart, returnRentalSuccess, returnRentalFailure } = rentalState.actions;

export const { getRentalDetailStart, getRentalDetailSuccess, getRentalDetailFailure } = rentalState.actions;

export default rentalState.reducer;