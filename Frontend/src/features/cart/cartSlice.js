import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serialized = sessionStorage.getItem('cart');
    if (serialized === null) return undefined;
    return JSON.parse(serialized);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state);
    sessionStorage.setItem('cart', serialized);
  } catch (e) {
    // ignore
  }
};

const initialState = loadState() || {
  items: [],
  itemCount: 0,
  subtotal: 0,
  lastUpdated: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existing = state.items.find((i) => i.productId === item.productId);
      if (existing) {
        existing.qty += item.qty;
      } else {
        state.items.push(item);
      }
      state.itemCount = state.items.reduce((sum, i) => sum + i.qty, 0);
      state.subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
      state.lastUpdated = Date.now();
    },
    updateQty(state, action) {
      const { productId, qty } = action.payload;
      const existing = state.items.find((i) => i.productId === productId);
      if (existing) {
        existing.qty = qty;
      }
      state.itemCount = state.items.reduce((sum, i) => sum + i.qty, 0);
      state.subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
      state.lastUpdated = Date.now();
    },
    removeItem(state, action) {
      state.items = state.items.filter((i) => i.productId !== action.payload);
      state.itemCount = state.items.reduce((sum, i) => sum + i.qty, 0);
      state.subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
      state.lastUpdated = Date.now();
    },
    clearCart(state) {
      state.items = [];
      state.itemCount = 0;
      state.subtotal = 0;
      state.lastUpdated = Date.now();
    },
  },
});


export const { addItem, updateQty, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;