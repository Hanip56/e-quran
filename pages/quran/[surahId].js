import Head from "next/head";
import React, { useState } from "react";
import AyatCard from "../../components/Home/AyatCard";
import AudioPlayer from "../../components/AudioPlayer";
import Link from "next/link";
import SurahCardSmall from "../../components/Home/SurahCardSmall";
import { useRouter } from "next/router";

const DetailSurah = ({ allSurahRes, data, audio }) => {
  const audioList = audio?.map((a) => a.audio);
  const [currentSurahIndex, setCurrentSurahIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  if (!data || !audio || !allSurahRes) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Head>
        <title>{data?.nama_latin}</title>
        <meta name="description" content="quran app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-between items-center w-[calc(100%-3rem)] px-6 h-14 bg-gray-quran fixed">
        <p>Back</p>
        <select
          value={currentSurahIndex}
          onChange={(e) => setCurrentSurahIndex(+e.target.value)}
        >
          {data.ayat.map((ayat) => (
            <>
              <option value={ayat?.nomor - 1}>{ayat?.nomor}</option>
            </>
          ))}
        </select>
      </div>

      <div className="flex flex-row gap-x-4 p-6 pt-16">
        <div className="hidden md:flex basis-56 w-full relative pb-10 justify-between ">
          <div className="fixed flex flex-col gap-y-4 h-[90vh] w-full ">
            <div className="flex justify-around flex-col basis-[60%] w-56 overflow-y-hidden bg-white-quran rounded-md p-4">
              <div className="basis-[70%] flex flex-col gap-y-4 justify-center items-center">
                <h2 className="text-center text-3xl font-bold">
                  {allSurahRes[router.query.surahId]?.nama}
                </h2>
                <p className="text-center">
                  {allSurahRes[router.query.surahId]?.nama_latin}
                </p>
              </div>
              <div className="h-full overflow-scroll space-y-2 scrollBarHideQ">
                <h4 className="text-md font-bold">Deskripsi</h4>
                <p className="text-sm">
                  {allSurahRes[router.query.surahId]?.deskripsi?.replace(
                    /<[^>]*>/g,
                    ""
                  )}
                </p>
              </div>
            </div>
            <div className="flex-1 flex flex-col w-56 h-full overflow-scroll space-y-2 scrollbar-hide">
              {allSurahRes?.map((surah) => (
                <>
                  <Link href={`/quran/${surah.nomor}`}>
                    <a>
                      <SurahCardSmall
                        key={surah.nomor}
                        nama_latin={surah.nama_latin}
                        nomor={surah.nomor}
                        arti={surah.arti}
                        surahIndex={router.query.surahId}
                      />
                    </a>
                  </Link>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-center">AUdzubillahi minassyaithoni rajiim</h2>
          <AudioPlayer
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setCurrentSurahIndex={setCurrentSurahIndex}
            currentSurahIndex={currentSurahIndex}
            currentAyatSrc={audioList[currentSurahIndex]}
            audioList={audioList}
            jumlahAyat={audioList?.length}
            surahId={router.query.surahId}
          />
          <div className="space-y-4">
            {data.ayat.map((ayat, i) => (
              <AyatCard
                key={ayat?.nomor}
                ayat={ayat}
                playing={isPlaying}
                index={i}
                currentSurahIndex={currentSurahIndex}
                setCurrentSurahIndex={setCurrentSurahIndex}
                setIsPlaying={setIsPlaying}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSurah;

export const getStaticProps = async (context) => {
  const surahId = context.params.surahId;

  const [allSurahRes, data, audio] = await Promise.all([
    fetch(`https://equran.id/api/surat`).then((res) => res.json()),
    fetch(`https://equran.id/api/surat/${surahId}`).then((res) => res.json()),
    fetch(`http://api.alquran.cloud/v1/surah/${surahId}/ar.alafasy`).then(
      (res) => res.json()
    ),
  ]);

  console.log(`Building slug: ${surahId}`);

  return {
    props: {
      allSurahRes,
      data,
      audio: audio?.data?.ayahs,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("https://equran.id/api/surat");
  const data = await res.json();

  const surahPaths = data?.map((d) => ({
    params: { surahId: d.nomor.toString() },
  }));

  return {
    paths: surahPaths,
    fallback: false,
  };
};
