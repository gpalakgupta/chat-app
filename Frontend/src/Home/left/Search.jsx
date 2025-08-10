import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import UserGetAllUsers from "../../context/UserGetAllUsers.jsx";
import useConversation from "../../stateManage/useConversation.js";
import toast from "react-hot-toast";

const Search = () => {
  const [search, setSearch] = useState("");
  const [allUsers] = UserGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    const conversation = allUsers.find((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch(""); // clear input
    } else {
      toast.success("User not found");
    }
  };

  return (
    <div className="h-[10vh]">
      <div className="px-6 py-4">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            <label className="border border-gray-700 bg-slate-900 rounded-lg flex items-center gap-2 w-[80%] p-2">
              <input
                type="text"
                className="grow outline-none bg-transparent"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button type="submit">
              <IoSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
