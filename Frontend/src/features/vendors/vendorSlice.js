import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Public vendor listing (optionally featured, paginated, etc.)
export const fetchPublicVendors = createAsyncThunk(
  'vendors/fetchPublicVendors',
  async (params, thunkAPI) => {
    try {
      const res = await api.get('/vendors', { params });
      const data = res.data;
      const vendors = Array.isArray(data) ? data : data.vendors || [];
      const pagination = !Array.isArray(data) ? data.pagination || null : null;
      return { vendors, pagination };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Single vendor profile
export const fetchVendorProfile = createAsyncThunk(
  'vendors/fetchVendorProfile',
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/vendors/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Products belonging to a vendor
export const fetchVendorProducts = createAsyncThunk(
  'vendors/fetchVendorProducts',
  async ({ id, params }, thunkAPI) => {
    try {
      const res = await api.get(`/vendors/${id}/products`, { params });
      const data = res.data;
      const products = Array.isArray(data) ? data : data.products || [];
      const pagination = !Array.isArray(data) ? data.pagination || null : null;
      return { products, pagination };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  list: [],
  pagination: null,
  current: null,
  products: [],
  productsPagination: null,
  status: 'idle',
  error: null,
};

const vendorSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicVendors.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPublicVendors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.vendors;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPublicVendors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchVendorProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchVendorProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.current = action.payload;
      })
      .addCase(fetchVendorProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchVendorProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchVendorProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.productsPagination = action.payload.pagination;
      })
      .addCase(fetchVendorProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default vendorSlice.reducer;

