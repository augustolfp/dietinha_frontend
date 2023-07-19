import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { auth } from "../../config/firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";

interface SignInCredentials {
    email: string;
    password: string;
}

interface SignUpCredentials {
    displayName: string;
    email: string;
    password: string;
}

interface User {
    displayName: string | null;
    accessToken: string | null;
    status: "idle" | "loading" | "suceeded" | "failed";
    error: string | null | undefined;
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
        const accessToken = await response.user.getIdToken();
        return {
            displayName: response.user.displayName,
            accessToken: accessToken,
        };
    }
);

export const signUpUser = createAsyncThunk(
    "user/signUpUser",
    async ({ displayName, email, password }: SignUpCredentials) => {
        const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        await updateProfile(response.user, {
            displayName: displayName,
        });
        const accessToken = await response.user.getIdToken();
        return {
            displayName: displayName,
            accessToken: accessToken,
        };
    }
);

export const signOutUser = createAsyncThunk("user/signOutUser", async () => {
    return await signOut(auth);
});

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
    extraReducers(builder) {
        builder
            .addCase(signInUser.pending, (state, action) => {
                state.user.status = "loading";
            })
            .addCase(signInUser.fulfilled, (state, action: any) => {
                state.user.status = "suceeded";

                state.user.displayName = action.payload.displayName;
                state.user.accessToken = action.payload.accessToken;
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.user.status = "failed";
                state.user.error = action.error.message;
            })
            .addCase(signOutUser.fulfilled, (state, action) => {
                state.user = initialUserState;
            })
            .addCase(signOutUser.pending, (state, action) => {
                state.user.status = "loading";
            })
            .addCase(signOutUser.rejected, (state, action) => {
                state.user.status = "failed";
                state.user.error = action.error.message;
            })
            .addCase(signUpUser.pending, (state, action) => {
                state.user.status = "loading";
            })
            .addCase(signUpUser.fulfilled, (state, action: any) => {
                state.user.status = "suceeded";

                state.user.displayName = action.payload.displayName;
                state.user.accessToken = action.payload.accessToken;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.user.status = "failed";
                state.user.error = action.error.message;
            });
    },
});

export const { setUser, clearUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
