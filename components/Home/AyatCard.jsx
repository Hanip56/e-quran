import React from "react";
import { IoHeartOutline } from "react-icons/io5";
import AudioAyat from "./AudioAyat";

const SurahCard = ({
  ayat,
  index,
  currentSurahIndex,
  playing,
  setCurrentSurahIndex,
  setIsPlaying,
}) => {
  return (
    <div
      id={`${index}`}
      className={`flex flex-col gap-y-4 p-6 w-full rounded-[.205rem] bg-white-quran divide-y-2 ${
        currentSurahIndex === index && "border border-light-green-quran"
      }`}
    >
      <div className="flex flex-col gap-y-3">
        <div className="flex justify-between gap-x-2">
          <p className="text-light-green-quran font-bold">
            {ayat.surah}:{ayat.nomor}
          </p>
          <div className="text-end leading-9 font-arabicFont text-2xl font-bold">
            {ayat.ar}
          </div>
        </div>
        <div>
          <span className="text-light-green-quran font-bold">English</span> -
          Sahih
        </div>
        <div>{ayat.idn}</div>
      </div>
      <div>
        <div className="flex gap-x-4 text-lg mt-4">
          <IoHeartOutline />
          <AudioAyat
            index={index}
            currentSurahIndex={currentSurahIndex}
            playing={playing}
            setCurrentSurahIndex={setCurrentSurahIndex}
            setPlaying={setIsPlaying}
          />
        </div>
      </div>
    </div>
  );
};

export default SurahCard;
