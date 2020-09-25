import React, { useEffect } from "react";
import "../assets/css/Posts.css";
import { useStateValue } from "../StateProvider";
import Post from "./Post";
import { db } from "../config/firebase";
import InstagramEmbed from "react-instagram-embed";

function Posts() {
  const [{ posts }, dispatch] = useStateValue();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        dispatch({
          type: "ADD_POST",
          payload: {
            posts: snapshot.docs.map((doc) => ({
              id: doc.id,
              post: doc.data(),
            })),
          },
        });
      });
  }, []);

  return (
    <div className="posts">
      <div className="post_left">
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            id={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
      <div className="post_right">
        <InstagramEmbed
          url="https://www.instagram.com/p/CFgnFxggbuk/?utm_source=ig_web_copy_link"
          maxWidth={320}
          hideCaption={false}
          containerTagName="div"
          protocol=""
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />
      </div>
    </div>
  );
}

export default Posts;
