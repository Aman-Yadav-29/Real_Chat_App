import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const RightSidebar = ({ selectedUser, showRightSidebar }) => {

  return selectedUser && showRightSidebar && (
    <div
      className={`bg-[#8182B2]/10 text-white w-full relative overflow-y-scroll ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >

      <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">

        <img
          src={selectedUser?.profilePic || assets.avatar_icon}
          alt=""
          className="w-20 aspect-square rounded-full"
        />

        <h1 className="px-10 text-xl font-medium mx-auto">
          {selectedUser.fullName}
        </h1>

        <p className="px-10 mx-auto text-center">
          {selectedUser.bio}
        </p>

      </div>

      <hr className="border-[#ffffff50] my-4" />

      <div className="px-5 text-xs">
        <p className="font-semibold">Media</p>

        <p>{imagesDummyData.length} images</p>

        <div className="mt-2 grid grid-cols-2 gap-4">
          {imagesDummyData.map((url, index) => (
            <div key={index} onClick={() => window.open(url)} className="cursor-pointer rounded">
              <img src={url} alt="" className="w-full h-24 object-cover rounded-md"/>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default RightSidebar