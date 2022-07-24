import React, { useEffect, useState } from "react";
import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";

const AudioAyat = ({
  index,
  currentSurahIndex,
  playing,
  setCurrentSurahIndex,
  setPlaying,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (currentSurahIndex === index && playing) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [currentSurahIndex, index, playing]);

  const playThisAyat = () => {
    if (isPlaying) {
      setPlaying(false);
      setIsPlaying(false);
    } else {
      setCurrentSurahIndex(index);
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
