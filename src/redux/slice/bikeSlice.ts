import { createSlice } from "@reduxjs/toolkit";

const bikeState = createSlice({
    name: 'bike',
    initialState: {
        countBikeEachStation: {
            data: null,
            isFetching: false,
            error: false
        },
        bikeDetail: {
            data: null,
            isFetching: false,
            error: false
        },
        bikeList: {
            data: null,
            isFetching: false,
            error: false
        },
    },
    reducers: {
        countBikeEachStationStart(state) {
            state.countBikeEachStation.isFetching = true;
            state.countBikeEachStation.error = false;
        },
        countBikeEachStationSuccess(state, action) {
            state.countBikeEachStation.data = action.payload;
            state.countBikeEachStation.isFetching = false;
            state.countBikeEachStation.error = false;
        },
        countBikeEachStationFailure(state) {
            state.countBikeEachStation.error = true;
            state.countBikeEachStation.isFetching = false;
        },
        getBikeByQRCodeStart(state) {
            state.bikeDetail.isFetching = true;
            state.bikeDetail.error = false;
        },
        getBikeByQRCodeSuccess(state, action) {
            state.bikeDetail.data = action.payload.result;
            state.bikeDetail.isFetching = false;
            state.bikeDetail.error = false;
        },
        getBikeByQRCodeFailure(state) {
            state.bikeDetail.error = true;
            state.bikeDetail.isFetching = false;
        },
        getBikeListStart(state) {
            state.bikeList.isFetching = true;
            state.bikeList.error = false;
        },
        getBikeListSuccess(state, action) {
            state.bikeList.data = action.payload.result;
            state.bikeList.isFetching = false;
            state.bikeList.error = false;
        },
        getBikeListFailure(state) {
            state.bikeList.error = true;
            state.bikeList.isFetching = false;
        }
    }
})
export const { getBikeListStart, getBikeListSuccess, getBikeListFailure } = bikeState.actions;

export const { countBikeEachStationStart, countBikeEachStationFailure, countBikeEachStationSuccess } = bikeState.actions;

export const { getBikeByQRCodeStart, getBikeByQRCodeSuccess, getBikeByQRCodeFailure } = bikeState.actions;

export default bikeState.reducer;