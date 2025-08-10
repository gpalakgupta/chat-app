import React from "react";
import Left from "./Home/left/Left";
import Right from "./Home/right/Right";
import Logout from "./Home/left1/Logout";
import Signup from "./component/Signup";
import Login from "./component/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/Authprovider.jsx";
import Loading from "./component/Loading.jsx";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const { authuser } = useAuth();

  return (
    <>
      {/* <Loading/> */}
      <Routes>
        <Route
          path="/"
          element={
            authuser ? (
              <div className="flex h-screen">
                <Logout />
                <Left />
                <Right />
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/signup"
          element={authuser ? <Navigate to={"/"} /> : <Signup />}
        />
        <Route
          path="/login"
          element={authuser ? <Navigate to={"/"} /> : <Login />}
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
