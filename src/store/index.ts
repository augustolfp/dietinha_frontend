import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { countedDaysApi } from "./apis/countedDaysApi";
import { setUser, clearUserData, userReducer } from "./slices/userSlice";

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

export { useFetchCountedDaysQuery } from "./apis/countedDaysApi";
export { store, setUser, clearUserData };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
