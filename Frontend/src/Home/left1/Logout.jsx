import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("messanger");
      Cookies.remove("jet");
      setLoading(false);
      alert("Logout successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-[4%] bg-slate-950 text-white flex flex-col justify-end">
      <div className="p-3 align-bottom">
        <button>
          <BiLogOut
            className="text-4xl p-2 hover:bg-gray-600 rounded-lg duration-300"
            onClick={handleLogout}
          />
        </button>
      </div>
    </div>
  );
};

export default Logout;
