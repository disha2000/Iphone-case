import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { authApi } from "./services/auth";
import { imageApi } from "./services/imageApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist/es/constants";
import progressReducer from './slices/progressSlice'
import { phoneApi } from "./services/PhoneApi";

const persistConfig = {
  key: "user",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedAuthReducer,
    [authApi.reducerPath]: authApi.reducer,
    [imageApi.reducerPath] : imageApi.reducer,
    progress: progressReducer,
    [phoneApi.reducerPath]: phoneApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware).concat(imageApi.middleware).concat(phoneApi.middleware),
});

setupListeners(store.dispatch);

export default store;
export const persistor = persistStore(store);
