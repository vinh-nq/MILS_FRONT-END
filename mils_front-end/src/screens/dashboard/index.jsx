import React from "react";
// import { useTranslation } from "react-i18next";
// import { useHistory } from "react-router-dom";
import "./styles.scss";

export default function DashBoard(props) {
  // const { t } = useTranslation();
  return (
    <div className="row">
      <div className="col-xl-3 col-lg-3 col-xm-6 col-6 mb-3">
        <div
          className="w-100 container-box-dashboard d-flex flex-row align-items-center justify-content-between p-3"
          style={{ borderRadius: "4px" }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#89e6fb",
              borderRadius: "4px",
            }}
            className="p-3 d-flex justify-content-center align-items-center"
          >
            <i
              className="fas fa-address-card"
              style={{ fontSize: "25px", color: "#fff" }}
            />
          </div>
          <div className="d-flex flex-column align-items-end justify-content-center">
            <span style={{ fontSize: "15px" }}>Number Of Start</span>
            <span style={{ fontSize: "20px" }}>200</span>
          </div>
        </div>
      </div>
    </div>
  );
}
