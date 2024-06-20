import React from 'react'
import Sidebar from '../Components/Sidebar'
import ChatContainer from '../Components/ChatContainer'

const HomeChat = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px]  rounded-lg lg:min-h-[98vh] bg-white  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-0 border border-gray-100'>
      <Sidebar />
      <ChatContainer />
    </div>
  )
}

export default HomeChat