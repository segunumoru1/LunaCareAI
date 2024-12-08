import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Asynchronous thunk action
export const fetchAudio = createAsyncThunk(
  "textToSpeech/fetchAudio",
  async (text: string) => {
    try {
      const textToSpeechUrl = "http://localhost:8000/text-to-speech/";
      const response = await axios.post(
        textToSpeechUrl,
        { text: text },
        {
          responseType: "blob", // Important for handling binary response data
        }
      );
      const url = URL.createObjectURL(response.data);
      return url;
    } catch (error) {
      return "error"; // thunkAPI.rejectWithValue("Failed to convert text to speech");
    }
  }
);

export interface TextToSpeechState {
  audioUrl: string;
  error: string;
  loading: boolean;
}

// Slice
export const textToSpeechSlice = createSlice({
  name: "textToSpeech",
  initialState: {
    audioUrl: "",
    error: "null",
    loading: false,
  } as TextToSpeechState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAudio.pending, (state: any) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchAudio.fulfilled, (state, action) => {
        state.loading = false;
        state.audioUrl = action.payload;
      })
      .addCase(fetchAudio.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Something went wrong fetching the audio";
      });
  },
});

export default textToSpeechSlice.reducer;
