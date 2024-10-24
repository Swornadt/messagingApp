import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = ({filteredUsers, onClick}) => {
  useGetOtherUsers();
  const { otherUsers } = useSelector((store => store.user));
  if (!otherUsers) {
    return; //early return
  }
  return (
    <div className="overflow-auto flex-1">
      {
        filteredUsers?.map((user) => (
          <OtherUser key={user._id} user={user} onClick={onClick}/>
        ))
      }
    </div>
  );
};

export default OtherUsers;
