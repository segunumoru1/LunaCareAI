import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface TipsState {
  currentTip: string;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: TipsState = {
  currentTip: "",
  status: "idle",
};

// Define an async thunk for fetching a tip
export const fetchTip = createAsyncThunk(
  "tips/fetchTip",

  async (inputValue: string) => {
    const payload = { inputValue: inputValue };
    const response = await axios.post("http://localhost:3001/test", payload);
    return response.data.tip; // Assuming the API returns an object with a 'tip' property
  }
);

const tipsSlice = createSlice({
  name: "tips",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTip.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTip.fulfilled, (state, action) => {
        state.currentTip = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchTip.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default tipsSlice.reducer;
