import { createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice ({
    name: 'user',
    initialState: {
        getUser:{
            currentUser: null,
            isFetching: false,
            error: false
        },
        updateUser:{
            currentUser: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getUserStart(state){
            state.getUser.isFetching = true;
            state.getUser.error = false;
        },
        getUserSuccess(state, action){
            state.getUser.currentUser = action.payload.result;
            state.getUser.isFetching = false;
        },
        getUserFailure(state){
            state.getUser.error = true;
            state.getUser.isFetching = false;
        },
        updateUserStart(state){
            state.updateUser.isFetching = true;
            state.updateUser.error = false;
        },
        updateUserSuccess(state, action){
            state.updateUser.currentUser = action.payload.result;
            state.updateUser.isFetching = false;
        },
        updateUserFailure(state){
            state.updateUser.error = true;
            state.updateUser.isFetching = false;
        }
    }
})

export const { getUserStart,getUserFailure,getUserSuccess } = userSlice.actions;

export const { updateUserStart, updateUserFailure, updateUserSuccess } = userSlice.actions;

export default userSlice.reducer;