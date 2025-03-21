import { createSlice } from "@reduxjs/toolkit";
interface transaction{
    id: string;
    type: string;
    createdAt: string;
    amount: number;
    paymentMethod: string;
}
const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        getAllTransaction: {
            data: [],
            isFetching: false,
            error: false
        },
    },
    reducers: {
        getAllTransactionStart(state) {
            state.getAllTransaction.isFetching = true;
            state.getAllTransaction.error = false;
        },
        getAllTransactionSuccess(state, action) {
            state.getAllTransaction.data = action.payload.result;
        

            state.getAllTransaction.isFetching = false;
            state.getAllTransaction.error = false;
        },
        getAllTransactionFailure(state) {
            state.getAllTransaction.error = true;
            state.getAllTransaction.isFetching = false;
        },
    }
})

export const { getAllTransactionStart, getAllTransactionFailure, getAllTransactionSuccess } = transactionSlice.actions;

export default transactionSlice.reducer;