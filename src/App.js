import React, { useEffect, useState } from "react";
import "./App.css";
import CreatePost from "./components/CreatePost";
import Header from "./components/Header";
import Login from "./components/Login";
import Posts from "./components/Posts";
import { auth } from "./config/firebase";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ posts, user }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          payload: {
            user: authUser,
          },
        });
      } else {
        dispatch({
          type: "SET_USER",
          payload: {
            user: null,
          },
        });
      }
    });
  }, [user]);

  return (
    <div className="App">
      <Header
        open={open}
        setOpen={setOpen}
        openSignin={openSignin}
        setOpenSignin={setOpenSignin}
      />
      <Login
        open={open}
        setOpen={setOpen}
        openSignin={openSignin}
        setOpenSignin={setOpenSignin}
      />
      <Posts />
      {user ? (
        <CreatePost />
      ) : (
        <center>
          <h3>Login to upload</h3>
        </center>
      )}
    </div>
  );
}

export default App;
