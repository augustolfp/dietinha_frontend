import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setUser, clearUserData, userReducer } from "./slices/userSlice";
import { countedDaysApi } from "./apis/countedDaysApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        user: userReducer,
        [countedDaysApi.reducerPath]: countedDaysApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(countedDaysApi.middleware);
    },
});

setupListeners(store.dispatch);

export { store, setUser, clearUserData };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { useFetchCountedDaysQuery } from "./apis/countedDaysApi";
