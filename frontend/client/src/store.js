import { configureStore } from "@reduxjs/toolkit";
import userReducer from "endpoints/auth/user";
import { splitApi } from "endpoints/rtkQuery/splitApi";
export const store = configureStore({
  reducer: {
    user: userReducer,
    [splitApi.reducerPath]: splitApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(splitApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
