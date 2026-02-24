import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params, thunkAPI) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  list: [
    {
      _id: 'prod_1',
      name: 'Minimalist Chair',
      price: 129.99,
      images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=60&auto=format&fit=crop'],
      stock: 12,
      isActive: true,
      vendorId: 'vendor_1',
      description: 'A sleek minimalist chair for modern interiors.'
    },
    {
      _id: 'prod_2',
      name: 'Oak Coffee Table',
      price: 249.0,
      images: ['https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=60&auto=format&fit=crop'],
      stock: 5,
      isActive: true,
      vendorId: 'vendor_2',
      description: 'Solid oak coffee table with a warm finish.'
    },
    {
      _id: 'prod_3',
      name: 'Ceramic Vase',
      price: 39.5,
      images: ['https://images.unsplash.com/photo-1505691723518-36a063d3b6b8?w=800&q=60&auto=format&fit=crop'],
      stock: 0,
      isActive: true,
      vendorId: 'vendor_3',
      description: 'Handmade ceramic vase with matte glaze.'
    },
    {
      _id: 'prod_4',
      name: 'Cozy Throw Blanket',
      price: 59.99,
      images: ['https://images.unsplash.com/photo-1542977276-0a4f1c4a1f47?w=800&q=60&auto=format&fit=crop'],
      stock: 3,
      isActive: true,
      vendorId: 'vendor_1',
      description: 'Soft throw blanket to warm up any space.'
    }
  ],
  current: null,
  status: 'idle',
  error: null,
  pagination: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // ensure we always have an array even if backend response shape is unexpected
        state.list = (action.payload && action.payload.products) || [];
        state.pagination = (action.payload && action.payload.pagination) || null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.current = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;