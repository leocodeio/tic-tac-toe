import React, { useEffect, useState } from "react";
import { useAccountContext } from "../context/AccountContext";
import { useSocketContext } from "../context/SocketContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Play.css";

const Play = () => {
  const { account, setAccount } = useAccountContext();
  const { socket, setOnlineUsers } = useSocketContext();
  const [name, setName] = useState("");

  const { onlineUsers } = useSocketContext();
  // console.log(onlineUsers);
  const navigate = useNavigate();

  const handleStart = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post("http://localhost:5001/user/create", {
        nickName: name,
      });
      setAccount(user.data.user);
      // console.log(user.data);
      setOnlineUsers((prevUsers) => [...prevUsers, user.data.user._id]);
      navigate("/ttt");
    } catch (err) {
      console.log("error while creating player", err);
    }
    setName("");
  };

  useEffect(() => {
    if (account) {
      setAccount(null);
      setOnlineUsers(onlineUsers.filter((id) => id !== account._id));
      socket.emit("logout");
    }
  });
  return (
    <form className="play-page" onSubmit={handleStart}>
      Play Area!!!
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="nickname here !!!"
        type="text"
        required
      />
      <button className="play-button" type="submit">start game</button>
    </form>
  );
};

export default Play;
