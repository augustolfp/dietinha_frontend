import { configureStore } from "@reduxjs/toolkit";
import { setUser, clearUserData, userReducer } from "./slices/userSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export { store, setUser, clearUserData };
