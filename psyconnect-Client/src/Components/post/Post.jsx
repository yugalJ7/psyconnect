import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Post = ({ post }) => {
  console.log(post);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const fetchUser = async () => {
    const res = await axios.get(`/users?userId=${post.userId}`);
    setUser(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post w-full rounded-lg shadow-lg my-8 mx-0">
      <div className="postWrapper p-3">
        <div className="postTop flex items-center justify-between">
          <div className="postTopLeft flex items-center">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? `/assets/person/${user.profilePicture}`
                    : "/assets/noAvatar.png"
                }
                alt=""
                className="postProfileImg w-8 h-8 rounded-full cursor-pointer object-cover"
              />
            </Link>

            <span className="postUsername text-sm font-medium my-0 mx-2">
              {user.username}
            </span>
            <span className="postDate text-xs">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCentre my-5 mx-0">
          <span className="postText">{post?.desc}</span>
          <img
            src={
              post.img ? `http://localhost:8800/images/post/${post.img}` : ""
            }
            alt=""
            className="postImg mt-5 w-full max-h-[500px] object-contain"
          />
        </div>
        <div className="postBottom flex items-center justify-between">
          <div className="postBottomLeft flex items-center">
            <img
              className="likeIcon w-6 h-6 mr-1 cursor-pointer"
              src="/assets/like.png"
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon w-6 h-6 mr-1 cursor-pointer"
              src="/assets/heart.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter text-base">
              {like} sorcerer liked it
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText cursor-pointer text-base border-b-2 border-dashed">
              {post.comment} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
