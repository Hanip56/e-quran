import React from "react";

const SurahCard = ({ nama_latin, nomor, arti }) => {
  return (
    <div className="flex gap-x-2 p-2 w-full rounded-[.205rem] bg-white-quran border border-light-green-quran ">
      <div className="flex justify-center items-start basis-10">
        <div className="w-6 h-6 mt-[.2rem] bg-green-quran text-white-quran rounded-full text-center">
          {nomor}
        </div>
      </div>
      <div className="basis-auto flex w-full h-full items-center justify-start">
        <div className="space-y-1">
          <h4 className="font-bold text-lg">{nama_latin}</h4>
          <p className="font-light text-sm">{arti}</p>
        </div>
      </div>
    </div>
  );
};

export default SurahCard;
