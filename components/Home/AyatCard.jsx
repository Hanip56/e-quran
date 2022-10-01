import { HiBookmark, HiOutlineBookmark } from "react-icons/hi";
import { useStateContext } from "../../contexts/ContextProvider";
import AudioAyat from "./AudioAyat";

const SurahCard = ({
  ayat,
  index,
  currentAyahIndex,
  playing,
  setCurrentAyahIndex,
  setIsPlaying,
  namaSurahLatin,
}) => {
  const { setBookmarkAyat, bookmarkAyat } = useStateContext();
  const handleAddBookmarkAyat = (surah, ayat, surahLatin) => {
    setBookmarkAyat((prev) => [...prev, `${surahLatin}:${surah}:${ayat}`]);
  };
  const handleRemoveBookmarkAyat = (surah, ayat, surahLatin) => {
    setBookmarkAyat((prev) =>
      prev.filter((p) => p !== `${surahLatin}:${surah}:${ayat}`)
    );
  };

  return (
    <div
      id={`${index}`}
      className={`flex flex-col gap-y-4 p-6 w-full rounded-[.205rem] bg-white-quran divide-y-2 ${
        currentAyahIndex === index && "border border-light-green-quran"
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
          <span className="text-light-green-quran font-bold">Indonesia</span> -
          Sahih
        </div>
        <div>{ayat.idn}</div>
      </div>
      <div>
        <div className="flex gap-x-4 text-lg mt-4">
          {bookmarkAyat.includes(
            `${namaSurahLatin}:${ayat.surah}:${ayat.nomor}`
          ) ? (
            <HiBookmark
              className="cursor-pointer"
              onClick={() =>
                handleRemoveBookmarkAyat(ayat.surah, ayat.nomor, namaSurahLatin)
              }
            />
          ) : (
            <HiOutlineBookmark
              className="cursor-pointer"
              onClick={() =>
                handleAddBookmarkAyat(ayat.surah, ayat.nomor, namaSurahLatin)
              }
            />
          )}

          <AudioAyat
            index={index}
            currentAyahIndex={currentAyahIndex}
            playing={playing}
            setCurrentAyahIndex={setCurrentAyahIndex}
            setPlaying={setIsPlaying}
          />
        </div>
      </div>
    </div>
  );
};

export default SurahCard;
