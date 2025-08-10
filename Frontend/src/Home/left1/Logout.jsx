import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/user/logout");
      localStorage.removeItem("messanger");
      Cookies.remove("jet");
      toast.success("Logout successfully");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("Failed to logout");
    }  
  };

  return (
    <div className="w-[4%] bg-slate-950 text-white flex flex-col justify-end">
      <div className="p-3 align-bottom">
        <button disabled={loading} onClick={handleLogout}>
          <BiLogOut
            className={`text-4xl p-2 rounded-lg duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default Logout;
