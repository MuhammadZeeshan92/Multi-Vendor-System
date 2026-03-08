import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/orders/orderSlice';
import adminReducer from '../features/admin/adminSlice';
import vendorReducer from '../features/vendors/vendorSlice';
import buyerReducer from '../features/buyers/buyerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    admin: adminReducer,
    vendors: vendorReducer,
    buyers: buyerReducer, // for buyer-specific vendor data (e.g. followed vendors)
  },
});

// persist cart to session storage
store.subscribe(() => {
  const state = store.getState();
  try {
    const serialized = JSON.stringify(state.cart);
    sessionStorage.setItem('cart', serialized);
  } catch (e) {
    // ignore
  }
});

export default store;