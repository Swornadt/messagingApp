import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const UserProfile = ({ toggleProfileVisibility }) => {
  const { selectedUser, onlineUsers } = useSelector(
    (store) => store.user
  );
  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <div className="md:min-w-[200px] sm:min-w-full flex flex-col m-3 mt-4 p-2 h-[calc(100vh-1.75rem)] rounded-lg overflow-hidden bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40">
      <div>
        <FaArrowLeft
          className="sm:hidden block bg-zinc-800 text-white hover:bg-primary cursor-pointer rounded-full items-center justify-center p-1.5 w-8 h-8 transition-colors duration-300"
          onClick={() => {
            toggleProfileVisibility();
        }}
            
        />
        <div className="justify-center items-center flex flex-col">
          <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className="w-24 rounded-full">
              <img src={selectedUser?.profilePhoto} lt="profile_picture"></img>
            </div>
          </div>
          <p className="text-lg text-white font-semibold mt-2">
            {" "}
            {selectedUser?.fullName}{" "}
          </p>
          <p className="text-xs">
            {" "}
            {`${isOnline ? "Active Now" : "Inactive"}`}
          </p>
          <div className="flex mt-2">
            <div className="flex flex-col items-center cursor-pointer mx-3">
              <div className="p-3 bg-zinc-800 hover:bg-primary cursor-pointer rounded-full transition-colors duration-300">
                <FaUser className="text-white text-xl" />
              </div>
              <p className="text-white text-xs text-center">Profile</p>
            </div>
            <div className="flex flex-col items-center cursor-pointer mx-3">
              <div className="p-3 bg-zinc-800 hover:bg-primary cursor-pointer rounded-full transition-colors duration-300">
                <FaBell className="text-white text-xl" />
              </div>
              <p className="text-white text-xs text-center">Mute</p>
            </div>
            <div className="flex flex-col items-center cursor-pointer mx-3">
              <div className="p-3 bg-zinc-800 hover:bg-primary cursor-pointer rounded-full transition-colors duration-300">
                <FaSearch className="text-white text-xl" />
              </div>
              <p className="text-white text-xs text-center">Search</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-white font-sb mt-6">
          <p className=" pl-3 py-3 gap-2 hover:bg-zinc-800 rounded-md cursor-pointer">
            {" "}
            Chat Info{" "}
          </p>
          <p className=" pl-3 py-3 gap-2 hover:bg-zinc-800 rounded-md cursor-pointer">
            {" "}
            Customise chat{" "}
          </p>
          <p className=" pl-3 py-3 gap-2 hover:bg-zinc-800 rounded-md cursor-pointer">
            {" "}
            Media and files{" "}
          </p>
          <p className=" pl-3 py-3 gap-2 hover:bg-zinc-800 rounded-md cursor-pointer">
            {" "}
            Privacy and support{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
