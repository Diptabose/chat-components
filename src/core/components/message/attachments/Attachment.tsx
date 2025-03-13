import React from "react";
import { FaRegFileAlt } from "react-icons/fa";

const Attachment = () => {
  return (
    <div className="flex gap-2 items-center cursor-pointer">
      <div className="flex gap-2 items-center rounded-2xl p-2 border border-slate-300">
        <div className="flex rounded-lg size-10 shrink-0 bg-rose-400 p-1 text-center">
          <FaRegFileAlt className="text-white size-5 m-auto" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">File Name</span>
          <span className="text-xs text-slate-400">
            Created on: 12-Jan-2023
          </span>
        </div>
      </div>
    </div>
  );
};

export default Attachment;
