import React, { useEffect, useState } from "react";
import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";

const AudioAyat = ({
  index,
  currentAyahIndex,
  playing,
  setCurrentAyahIndex,
  setPlaying,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (currentAyahIndex === index && playing) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [currentAyahIndex, index, playing]);

  const playThisAyat = () => {
    if (isPlaying) {
      setPlaying(false);
      setIsPlaying(false);
    } else {
      setCurrentAyahIndex(index);
      setPlaying((prev) => true);
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <label
        htmlFor="audioInput"
        onClick={playThisAyat}
        className="cursor-pointer"
      >
        {isPlaying ? <IoPauseCircleOutline /> : <IoPlayCircleOutline />}
      </label>
    </div>
  );
};

export default AudioAyat;
