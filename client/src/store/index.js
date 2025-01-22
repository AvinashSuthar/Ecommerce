import { create } from "zustand";
import { createAuthSlice } from "./slices/authSlice";
import { createProductSlice } from "./slices/productSlice";
import { createCartSlice } from "./slices/cartSlice";
import { createOrderSlice } from "./slices/orderSlice";

export const useAppStore = create((...a) => ({
  ...createAuthSlice(...a),
  ...createProductSlice(...a),
  ...createCartSlice(...a),
  ...createOrderSlice(...a),
}));
