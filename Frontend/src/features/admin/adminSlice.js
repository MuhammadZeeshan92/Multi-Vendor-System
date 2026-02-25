import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchVendors = createAsyncThunk(
  'admin/fetchVendors',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/admin/vendors');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchDashboard = createAsyncThunk(
  "admin/fetchDashboard",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/admin/dashboard");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const toggleUserActive = createAsyncThunk(
  'admin/toggleUserActive',
  async ({ id, active }, thunkAPI) => {
    try {
      const response = await api.put(`/admin/users/${id}`, { active });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// adminSlice.js

export const fetchActiveUsers = createAsyncThunk(
  "admin/fetchActiveUsers",
  async ({ page, limit }, thunkAPI) => {
    try {
      const { data } = await api.get(
        `/admin/active-users?page=${page}&limit=${limit}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);
export const fetchActiveSellers = createAsyncThunk(
  "admin/fetchActiveSellers",
  async ({ page, limit }, thunkAPI) => {
    try {
      const { data } = await api.get(
        `/admin/active-sellers?page=${page}&limit=${limit}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const fetchCommissionReport = createAsyncThunk(
  'admin/fetchCommissionReport',
  async (params, thunkAPI) => {
    try {
      const response = await api.get('/admin/commission', { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  users: [],
  commission: [],
  vendors: [],
  dashboard: null,
  status: 'idle',
  error: null,
  activeUsersList: [],
  userTotalPages: 1,

  activeSellersList: [],
  sellerTotalPages: 1,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.vendors = action.payload;   // ✅ THIS WAS MISSING
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.dashboard = action.payload;   // ✅ ADDED HERE
      })
      .addCase(toggleUserActive.fulfilled, (state, action) => {
        const updated = action.payload;

        // update in users
        const userIdx = state.users.findIndex(
          (u) => u._id === updated._id
        );
        if (userIdx !== -1) state.users[userIdx] = updated;

        // update in vendors
        const vendorIdx = state.vendors.findIndex(
          (v) => v._id === updated._id
        );
        if (vendorIdx !== -1) state.vendors[vendorIdx] = updated;
      })
      .addCase(fetchActiveUsers.fulfilled, (state, action) => {
        state.activeUsersList = action.payload.users;
        state.userTotalPages = action.payload.totalPages;
      })
      .addCase(fetchActiveSellers.fulfilled, (state, action) => {
        state.activeSellersList = action.payload.sellers;
        state.sellerTotalPages = action.payload.totalPages;
      })
      .addCase(fetchCommissionReport.fulfilled, (state, action) => {
        state.commission = action.payload;
      });

  }
});

export default adminSlice.reducer;