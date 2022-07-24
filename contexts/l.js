import { atom } from "recoil";

export const ayatAtom = atom({
  key: "ayatAtom", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

export const quranPlayer = atom({
  key: "quranPlayer",
  default: {
    list: [],
    isPlaying: false,
    currentSurahSrc: "",
    currentSurahIndex: 0,
  },
});
