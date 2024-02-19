import { combineReducers, configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alertSlice";
import userSlice from "./userSlice";
import availableSlice from "./availableSlice";
const rootReducer = combineReducers({
    alert: alertSlice,
    user: userSlice,
    available: availableSlice
})
const store = configureStore({
    reducer: rootReducer
})

export default store;