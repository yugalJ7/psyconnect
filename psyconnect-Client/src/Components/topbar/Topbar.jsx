import SearchIcon from "@mui/icons-material/Search";
import Person2Icon from "@mui/icons-material/Person2";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="topbarContainer flex h-[50px] w-full bg-violet-700 items-center sticky top-0 z-50">
      <div className="topbarLeft flex-[3]">
        <Link to={"/"}>
          <span className="logo text-2xl ml-5 font-bold text-white cursor-pointer">
            psyConnect
          </span>
        </Link>
      </div>
      <div className="topbarCentre flex-[5] ">
        <div className="searchBar flex items-center w-full bg-white rounded-[30px] h-8">
          <SearchIcon fontSize="small" className="ml-[10px]" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput border-none w-4/5 focus:outline-none"
          />
        </div>
      </div>
      <div className="topbarRight flex-[4] flex items-center justify-around text-white">
        <div className="topbarLinks ">
          <span className="topbarLink text-sm cursor-pointer mr-3">
            Homepage
          </span>
          <span className="topbarLink text-sm cursor-pointer mr-3">
            Timeline
          </span>
        </div>
        <div className="topbarIcons flex">
          <div className="topbarIconItem mr-4 cursor-pointer relative">
            <Person2Icon />
            <span className="topbarIconBadge custom-badge">1</span>
          </div>
          <div className="topbarIconItem mr-4 cursor-pointer relative">
            <ChatIcon />
            <span className="topbarIconBadge custom-badge right-[-13px]">
              2
            </span>
          </div>
          <div className="topbarIconItem mr-4 cursor-pointer relative">
            <NotificationsActiveIcon />
            <span className="topbarIconBadge custom-badge right-[-12px]">
              1
            </span>
          </div>
        </div>
        <Link to={user && `/profile/${user.username}`}>
          <img
            src={
              user && user.profilePicture
                ? `/assets/person/${user.profilePicture}`
                : "/assets/noAvatar.png"
            }
            alt=""
            className="topbarImg w-8 h-8 rounded-full cursor-pointer object-cover"
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
