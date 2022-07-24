import React, { useEffect, useRef, useState } from "react";
import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";

const AudioAyat = ({
  isPlaying,
  setIsPlaying,
  setCurrentSurahIndex,
  currentSurahIndex,
  currentAyatSrc,
  jumlahAyat,
}) => {
  const audioRef = useRef(null);
  let mounted = false;

  console.log({ currentSurahIndex });
  console.log({ jumlahAyat });

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      audioRef.current.autoplay = true;
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.currentTime = 0;

    const section = document.getElementById(currentSurahIndex.toString());
    section.scrollIntoView({ behavior: "smooth", block: "center" });

    if (currentSurahIndex === jumlahAyat) {
      setIsPlaying(false);
      setCurrentSurahIndex(0);
    }
  }, [currentSurahIndex]);

  useEffect(() => {
    const handleRef = audioRef.current;

    if (!mounted) {
      handleRef.addEventListener("ended", () => {
        handleNext();
      });
      mounted = true;
    }

    return () => {
      handleRef.removeEventListener("ended", () => {
        handleNext();
      });
    };
  }, []);

  const handleNext = () => {
    setCurrentSurahIndex((prev) => prev + 1);
  };

  return (
    <div>
      <audio ref={audioRef} src={currentAyatSrc} preload="metadata" />
      <label
        htmlFor="audioInput"
        onClick={togglePlay}
        className="cursor-pointer hidden"
      >
        {isPlaying ? <IoPauseCircleOutline /> : <IoPlayCircleOutline />}
      </label>
    </div>
  );
};

export default AudioAyat;
