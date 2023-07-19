import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

interface SignInCredentials {
    email: string;
    password: string;
}

interface User {
    displayName: string | null;
    accessToken: string | null;
    status: "idle" | "loading" | "suceeded" | "failed";
    error: string | null;
}

const initialUserState: User = {
    displayName: null,
    accessToken: null,
    status: "idle",
    error: null,
};

export const signInUser = createAsyncThunk(
    "user/signInUser",
    async ({ email, password }: SignInCredentials) => {
        const response = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        return response.user;
    }
);

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
            state.user = initialUserState;
        },
    },
});

export const { setUser, clearUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
