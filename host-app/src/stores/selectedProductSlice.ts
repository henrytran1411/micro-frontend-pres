import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type CartItem = Product & {
  quantity: number;
};

type SelectedProductState = {
  items: CartItem[];
};

const initialState: SelectedProductState = {
  items: [],
};

const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addProduct, removeProduct, updateQuantity, clearCart } = selectedProductSlice.actions;
export default selectedProductSlice.reducer;
