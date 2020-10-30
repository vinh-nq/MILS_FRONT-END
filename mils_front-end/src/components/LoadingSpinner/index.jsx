import React from "react";
import Loader from "react-loader-spinner";
import "./styles.scss";

export default function LoadingSpinner(props) {
  const { typeSpinner, colorSpinner } = props;
  return (
    <div className="loader-container">
      <div className="loader-container--content">
        <Loader type={typeSpinner} color={colorSpinner} height={100} width={100} />
      </div>
    </div>
  );
}
