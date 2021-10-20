import React from "react";
function LibrarySong({
  song,
  setCurrentSong,
  songs,
  id,
  audioRef,
  isPlaying,
  setSong,
}) {
  const songSelectHandler = async () => {
    //const selectedSong = songs.filter((state) => state.id === song.id);
    await setCurrentSong(song);
    const newsong = songs.map((song) => {
      if (song.id == id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSong(newsong);
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img alt="loading" src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
