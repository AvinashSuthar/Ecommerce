export const createOrderSlice = (set) => ({
  order: [],
  setOrder: (newOrder) => set({ order: newOrder }),
});
