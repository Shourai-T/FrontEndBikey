import { createSlice } from "@reduxjs/toolkit";

interface Bike {
    currentStation: string;
}

const bikeState = createSlice({
    name: 'bike',
    initialState: {
        countBikeEachStation: {
            data:null,
            isFetching: false,
            error: false
        }
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
        }
    }
})

export const { countBikeEachStationStart, countBikeEachStationFailure, countBikeEachStationSuccess } = bikeState.actions;

export default bikeState.reducer;