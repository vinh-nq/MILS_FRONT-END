import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
// import { useHistory } from "react-router-dom";
import { Divider } from "antd";
import ChartLine from "./components/ChartLine";
import ChartDoughnut from "./components/ChartDoughnut";
import dashBoardApi from "../../api/dashBoardApi";
import "./styles.scss";
import { useEffect } from "react";
import { messageError } from "../../components/MessageError";

export default function DashBoard(props) {
  const { t } = useTranslation();
  const [arrayDashboard, setArrayDashboard] = useState([
    {
      id: 1,
      title: "Total Forms",
      value: 0,
      color: "#89e6fb",
      icon: "fas fa-address-card",
    },
    {
      id: 2,
      title: "Total Approved",
      value: 0,
      color: "#96ef3e",
      icon: "fas fa-user-check",
    },
    {
      id: 3,
      title: "Total Rejected",
      value: 0,
      color: "#FA8072",
      icon: "fas fa-user-times",
    },
    {
      id: 4,
      title: "Total Pending",
      value: 0,
      color: "#ffe10b",
      icon: "fas fa-user-clock",
    },
    {
      id: 5,
      title: "Total Daily Form",
      value: 0,
      color: "#cf89fb",
      icon: "fas fa-clipboard-list",
    },
    {
      id: 6,
      title: "Daily Form Submissions",
      value: 0,
      color: "#9fc5fd",
      icon: "fab fa-wpforms",
    },
    {
      id: 7,
      title: "Beneficiary Segreggations",
      value: 0,
      color: "#1890ff",
      icon: "fas fa-user-shield",
    },
  ]);

  useEffect(() => {
    const fetchDataDashboard = async () => {
      return await dashBoardApi
        .CountHH({})
        .then((res) => {
          setArrayDashboard((arrayDashboard) => {
            return arrayDashboard.map((el) => {
              if (el.id === 1) {
                return {
                  ...el,
                  value: res.data,
                };
              }
              return el;
            });
          });
        })
        .catch((error) => {
          messageError({
            content: error,
            duration: 2,
          });
        });
    };
    fetchDataDashboard();
  }, []);

  return (
    <>
      <Divider orientation="left">{t("Static")}</Divider>
      <div className="row">
        {arrayDashboard.map((el) => (
          <div
            className="col-xl-3 col-lg-4 col-xm-6 col-6 mb-3 pointer"
            key={el.id}
          >
            <div
              className="w-100 container-box-dashboard d-flex flex-row align-items-center justify-content-between p-3"
              style={{ borderRadius: "4px" }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: el.color,
                  borderRadius: "4px",
                }}
                className="p-3 d-flex justify-content-center align-items-center"
              >
                <i
                  className={el.icon}
                  style={{ fontSize: "25px", color: "#fff" }}
                />
              </div>
              <div className="d-flex flex-column align-items-end justify-content-center">
                <span style={{ fontSize: "15px", textAlign: "end" }}>
                  {t(el.title)}
                </span>
                <CountUp
                  start={0}
                  end={el.value}
                  duration={2}
                  separator=","
                  style={{ fontSize: "22px" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Divider orientation="left">{t("Chart")}</Divider>
      <div className="row mt-3">
        <ChartLine />
        <ChartDoughnut />
      </div>
    </>
  );
}
