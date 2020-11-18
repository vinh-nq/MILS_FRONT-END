import React, { useEffect, useState } from "react";
import { Divider, Input, Table } from "antd";
import { useTranslation } from "react-i18next";
import systemManagementApi from "../../../api/systemManagementApi";
import { messageError } from "../../../components/MessageError";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Highlighter from "react-highlight-words";

export default function SystemParameters(props) {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState(null);
  const [checkLoading, setCheckLoading] = useState(false);
  const [arraySystemParameter, setArraySystemParameter] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(1);

  useEffect(() => {
    const fetchDataSystemParameter = async () => {
      setCheckLoading(true);
      return await systemManagementApi
        .GetSystemParameters({})
        .then((res) => {
          setCheckLoading(false);
          setArraySystemParameter(res.data.Data);
          setTotalItem(res.data.Data.length);
          console.log(res.data.Data);
        })
        .catch((error) => {
          setCheckLoading(false);
          messageError({
            content: error,
            duration: 2,
          });
        });
    };
    fetchDataSystemParameter();
  }, []);

  const columns = [
    {
      title: t("ParaId"),
      dataIndex: "ParaId",
      key: "ParaId",
    },
    {
      title: t("ParaCode"),
      dataIndex: "ParaCode",
      key: "ParaCode",
      render: (text) => (
        <div className="d-flex align-items-center">
          <Highlighter
            highlightStyle={{ backgroundColor: "#96e0f7", padding: 0 }}
            searchWords={[keyword]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        </div>
      ),
    },
    {
      title: t("ParaName"),
      dataIndex: "ParaName",
      key: "ParaName",
    },
    {
      title: t("ParaNameEng"),
      dataIndex: "ParaNameEng",
      key: "ParaNameEng",
    },
    {
      title: t("ParaValue"),
      dataIndex: "ParaValue",
      render: (text) => (
        <div className="d-flex align-items-center">
          <Highlighter
            highlightStyle={{ backgroundColor: "#96e0f7", padding: 0 }}
            searchWords={[keyword]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        </div>
      ),
    },
  ];

  const filterDataTale = (arrayData) => {
    let arraySearch = arrayData;
    if (keyword && keyword !== "") {
      arraySearch = arrayData.filter(
        (el) =>
          el.ParaCode.toLowerCase().indexOf(keyword.trim().toLowerCase()) >=
            0 ||
          el.ParaValue.toLowerCase().indexOf(keyword.trim().toLowerCase()) >=
            0 ||
          el.ParaName.toLowerCase().indexOf(keyword.trim().toLowerCase()) >= 0
      );
    }
    return arraySearch;
  };

  return (
    <div className="w-100 h-100">
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="h5 mb-0">{t("SYSTEMPARAMETERS")}</span>
      </div>
      <Divider />
      <div className="d-flex flex-row align-items-center mb-3">
        <span className="mr-2">{t("SEARCH")}</span>
        <Input
          id="demo-foo-search"
          type="text"
          placeholder={t("PLEASE_INPUT_KEYWORD")}
          style={{ width: "200px" }}
          allowClear
          onChange={(event) => {
            setKeyword(event.target.value);
          }}
          value={keyword}
        />
      </div>
      <Table
        dataSource={filterDataTale(arraySystemParameter || [])}
        columns={columns}
        style={{ overflow: "auto" }}
        rowKey="ParaId"
        size="small"
        pagination={{
          current: Number(page),
          pageSize: 10,
          total: totalItem,
          onChange: (value) => {
            setPage(value);
          },
          showSizeChanger: false,
        }}
      />
    </div>
  );
}
