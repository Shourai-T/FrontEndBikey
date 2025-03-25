import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice';
import stationReducer from '../redux/slice/stationSlice'
import userReducer from './slice/userSlice';
import bikeReaduce from './slice/bikeSlice';
import transactionReducer from './slice/transactionSlice';
import rentalReducer from './slice/rentalSlice';
import bikeReport from './slice/bikeReportSlice';
export default configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        station: stationReducer,
        bike: bikeReaduce,
        transaction: transactionReducer,
        rental: rentalReducer,
        bikeReport: bikeReport
    },
})


