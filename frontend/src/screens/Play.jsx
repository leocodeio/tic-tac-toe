import React, { useState } from "react";
import { useAccountContext } from "../context/AccountContext";
import axios from 'axios';

const Play = () => {
  const { setAccount } = useAccountContext();
  const [name, setName] = useState("");
  const handleStart = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post("http://localhost:5001/user/create", {
        nickName:name
      });
      setAccount(user.data);
      console.log(user.data);
    } catch (err) {
      console.log("error while creating player",err)
    }
    setName("");
  };
  return (
    <div>
      play area!!!
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="nickname here !!!"
        type="text"
      />
      <button onClick={handleStart}>start game</button>
    </div>
  );
};

export default Play;
