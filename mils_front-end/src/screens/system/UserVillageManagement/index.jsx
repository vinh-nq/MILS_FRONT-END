import React, { useEffect, useState } from "react";
import { Tooltip, Button, Divider, Table, message, Input, Modal } from "antd";
import {
  PlusSquareOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import userVillageApi from "../../../api/userVillageApi";
import Highlighter from "react-highlight-words";
import LoadingSpinner from "../../../components/LoadingSpinner";
import "./styles.scss";
import ModalUserVillage from "./components/ModalUserVillage";
import { useSelector } from "react-redux";

export default function UserVillageManagement(props) {
  const { t } = useTranslation();
  const { confirm } = Modal;
  const [keyword, setKeyword] = useState(null);
  const [listUserVillage, setListUserVillage] = useState([]);
  const [checkLoading, setCheckLoading] = useState(false);
  //Modal Role
  const [visileModal, setVisibleModal] = useState(false);
  const [typeModal, setTypeModal] = useState("add"); // add and edit
  const [objectEdit, setObjectEdit] = useState({});
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    fetchDataAllRole();
  }, []);

  const fetchDataAllRole = async () => {
    setCheckLoading(true);
    await userVillageApi
      .GetAll({
        keyword: null,
      })
      .then((res) => {
        setCheckLoading(false);
        setListUserVillage(res.data.Data);
      })
      .catch((error) => {
        setCheckLoading(false);
        message.error(error);
      });
  };

  const columns = [
    {
      title: t("UserName"),
      dataIndex: "UserName",
      key: "UserName",
    },
    {
      title: t("FullName"),
      dataIndex: "FullName",
      style: {
        display: "flex",
        flexDirection: "row",
      },
      key: "FullName",
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
      title: t("villageLa"),
      dataIndex: "village_id",
      key: "village_id",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          {dataLanguage === "la" ? record.villname : record.villnameeng}
        </div>
      ),
    },
    {
      // title: t("ACTION"),
      width: "10%",
      render: (text, record) => (
        <div className="d-flex justify-content-end">
          <Tooltip placement="top" title={t("Description")}>
            <Button
              type="primary"
              icon={<InfoCircleOutlined />}
              size={"small"}
              className="d-flex align-items-center justify-content-center ml-1"
              onClick={(event) => {
                setTypeModal("edit");
                setVisibleModal(true);
                setObjectEdit(record);
              }}
            />
          </Tooltip>
          <Tooltip placement="top" title={t("delete")}>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              size={"small"}
              className="d-flex align-items-center justify-content-center ml-1"
              onClick={(event) => {
                confirm({
                  title: "Do you Want to delete these items?",
                  icon: <ExclamationCircleOutlined />,
                  content: "Delete Item",
                  onOk() {
                    deleteRow(record.Id);
                  },
                  onCancel() {},
                });
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const deleteRow = async (id) => {
    await userVillageApi
      .Delete(
        {
          Id: id,
        },
        `Delete Item (ID : ${id}) In List User Village`
      )
      .then((res) => {
        fetchDataAllRole();
        message.success("Delete Success");
      });
  };

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
        <span className="h5 mb-0">{t("USERVILLAGE")}</span>
        <Tooltip placement="bottom" title={t("ADD")}>
          <Button
            type="primary"
            onClick={() => {
              setTypeModal("add");
              setVisibleModal(true);
            }}
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
        dataSource={filterDataTale(listUserVillage || [])}
        columns={columns}
        style={{ overflow: "auto" }}
        rowKey="Id"
      />
      <ModalUserVillage
        visible={visileModal}
        objectEdit={objectEdit}
        setVisible={setVisibleModal}
        typeModal={typeModal}
        fetchDataAllRole={fetchDataAllRole}
      />
    </div>
  );
}
