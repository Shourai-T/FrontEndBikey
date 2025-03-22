import { createSlice } from "@reduxjs/toolkit";
interface transaction {
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
        createTransaction: {
            data: null,
            isFetching: false,
            error: false
        }
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
        createTransactionStart(state) {
            state.createTransaction.isFetching = true;
            state.createTransaction.error = false;
        },
        createTransactionSuccess(state, action) {
            state.createTransaction.data = action.payload.result;
            state.createTransaction.isFetching = false;
            state.createTransaction.error = false;
        },
        createTransactionFailure(state) {
            state.createTransaction.error = true;
            state.createTransaction.isFetching = false;
        }
    }
})

export const { getAllTransactionStart, getAllTransactionFailure, getAllTransactionSuccess } = transactionSlice.actions;

export const { createTransactionStart, createTransactionFailure, createTransactionSuccess } = transactionSlice.actions;

export default transactionSlice.reducer;