import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadImage = createAsyncThunk('posts/uploadImage', async (data) => {
  const response = await axios.post('https://flimsytalk-c12ezbel.b4a.run/upload/', data);
  return response.data;
});

export const uploadPost = createAsyncThunk('posts/uploadPost', async (data) => {
  const response = await axios.post('https://flimsytalk-c12ezbel.b4a.run/posts', data);
  return response.data;
});

export const likePost = createAsyncThunk('posts/likePost', async ({ postId, userId }) => {
  const response = await axios.put(`https://flimsytalk-c12ezbel.b4a.run/posts/${postId}/like`, { userId });
  return response.data;
});

export const commentPost = createAsyncThunk('posts/commentPost', async ({ postId, comment }) => {
  const response = await axios.post(`https://flimsytalk-c12ezbel.b4a.run/posts/${postId}/comment`, { comment });
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    uploading: false,
    error: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.uploading = true;
      })
      .addCase(uploadImage.fulfilled, (state) => {
        state.uploading = false;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.error.message;
      })
      .addCase(uploadPost.pending, (state) => {
        state.uploading = true;
      })
      .addCase(uploadPost.fulfilled, (state, action) => {
        state.uploading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(uploadPost.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.error.message;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const postIndex = state.posts.findIndex(post => post._id === action.payload.post._id);
        if (postIndex >= 0) {
          state.posts[postIndex] = action.payload.post;
        }
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        const postIndex = state.posts.findIndex(post => post._id === action.payload.postId);
        if (postIndex >= 0) {
          state.posts[postIndex].comments = action.payload.comments;
        }
      });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
