import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import HomeChat from "./pages/HomeChat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DefaultPage from "./pages/DefaultPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { setSocket, clearSocket } from "./Redux/SocketSlice";
import { setGetOnlineUser } from "./Redux/authSlice";
import Profile from "./pages/Profile/Profile";

function App() {
  const dispatch = useDispatch();

  const { authUser } = useSelector((store) => store.auth);
  const socketRef = useRef(null);

  useEffect(() => {
    if (authUser && !socketRef.current) {
      const newSocket = io(`${process.env.REACT_APP_BASE_URL}`, {
        query: { userId: authUser._id },
      });

      socketRef.current = newSocket;
      dispatch(setSocket(newSocket));

      newSocket.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setGetOnlineUser(onlineUsers));
      });

      newSocket.on('disconnect', () => {
        dispatch(clearSocket());
        socketRef.current = null;
      });

      return () => {
        newSocket.close();
        socketRef.current = null;
      };
    } else if (!authUser && socketRef.current) {
      socketRef.current.close();
      dispatch(clearSocket());
      socketRef.current = null;
    }
  }, [authUser, dispatch]);

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={authUser ? <Navigate to="home" /> : <DefaultPage />} />
          <Route path="/home" element={authUser ? <Home /> : <Navigate to="../" />} />
          <Route path="/login" element={authUser ? <Navigate to="../" /> : <Login />} />
          <Route path="/signup" element={authUser ? <Navigate to="../" /> : <Signup />} />
          <Route path="/homechat" element={authUser ? <HomeChat /> : <Navigate to="../" />} />
          <Route path="/profile/:id" element={authUser ? <Profile /> : <Navigate to="../" />} />
        </Routes>
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
