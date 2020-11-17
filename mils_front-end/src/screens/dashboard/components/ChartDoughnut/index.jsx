import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Tag, Skeleton, Button, message } from "antd";
import { Doughnut } from "react-chartjs-2";
import CascaderFilter from "./components/CascaderFilter";
import dashBoardApi from "../../../../api/dashBoardApi";
import { useState } from "react";

export default function ChartDoughnut(props) {
  const { t } = useTranslation();
  const [valueLocation, setValueLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [valueChart, setValueChart] = useState({
    Higher: 0,
    Lower: 0,
    Total: 0,
  });

  useEffect(() => {
    const fetchDataChartLine = async () => {
      setLoading(true);
      return await dashBoardApi
        .GetChartDataOfPMT({
          keyword: "",
        })
        .then((res) => {
          setLoading(false);
          setValueChart(res.data);
        });
    };
    fetchDataChartLine();
  }, []);

  const fetchDataChartLine = async (keyword) => {
    setLoading(true);
    return await dashBoardApi
      .GetChartDataOfPMT({
        keyword: keyword,
      })
      .then((res) => {
        setLoading(false);
        setValueChart(res.data);
      });
  };

  //Click To Select ID Fetch Data Approved HouseHold
  const genderDataHH = () => {
    if (!valueLocation || valueLocation.length === 0) {
      message.error("Please select Province/ Disytrict/ Village!");
      return;
    }
    switch (valueLocation.length) {
      case 1:
        //Case Province
        fetchDataChartLine(valueLocation[0]);
        break;
      case 2:
        //Case District
        fetchDataChartLine(valueLocation[1]);
        break;
      case 3:
        //Case Village
        fetchDataChartLine(valueLocation[2]);
        break;
      default:
        break;
    }
  };

  return (
    <div className="col-xl-5 col-lg-5 col-xm-12 col-12 mb-3 pointer">
      <div className="card">
        <div className="card-body p-1">
          <div className="w-100 d-flex justify-content-center mb-4">
            <span>{t("PMT Score Structure Chart")}</span>
          </div>
          <div className="w-100 justify-content-end d-flex mb-2">
            <CascaderFilter
              valueLocation={valueLocation}
              setValueLocation={setValueLocation}
            />
            <Button
              className="ml-2"
              type="primary"
              onClick={() => {
                genderDataHH();
              }}
            >
              {t("Get Data")}
            </Button>
          </div>
          <Skeleton loading={loading} active>
            <div className="row">
              <div className="col-lg-9 col-12">
                <Doughnut
                  height={154}
                  data={{
                    labels: [`${t("High_Score")}`, `${t("Low_Score")}`],
                    datasets: [
                      {
                        backgroundColor: ["#F97A7A", "#1890FF"],
                        data: [valueChart.Higher, valueChart.Lower],
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      datalabels: {
                        color: "#36A2EB",
                        align: "top",
                        display: false,
                      },
                    },
                  }}
                />
                <div className="d-flex w-100 justify-content-center mt-1">
                  {t("figure")} 2: {t("PMT Score Structure Chart")}
                </div>
              </div>
              <div
                className="col-lg-3 col-12 mt-2"
                style={{ borderLeft: "1px solid #d8d8d8" }}
              >
                <div className="d-flex flex-column h-100 w-100 mt-2">
                  <div className="d-flex justify-content-start">
                    {t("High_Score")}
                  </div>
                  <div className="d-flex justify-content-end">
                    <Tag color="#F97A7A">{valueChart.Higher}</Tag>
                  </div>
                  <div className="d-flex justify-content-start mt-2">
                    {t("Low_Score")}
                  </div>
                  <div className="d-flex justify-content-end">
                    <Tag color="#1890FF">{valueChart.Lower}</Tag>
                  </div>
                  <div className="d-flex justify-content-start mt-2">
                    {t("Total")}
                  </div>
                  <div className="d-flex justify-content-end">
                    <Tag color="#F97A7A">{valueChart.Total}</Tag>
                  </div>
                </div>
              </div>
            </div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
