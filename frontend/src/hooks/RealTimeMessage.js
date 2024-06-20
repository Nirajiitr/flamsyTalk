import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGetMessage } from '../Redux/messageSlice';

const RealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const { getMessage } = useSelector((store) => store.messages);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (socket) {
      const handleNewMessage = (newMessage) => {
        dispatch(setGetMessage([...getMessage, newMessage]));
      };
      socket.on("newMessage", handleNewMessage);

      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [socket, dispatch, getMessage]);

  return null;
};

export default RealTimeMessage;
