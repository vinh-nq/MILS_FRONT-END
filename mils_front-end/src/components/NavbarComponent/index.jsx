import React from "react";
import SelectLanguage from "../SelectLanguage";
import { Link } from "react-router-dom";
import "./styles.scss";

function NavbarComponent() {
  return (
    <div className="navbar-container">
      <div className="d-flex align-items-center justify-content-center mr-1">
        <Link to="login" className="">
          <img
            src={"assets/images/apisLogo.jpg"}
            alt={"logo-dark"}
            height={30}
          />
        </Link>
      </div>
      <span className="text-white font-weight-bold h4 mb-0 text-container">
        MISLAOS.COM
      </span>
      <div className="d-inline-block my-2 ml-auto">
        <SelectLanguage />
      </div>
    </div>
  );
}

export default NavbarComponent;
