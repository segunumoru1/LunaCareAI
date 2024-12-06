// Services/tipsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create an async thunk for fetching tips
export const fetchTip = createAsyncThunk(
  "tips/fetchTip",
  async (userInput: string) => {
    const response = await axios.post("http://localhost:8000/openai-chat/", {
      user_input: userInput,
    });
    return response.data.response; // Return OpenAI's response
  }
);

interface TipsState {
  currentTip: string;
  loading: boolean;
  error: string | null;
}

const initialState: TipsState = {
  currentTip: "",
  loading: false,
  error: null,
};

const tipsSlice = createSlice({
  name: "tips",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTip.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTip = action.payload;
      })
      .addCase(fetchTip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default tipsSlice.reducer;
