import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSocketConnected, setSocketDisconnected } from "../redux/socketSlice";
import io from "socket.io-client";
import { setOnlineUsers } from "../redux/userSlice";

const useSocket = (userId) => {
    const socketRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userId) {
            socketRef.current = io("https://messagingapp-tibe.onrender.com" || "http://localhost:8080", {
                query: { userId },
            });

        // Listen for the connection event
        socketRef.current.on("connect", () => {
            dispatch(setSocketConnected());
            //console.log("Socket connected:", socketRef.current.id);
        });
        //listen for online users:
        socketRef.current.on('getOnlineUsers', (onlineUsers)=>{
            //console.log("Received online users from server:", onlineUsers);
            dispatch(setOnlineUsers(onlineUsers));
            });

        // listening for disconnected:
        // socketRef.current.on("disconnect", () => {
        //     dispatch(setSocketDisconnected());
        // });

        //clean up on unmount:
        return () => {
            socketRef.current.disconnect();
            dispatch(setSocketDisconnected());
        };
        }
    }, [userId, dispatch]);
    
    return socketRef.current || "not connected";
};

export default useSocket;