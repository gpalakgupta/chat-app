import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const UserGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get(
          "/api/user/getUserProfile",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAllUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.log("error in userGetAllUsers" + err);
      }
    };
    getUsers();
  }, []);
  return [allUsers, loading];
};

export default UserGetAllUsers;
