import React, { useEffect, useState } from "react";
import { Tooltip, Button, Divider, Table, message, Input } from "antd";
import {
  ControlOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import roleManagementApi from "../../../api/roleManagementApi";
import Highlighter from "react-highlight-words";
import LoadingSpinner from "../../../components/LoadingSpinner";
import "./styles.scss";
import { PATH } from "../../../routers/Path";
import ModalRoleManagement from "./components/ModalRoleManagement";

export default function RoleManagement(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [keyword, setKeyword] = useState(null);
  const [listRole, setListRole] = useState([]);
  const [checkLoading, setCheckLoading] = useState(false);
  //Modal Role
  const [visileModal, setVisibleModal] = useState(false);
  const [typeModal, setTypeModal] = useState("add"); // add and edit
  const [objectEdit, setObjectEdit] = useState({});

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
      style: {
        display: "flex",
        flexDirection: "row",
      },
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
      // title: t("ACTION"),
      width: "10%",
      render: (text, record) => (
        <div className="d-flex justify-content-end">
          <Tooltip placement="top" title={t("edit permission")}>
            <Button
              type="default"
              icon={<ControlOutlined />}
              size={"small"}
              className="d-flex align-items-center justify-content-center mr-1"
              onClick={(event) => {
                history.push(
                  `${PATH.PERMISSIONS_MANAGEMENT}?roleID=${record.RoleId}`
                );
              }}
            />
          </Tooltip>
          <Tooltip placement="top" title={t("edit")}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              size={"small"}
              className="d-flex align-items-center justify-content-center ml-1"
              onClick={(event) => {
                setTypeModal("edit");
                setVisibleModal(true);
                setObjectEdit(record);
              }}
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
            onClick={() => {
              setTypeModal("add");
              setVisibleModal(true);
            }}
            className="d-flex align-items-center justify-content-center"
          >
            <i className="fas fa-plus mr-2"></i> {t("ADD")}
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
        rowKey="RoleId"
      />
      <ModalRoleManagement
        visible={visileModal}
        objectEdit={objectEdit}
        setVisible={setVisibleModal}
        typeModal={typeModal}
        fetchDataAllRole={fetchDataAllRole}
      />
    </div>
  );
}
