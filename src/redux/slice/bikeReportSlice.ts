import { createSlice } from "@reduxjs/toolkit";

const bikeReportState = createSlice({
    name: 'bikeReport',
    initialState: {
        createReport: {
            data: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        createReportStart(state) {
            state.createReport.isFetching = true;
            state.createReport.error = false;
        },
        createReportSuccess(state, action) {
            state.createReport.data = action.payload;
            state.createReport.isFetching = false;
            state.createReport.error = false;
        },
        createReportFailure(state) {
            state.createReport.error = true;
            state.createReport.isFetching = false;
        }

    }
})

export const { createReportStart, createReportFailure, createReportSuccess } = bikeReportState.actions; 


export default bikeReportState.reducer;