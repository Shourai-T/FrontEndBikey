import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface StationState {
    getAllStation: {
        data: any;
        isFetching: boolean;
        error: boolean;
    };
    updateStation: {
        isFetching: boolean;
        success: boolean;
        error: boolean;
    };
}



const initialState: StationState = {
    getAllStation: {
        data: null,
        isFetching: false,
        error: false
    },
    updateStation: {
        isFetching: false,
        success: false,
        error: false
    },
};

const stationSlice = createSlice({
    name: "station",
    initialState,
    reducers: {
        getAllStationStart(state) {
            state.getAllStation.isFetching = true;
            state.getAllStation.error = false;
        },
        getAllStationSuccess(state, action: PayloadAction<{ result: any }>) {
            state.getAllStation.data = action.payload.result.data ? action.payload.result.data : action.payload.result;
            state.getAllStation.isFetching = false;
            state.getAllStation.error = false;
        },
        getAllStationFailure(state) {
            state.getAllStation.isFetching = false;
            state.getAllStation.error = true;
        },
        updateStationStart(state) {
            state.updateStation.isFetching = true;
            state.updateStation.error = false;
        },
        updateStationSuccess(state, action: PayloadAction<{ result: any }>) {
            state.updateStation.isFetching = false;
            state.updateStation.success = true;
            state.updateStation.error = false;
        },
        updateStationFailure(state) {
            state.updateStation.isFetching = false;
            state.updateStation.error = true;
        },
    }
});

export const { updateStationStart, updateStationSuccess, updateStationFailure } = stationSlice.actions;
export const { getAllStationStart, getAllStationSuccess, getAllStationFailure } = stationSlice.actions;

export default stationSlice.reducer;
