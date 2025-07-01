import React from "react";
import Header from "../components/Header";
import Myproject from "../components/Myproject";
import Profile from "../components/profile";

function Dashboard() {
  const userData = JSON.parse(sessionStorage.getItem("loggeduser"))
  // console.log("logged user data")
  // console.log(userData)
   return (
    <>
      <Header />
      <div className="container-fluid">
        <h4 className="ms-4 mt-4">
          Welcome <span className="text-warning">{userData?.username}</span>
        </h4>
        <div className="row">
          <div className="col-md-8">
            <Myproject />
          </div>
          <div className="col-md-4">
            <Profile />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
