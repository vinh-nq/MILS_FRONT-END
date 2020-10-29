import React from "react";
import SelectLanguage from "../SelectLanguage";
import { Link } from "react-router-dom";
import "./styles.scss";
import MenuUnfoldOutlined from "@ant-design/icons/lib/icons/MenuUnfoldOutlined";

function NavbarComponent(props) {
    const {setVisible , onBreakPoint} = props;
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
        {
            onBreakPoint ? <span className="ml-3 pointer" style={{fontSize: "24px"}}>
            <MenuUnfoldOutlined onClick={() => {setVisible(true)}}/>
        </span> : null
        }
      <div className="d-inline-block my-2 ml-auto">
        <SelectLanguage />
      </div>
    </div>
  );
}

export default NavbarComponent;
