import React, { useEffect } from "react";
import { Tooltip, Button, Divider, Table, Input, Tag } from "antd";
import {
  // ControlOutlined,
  EditOutlined,
  // DeleteOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { getValueFromLink } from "../../../utils/getValueFromLink";
import userManagementApi from "../../../api/userManagementApi";
import Highlighter from "react-highlight-words";
import LoadingSpinner from "../../../components/LoadingSpinner";
import "./styles.scss";
import { useState } from "react";
import { PATH } from "../../../routers/Path";
import ModalUserManagement from "./components/ModalUserManagement";
import { messageError } from "../../../components/MessageError";

let timeOut = "";
export default function UserManagement(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [keyword, setKeyword] = useState(null);
  const [listUser, setListUser] = useState([]);
  const [checkLoading, setCheckLoading] = useState(false);
  //Modal User
  const [visileModal, setVisibleModal] = useState(false);
  const [typeModal, setTypeModal] = useState("add"); // add and edit
  const [objectEdit, setObjectEdit] = useState({});

  useEffect(() => {
    return history.listen((location) => {
      if (`${location.pathname}${location.search}` === PATH.USER_MANAGEMENT) {
        setKeyword("");
      }
    });
  }, [history]);

  useEffect(() => {
    const fetchDataAllUser = async () => {
      setCheckLoading(true);
      await userManagementApi
        .GetAllUser({
          keyword: getValueFromLink(props.location, "keyword", "STRING"),
        })
        .then((res) => {
          setCheckLoading(false);
          setListUser(res.data);
        })
        .catch((error) => {
          setCheckLoading(false);
          messageError({
            content: error,
            duration: 2,
          });
        });
    };
    setKeyword(getValueFromLink(props.location, "keyword", "STRING"));
    fetchDataAllUser(props.location);
  }, [props.location]);

  const fetchDataAllUserReload = async () => {
    setCheckLoading(true);
    await userManagementApi
      .GetAllUser({
        keyword: getValueFromLink(props.location, "keyword", "STRING"),
      })
      .then((res) => {
        setCheckLoading(false);
        setListUser(res.data);
      })
      .catch((error) => {
        setCheckLoading(false);
        messageError({
          content: error,
          duration: 2,
        });
      });
  };

  const columns = [
    {
      title: t("UserName"),
      dataIndex: "UserName",
      key: "UserName",
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
      title: t("FullName"),
      dataIndex: "FullName",
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
      title: t("Mobilephone"),
      dataIndex: "Mobilephone",
      key: "Mobilephone",
      render: (text) => (
        <div className="d-flex align-items-center">
          <i className="fas fa-phone-alt mr-2" style={{ color: "#40a720" }}></i>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: t("Email"),
      dataIndex: "Email",
      key: "Email",
      render: (text) => (
        <div className="d-flex align-items-center">
          <i
            className="fas fa-envelope-open-text mr-2"
            style={{ color: "blue" }}
          ></i>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: t("Active"),
      dataIndex: "Active",
      key: "Active",
      render: (text) => (
        <div className="d-flex align-items-center">
          {text === 1 ? (
            <Tag color="green">{t("ACTIVE")}</Tag>
          ) : (
            <Tag color="red">{t("DEACTIVE")}</Tag>
          )}
        </div>
      ),
    },
    {
      title: t("Enabled"),
      dataIndex: "Enabled",
      key: "Enabled",
      render: (text) => (
        <div className="d-flex align-items-center">
          {text === 1 ? (
            <Tag color="geekblue">{t("ENABLE")}</Tag>
          ) : (
            <Tag color="volcano">{t("DISABLE")}</Tag>
          )}
        </div>
      ),
    },
    {
      title: "",
      render: (text, record) => (
        <div className="d-flex justify-content-end">
          <Tooltip placement="top" title={t("edit")}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              size={"small"}
              className="d-flex align-items-center justify-content-center mr-2"
              onClick={(event) => {
                setTypeModal("edit");
                setVisibleModal(true);
                setObjectEdit(record.UserId);
              }}
            />
          </Tooltip>
          {/* <Tooltip placement="top" title={t("edit permission")}>
            <Button
              type="default"
              icon={<DeleteOutlined />}
              size={"small"}
              className="d-flex align-items-center justify-content-center"
              onClick={(event) => {
                history.push(
                  `${PATH.PERMISSIONS_MANAGEMENT}?roleID=${record.RoleId}`
                );
              }}
            />
          </Tooltip> */}
        </div>
      ),
    },
  ];

  const onSearchChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      // setPage(1);
      const link = value ? `?keyword=${value}` : ``;
      props.history.push({
        pathName: PATH.USER_MANAGEMENT,
        search: link,
      });
    }, 400);
  };

  return (
    <div className="role-management-container">
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="h5 mb-0">{t("USER MANAGEMENT")}</span>
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
          onChange={onSearchChange}
          value={keyword}
        />
      </div>
      <Table
        dataSource={listUser || []}
        columns={columns}
        style={{ overflow: "auto" }}
        rowKey="UserId"
        size="small"
      />
      <ModalUserManagement
        visible={visileModal}
        setCheckLoading={setCheckLoading}
        setVisible={setVisibleModal}
        typeModal={typeModal}
        fetchDataAllUser={fetchDataAllUserReload}
        idOject={objectEdit}
        listFunctionUserName={(listUser || []).map((el) => el.UserName)}
        listFunctionUserId={(listUser || []).map((el) => `${el.UserId}`)}
      />
    </div>
  );
}
