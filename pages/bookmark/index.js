import Head from "next/head";
import Link from "next/link";
import React from "react";
import BookmarkCard from "../../components/Home/BookmarkCard";
import { useStateContext } from "../../contexts/ContextProvider";

const Bookmark = () => {
  const { bookmarkAyat } = useStateContext();

  return (
    <div>
      <Head>
        <title>e-quran | bookmark</title>
        <meta name="description" content="quran app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-6">
        <div className="w-full flex flex-col gap-y-2 items-center justify-center mb-4">
          <h2 className="text-center font-bold text-2xl">Bookmark</h2>
          {/* <input
          type="text"
          placeholder="Search Surah..."
          className="w-96 indent-2 p-1 bg-white/50 outline-none rounded-md"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        /> */}
        </div>
        <div className="grid grid-cols-auto-fill gap-3">
          {bookmarkAyat?.map((surah, idx) => (
            <BookmarkCard key={idx} surahAndAyat={surah} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
