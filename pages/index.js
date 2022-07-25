import Head from "next/head";
import SurahCard from "../components/Home/SurahCard";
import Link from "next/link";

export default function Home({ allSurahRes }) {
  return (
    <div>
      <Head>
        <title>e-quran</title>
        <meta name="description" content="quran app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <div className="w-full h-11 bg-white-quran fixed">Search</div> */}
      <div className="p-6 pt-16">
        <h2 className="text-center">Al-Quran</h2>
        <div className="grid grid-cols-auto-fit gap-3">
          {allSurahRes?.map((surah) => (
            <>
              <Link href={`/quran/${surah.nomor}`}>
                <a>
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
            </>
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
