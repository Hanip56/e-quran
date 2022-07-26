import React, { useEffect, useRef } from "react";
import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";
import { useRouter } from "next/router";

const AudioAyat = ({
  isPlaying,
  setIsPlaying,
  setCurrentAyahIndex,
  currentAyahIndex,
  currentAyatSrc,
  jumlahAyat,
  surahId,
}) => {
  const audioRef = useRef(null);
  const router = useRouter();
  let mounted = false;

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    setIsPlaying(false);
    setCurrentAyahIndex(0);
  }, [surahId]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      audioRef.current.autoplay = true;
    } else {
      audioRef.current.pause();
      audioRef.current.autoplay = false;
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.currentTime = 0;

    if (currentAyahIndex >= jumlahAyat) {
      setIsPlaying(false);
      setCurrentAyahIndex(0);
      return;
    }
  }, [currentAyahIndex]);

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
    setCurrentAyahIndex((prev) => prev + 1);
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
