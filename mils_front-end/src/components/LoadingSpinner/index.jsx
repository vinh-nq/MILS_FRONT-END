import React from "react";
import Loader from "react-loader-spinner";
import "./styles.scss";

export default function LoadingSpinner(props) {
  // const { colorSpinner } = props;
  return (
    <div className="loader-container d-flex flex-column justify-content-center align-items-center">
      <Loader
        type={"Oval"}
        color="#0747a6"
        height={70}
        width={70}
        style={{ opacity: "1 !important" }}
      />
      <span
        style={{ color: "#0747a6", fontSize: "15px", opacity: "1 !important" }}
        className="mt-3"
      >
        Loading ...
      </span>
    </div>
  );
}
