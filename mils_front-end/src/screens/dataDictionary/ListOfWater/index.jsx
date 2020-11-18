import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tooltip, Button, Divider, Table, Input } from "antd";
import {
  EditOutlined,
  // DeleteOutlined,
} from "@ant-design/icons";
import { getValueFromLink } from "../../../utils/getValueFromLink";
import { regexTemplate } from "../../../utils/regexTemplate";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Highlighter from "react-highlight-words";
import dataDictionaryApi from "../../../api/dataDictionaryApi";
import { PATH } from "../../../routers/Path";
import ModaItem from "./components/ModaItem";
import "./styles.scss";
import { messageError } from "../../../components/MessageError";

let timeOut = "";
export default function ListOfWater(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [keyword, setKeyword] = useState(null);
  const [page, setPage] = useState("1");
  const [checkLoading, setCheckLoading] = useState(false);
  const [listWallMetarial, setListWallMetarial] = useState([]);
  //Modal Items
  const [visileModal, setVisibleModal] = useState(false);
  const [typeModal, setTypeModal] = useState("add"); // add and edit
  const [objectEdit, setObjectEdit] = useState({});

  useEffect(() => {
    let pageCheck = getValueFromLink(props.location, "page");
    if (!regexTemplate.NUMBER.test(pageCheck)) {
      props.history.push(PATH.LIST_OF_WATER);
    } else {
      setPage(pageCheck);
    }
  }, [props.location, props.history]);

  useEffect(() => {
    return history.listen((location) => {
      if (`${location.pathname}${location.search}` === PATH.LIST_OF_WATER) {
        setKeyword("");
      }
    });
  }, [history]);

  useEffect(() => {
    setKeyword(getValueFromLink(props.location, "keyword", "STRING"));
    fetchDataProvince(props.location);
  }, [props.location]);

  const fetchDataProvince = async (location) => {
    setCheckLoading(true);
    await dataDictionaryApi
      .GetAllWater({
        keyword: getValueFromLink(location, "keyword", "STRING"),
      })
      .then((res) => {
        setCheckLoading(false);
        setListWallMetarial(res.data.Data);
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
      title: t("waterId"),
      dataIndex: "Id",
      key: "Id",
    },
    {
      title: t("waterLao"),
      dataIndex: "ValueOfLao",
      key: "ValueOfLao",
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
      title: t("waterEng"),
      dataIndex: "ValueOfEng",
      key: "ValueOfEng",
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
      width: "10%",
      render: (text, record) => (
        <div className="d-flex justify-content-end">
          <Tooltip placement="top" title={t("edit")}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              size={"small"}
              className="d-flex align-items-center justify-content-center mr-1"
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

  const onChangePage = (values) => {
    const value = keyword ? `keyword=${keyword}&` : "";
    props.history.push(`${PATH.LIST_OF_WATER}?${value}page=${values}`);
    setPage(values);
  };

  const onSearchChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setPage(1);
      const link = value ? `?keyword=${value}&page=1` : ``;
      props.history.push({
        pathName: PATH.LIST_OF_WATER,
        search: link,
      });
    }, 400);
  };

  return (
    <div className="w-100 h-100">
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="h5 mb-0">{t("LISTOFWATER")}</span>
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
        dataSource={listWallMetarial}
        columns={columns}
        style={{ overflow: "auto" }}
        rowKey="Id"
        size="small"
        pagination={{
          current: Number(page),
          pageSize: 12,
          total: listWallMetarial.length,
          onChange: (page) => {
            onChangePage(page);
          },
          showSizeChanger: false,
        }}
      />
      <ModaItem
        visible={visileModal}
        objectEdit={objectEdit}
        setVisible={setVisibleModal}
        typeModal={typeModal}
        arrayDuplicate={listWallMetarial.map((el) => `${el.Id}`)}
        reloadData={(keyword) => {
          history.push(`${PATH.LIST_OF_WATER}?keyword=${keyword}`);
        }}
      />
    </div>
  );
}
