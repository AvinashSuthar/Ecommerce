export const createCartSlice = (set) => ({
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [], // Initial state
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {
        address: String,
        city: String,
        state: String,
        contry: String,
        pinCode: Number,
        phoneNo: Number,
        image:String,
      },
  setShippingInfo: (newShippingInfo) => set({ shippingInfo: newShippingInfo }),
  setCart: (newCart) => set({ cart: newCart }), // Replace the product array
});
