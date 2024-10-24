import React from "react";
import { IoSearch } from "react-icons/io5";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Sidebar = ({ showMessageContainer }) => {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { otherUsers } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredUsers(otherUsers || []);
  }, [otherUsers]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
      dispatch(setAuthUser(null));
      console.log(res);
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const filteredUsers = otherUsers?.filter((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredUsers.length > 0) {
      setFilteredUsers(filteredUsers);
    } else {
      toast.error("User not found");
    }
  };
  const handleUserClick = (user) => {
    showMessageContainer(user);
    //console.log("snafu")
    //navigate(0);
  };
  

  return (
    <div className="flex mt-3 flex-col p-4 h-[calc(100vh-1.5rem)] w-full rounded-md bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40">
      <h2 className="text-gray-200 font-bold text-2xl pb-3"> Chats </h2>
      <form
        onSubmit={searchSubmitHandler}
        action=""
        className="flex items-center gap-2 pb-4"
      >
        <div className="absolute left-6">
          <IoSearch size="24px" />
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="input rounded-full w-full pl-10 h-10"
          placeholder="Search Messenger"
        />
      </form>
      <div className="items-center flex-grow overflow-y-auto">
        <OtherUsers
          filteredUsers={filteredUsers}
          onClick={handleUserClick}
        />
      </div>
      <div className="mt-2">
        <button onClick={logoutHandler} className="btn btn-sm">
          {" "}
          Logout{" "}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
