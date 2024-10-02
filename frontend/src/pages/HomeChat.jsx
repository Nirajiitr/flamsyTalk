import React from 'react'
import Sidebar from '../Components/Sidebar'
import ChatContainer from '../Components/ChatContainer'

const HomeChat = () => {
  return (
    <div className='w-screen h-screen flex overflow-x-hidden overflow-y-scroll no-scrollbar '>
      <Sidebar />
      <ChatContainer />
    </div>
  )
}

export default HomeChat