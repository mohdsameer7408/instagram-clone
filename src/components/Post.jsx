import React, { useEffect, useState } from "react";
import "../assets/css/Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../config/firebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";

function Post({ id, username, caption, imageUrl }) {
  const [{ posts, user }, dispatch] = useStateValue();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("posts")
        .doc(id)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [id]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(id).collection("comments").add({
      username: user.displayName,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img src={imageUrl} alt="post" className="post_image" />
      <h4 className="post_text">
        <strong>{username} </strong>
        {caption}
      </h4>
      {comments.length > 0 && (
        <div className="post_comments">
          {comments.map((comment) => (
            <p key={comment.id}>
              <strong>{comment.data.username} </strong>
              {comment.data.text}
            </p>
          ))}
        </div>
      )}
      {user && (
        <form action="" className="post_commentBox">
          <input
            className="post_input"
            type="text"
            name=""
            id={id}
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="post_button"
            disabled={!comment}
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
