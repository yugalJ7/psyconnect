import React from "react";

const Online = ({ user }) => {
  return (
    <li className="rightbarFriend flex items-center mb-4">
      <div className="rightbarProfileImgContainer mr-5 relative">
        <img
          src={user.profilePicture}
          alt=""
          className="rightbarProfileImg w-10 h-10 rounded-full object-cover"
        />
        <span className="rightbarOnline bg-green-500 w-3 h-3 rounded-full absolute top-[-2px] right-0 border-2 border-white"></span>
      </div>
      <span className="rightbarUsername font-normal">{user.username}</span>
    </li>
  );
};

export default Online;
