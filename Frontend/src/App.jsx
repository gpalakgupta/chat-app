import React from "react";
import Left from "./Home/left/Left";
import Right from "./Home/right/Right";
import Logout from "./Home/left1/Logout";
import Signup from "./component/Signup";
import Login from "./component/Login";

const App = () => {
  return (
    <>
      {/* <div className="flex h-screen">
        <Logout />
        <Left></Left>
        <Right></Right>
      </div> */}
      <Signup/>
      {/* <Login/> */}
    </>
  );
};

export default App;
