import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <h1>My wethaer app</h1>
      <Link to="/">HOME</Link>
      <Link to="/favourites">MY CITIES</Link>
    </div>
  );
};

export default Header;
