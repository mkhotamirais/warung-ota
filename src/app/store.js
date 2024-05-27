import { configureStore } from "@reduxjs/toolkit";
import basicReducer from "./features/basicSlice";
import { apiSlice } from "./api/apiSlice";
import productReducer from "./features/productSlice";

export const store = configureStore({
  reducer: {
    basic: basicReducer,
    product: productReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
