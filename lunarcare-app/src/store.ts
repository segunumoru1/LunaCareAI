// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import tipsReducer from './Services/tipsSlice';
import textToSpeechReducer from './Services/textToSpeechSlice';

const store = configureStore({
  reducer: {
    tips: tipsReducer,
    textToSpeech: textToSpeechReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;