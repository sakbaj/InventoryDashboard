import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from '@/features/inventory/inventorySlice';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    // other feature reducers would go here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Often disabled in enterprise apps depending on the data structures, or optimized
    }),
  devTools: import.meta.env.DEV,
});
