import { createSlice } from "@reduxjs/toolkit";

const alert = createSlice({
    name: "alert",
    initialState: {
        loading: false
    },
    reducers: {
        showLoading: (state, action) => {
            state.loading = true
        },
        hideLoading: (state, action) => {
            state.loading = false
        }
    }
})
export const { showLoading, hideLoading } = alert.actions
export default alert.reducer;