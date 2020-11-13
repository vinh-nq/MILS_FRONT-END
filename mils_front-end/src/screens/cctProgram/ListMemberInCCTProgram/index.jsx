import React, { useState } from "react";
import { Tooltip, Button, Divider, Table, Input, message, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Highlighter from "react-highlight-words";
import LoadingSpinner from "../../../components/LoadingSpinner";
import houseHoldApi from "../../../api/houseHoldApi";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { PATH } from "../../../routers/Path";
import { getValueFromLink } from "../../../utils/getValueFromLink";
import { regexTemplate } from "../../../utils/regexTemplate";
import ModalMemberCCTProgram from "./components/ModalMemberCCTProgram";

let timeOut = "";
export default function ListMemberInCCTProgram(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [keyword, setKeyword] = useState(null);
  const [listMemberCCT, setListMemberCCT] = useState([]);
  const [checkLoading, setCheckLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(1);
  //Modal Member
  const [visileModal, setVisibleModal] = useState(false);
  const [objectValue, setObjectValue] = useState({});

  useEffect(() => {
    let pageCheck = getValueFromLink(props.location, "page");
    if (!regexTemplate.NUMBER.test(pageCheck)) {
      props.history.push(PATH.LIST_OF_CCT_MEMBER);
    } else {
      setPage(pageCheck);
    }
  }, [props.location, props.history]);

  useEffect(() => {
    return history.listen((location) => {
      if (
        `${location.pathname}${location.search}` ===
        PATH.LIST_OF_CCT_MEMBER
      ) {
        setKeyword("");
      }
    });
  }, [history]);

  useEffect(() => {
    setKeyword(getValueFromLink(props.location, "keyword", "STRING"));
    fetchDataCCTMember(props.location);
  }, [props.location]);

  const fetchDataCCTMember = async (location) => {
    setCheckLoading(true);
    return await houseHoldApi
      .getAllMemberInCCTProgram({
        keyword: getValueFromLink(location, "keyword", "STRING"),
        pageNum: getValueFromLink(location, "page", "STRING"),
        pageSize: 10,
      })
      .then((res) => {
        setCheckLoading(false);
        setListMemberCCT(res.data.listOfObj);
        setTotalItem(res.data.Total);
      })
      .catch((e) => {
        setCheckLoading(false);
        message.error(e.message);
      });
  };

  const columns = [
    {
      title: t("ID"),
      dataIndex: "cct_member_id",
      key: "cct_member_id",
      render: (text) => (
        <div className="d-flex align-items-center">
          <span style={{ fontWeight: "600" }}>{text}</span>
        </div>
      ),
    },
    {
      title: t("card_number"),
      dataIndex: "card_number",
      key: "card_number",
      render: (text) => (
        <div className="d-flex align-items-center">
          <i
            className="fas fa-address-card mr-2"
            style={{ color: "#a2a6b7" }}
          />
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
      title: t("cct_member_name"),
      dataIndex: "cct_member_name",
      key: "cct_member_name",
      render: (text) => (
        <div className="d-flex align-items-center">
          <i className="far fa-user mr-2" style={{ color: "#a2a6b7" }} />
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
      title: t("created_date"),
      dataIndex: "created_date",
      key: "created_date",
      render: (text) => (
        <div className="d-flex align-items-center">
          <i
            className="fas fa-hourglass-start mr-2"
            style={{ color: "#a2a6b7" }}
          ></i>
          <span style={{ fontSize: "12px" }}>
            {moment(text).format("DD/MM/YYYY")}
          </span>
        </div>
      ),
    },
    {
      title: t("expire_date"),
      dataIndex: "expire_date",
      key: "expire_date",
      render: (text) => (
        <div className="d-flex align-items-center">
          {text ? (
            <>
              <i
                className="fas fa-hourglass-end mr-2"
                style={{ color: "#a2a6b7" }}
              ></i>
              <span style={{ fontSize: "12px" }}>
                {moment(text).format("DD/MM/YYYY")}
              </span>
            </>
          ) : null}
        </div>
      ),
    },
    {
      title: t("active"),
      dataIndex: "active",
      key: "active",
      render: (text) => (
        <div className="d-flex align-items-center">
          {text ? (
            <Tag color="green">{t("active")}</Tag>
          ) : (
            <Tag color="red">{t("deactive")}</Tag>
          )}
        </div>
      ),
    },
    {
      title: "",
      render: (text, record) => (
        <div className="d-flex justify-content-end">
          <Tooltip placement="top" title={t("Edit Member")}>
            <Button
              style={{ color: "#3d9aff", border: "1px solid #3d9aff" }}
              icon={<EditOutlined />}
              size={"small"}
              className="d-flex align-items-center justify-content-center mr-2"
              onClick={(event) => {
                setObjectValue(record);
                setVisibleModal(true);
              }}
            />
          </Tooltip>
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
        pathName: PATH.LIST_OF_CCT_MEMBER,
        search: link,
      });
    }, 400);
  };

  const handlePageChange = (values) => {
    const value = keyword ? `keyword=${keyword}&` : "";
    props.history.push(
      `${PATH.LIST_OF_CCT_MEMBER}?${value}page=${values}`
    );
    setPage(values);
  };

  return (
    <div className="role-management-container">
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="h5 mb-0">{t("LISTOFCCTMEMBER")}</span>
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
        dataSource={listMemberCCT || []}
        columns={columns}
        style={{ overflow: "auto" }}
        rowKey="cct_member_id"
        size="small"
        pagination={{
          current: Number(page),
          pageSize: 12,
          total: totalItem,
          onChange: (value) => {
            handlePageChange(value);
          },
          showSizeChanger: false,
        }}
      />
      <ModalMemberCCTProgram
        visible={visileModal}
        setVisible={setVisibleModal}
        objectEdit={objectValue}
      />
    </div>
  );
}
