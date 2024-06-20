import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk('auth/fetchUser', async (userId) => {
  const response = await axios.get(`http://localhost:8080/users/${userId}`);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: JSON.parse(localStorage.getItem('authUser')) || null,
    otherUser: JSON.parse(localStorage.getItem('otherUser')) || null,
    selectedUser: null,
    searchUser: null,
    getOnlineUser: [],
    loading: false,
    error: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
      localStorage.setItem('authUser', JSON.stringify(action.payload));
    },
    setOtherUser: (state, action) => {
      state.otherUser = action.payload;
      localStorage.setItem('otherUser', JSON.stringify(action.payload));
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearAuthUser: (state) => {
      state.authUser = null;
      localStorage.removeItem('authUser');
    },
    setSearchUser: (state, action) => {
      state.searchUser = action.payload;
    },
    setGetOnlineUser: (state, action) => {
      state.getOnlineUser = action.payload;
    },
    followUser: (state, action) => {
      if (state.authUser) {
        state.authUser.following.push(action.payload);
        localStorage.setItem('authUser', JSON.stringify(state.authUser));
      }
    },
    unfollowUser: (state, action) => {
      if (state.authUser) {
        state.authUser.following = state.authUser.following.filter(following => following.UserId !== action.payload);
        localStorage.setItem('authUser', JSON.stringify(state.authUser));
      }
    },
    info: (state, action) => {
      if (state.authUser) {
        state.authUser = { ...state.authUser, ...action.payload };
        localStorage.setItem('authUser', JSON.stringify(state.authUser));
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
        localStorage.setItem('authUser', JSON.stringify(action.payload));
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setAuthUser,
  setOtherUser,
  setSelectedUser,
  clearAuthUser,
  setSearchUser,
  setGetOnlineUser,
  followUser,
  unfollowUser,
  info,
} = authSlice.actions;

export default authSlice.reducer;
