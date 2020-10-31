import React, { useEffect } from "react";
import { Tooltip, Button, Divider, Table, message, Input, Tag } from "antd";
import {
  // DeleteOutlined,
  PlusSquareOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getValueFromLink } from "../../../utils/getValueFromLink";
import { regexTemplate } from "../../../utils/regexTemplate";
import functionManagementApi from "../../../api/functionManagementApi";
import Highlighter from "react-highlight-words";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { PATH } from "../../../routers/Path";
import { colorTagArray } from "../../../utils/colorTagArray";
import ModalFunctionManagement from "./components/ModalFunctionManagement";
import { useState } from "react";

let timeOut = "";
export default function RoleManagement(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const pageSize = 8;
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState("1");
  const [totalList, setTotalList] = useState(0);
  const [listFunction, setListFunction] = useState([]);
  const [listGroup, setListGroup] = useState([]);
  const [checkLoading, setCheckLoading] = useState(false);
  //Props Modal
  const [visileModal, setVisibleModal] = useState(false);
  const [typeModal, setTypeModal] = useState("add"); // add and edit
  const [objectEdit, setObjectEdit] = useState({});

  useEffect(() => {
    let pageCheck = getValueFromLink(props.location, "page");
    if (!regexTemplate.NUMBER.test(pageCheck)) {
      props.history.push(PATH.FUNCTION_LIST_MANAGEMENT);
    } else {
      setPage(pageCheck);
    }
  }, [props.location, props.history]);

  useEffect(() => {
    return history.listen((location) => {
      if (
        `${location.pathname}${location.search}` ===
        PATH.FUNCTION_LIST_MANAGEMENT
      ) {
        setKeyword("");
      }
    });
  }, [history]);

  useEffect(() => {
    setKeyword(getValueFromLink(props.location, "keyword", "STRING"));
    fetchDataAllFunction(props.location);
  }, [props.location]);

  const fetchDataAllFunction = async (location) => {
    setCheckLoading(true);
    await functionManagementApi
      .GetAllFunctionet({
        keyword: getValueFromLink(location, "keyword", "STRING"),
        pageNum: 1,
        pageSize: 1000,
      })
      .then((res) => {
        setListFunction(res.data.listOfObj);
        setListGroup([
          ...new Set(res.data.listOfObj.map((el) => el.GroupName.trim())),
        ]);
        setTotalList(res.data.Total);
        setCheckLoading(false);
      })
      .catch((error) => {
        setCheckLoading(false);
        message.error(error);
      });
  };

  const getLastNumber = (value) => {
    return [...`${value}`].slice(-1)[0];
  };

  const columns = [
    {
      title: t("FunctionCode"),
      dataIndex: "FunctionCode",
      key: "FunctionCode",
      render: (text) => <span style={{ fontWeight: "600" }}>{text}</span>,
    },
    {
      title: t("FunctionName"),
      dataIndex: "FunctionName",
      key: "FunctionName",
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
      title: t("GroupName"),
      dataIndex: "GroupName",
      key: "GroupName",
      render: (text) => (
        <Tag
          key={text}
          color={`${
            colorTagArray[
              getLastNumber(listGroup.findIndex((el) => el === text))
            ]
          }`}
          className="m-1"
        >
          {text}
        </Tag>
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
              onClick={(event) => {
                setTypeModal("edit");
                setVisibleModal(true);
                setObjectEdit(record);
              }}
            />
          </Tooltip>
          {/* <Tooltip placement="top" title={t("delete")}>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              size={"small"}
              danger
              className="d-flex align-items-center justify-content-center ml-1"
              onClick={(event) => {}}
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
      setPage(1);
      const link = value ? `?keyword=${value}&page=1` : ``;
      props.history.push({
        pathName: PATH.FUNCTION_LIST_MANAGEMENT,
        search: link,
      });
    }, 400);
  };

  const onChangePage = (values) => {
    const value = keyword ? `keyword=${keyword}&` : "";
    props.history.push(
      `${PATH.FUNCTION_LIST_MANAGEMENT}?${value}page=${values}`
    );
    setPage(values);
  };

  return (
    <div className="role-management-container">
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="h5 mb-0">{t("FUNCTION LIST MANAGEMENT")}</span>
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
      <div className="row">
        <div className="col-xl-3 col-lg-3 col-12 col-sm-6 d-flex flex-row align-items-center mb-3">
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
      </div>
      <Table
        dataSource={listFunction || []}
        columns={columns}
        style={{ overflow: "auto" }}
        pagination={{
          current: Number(page),
          pageSize: pageSize,
          total: totalList,
          onChange: (page) => {
            onChangePage(page);
          },
          showSizeChanger: false,
        }}
        rowKey="FunctionCode"
      />

      <ModalFunctionManagement
        visible={visileModal}
        objectEdit={objectEdit}
        setVisible={setVisibleModal}
        typeModal={typeModal}
        listFunctionCode={(listFunction || []).map((el) =>
          el.FunctionCode.trim().toLowerCase()
        )}
      />
    </div>
  );
}
