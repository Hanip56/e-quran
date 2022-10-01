import Link from "next/link";
import React from "react";
import { IoBookSharp, IoHeart, IoPaperPlane } from "react-icons/io5";
import { HiBookmark } from "react-icons/hi";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  return (
    <nav className="fixed w-12 bg-white-quran h-screen">
      <div className="w-full bg-green-quran h-12 flex justify-center items-center text-white-quran">
        Q
      </div>
      <ul className="p-1 flex flex-col gap-y-6 justify-center items-center w-full mt-4">
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
    </nav>
  );
};

export default Sidebar;
