import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user, onClick }) => {
  const dispatch = useDispatch();
  const {selectedUser, onlineUsers} = useSelector(store => store.user);
  const isOnline = onlineUsers?.includes(user?._id);
  
  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };
  const handleUserClick = () => {
    selectedUserHandler(user);
    onClick(user);
  }
  return (
    <div>
      <div
        onClick={handleUserClick}
        className={`${selectedUser?._id === user?._id ? 'bg-zinc-600' : ''} flex gap-2 items-center hover:bg-zinc-700 rounded-sm p-2 cursor-pointer ease-in-out`}
      >
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className="w-10 rounded-full">
            <img src={user?.profilePhoto} alt="profile_picture"></img>
          </div>
        </div>
        <div className="flex flex-col flex-1 text-[rgb(220,220,220)]">
          <div className="flex justify-between gap-2">
            <p> {user?.fullName} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherUser;
