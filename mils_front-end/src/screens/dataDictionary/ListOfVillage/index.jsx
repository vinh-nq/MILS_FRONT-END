import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tooltip, Button, Divider, Table, Input, Select } from "antd";
import { PlusSquareOutlined, EditOutlined } from "@ant-design/icons";
import { getValueFromLink } from "../../../utils/getValueFromLink";
import { regexTemplate } from "../../../utils/regexTemplate";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Highlighter from "react-highlight-words";
import dataDictionaryApi from "../../../api/dataDictionaryApi";
import houseHoldApi from "../../../api/houseHoldApi";
import { PATH } from "../../../routers/Path";
import { useSelector } from "react-redux";
import ModaItem from "./components/ModaItem";
import "./styles.scss";

let timeOut = "";
export default function ListOfVillage(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [keyword, setKeyword] = useState(null);
  const [page, setPage] = useState("1");
  const [checkLoading, setCheckLoading] = useState(false);
  const [listProvince, setListProvince] = useState([]);
  const [listVillage, setListVillage] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [checkDistrict, setCheckDistrict] = useState(true);
  const [idProvince, setIDProvince] = useState(null);
  const [idDistrict, setIDDistrict] = useState(null);
  //Modal Items
  const [visileModal, setVisibleModal] = useState(false);
  const [typeModal, setTypeModal] = useState("add"); // add and edit
  const [objectEdit, setObjectEdit] = useState({});
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    let pageCheck = getValueFromLink(props.location, "page");
    if (!regexTemplate.NUMBER.test(pageCheck)) {
      props.history.push(PATH.LIST_OF_VILLAGE);
    } else {
      setPage(pageCheck);
    }
  }, [props.location, props.history]);

  useEffect(() => {
    return history.listen((location) => {
      if (`${location.pathname}${location.search}` === PATH.LIST_OF_VILLAGE) {
        setKeyword("");
      }
    });
  }, [history]);

  useEffect(() => {
    const fetchDataAll = async (location) => {
      setCheckLoading(true);
      await Promise.all([GetAllVillage(location), fetchDataProvince()]).then(
        ([resVilla, resProvince]) => {
          setCheckLoading(false);
          setListVillage(resVilla.data.Data);
          setListProvince(resProvince.data.Data);
        }
      );
    };
    const GetAllVillage = (location) => {
      return dataDictionaryApi.GetAllVillage({
        keyword: getValueFromLink(location, "keyword", "STRING"),
      });
    };
    const fetchDataProvince = () => {
      return dataDictionaryApi.GetAllProvince({
        keyword: null,
      });
    };
    setKeyword(getValueFromLink(props.location, "keyword", "STRING"));
    fetchDataAll(props.location);
  }, [props.location]);

  const fetchDataDistrict = async (idProvince) => {
    setCheckDistrict(true);
    await houseHoldApi
      .getAllDistrict({
        provinceId: idProvince,
      })
      .then((res) => {
        setCheckDistrict(false);
        setListDistrict(res.data.Data);
      });
  };

  const columns = [
    {
      title: t("villageId"),
      dataIndex: "Id",
      key: "Id",
    },
    {
      title: t("villageLa"),
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
      title: t("villageEn"),
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
          {/* <Tooltip placement="top" title={t("delete")}>
            <Button
              type="default"
              icon={<DeleteOutlined />}
              size={"small"}
              className="d-flex align-items-center justify-content-center ml-1"
              onClick={(event) => {
                // history.push(
                //   `${PATH.PERMISSIONS_MANAGEMENT}?roleID=${record.RoleId}`
                // );
              }}
            />
          </Tooltip> */}
        </div>
      ),
    },
  ];

  const onChangePage = (values) => {
    const value = keyword ? `keyword=${keyword}&` : "";
    props.history.push(`${PATH.LIST_OF_VILLAGE}?${value}page=${values}`);
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
        pathName: PATH.LIST_OF_VILLAGE,
        search: link,
      });
    }, 400);
  };

  const filterProvince = (array) => {
    if (idDistrict) {
      return array.filter((el) => el.Id.substr(0, 4) === `${idDistrict}`);
    }
    if (idProvince) {
      return array.filter((el) => el.Id.substr(0, 2) === `${idProvince}`);
    }
    return array;
  };

  return (
    <div className="w-100 h-100">
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="h5 mb-0">{t("LIST OF VILLAGE")}</span>
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
        <div className="col-xl-4 col-lg-4 col-sm-6 col-12 d-flex flex-row align-items-center mb-3">
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
        <div className="col-xl-4 col-lg-4 col-sm-6 col-12 d-flex flex-row align-items-center mb-3">
          <span className="mr-2 ml-2">{t("FILTER_PROVINCE")}</span>
          <Select
            placeholder="Select province"
            style={{ width: "160px" }}
            onSelect={(value) => {
              setPage(1);
              setIDProvince(value);
              setIDDistrict(null);
              setListDistrict([]);
              fetchDataDistrict(value);
            }}
            onClear={() => {
              setPage(1);
              setIDProvince(null);
              setIDDistrict(null);
              setListDistrict([]);
              setCheckDistrict(true);
            }}
            allowClear
          >
            {listProvince.map((el) => (
              <Select.Option value={el.Id} key={el.Id}>
                {dataLanguage === "la" ? el.ValueOfLao : el.ValueOfEng}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="col-xl-4 col-lg-4 col-sm-6 col-12 d-flex flex-row align-items-center mb-3">
          <span className="mr-2 ml-2">{t("FILTER_DISTRICT")}</span>
          <Select
            placeholder="Select district"
            style={{ width: "160px" }}
            onSelect={(value) => {
              setPage(1);
              setIDDistrict(value);
            }}
            onClear={() => {
              setPage(1);
              setIDDistrict(null);
            }}
            allowClear
            disabled={checkDistrict}
            value={idDistrict}
          >
            {listDistrict.map((el) => (
              <Select.Option value={el.DistrictId} key={el.DistrictId}>
                {dataLanguage === "la" ? el.DistrictName : el.DistrictNameEng}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <Table
        dataSource={filterProvince(listVillage || [])}
        columns={columns}
        style={{ overflow: "auto" }}
        rowKey="Id"
        pagination={{
          current: Number(page),
          pageSize: 8,
          total: filterProvince(listVillage || []).length,
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
        arrayDuplicate={listVillage.map((el) => `${el.Id}`)}
        reloadData={(keyword) => {
          history.push(`${PATH.LIST_OF_VILLAGE}?keyword=${keyword}`);
        }}
      />
    </div>
  );
}
