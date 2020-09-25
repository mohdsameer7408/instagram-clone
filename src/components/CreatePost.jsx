import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import "../assets/css/CreatePost.css";
import { db, storage } from "../config/firebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";

function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [{ posts, user }, dispatch] = useStateValue();

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = (event) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: user?.displayName,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="create_post">
      <div className="image_upload">
        <progress className="image_uploadProgress" value={progress} max="100" />
        <Input
          id="caption"
          type="text"
          placeholder="Enter a caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <div>
          <input type="file" name="image" id="" onChange={handleChange} />
          <Button className="image_uploadButton" onClick={handleUpload}>
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
