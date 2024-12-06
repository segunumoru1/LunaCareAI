// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import tipsReducer from './Services/tipsSlice';

const store = configureStore({
  reducer: {
    tips: tipsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;