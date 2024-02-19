import { createSlice } from "@reduxjs/toolkit";

const available = createSlice({
    name: "available",
    initialState: {
        isAvailable: false
    },
    reducers: {
        setIsAvailable: (state, action) => {
            state.isAvailable = true
        }


    }
})
export const { setIsAvailable } = available.actions
export default available.reducer;