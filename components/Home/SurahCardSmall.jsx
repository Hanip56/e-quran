import React from "react";

const SurahCardSmall = ({
  nama_latin,
  nomor,
  arti,
  surahIndex,
  setCurrentSurahIndex,
}) => {
  return (
    <div
      className={`surahCardQ ${surahIndex == nomor && "active"} cursor-pointer`}
      onClick={() => setCurrentSurahIndex(nomor)}
    >
      <div className="flex justify-center items-start basis-10">
        <div className="w-4 h-4 text-xs mt-[.2rem] bg-green-quran text-white-quran rounded-full text-center">
          {nomor}
        </div>
      </div>
      <div className="basis-auto flex w-full h-full items-center justify-start">
        <div className="space-y-1">
          <h4 className="font-md text-md">{nama_latin}</h4>
          <p className="font-light text-sm">{arti}</p>
        </div>
      </div>
    </div>
  );
};

export default SurahCardSmall;
