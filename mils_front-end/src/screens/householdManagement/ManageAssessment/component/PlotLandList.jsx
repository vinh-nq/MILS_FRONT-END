import { Modal, Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function PlotLandList(props) {
  const { visiblePlotLand, setVisiblePlotLand, plotLandInHouseHold } = props;

  const { t } = useTranslation();

  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  const columns = [
    {
      title: t("ITEM"),
      dataIndex: "index",
      key: "index",
      render: (data, record, index) => index + 1,
    },
    {
      title: t("NAME_OF_PLOT"),
      dataIndex: "NameOfPlot",
      key: "NameOfPlot ",
      render: (data) => <div style={{ minWidth: 120 }}>{data}</div>,
    },
    {
      title: t("NO_OF_PLOT"),
      dataIndex: "NoOfPlot",
      key: "NoOfPlot",
      render: (data) => <div style={{ minWidth: 60 }}>{data}</div>,
    },
    {
      title: t("OWNED_OR_LEASED"),
      dataIndex: "OwnedOrLeased",
      key: "OwnedOrLeased",
      render: (data, record) => (
        <div style={{ minWidth: 120 }}>
          {dataLanguage === "la"
            ? record.OwnedOrLeased
            : record.OwnedOrLeasedEng}
        </div>
      ),
    },
    {
      title: t("KIND_OF_LAND"),
      dataIndex: "kindOfLand",
      key: "kindOfLand",
      render: (data, record) => (
        <div style={{ minWidth: 150 }}>
          {dataLanguage === "la" ? record.KindOfLand : record.KindOfLandEng}
        </div>
      ),
    },
    {
      title: t("CAUSE_OF_PLOT"),
      dataIndex: "CauseOfPlot",
      key: "CauseOfPlot",
      render: (data, record) => (
        <div style={{ minWidth: 120 }}>
          {dataLanguage === "la" ? record.CauseOfPlot : record.CauseOfPlotEng}
        </div>
      ),
    },
    {
      title: t("TYPE_OF_LAND"),
      dataIndex: "TypeOfLand",
      key: "TypeOfLand",
      render: (data, record) => (
        <div style={{ minWidth: 120 }}>
          {dataLanguage === "la" ? record.TypeOfLand : record.TypeOfLandEng}
        </div>
      ),
    },
  ];

  return (
    <Modal
      title={t("PLOT_LAND_LIST")}
      visible={visiblePlotLand}
      onOk={() => {}}
      onCancel={() => {
        setVisiblePlotLand(false);
      }}
      width={"80%"}
      footer={null}
    >
      <Table
        columns={columns}
        dataSource={plotLandInHouseHold}
        pagination={{ hideOnSinglePage: true }}
        style={{ overflowX: "auto", overflowY: "hidden" }}
        rowKey="PlotLandId"
      />
    </Modal>
  );
}

export default PlotLandList;
