import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const SendInput = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store=>store.user);
    const {messages} = useSelector(store=>store.message);
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/message/send/${selectedUser?._id}`, {message}, {
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials:true
            });
            //console.log(res);
            dispatch(setMessages([...messages, res?.data?.newMessage]));
            setMessage("");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form onSubmit={onSubmitHandler} className="px-3 my-2">
            <div className="w-full relative">
                <input 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Send a message..."
                    className="border text-sm rounded-2xl block w-full p-2 border-zinc-700 bg-gray-800 text-white"/>
                <button className="absolute flex inset-y-0 end-0 items-center pr-4">
                    <IoSend/>
                </button>
            </div>
        </form>
    );
}

export default SendInput;
