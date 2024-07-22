import React from "react";
import { Link } from "react-router-dom";
import "./Start.css";

const Start = () => {
  return (
    <div className="start-page">
      <h1 style={{"width": "60%","text-align": "center"}}>Welcome To Tic-Tac-Toe!</h1>
      <Link className="start-button" to="/play"><b>PLAY</b></Link>
    </div>
  );
};

export default Start;
