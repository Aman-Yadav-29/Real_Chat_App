import React, { useState } from 'react'
import RightSidebar from '../components/RightSidebar'
import ChatContainer from '../components/ChatContainer'
import Sidebar from '../components/Sidebar'

const Homepage = () => {

  const [selectedUser, setSelectedUser] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
  {/* here selectedUser is used for chatContainer and rightSidebar */}
  <div
    className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative ${
      selectedUser && showRightSidebar
        ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]'
        : selectedUser
        ? 'md:grid-cols-2'
        : 'md:grid-cols-2'
    }`}
  >
    {/* here selectedUser is  used for selecting user who message to be displayed*/}
        <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} showRightSidebar={showRightSidebar} setShowRightSidebar={setShowRightSidebar} />
        <RightSidebar selectedUser={selectedUser} showRightSidebar={showRightSidebar} />

      </div>
    </div>
  )
}

export default Homepage
