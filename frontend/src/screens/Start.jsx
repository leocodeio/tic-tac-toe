import React from "react";
import { Link } from "react-router-dom";
import "./Start.css";

const Start = () => {
  return (
    <div className="start-page">
      Welcome To Tic-Tac-Toe!
      <Link className="start-button" to="/play"><b>PLAY</b></Link>
    </div>
  );
};

export default Start;
