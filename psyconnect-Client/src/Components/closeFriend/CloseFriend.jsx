import React from "react";

const CloseFriend = ({ close }) => {
  return (
    <li className="sidebarFriend flex items-center mb-4">
      <img
        src={close.profilePicture}
        alt=""
        className="sidebarFriendImg w-8 h-8 rounded-full mr-3 object-cover"
      />
      <span className="sidebarFriendName">{close.username}</span>
    </li>
  );
};

export default CloseFriend;
