import PermMediaIcon from "@mui/icons-material/PermMedia";
import TagIcon from "@mui/icons-material/Tag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const Share = () => {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handleSubmitData = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post("/posts/", newPost);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="share w-full  rounded-xl shadow-lg">
      <div className="shareWrapper p-2">
        <div className="shareTop flex items-center">
          <img
            src={
              user.profilePicture
                ? `/assets/person/${user.profilePicture}`
                : "/assets/noAvatar.png"
            }
            alt=""
            className="shareProfileImg w-12 h-12 rounded-full object-cover mr-2"
          />
          <input
            ref={desc}
            placeholder={`Whats your evil mind thinking ${user.username}?`}
            className="shareInput border-none w-4/5 focus:outline-none"
          />
        </div>
        <hr className="m-5" />
        {file && (
          <div className="shareImgContainer px-5 pt-0 pb-2 relative">
            <img
              className="shareImg w-full object-cover"
              src={URL.createObjectURL(file)}
              alt=""
            />
            <button
              className="shareCancelImg cursor-pointer absolute top-0 right-5 text-white"
              onClick={() => setFile(null)}
            >
              <CloseIcon />
            </button>
          </div>
        )}
        <form
          onSubmit={handleSubmitData}
          className="shareBottom flex items-center justify-between"
        >
          <div className="shareOptions flex">
            <label
              htmlFor="file"
              className="shareOption flex items-center mr-4 ml-5 cursor-pointer"
            >
              <PermMediaIcon
                htmlColor="tomato"
                fontSize="medium"
                className="shareIcon mr-1 "
              />
              <span className="shareOptionText text-sm font-normal">
                Photo or Video
              </span>
              <input
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
            </label>
            <div className="shareOption flex items-center mr-4 ml-5 cursor-pointer">
              <TagIcon
                htmlColor="blue"
                fontSize="medium"
                className="shareIcon mr-1 "
              />
              <span className="shareOptionText text-sm font-normal">Tags</span>
            </div>
            <div className="shareOption flex items-center mr-4 ml-5 cursor-pointer">
              <LocationOnIcon
                htmlColor="green"
                fontSize="medium"
                className="shareIcon mr-1 "
              />
              <span className="shareOptionText text-sm font-normal">
                Location
              </span>
            </div>
            <div className="shareOption flex items-center mr-4 ml-5 cursor-pointer">
              <EmojiEmotionsIcon
                htmlColor="goldenrod"
                fontSize="medium"
                className="shareIcon mr-1 "
              />
              <span className="shareOptionText text-sm font-normal">
                Feelings
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="shareButton border-none p-2 rounded font-medium mr-5 cursor-pointer bg-violet-500 text-violet-100"
          >
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
