import React from "react";
import im from "../assets/covers/CanaryForest.jpg";
function Song({ currentSong }) {
  return (
    <div className="song-container">
      <img alt="loading" src={currentSong.cover}></img>
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
}

export default Song;
