import Link from "next/link";
import { useState } from "react";
import { IoBookSharp } from "react-icons/io5";
import { HiBookmark, HiOutlineMenuAlt3 } from "react-icons/hi";
import { useRouter } from "next/router";

const Sidebar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed flex flow-row md:block justify-between w-full z-10 h-12 md:w-12 md:h-screen top-0 left-0 bg-green-quran md:bg-white-quran">
      <div className="h-full md:w-full bg-green-quran md:h-12 flex justify-center items-center text-white-quran ml-4 md:ml-0">
        <p className="hidden md:block font-bold">Q</p>
        <p className="block md:hidden font-bold">E-Quran</p>
      </div>
      <ul className="p-1 hidden md:flex flex-col gap-y-6 justify-center items-center w-full mt-4">
        <Link href="/">
          <a>
            <li
              className={`sidebarList ${router.pathname === "/" && "active"}`}
            >
              <IoBookSharp />
            </li>
          </a>
        </Link>
        <Link href="/bookmark">
          <li
            className={`sidebarList ${
              router.pathname === "/bookmark" && "active"
            }`}
          >
            <HiBookmark />
          </li>
        </Link>
      </ul>
      <div className="flex md:hidden w-10 h-full justify-center items-center">
        <button
          className="bg-green-quran/80 p-2 rounded-sm text-white"
          onClick={() => setShowMobileMenu((prev) => !prev)}
        >
          <HiOutlineMenuAlt3 size={24} />
        </button>
      </div>
      {/* mobile menu */}
      {showMobileMenu && (
        <div className="absolute rounded-md bg-green-quran z-50 w-40 right-1 -bottom-[6.2rem] text-white">
          <ul className="p-1 flex flex-col gap-y-1 justify-center items-end w-full">
            <Link href="/">
              <li
                onClick={() => setShowMobileMenu(false)}
                className="flex justify-end gap-4 items-center p-2 active:bg-light-green-quran/40 w-full rounded-md cursor-pointer"
              >
                <p>List Surah</p>
                <IoBookSharp />
              </li>
            </Link>
            <Link href="/bookmark">
              <li
                onClick={() => setShowMobileMenu(false)}
                className="flex justify-end gap-4 items-center p-2 active:bg-light-green-quran/40 w-full rounded-md cursor-pointer"
              >
                <p>Bookmark</p>
                <HiBookmark />
              </li>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
