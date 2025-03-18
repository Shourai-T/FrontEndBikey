import { createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice ({
    name: 'user',
    initialState: {
        getUser:{
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
        }
    }
})

export const { getUserStart,getUserFailure,getUserSuccess } = userSlice.actions;

export default userSlice.reducer;