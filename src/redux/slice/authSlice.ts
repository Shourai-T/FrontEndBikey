import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        login:{
            currentUser: null,
            isFetching: false,
            error: false
        },
        register:{
            currentUser: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        loginStart(state) {
            state.login.isFetching = true;
            state.login.error = false;
        },
        loginSuccess:(state,actions)=>{
            state.login.currentUser = actions.payload;
            state.login.isFetching = false;
            state.login.error = false;
        },
        loginFailure:(state) => {
            state.login.error= true;
            state.login.isFetching = false;
        },
        registerStart(state) {
            state.register.error = false;
            state.register.isFetching = false;
        },
        registerSuccess(state,actions) {
            state.register.currentUser = actions.payload;
            state.register.error = false;
            state.register.isFetching = false;
        },
        registerFailure(state) {
            state.register.error = true;
            state.register.isFetching = false;
        }
    }
})

export const { registerStart, registerSuccess, registerFailure } = authSlice.actions;

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;

export default authSlice.reducer;