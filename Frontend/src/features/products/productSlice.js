import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params, thunkAPI) => {
    try {
      const response = await api.get('/products', { params });
      console.log('Fetched products:', response.data);
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
      images: ['https://res.cloudinary.com/dkqrfflov/image/upload/v1772366207/products/yxr8tbvavt2tb0irfizu.png'],
      stock: 12,
      isActive: true,
      vendorId: 'vendor_1',
      description: 'A sleek minimalist chair for modern interiors.'
    },
    {
      _id: 'prod_2',
      name: 'Oak Coffee Table',
      price: 249.0,
      images: ['https://res.cloudinary.com/dkqrfflov/image/upload/v1772366207/products/yxr8tbvavt2tb0irfizu.png'],
      stock: 5,
      isActive: true,
      vendorId: 'vendor_2',
      description: 'Solid oak coffee table with a warm finish.'
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
        // Handle both simple array and structured paginated object
        if (Array.isArray(action.payload)) {
          state.list = action.payload;
          state.pagination = {
            total: action.payload.length,
            page: 1,
            pages: 1,
            limit: action.payload.length
          };
        } else {
          state.list = action.payload.products || [];
          state.pagination = action.payload.pagination || null;
        }
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