import { createSlice } from "@reduxjs/toolkit";
import { sendOTP } from "../api_request/auth_api";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null as { isVerified?: boolean } | null,
            isFetching: false,
            error: false
        },
        register: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        logout: {
            isFetching: false,
            error: false
        },
        verifyOtp: {
            success: true,
            isFetching: false,
            error: false
        },
        sendOTP: {
            success: true,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        loginStart(state) {
            state.login.isFetching = true;
            state.login.error = false;
        },
        loginSuccess: (state, actions) => {
            state.login.currentUser = actions.payload.result;
            state.login.isFetching = false;
            state.login.error = false;
        },
        loginFailure: (state) => {
            state.login.error = true;
            state.login.isFetching = false;
        },
        registerStart(state) {
            state.register.error = false;
            state.register.isFetching = false;
        },
        registerSuccess(state, actions) {
            state.login.currentUser = actions.payload.result;
            state.register.error = false;
            state.register.isFetching = false;
        },
        registerFailure(state) {
            state.register.error = true;
            state.register.isFetching = false;
        },
        logoutStart(state) {
            state.logout.isFetching = true;
            state.logout.error = false;
        },
        logoutSuccess(state) {
            state.login.currentUser = null
            state.logout.isFetching = false;
            state.logout.error = false;
        },
        logoutFailure(state) {
            state.logout.error = true;
            state.logout.isFetching = false;
        },
        verifyOtpStart(state) {
            state.verifyOtp.isFetching = true;
            state.verifyOtp.error = false;
        },
        verifyOtpSuccess(state) {
            state.login.currentUser = {
                ...(state.login.currentUser || {}),
                isVerified: true
            } as { isVerified?: boolean };
            state.verifyOtp.success = true;
            state.verifyOtp.isFetching = false;
            state.verifyOtp.error = false;
        },
        verifyOtpFailure(state) {
            state.verifyOtp.success = false;
            state.verifyOtp.isFetching = false;
            state.verifyOtp.error = true;
        },
        sendOTPStart(state) {
            state.sendOTP.isFetching = true;
            state.sendOTP.error = false;
        },
        sendOTPSuccess(state) {
            state.sendOTP.success = true;
            state.sendOTP.isFetching = false;
            state.sendOTP.error = false;
        },
        sendOTPFailure(state) {
            state.verifyOtp.success = false;
            state.verifyOtp.isFetching = false;
            state.verifyOtp.error = true;
        }
    }
})

export const { registerStart, registerSuccess, registerFailure } = authSlice.actions;

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;

export const { logoutStart, logoutSuccess, logoutFailure } = authSlice.actions;

export const { verifyOtpStart, verifyOtpSuccess, verifyOtpFailure } = authSlice.actions;

export const { sendOTPStart, sendOTPSuccess, sendOTPFailure } = authSlice.actions;

export default authSlice.reducer;