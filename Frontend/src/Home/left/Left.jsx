import React from "react";
import Search from "./Search";
import Users from "./Users";
import User from "./User";

const Left = () => {
  return (
    <div className="w-[30%] bg-slate-950 text-white">
      <h1 className="font-bold text-3xl p-2 px-11">Chats</h1>
      <Search></Search>
      <hr />
      <Users/>
      {/* <User /> */}
    </div>
  );
};

export default Left;
