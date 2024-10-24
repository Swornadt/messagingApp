import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const Message = ({message}) => {
  
  const scroll = useRef();
  const {authUser} = useSelector(store=>store.user);
  const {selectedUser} = useSelector(store=>store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({behavior:"smooth"});
  },[message]);
  return (
    <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="profile"
            src={message?.senderId === authUser?._id ? authUser.profilePhoto : selectedUser.profilePhoto}
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50 right-1 mr-1.5"> {message?.createdAt ? `${new Date(message.createdAt).getHours()}:${new Date(message.createdAt).getMinutes().toString().padStart(2, '0')}` : ''} </time>
      </div>
      <div className={`chat-bubble ${message?.senderId === authUser?._id ? 'chat-start chat-bubble-primary text-white' : 'chat-end bg-zinc-500 text-white'}`}> {message?.message} </div>
    </div>
  );
};

export default Message;
