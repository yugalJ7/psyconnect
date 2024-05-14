import Topbar from "../../Components/topbar/Topbar";
import Sidebar from "../../Components/sidebar/Sidebar";
import Feed from "../../Components/feed/Feed";
import Rightbar from "../../Components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;

  const fetchUser = async () => {
    const res = await axios.get(`/users?username=${username}`);
    console.log(res.data);
    setUser(res.data);
  };
  useEffect(() => {
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile flex">
        <Sidebar />
        <div className="profileRight flex-[9]">
          <div className="profileRightTop">
            <div className="profileCover h-80 relative">
              <img
                className="profileCoverImg w-full h-64 object-cover"
                src={
                  user.coverPicture
                    ? `/assets/${user.coverPicture}`
                    : "/assets/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg w-36 h-36 rounded-full object-cover absolute left-0 right-0 m-auto top-40 border-4 border-white"
                src={
                  user.profilePicture
                    ? `/assets/person/${user.profilePicture}`
                    : "/assets/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo flex flex-col items-center justify-center">
              <h4 className="profileInfoName text-2xl font-medium">
                {user.username}
              </h4>
              <span className="profileInfoDesc font-light">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom flex">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
