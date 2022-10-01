import Head from "next/head";
import SurahCard from "../components/Home/SurahCard";
import Link from "next/link";
import { useState } from "react";

export default function Home({ allSurahRes }) {
  const [keyword, setKeyword] = useState("");

  let filteredSurah = allSurahRes;

  if (keyword) {
    const reg = new RegExp(
      `.*${keyword.toLocaleLowerCase().replace("-", "").trim()}.*`,
      "gi"
    );

    filteredSurah = filteredSurah.filter((surah) =>
      surah.nama_latin.replace("-", "").toLowerCase().trim().match(reg)
    );
  }

  return (
    <div>
      <Head>
        <title>e-quran</title>
        <meta name="description" content="quran app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-6">
        <div className="w-full flex flex-col gap-y-2 items-center justify-center mb-4">
          <h2 className="text-center font-bold">Al-Quran</h2>
          <input
            type="text"
            placeholder="Search Surah..."
            className="w-96 indent-2 p-1 bg-white/50 outline-none rounded-md"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-auto-fit gap-3">
          {filteredSurah?.map((surah) => (
            <Link href={`/quran/${surah.nomor}`} key={surah.nomor}>
              <a key={surah.nomor}>
                <SurahCard
                  key={surah.nomor}
                  nama={surah.nama}
                  nama_latin={surah.nama_latin}
                  nomor={surah.nomor}
                  tempat_turun={surah.tempat_turun}
                  jumlah_ayat={surah.jumlah_ayat}
                  arti={surah.arti}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const [allSurahRes] = await Promise.all([
    fetch(`https://equran.id/api/surat`).then((res) => res.json()),
  ]);

  return {
    props: {
      allSurahRes,
    },
  };
};
