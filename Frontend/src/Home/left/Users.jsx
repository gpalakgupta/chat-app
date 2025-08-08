import React from "react";
import User from "./User";
import UserGetAllUsers from "../../context/UserGetAllUsers";
const Users = () => {
  const [allUsers, loading] = UserGetAllUsers();
  return (
    <div
      className=" flex-palak overflow-y-auto px-4"
      style={{ maxHeight: "calc(84vh - 1vh)" }}
    >
      {allUsers.map((user, index) => {
        return <User key={index} user={user} />;
      })}
    </div>
  );
};

export default Users;
