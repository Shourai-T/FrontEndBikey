import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice';
import stationReducer from '../redux/slice/stationSlice'
import userReducer from './slice/userSlice';
import bikeReaduce from './slice/bikeSlice';
import transactionReducer from './slice/transactionSlice';
import rentalReducer from './slice/rentalSlice';
import bikeReport from './slice/bikeReportSlice';
import storage from 'redux-persist/lib/storage'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const persistConfig = {
    key: 'auth',
    version: 1,
    storage,
    whitelist: ['auth'],
}

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    station: stationReducer,
    bike: bikeReaduce,
    transaction: transactionReducer,
    rental: rentalReducer,
    bikeReport: bikeReport
}
)

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store)
