import { configureStore } from "@reduxjs/toolkit";
import selectedProductReducer from "./selectedProductSlice";

const store = configureStore({
  reducer: {
    selectedProduct: selectedProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
