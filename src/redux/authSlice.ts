import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        login:{
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
            state.login.isFetching = false;}
    }
})

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;

export default authSlice.reducer;