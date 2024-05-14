import Share from "../share/Share";
import Post from "../post/Post";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
// import { Posts } from "../../dummyData";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchPost = async () => {
    try {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [user._id]);

  return (
    <div className="feed flex-[5.5]">
      <div className="feedWrapper p-5">
        {(!username || username === user.username) && <Share />}
        {posts.map((data) => {
          return <Post key={data._id} post={data} />;
        })}
      </div>
    </div>
  );
};

export default Feed;
