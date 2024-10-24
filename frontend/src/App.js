import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Homepage from './components/Homepage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Homepage/>
  },
  {
    path:"/register",
    element: <Signup/>
  },
  {
    path:"/login",
    element: <Signin/>
  }
]);

function App() {
  
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(authUser) {
      const socket = io("http://localhost:8080",{
        query:{
          userId:authUser._id,
        }
      });
      dispatch(setSocket(socket));
      
      socket.on('getOnlineUsers', (onlineUsers)=>{
        //console.log("Received online users from server:", onlineUsers);
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => {
        socket.close(); //clean-up: disconnects after leaving app
      };
    } else {
      if(socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  },[authUser, dispatch]);

  return (
    <div className="h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
