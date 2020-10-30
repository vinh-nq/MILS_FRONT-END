import React, { useEffect } from "react";
import { Tooltip, Button, Divider, Table, message, Input } from "antd";
import {
  DeleteOutlined,
  PlusSquareOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
// import { useHistory } from "react-router-dom";
import roleManagementApi from "../../../api/roleManagementApi";
import Highlighter from "react-highlight-words";
import LoadingSpinner from "../../../components/LoadingSpinner";
import "./styles.scss";
import { useState } from "react";

export default function RoleManagement(props) {
  const { t } = useTranslation();
  // const history = useHistory();
  const [keyword, setKeyword] = useState(null);
  const [listRole, setListRole] = useState([]);
  const [checkLoading, setCheckLoading] = useState(false);

  useEffect(() => {
    fetchDataAllRole();
  }, []);

  const fetchDataAllRole = async () => {
    setCheckLoading(true);
    await roleManagementApi
      .GetAllRole({})
      .then((res) => {
        setCheckLoading(false);
        setListRole(res.data);
      })
      .catch((error) => {
        setCheckLoading(false);
        message.error(error);
      });
  };

  const columns = [
    {
      title: t("ROLE_ID"),
      dataIndex: "RoleId",
      key: "RoleId",
    },
    {
      title: t("ROLE_NAME"),
      dataIndex: "RoleName",
      key: "RoleName",
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
      title: t("ACTION"),
      render: (text, record) => (
        <div className="d-flex justify-content-start">
          <Tooltip placement="top" title={t("edit")}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              size={"small"}
              className="d-flex align-items-center justify-content-center ml-1"
              onClick={(event) => {}}
            />
          </Tooltip>
          <Tooltip placement="top" title={t("delete")}>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              size={"small"}
              danger
              className="d-flex align-items-center justify-content-center ml-1"
              onClick={(event) => {}}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const filterDataTale = (arrayData) => {
    let arraySearch = arrayData;
    if (keyword && keyword !== "") {
      arraySearch = arrayData.filter(
        (el) =>
          el.RoleName.toLowerCase().indexOf(keyword.trim().toLowerCase()) >= 0
      );
    }
    return arraySearch;
  };

  return (
    <div className="role-management-container">
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="h5 mb-0">{t("ROLE MANAGEMENT")}</span>
        <Tooltip placement="bottom" title={t("ADD")}>
          <Button
            type="primary"
            onClick={() => {}}
            className="d-flex align-items-center justify-content-center"
          >
            <PlusSquareOutlined className="font-20" />
          </Button>
        </Tooltip>
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
        dataSource={filterDataTale(listRole || [])}
        columns={columns}
        style={{ overflow: "auto" }}
      />
    </div>
  );
}
