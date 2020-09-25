import { Avatar, Button } from "@material-ui/core";
import React from "react";
import "../assets/css/Header.css";
import { auth } from "../config/firebase";
import { useStateValue } from "../StateProvider";

function Header({ open, setOpen, openSignin, setOpenSignin }) {
  const [{ posts, user }, dispatch] = useStateValue();
  return (
    <div className="header">
      <img
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
        className="header_image"
      />
      {user ? (
        <div className="nav_right">
          <Button onClick={() => auth.signOut()}>Log Out</Button>
          <Avatar
            className="nav_avatar"
            alt={user.displayName}
            src="/static/images/avatar/1.jpg"
          />
          <h3>{user.displayName}</h3>
        </div>
      ) : (
        <div className="nav_right">
          <Button onClick={() => setOpenSignin(true)}>Log In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
    </div>
  );
}

export default Header;
