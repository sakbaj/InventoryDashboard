import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchInventoryData } from './inventoryAPI';

// Async Thunks for API interactions
export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await fetchInventoryData(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch inventory');
    }
  }
);

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  totalItems: 0,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    // Synchronous actions (e.g., local optimistic updates)
    updateItemStock: (state, action) => {
      const { id, newStock } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.stock = newStock;
      }
    },
    clearInventoryError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Simulating paginated/structured response
        state.items = action.payload.items || action.payload; 
        state.totalItems = action.payload.total || action.payload.length;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateItemStock, clearInventoryError } = inventorySlice.actions;

// Selectors
export const selectAllInventory = (state) => state.inventory.items;
export const selectInventoryStatus = (state) => state.inventory.status;
export const selectInventoryError = (state) => state.inventory.error;

export default inventorySlice.reducer;
