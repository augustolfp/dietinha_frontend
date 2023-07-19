import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
    displayName: string | null;
    accessToken: string | null;
}

const initialUserState: User = {
    displayName: null,
    accessToken: null,
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
            state.user = initialUserState;
        },
    },
});

export const { setUser, clearUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
