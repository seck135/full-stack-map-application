import { configureStore } from '@reduxjs/toolkit';
import draftCoordinatesSlice from './draftCoordinatesSlice';

export const store = configureStore({
  reducer: {
    draftCoordinates: draftCoordinatesSlice,
  },
});

// Inferred types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
