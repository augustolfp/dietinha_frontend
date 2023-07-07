import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";

interface User {
    email: string | null;
    uid: string | null;
    displayName: string | null;
    photoURL: string | null;
}

const initialUserState: User = {
    email: null,
    uid: null,
    displayName: null,
    photoURL: null,
};

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: initialUserState,
    },
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        clearUserData: (state) => {
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
