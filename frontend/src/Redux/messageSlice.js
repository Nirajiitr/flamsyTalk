import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    getMessage: JSON.parse(localStorage.getItem('messages')) || [],
  },
  reducers: {
    setGetMessage: (state, action) => {
      state.getMessage = action.payload;
      localStorage.setItem('messages', JSON.stringify(action.payload));
    },
    clearMessages: (state) => {
      state.getMessage = [];
      localStorage.removeItem('messages');
    },
  },
});

export const { setGetMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
