import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import { authApi } from "./services/auth";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})

setupListeners(store.dispatch)

export default store;