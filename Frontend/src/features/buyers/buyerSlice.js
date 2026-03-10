import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// fetch dashboard stats & followed list
export const fetchBuyerData = createAsyncThunk(
  'buyers/fetchBuyerData',
  async (_, thunkAPI) => {
    try {
      const [dash, follow] = await Promise.all([
        api.get('/buyers/dashboard'),
        api.get('/buyers/vendors'),
      ]);
      // dash.data now includes totalOrders, totalSpent, recent
      return { stats: dash.data, followed: follow.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const followVendor = createAsyncThunk(
  'buyers/followVendor',
  async (vendorId, thunkAPI) => {
    try {
      await api.post(`/buyers/vendors/${vendorId}/follow`);
      return vendorId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const unfollowVendor = createAsyncThunk(
  'buyers/unfollowVendor',
  async (vendorId, thunkAPI) => {
    try {
      await api.delete(`/buyers/vendors/${vendorId}/follow`);
      return vendorId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  stats: null,
  followed: [],
  status: 'idle',
  error: null,
};

const buyerSlice = createSlice({
  name: 'buyers',
  initialState,
  reducers: {
    resetBuyer(state) {
      state.stats = null;
      state.followed = [];
      state.status = 'idle';
      state.error = null;
    },
    // optionally let other slices add/remove followed ids
    addFollowed(state, action) {
      state.followed.push(action.payload);
    },
    removeFollowed(state, action) {
      state.followed = state.followed.filter(id => id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBuyerData.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBuyerData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload.stats;
        // server returns full vendor objects; convert to plain ids
        state.followed = (action.payload.followed || []).map(v =>
          typeof v === 'string' ? v : v._id
        );
      })
      .addCase(fetchBuyerData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(followVendor.fulfilled, (state, action) => {
        state.followed.push(action.payload);
      })
      .addCase(unfollowVendor.fulfilled, (state, action) => {
        state.followed = state.followed.filter(id => id !== action.payload);
      });
  },
});

export const { resetBuyer, addFollowed, removeFollowed } = buyerSlice.actions;
export default buyerSlice.reducer;