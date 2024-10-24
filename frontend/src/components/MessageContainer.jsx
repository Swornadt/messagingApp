import React, { useEffect } from "react";
import SendInput from "./SendInput.jsx";
import Messages from "./Messages.jsx";
import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";

const getActiveStatus = (updatedAt) => {
  const lastActive = new Date(updatedAt);
  const now = new Date();
  const diffMills = now - lastActive;
  const diffMins = Math.floor(diffMills/(1000*60));

  if (diffMins < 1) return "Active now";
  if (diffMins < 60) return `Active ${diffMins} mins ago`;
  if (diffMins < 1440) return `Active ${Math.floor(diffMins/60)} hours ago`;
  return `Active ${Math.floor(diffMins/1440)} days ago`;
};

const MessageContainer = ({ toggleProfileVisibility, showSidebar }) => {
  const { authUser, selectedUser, onlineUsers } = useSelector(
    (store) => store.user
  );
  const [activeStatus, setActiveStatus] = useState("");
  useEffect(() => {
    if (selectedUser?.updatedAt) {
      setActiveStatus(getActiveStatus(selectedUser?.updatedAt));
    }
  },[selectedUser]);

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <>
      {selectedUser !== null ? (
        <div className="flex flex-col m-2 mt-3 p-2 w-full h-[calc(100vh-1.5rem)] rounded-lg overflow-hidden bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40">
          <div className="flex gap-2 items-center">
            <div>
              <FaArrowLeft
                className="sm:hidden block bg-zinc-800 text-white hover:bg-primary cursor-pointer rounded-full items-center justify-center p-1.5 w-8 h-8 transition-colors duration-300"
                onClick={showSidebar}
              />
            </div>
            <div className="flex pr-6 pl-1 py-1 gap-2 hover:bg-zinc-800 rounded-md cursor-pointer ease-in-out">
              <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-8 rounded-full">
                  <img
                    src={selectedUser?.profilePhoto}
                    alt="profile_picture"
                  ></img>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between gap-2 text-sm text-white">
                  <p> {selectedUser?.fullName} </p>
                </div>
                <span className="text-xs opacity-70">
                  {isOnline ? "Active now" : "Offline"}
                </span>
              </div>
            </div>
            <div className="flex gap-2 ml-auto">
              <IoCall className=" bg-zinc-800 text-white hover:bg-primary cursor-pointer rounded-full flex items-center justify-center p-1.5 w-8 h-8 transition-colors duration-300" />
              <FaVideo className="ml-auto bg-zinc-800 text-white hover:bg-primary cursor-pointer rounded-full flex items-center justify-center p-1.5 w-8 h-8 transition-colors duration-300" />
              <BsThreeDots
                className="ml-auto bg-zinc-800 text-white hover:bg-primary cursor-pointer rounded-full flex items-center justify-center p-1.5 w-8 h-8 transition-colors duration-300"
                onClick={toggleProfileVisibility}
              />
            </div>
          </div>
          <div className="divider my-1"/>
          <Messages />
          <SendInput />
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col m-2 mt-6 p-2 h-[calc(100vh-3rem)] rounded-lg justify-center items-center overflow-hidden bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40">
          <h1 className="font-semibold text-white text-4xl">
            {" "}
            Hi {authUser?.fullName}
          </h1>
          <h1> Let's start a conversation! </h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
