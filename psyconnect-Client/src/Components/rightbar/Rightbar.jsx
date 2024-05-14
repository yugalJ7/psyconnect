import { useContext, useEffect, useState } from "react";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Rightbar = ({ user }) => {
  const [friends, setfriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?._id)
  );

  const getFriends = async () => {
    try {
      const friendsList = await axios.get("/users/friends/" + user._id);
      setfriends(friendsList.data);
      console.log(friendsList.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriends();
  }, [user]);

  const handleFollowBtn = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }

    setFollowed(!followed);
  };

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer flex items-center">
          <img
            className="birthdayImg w-10 h-10 mr-5"
            src="/assets/gift.png"
            alt=""
          />
          <span className="birthdayText font-light">
            <b>Yuji Itadori</b> and <b>3 other sorcerer</b> have a birthday
            today.
          </span>
        </div>
        <img
          className="rightbarAd w-full rounded-lg my-8 mx-0"
          src="/assets/ad.jpeg"
          alt=""
        />
        <h4 className="rightbarTitle mb-5 font-medium">Online Friends</h4>
        <ul className="rightbarFriendList p-0 m-0 list-none">
          {Users.map((data) => {
            return <Online key={data.id} user={data} />;
          })}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button
            className="rightbarFollowButton mt-8 mb-2 bg-violet-700 text-white rounded px-2 py-2 flex items-center cursor-pointer text-base font-semibold"
            onClick={handleFollowBtn}
          >
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <h4 className="rightbarTitle text-lg font-medium mb-2">
          User Information
        </h4>
        <div className="rightbarInfo mb-8">
          <div className="rightbarInfoItem mb-2">
            <span className="rightbarInfoKey font-medium mr-3 text-gray-600">
              City:
            </span>
            <span className="rightbarInfoValue font-light">{user.city}</span>
          </div>
          <div className="rightbarInfoItem mb-2">
            <span className="rightbarInfoKey font-medium mr-3 text-gray-600">
              From:
            </span>
            <span className="rightbarInfoValue font-light">{user.from}</span>
          </div>
          <div className="rightbarInfoItem mb-2">
            <span className="rightbarInfoKey font-medium mr-3 text-gray-600">
              Status:
            </span>
            <span className="rightbarInfoValue font-light">
              {user.relationship}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle text-lg font-medium mb-2">User Friends</h4>
        <div className="rightbarFollowings flex flex-wrap justify-between">
          {friends.map((friend) => {
            return (
              <Link key={friend._id} to={"/profile/" + friend.username}>
                <div className="rightbarFollowing flex flex-col mb-5 cursor-pointer">
                  <img
                    src={
                      friend.profilePicture
                        ? `http://localhost:8800/images/person/${friend.profilePicture}`
                        : "http://localhost:8800/images/noAvatar.png"
                    }
                    alt=""
                    className="rightbarFollowingImg  w-28 h-28 object-cover rounded cursor-pointer"
                  />
                  <span className="rightbarFollowingName text-center">
                    {friend.username}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar flex-[3.5]">
      <div className="rightbarWrapper pt-5 pr-5 pb-0 pl-0">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
};

export default Rightbar;
