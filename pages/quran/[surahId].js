import Head from "next/head";
import React, { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import AyatCard from "../../components/Home/AyatCard";
import AudioPlayer from "../../components/AudioPlayer";
import Link from "next/link";
import SurahCardSmall from "../../components/Home/SurahCardSmall";
import { useRouter } from "next/router";
import { useStateContext } from "../../contexts/ContextProvider";

const DetailSurah = ({ allSurahRes, data, audio }) => {
  const { preSetAyatIndex, setPreSetAyatIndex } = useStateContext();
  const router = useRouter();
  const audioList = audio?.map((a) => a.audio);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
  const [currentSurahIndex, setCurrentSurahIndex] = useState(
    +router.query.surahId
  );

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (preSetAyatIndex) {
      setCurrentAyahIndex(preSetAyatIndex);
    }

    return () => {
      setPreSetAyatIndex(null);
    };
  }, [preSetAyatIndex]);

  useEffect(() => {
    if (currentSurahIndex !== +router.query.surahId - 1) {
      router.push(`/quran/${currentSurahIndex}`);
    }
  }, [currentSurahIndex]);

  useEffect(() => {
    setTimeout(() => {
      const section = document.getElementById(currentAyahIndex?.toString());
      section?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }, [currentAyahIndex, preSetAyatIndex]);

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

      <div className="flex justify-between items-center w-[calc(100%-3rem)] px-6 h-14 z-40 bg-gray-quran fixed">
        <Link href={"/"}>
          <a className="flex gap-x-2 items-center hover:gap-x-1 transition-all duration-100">
            <IoChevronBack />
            <p>Back</p>
          </a>
        </Link>
        <div className="flex gap-x-4 text-md">
          <div className="flex gap-x-2">
            <p>Ayah</p>
            <select
              value={currentAyahIndex}
              onChange={(e) => setCurrentAyahIndex(+e.target.value)}
            >
              {data.ayat.map((ayat) => (
                <>
                  <option value={ayat?.nomor - 1} key={ayat?.nomor}>
                    {ayat?.nomor}
                  </option>
                </>
              ))}
            </select>
          </div>

          <div className="flex gap-x-2">
            <p>Surah </p>
            <select
              value={currentSurahIndex}
              onChange={(e) => setCurrentSurahIndex(+e.target.value)}
            >
              {allSurahRes?.map((surah) => (
                <>
                  <option key={surah.nomor} value={surah.nomor}>
                    {surah.nomor} | {surah.nama_latin}
                  </option>
                </>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-x-4 p-6 pt-16">
        <div className="hidden md:flex basis-56 w-full relative pb-10 justify-between ">
          <div className="fixed flex flex-col gap-y-4 h-[90vh] w-56 ">
            <div className="flex justify-around flex-col basis-[60%] w-56 overflow-y-hidden bg-white-quran rounded-md p-4">
              <div className="basis-[70%] flex flex-col gap-y-4 justify-center items-center">
                <h2 className="text-center text-3xl font-bold">
                  {allSurahRes[+router.query.surahId - 1]?.nama}
                </h2>
                <p className="text-center">
                  {allSurahRes[+router.query.surahId - 1]?.nama_latin}
                </p>
              </div>
              <div className="h-full overflow-scroll space-y-2 scrollBarHideQ">
                <h4 className="text-md font-bold">Deskripsi</h4>
                <p className="text-sm">
                  {allSurahRes[+router.query.surahId - 1]?.deskripsi?.replace(
                    /<[^>]*>/g,
                    ""
                  )}
                </p>
              </div>
            </div>
            <div className="flex-1 flex flex-col w-56 h-full overflow-scroll space-y-2 scrollbar-hide">
              {allSurahRes?.map((surah) => (
                <>
                  <SurahCardSmall
                    key={surah.nomor}
                    nama_latin={surah.nama_latin}
                    nomor={surah.nomor}
                    arti={surah.arti}
                    surahIndex={router.query.surahId}
                    setCurrentSurahIndex={setCurrentSurahIndex}
                  />
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-center pb-6 text-xl">
            أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ
          </h2>
          <AudioPlayer
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setCurrentAyahIndex={setCurrentAyahIndex}
            currentAyahIndex={currentAyahIndex}
            currentAyatSrc={audioList[currentAyahIndex]}
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
                currentAyahIndex={currentAyahIndex}
                setCurrentAyahIndex={setCurrentAyahIndex}
                setIsPlaying={setIsPlaying}
                namaSurahLatin={
                  allSurahRes[+router.query.surahId - 1]?.nama_latin
                }
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
