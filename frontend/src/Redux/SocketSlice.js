import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
  },
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    clearSocket: (state) => {
      state.socket = null;
    },
  },
});

export const { setSocket, clearSocket } = socketSlice.actions;
export default socketSlice.reducer;
