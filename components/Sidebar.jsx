import React from "react";
import { IoBookSharp, IoHeart, IoPaperPlane } from "react-icons/io5";

const Sidebar = () => {
  return (
    <nav className="fixed w-11 bg-white-quran h-screen">
      <div className="w-full bg-green-quran h-11 flex justify-center items-center text-white-quran">
        Q
      </div>
      <ul className="p-1 flex flex-col gap-y-6 justify-center items-center w-full mt-4">
        <li className="sidebarList active">
          <IoBookSharp className="" />
        </li>
        <li className="sidebarList">
          <IoHeart className="" />
        </li>
        <li className="sidebarList">
          <IoPaperPlane className="" />
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
