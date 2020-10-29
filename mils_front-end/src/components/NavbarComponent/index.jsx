import React from "react";
import SelectLanguage from "../SelectLanguage";
import "./styles.scss";
import MenuUnfoldOutlined from "@ant-design/icons/lib/icons/MenuUnfoldOutlined";

function NavbarComponent(props) {
  const { setVisible, onBreakPoint } = props;
  return (
    <div className="navbar-container">
      {onBreakPoint ? (
        <div className="d-flex align-items-center justify-content-center mr-1">
          <span className="span-icon pointer">
            <MenuUnfoldOutlined
              onClick={() => {
                setVisible(true);
              }}
            />
          </span>
        </div>
      ) : null}
      <span className="text-white font-weight-bold h5 mb-0 text-container">
        MISLAOS.COM
      </span>
      <div className="d-inline-block my-2 ml-auto">
        <SelectLanguage />
      </div>
    </div>
  );
}

export default NavbarComponent;
