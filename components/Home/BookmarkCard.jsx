import { useRouter } from "next/router";
import { HiArrowSmRight, HiX } from "react-icons/hi";
import { useStateContext } from "../../contexts/ContextProvider";

const BookmarkCard = ({ surahAndAyat }) => {
  const { setPreSetAyatIndex, setBookmarkAyat } = useStateContext();
  const router = useRouter();
  const splitted = surahAndAyat.split(":");
  const surahLatin = splitted[0];
  const surahNomor = splitted[1];
  const ayat = splitted[2];

  const handleGo = () => {
    setPreSetAyatIndex(ayat);
    router.push(`/quran/${surahNomor}`);
  };

  return (
    <div className="flex gap-x-2 p-2 w-full rounded-[.205rem] bg-white-quran border">
      <div className="basis-auto flex flex-col w-full h-full gap-y-2">
        <div className="w-full flex items-center justify-between">
          <h4 className="font-bold text-lg">{surahLatin}</h4>

          <p className="font-light text-sm tracking-widest">{`${surahNomor}:${ayat}`}</p>
        </div>
        <div className="w-full flex items-center justify-between text-sm gap-x-4">
          <button
            className="flex-1 gap-x-2 flex justify-center items-center text-red-quran hover:text-white rounded-md transition-all p-1 bg-red-quran/5 hover:bg-red-quran"
            onClick={() =>
              setBookmarkAyat((prev) => prev.filter((p) => p !== surahAndAyat))
            }
          >
            <HiX />
            Delete
          </button>
          <button
            className="flex-1 gap-x-2 flex justify-center items-center text-green-quran hover:text-white rounded-md transition-all p-1 bg-green-quran/5 hover:bg-green-quran"
            onClick={handleGo}
          >
            Go
            <HiArrowSmRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
