import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            email: null,
            uid: null,
            displayName: null,
            photoURL: null,
        },
    },
    reducers: {
        setUser: (state: any, action) => {
            state.user = action.payload;
        },
        clearUserData: (state: any, action) => {
            state.user = {
                email: null,
                uid: null,
                displayName: null,
                photoURL: null,
            };
        },
    },
});

export const { setUser, clearUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
