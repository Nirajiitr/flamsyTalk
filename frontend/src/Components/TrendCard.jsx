import React from 'react';
import { data } from '../Tranding/data';

const TrendCard = () => {
  return (
    <div className=' w-full items-center text-white rounded-lg justify-center flex flex-col gap-2 text-lg backdrop-blur-xl bg-opacity-0 border border-gray-100 overflow-auto no-scrollbar'>
       <p className='text-3xl font-bold'>Tranding Posts</p>
      {data.hashtags.map((tag, index) => (
        <p key={index}>{tag}</p>
      ))}
    </div>
  );
};

export default TrendCard;
