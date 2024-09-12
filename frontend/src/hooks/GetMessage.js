import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGetMessage } from '../Redux/messageSlice';

const GetMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser) {
        try {
          axios.defaults.withCredentials = true;
          const res = await axios.get(`https://flamsytalk.onrender.com/message/get/${selectedUser?._id}`);
          dispatch(setGetMessage(res.data));
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchMessages();
  }, [selectedUser, dispatch]);

  return null;
};

export default GetMessage;
