import React from "react";
import Logo from "../imgs/logo.png";

import { BsSearch } from "react-icons/bs";
const LogoSearch = () => {
  return (
    <div className="flex gap-3">
      <img className="rounded-full w-10 h-10" src={Logo} alt="" />
      <div className="flex rounded-lg p-1 bg-[rgba(40,52,62,0.07)]">
        <input className="bg-transparent border-none outline-none" type="text" placeholder="#Explore" />
        <div className="flex items-center justify-center bg-gradient-to-r from-[#f99827] to-[#f95f35] rounded-md p-1 text-white">
          <BsSearch />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
