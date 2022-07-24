import Head from "next/head";
import React, { useEffect, useState } from "react";
import AyatCard from "../../components/Home/AyatCard";
import { RecoilRoot } from "recoil";
import AudioPlayer from "../../components/AudioPlayer";

const DetailSurah = ({ data, audio }) => {
  const audioList = audio.map((a) => a.audio);
  const [currentSurahIndex, setCurrentSurahIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <Head>
        <title>{data.nama_latin}</title>
        <meta name="description" content="quran app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full h-11 bg-white-quran fixed">Search</div>

      <div className="p-6 pt-16">
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <h2 className="text-center">AUdzubillahi minassyaithoni rajiim</h2>
        <AudioPlayer
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setCurrentSurahIndex={setCurrentSurahIndex}
          currentSurahIndex={currentSurahIndex}
          currentAyatSrc={audioList[currentSurahIndex]}
          audioList={audioList}
          jumlahAyat={audioList.length}
        />
        <div className="space-y-4">
          {data.ayat.map((ayat, i) => (
            <AyatCard
              key={ayat.nomor}
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
  );
};

export default DetailSurah;

export const getStaticProps = async (context) => {
  const surahId = context.params.surahId;
  const res = await fetch("https://equran.id/api/surat/" + surahId);
  const data = await res.json();

  const resAudio = await fetch(
    `http://api.alquran.cloud/v1/surah/${surahId}/ar.alafasy`
  );
  const audio = await resAudio.json();

  return {
    props: {
      data,
      audio: audio.data.ayahs,
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
