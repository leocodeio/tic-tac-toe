import React, { useState } from "react";
import { useAccountContext } from "../context/AccountContext";

const Play = () => {
  const { setAccount } = useAccountContext();
  const [name, setName] = useState("");
  const handleStart = (e) => {
    e.preventDefault();
    setAccount('');
    setName('');
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
