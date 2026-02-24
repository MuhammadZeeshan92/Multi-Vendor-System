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
  status: 'idle',
  error: null,
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
      .addCase(toggleUserActive.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.users.findIndex((u) => u._id === updated._id);
        if (idx !== -1) state.users[idx] = updated;
      })
      .addCase(fetchCommissionReport.fulfilled, (state, action) => {
        state.commission = action.payload;
      });
  },
});

export default adminSlice.reducer;