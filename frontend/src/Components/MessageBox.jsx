import React from 'react';
import SingleMessage from './SingleMessage';
import { useSelector } from 'react-redux';
import RealTimeMessage from '../hooks/RealTimeMessage';
import GetMessage from "../hooks/GetMessage";

const MessageBox = () => {
  GetMessage();
  RealTimeMessage();
  const { getMessage } = useSelector((store) => store.messages);

  if (!Array.isArray(getMessage)) return null;

  return (
    <div className='overflow-auto p-4 flex-1 no-scrollbar'>
      {getMessage.map((message) => (
        <SingleMessage key={message._id} message={message} />
      ))}
    </div>
  );
};

export default MessageBox;
