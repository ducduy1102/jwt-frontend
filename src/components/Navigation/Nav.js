import React, { useEffect, useState } from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";

const Nav = (props) => {
  let location = useLocation();
  console.log();
  const [isShow, setIsShow] = useState(true);
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setIsShow(false);
    }
  }, []);

  return (
    <>
      {isShow === true && (
        <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      )}
    </>
  );
};

export default Nav;
