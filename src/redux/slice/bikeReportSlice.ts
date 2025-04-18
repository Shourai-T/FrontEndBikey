import { createSlice } from "@reduxjs/toolkit";

const bikeReportState = createSlice({
    name: 'bikeReport',
    initialState: {
        createReport: {
            data: null,
            isFetching: false,
            error: false
        },
        getReportList: {
            data: null,
            isFetching: false,
            error: false
        },
        updateReport: {
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
        },
        getReportListStart(state) {
            state.getReportList.isFetching = true;
            state.getReportList.error = false;
        },
        getReportListSuccess(state, action) {
            state.getReportList.data = action.payload.result;
            state.getReportList.isFetching = false;
            state.getReportList.error = false;
        },
        getReportListFailure(state) {
            state.getReportList.error = true;
            state.getReportList.isFetching = false;
        },

        updateReportStart(state) {
            state.updateReport.isFetching = true;
            state.updateReport.error = false;
        },
        updateReportSuccess(state, action) {
            state.updateReport.data = action.payload.result;
            state.updateReport.isFetching = false;
            state.updateReport.error = false;
        },
        updateReportFailure(state) {
            state.updateReport.error = true;
            state.updateReport.isFetching = false;
        },

    }
})

export const { updateReportStart, updateReportSuccess, updateReportFailure } = bikeReportState.actions;

export const { getReportListStart, getReportListSuccess, getReportListFailure } = bikeReportState.actions;

export const { createReportStart, createReportFailure, createReportSuccess } = bikeReportState.actions;


export default bikeReportState.reducer;