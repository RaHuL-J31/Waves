import React, { useState, useRef } from "react";
import Library from "./components/Library";
import Nav from "./components/Nav";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/App.scss";
import data from "./data";
function App() {
  const [song, setSong] = useState(data());
  const [currentSong, setCurrentSong] = useState(song[1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const songEndHandler = async () => {
    let currentIndex = song.findIndex((s) => s.id === currentSong.id);
    await setCurrentSong(song[(currentIndex + 1) % song.length]);
    if (isPlaying) audioRef.current.play();
  };
  const audioRef = useRef(null);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
  };
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={song}
        setCurrentSong={setCurrentSong}
        setSong={setSong}
      />
      <Library
        audioRef={audioRef}
        songs={song}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSong={setSong}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
