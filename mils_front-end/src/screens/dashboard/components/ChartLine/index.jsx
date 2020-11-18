import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DatePicker, Skeleton, Button } from "antd";
import dashBoardApi from "../../../../api/dashBoardApi";
import moment from "moment";
import { Line } from "react-chartjs-2";
import { messageError } from "../../../../components/MessageError";

export default function ChartLine(props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [listDate, setListDate] = useState([]);
  const [listDataDate, setListDataDate] = useState([]);
  const [dataDate, setDataDate] = useState(moment());

  useEffect(() => {
    const fetchDataChartLine = async (month, year) => {
      setLoading(true);
      return await dashBoardApi
        .GetChartDataHHMonthy({
          month: month,
          year: year,
        })
        .then((res) => {
          setLoading(false);
          setListDate(getDaysInMonth(month - 1, year));
          setListDataDate(
            getDaysInMonth(month - 1, year).map((ele) => {
              const objData = res.data.find(
                (el) => moment(el.CreatedDate).format("DD/MM") === ele
              );
              return (objData || {}).NumberInterview || 0;
            })
          );
        })
        .catch((error) => {
          setLoading(false);
          messageError({
            content: error,
            duration: 2,
          });
        });
    };
    fetchDataChartLine(
      Number(moment().format("MM")),
      Number(moment().format("YYYY"))
    );
  }, []);

  const fetchDataChartLine = async (month, year) => {
    return await dashBoardApi
      .GetChartDataHHMonthy({
        month: month,
        year: year,
      })
      .then((res) => {
        setListDate(getDaysInMonth(month - 1, year));
        setListDataDate(
          getDaysInMonth(month - 1, year).map((ele) => {
            const objData = res.data.find(
              (el) => moment(el.CreatedDate).format("DD/MM") === ele
            );
            return (objData || {}).NumberInterview || 0;
          })
        );
      })
      .catch((error) => {
        messageError({
          content: error,
          duration: 2,
        });
      });
  };

  const getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(moment(date).format("DD/MM"));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const roundNumber = (number) => {
    return Math.round(number * 10) / 10;
  };

  const optionsMonth = {
    annotation: {
      annotations: [
        {
          drawTime: "afterDatasetsDraw",
          borderColor: "red",
          borderDash: [2, 2],
          borderWidth: 2,
          mode: "vertical",
          type: "line",
          value: 10,
          scaleID: "x-axis-0",
          responsive: true,
          maintainAspectRatio: false,
          height: 200,
        },
      ],
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
    maintainAspectRation: false,
    plugins: {
      // Change options for ALL labels of THIS CHART
      datalabels: {
        color: "#36A2EB",
        align: "top",
        display: function (context) {
          return context.dataset.data[context.dataIndex] === 0 ? false : true; // display labels with an odd index
        },
        anchor: "end",
        formatter: function (value, context) {
          return roundNumber(context.dataset.data[context.dataIndex]);
        },
      },
    },
  };

  return (
    <div className="col-xl-7 col-lg-7 col-xm-12 col-12 mb-3 pointer">
      <div className="w-100 justify-content-end d-flex mb-2">
        <DatePicker
          picker="month"
          value={dataDate}
          format={"MM/YYYY"}
          onChange={(value) => {
            setDataDate(value);
          }}
          inputReadOnly={true}
          allowClear={false}
        />
        <Button
          type="primary"
          className="ml-2"
          onClick={(event) => {
            event.preventDefault();
            fetchDataChartLine(dataDate.format("MM"), dataDate.format("YYYY"));
          }}
        >
          {t("Get Data")}
        </Button>
      </div>
      <div className="card">
        <div className="card-body p-1 divToPDF">
          <Skeleton loading={loading} active>
            <Line
              height={103}
              data={{
                labels: listDate,
                datasets: [
                  {
                    data: listDataDate,
                    label: `${t("household_interview")}`,
                    borderColor: "#0747a6",
                    fill: false,
                    backgroundColor: "#0747a6",
                  },
                ],
              }}
              options={optionsMonth}
            />
            <div className="d-flex w-100 justify-content-center mt-1">
              {t("figure")} 1: {t("New household chart by month")}
            </div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
