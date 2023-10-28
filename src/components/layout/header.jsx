import React from "react";
import "./header.css";
import myLogo from "./RMF_Banner.jpg";

const Header = ({ user }) => {
  return (
    <div className="main-content bg-info">
      <div className="header-body text-center-red mb-7">
        <img src={myLogo} className="myLogo" alt="logo" />
        <h3 className="text-white">RUCS-Road User Charging System</h3>
      </div>
    </div>
    //-------

    //----
  );
};

export default Header;
