import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
    },
    reducers: {
        setUser: (state: any, action) => {
            state.user = action.payload;
        },
        clearUserData: (state: any, action) => {
            state.user = {};
        },
    },
});

export const { setUser, clearUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
