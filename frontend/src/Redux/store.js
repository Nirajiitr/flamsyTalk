import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import authReducer from "./authSlice";
import messageReducer from "./messageSlice";
import socketReducer from "./SocketSlice"; 
import postReducer from "./postSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messageReducer,
    socket: socketReducer,
    posts: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["socket/setSocket"],
        ignoredPaths: ["socket.socket"],
      },
    }).concat(thunk),
});

export default store;
