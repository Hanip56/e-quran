import { createContext, useContext, useEffect, useState } from "react";

const stateContext = createContext({
  bookmarkAyat: [],
});

export const ContextProvider = ({ children }) => {
  const [bookmarkAyat, setBookmarkAyat] = useState([]);
  const [preSetAyatIndex, setPreSetAyatIndex] = useState(null);

  const [initial, setInitial] = useState(true);

  console.log({ bookmarkAyat });

  useEffect(() => {
    const bmstorage = localStorage.getItem("@equran_bookmarkayat");
    if (bmstorage) {
      setBookmarkAyat(JSON.parse(bmstorage));
    }
  }, []);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      return;
    }
    localStorage.setItem("@equran_bookmarkayat", JSON.stringify(bookmarkAyat));
  }, [bookmarkAyat]);

  return (
    <stateContext.Provider
      value={{
        bookmarkAyat,
        setBookmarkAyat,
        preSetAyatIndex,
        setPreSetAyatIndex,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);
