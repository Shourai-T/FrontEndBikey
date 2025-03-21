import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Station {
    id: string;
    name: string;
    location: string;
}

interface StationState {
    getAllStation: {
        data: Station[];
        isFetching: boolean;
        error: boolean;
    };
}

const initialState: StationState = {
    getAllStation: {
        data: [], 
        isFetching: false,
        error: false
    }
};

const stationSlice = createSlice({
    name: "station",  
    initialState,
    reducers: {
        getAllStationStart(state) {
            state.getAllStation.isFetching = true;
            state.getAllStation.error = false;
        },
        getAllStationSuccess(state, action: PayloadAction<{ result: { data: Station[] } }>) {
            state.getAllStation.data = action.payload.result.data;
            state.getAllStation.isFetching = false;
            state.getAllStation.error = false;
        },
        getAllStationFailure(state) {
            state.getAllStation.isFetching = false;
            state.getAllStation.error = true;
        }
    }
});

export const { getAllStationStart, getAllStationSuccess, getAllStationFailure } = stationSlice.actions;

export default stationSlice.reducer;
