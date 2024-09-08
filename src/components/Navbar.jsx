import React from "react";


const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="flex justify-between items-center px-4 py-5 h-14 mycontainer max-w-screen-lg mx-auto">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-700">&lt;</span>
          Bhool
          <span className="text-green-700">JAO/&gt;</span>
        </div>
        
        <a
          href="https://github.com" target="_blank"
          className="flex items-center gap-2 text-white bg-green-500 hover:bg-green-600 rounded-lg px-3 py-2 ring-white ring-1"
        >
          <img className="w-6 h-6" src="/icons/github.svg" alt="GitHub Logo" />
          <span className="font-bold">Github</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
