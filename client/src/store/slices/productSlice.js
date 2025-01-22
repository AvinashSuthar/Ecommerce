export const createProductSlice = (set) => ({
    curProduct : undefined,
    product: [], // Initial state
    setProduct: (newProduct) => set({ product: newProduct }), // Replace the product array
    
    setCurProduct :(curProduct)=> set({curProduct})
  });
  