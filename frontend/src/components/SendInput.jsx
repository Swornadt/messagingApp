import React, { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { MSG_API_ENDPOINT } from "../utils/constant";
import { io } from "socket.io-client";

const socket = io(process.env.NODE_ENV === "development"
  ? "http://localhost:8080"
  : "https://messagingapp-tibe.onrender.com"
);

const SendInput = () => {
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const typingTimeout = useRef(null);
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const { authUser } = useSelector((store) => store.user);
  console.log("auth user:",authUser)
  console.log("selected user:", selectedUser);

  // Listen for the typing event for the receiver (Only display for the receiver)
  useEffect(() => {
    socket.on("typing", ({ senderId, receiverId }) => {
      if (receiverId === authUser?._id) {
        setTyping(true);
      }
    });

    socket.on("stopTyping", ({ senderId, receiverId }) => {
      if (receiverId === authUser?._id) {
        setTyping(false);
      }
    });

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [authUser]);

  // Timer for the typing indicator
  useEffect(() => {
    if (typing) {
      const timer = setTimeout(() => setTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [typing]);

  const onInputChange = (e) => {
    setMessage(e.target.value);
    if (!typing) {
      setTyping(true);
    }

    // Clear the previous timeout if it exists
    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    // Emit typing event to the receiver
    socket.emit("typing", { senderId: authUser?._id, receiverId: selectedUser?._id });

    // Set a new timeout to stop typing after 1 second
    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", { senderId: authUser?._id, selectedUser: selectedUser?._id });
    }, 1000);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const res = await axios.post(
        `${MSG_API_ENDPOINT}/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(setMessages([...messages, res?.data?.newMessage]));
      setMessage("");
      socket.emit("stopTyping", { authUser, selectedUser: selectedUser?._id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-3 my-2">
      {/* Display typing only for the receiver */}
      {selectedUser?._id !== authUser?._id && typing && (
        <div className="text-sm text-gray-500 mb-1 px-10">Typing...</div>
      )}
      <form onSubmit={onSubmitHandler} className="px-3 my-2">
        <div className="w-full relative">
          <input
            value={message}
            onChange={onInputChange}
            type="text"
            placeholder="Send a message..."
            className="border text-sm rounded-2xl block w-full p-2 border-zinc-700 bg-gray-800 text-white"
          />
          <button
            className="absolute flex inset-y-0 end-0 items-center pr-4"
            type="submit"
            disabled={!message.trim()}
          >
            <IoSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendInput;
