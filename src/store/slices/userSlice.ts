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
            console.log(
                `User is being set to : ${JSON.stringify(action.payload)}`
            );
            state.user = action.payload;
        },
        clearUserData: (state: any, action) => {
            state.user = {};
        },
    },
});

export const { setUser, clearUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
