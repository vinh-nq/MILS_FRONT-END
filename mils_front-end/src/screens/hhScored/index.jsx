import React, { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Button, Col, Input, Row, Select, Table, Tag, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import householdScoreApi from "../../api/householdScoreApi";
import { useHistory } from "react-router-dom";
import "./style.scss";

import GenerateDataComponent from "./component/GenerateDataComponent";
import houseHoldApi from "../../api/houseHoldApi";
import { getValueOfQueryParams } from "../../utils/getValueOfQueryParams";
import {PATH} from "../../routers/Path";

function HouseholdScore(props) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [village, setVillage] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [showGenerate, setGenerate] = useState(false);
  const { t } = useTranslation();
  const { Text } = Typography;
  const { Option } = Select;
  const [page, setPage] = useState(1);
  const history = useHistory();

  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  const compare = (a, b) => {
    if (a.PMTScored < b.PMTScored) {
      return -1;
    }
    if (a.PMTScored > b.PMTScored) {
      return 1;
    }
    return 0;
  };

  const getDataFromUrl = useCallback(() => {
    const provinceId = getValueOfQueryParams(
      history.location,
      "provinceId",
      "STRING"
    );
    const districtId = getValueOfQueryParams(
      history.location,
      "districtId",
      "STRING"
    );
    const villageId = getValueOfQueryParams(
      history.location,
      "villageId",
      "STRING"
    );
    const keyword = getValueOfQueryParams(
      history.location,
      "keyword",
      "STRING"
    );
    const currentPage = getValueOfQueryParams(
      history.location,
      "page",
      "NUMBER"
    );
    return {
      provinceId,
      districtId,
      villageId,
      keyword,
      currentPage,
    };
  }, [history.location]);

  useEffect(() => {
    const {
      provinceId,
      districtId,
      villageId,
      keyword,
      currentPage,
    } = getDataFromUrl();
    let id = "";
    if (villageId) id = villageId;
    else if (districtId) id = districtId;
    else if (provinceId) id = provinceId;

    setSelectedProvince(provinceId);
    setSelectedDistrict(districtId);
    setSelectedVillage(villageId);
    setSearchText(keyword);
    setPage(currentPage);

    const getDataHouseHoldPMT = async (params) => {
      setLoading(true);
      await Promise.all([
        getDataScored(params),
        getAllProvince(),
        getAllDistrict(params.provinceId),
        getAllVillage(params.districtId),
      ]).then(([resHouseHoldPMT, resProvince, resDistrict, resVillage]) => {
        setData(resHouseHoldPMT.data.Data.PMTScoreds);
        setTotalPage(resHouseHoldPMT.data.Data.TotalPage);
        setProvince(resProvince.data.Data);
        setDistrict(resDistrict.data.Data);
        setVillage(resVillage.data.Data);
      });
      setLoading(false);
    };

    getDataHouseHoldPMT({
      provinceId,
      districtId,
      villageId,
      keyword,
      id,
      currentPage,
    });
  }, [getDataFromUrl, t]);

  const getDataScored = (params) => {
    return householdScoreApi.getAllHouseholdScore({
      id: params.id,
      text: params.keyword,
      currentPage: params.currentPage,
    });
  };

  const getAllProvince = () => {
    return houseHoldApi.getAllProvince();
  };

  const getAllDistrict = (provinceId) => {
    return houseHoldApi.getAllDistrict({ provinceId });
  };

  const getAllVillage = (districtId) => {
    return houseHoldApi.getAllVillage({ districtId });
  };

  const onSelectProvince = (id) => {
    getAllDistrict(id).then((res) => {
      setDistrict(res.data.Data);
    });
    setSelectedProvince(id);
    setSelectedDistrict("");
    setSelectedVillage("");
  };

  const onDistrictSelect = (id) => {
    getAllVillage(id).then((res) => {
      setVillage(res.data.Data);
    });
    setSelectedDistrict(id);
    setSelectedVillage("");
  };

  const reloadDataGenerate = () => {
    history.push(PATH.GENERATION_OF_PMT_SCORE_CARD);
  };

  const onClickSearch = () => {
    let url = "?page=1";
    if (selectedProvince) url = `${url}&provinceId=${selectedProvince}`;
    if (selectedDistrict) url = `${url}&districtId=${selectedDistrict}`;
    if (selectedVillage) url = `${url}&villageId=${selectedVillage}`;
    if (searchText) url = `${url}&keyword=${searchText}`;
    history.push(url);
  };

  const onPageChange = (value) => {
    let url = `?page=${value}`;
    const { provinceId, districtId, villageId, keyword } = getDataFromUrl();
    if (provinceId) url = `${url}&provinceId=${provinceId}`;
    if (districtId) url = `${url}&districtId=${districtId}`;
    if (villageId) url = `${url}&villageId=${villageId}`;
    if (keyword) url = `${url}&keyword=${keyword}`;
    history.push(url);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (data, record, index) => {
        return page ? index + 1 + 10 * (page - 1) : index + 1;
      },
    },
    {
      title: t("HHCode"),
      dataIndex: "HHCode",
      key: "HHCode",
      align: "center",
      render: (data) => <div style={{ minWidth: 100 }}>{data}</div>,
    },
    {
      title: t("HEAD_OF_HH_NAME"),
      dataIndex: "HHHeadName",
      key: "HHHeadName",
      align: "center",
      render: (data) => <div style={{ minWidth: 120 }}>{data}</div>,
    },
    {
      title: t("PROVINCE"),
      dataIndex: "Province",
      key: "Province",
      align: "center",
      render: (data, record) => (
        <div style={{ minWidth: 100 }}>
          {dataLanguage === "la" ? record.Province : record.ProvinceEng}
        </div>
      ),
    },
    {
      title: t("DISTRICT"),
      dataIndex: "District",
      key: "District",
      align: "center",
      render: (data, record) => (
        <div style={{ minWidth: 100 }}>
          {dataLanguage === "la" ? record.District : record.DistrictEng}
        </div>
      ),
    },
    {
      title: t("VILLAGE"),
      dataIndex: "Village",
      key: "Village",
      align: "center",
      render: (data, record) => (
        <div style={{ minWidth: 100 }}>
          {dataLanguage === "la" ? record.Village : record.VillageEng}
        </div>
      ),
    },
    {
      title: t("PMT_SCORED"),
      dataIndex: "PMTScored",
      key: "PMTScored",
      align: "center",
      render: (data) => (
        <div style={{ minWidth: 80 }}>
          <Tag color={"green"}>
            <span className="font-weight-600">{data}</span>
          </Tag>
        </div>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      {/* Title*/}
      <section className="mb-3">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="h5 mb-0">{t("HH_LIST_SCORED")}</span>
          <Button
            type="primary"
            onClick={() => {
              setGenerate(true);
            }}
          >
            <i className="fas fa-download mr-2"></i> {t("GENERATE")}
          </Button>
        </div>
      </section>

      {/* Search*/}
      <section>
        <Row gutter={[16, 16]}>
          <Col span={24} md={12} lg={4}>
            <Text>{t("PROVINCE")}</Text>
            <Select
              className="w-100"
              value={selectedProvince}
              onChange={(value) => {
                onSelectProvince(value);
              }}
            >
              <Option value={""}>{"All"}</Option>
              {province.map((value, index) => (
                <Option value={value.Id} key={index}>
                  {dataLanguage === "la"
                    ? value.ProvinceName
                    : value.ProvinceNameEng}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={24} md={12} lg={4}>
            <Text>{t("DISTRICT")}</Text>
            <Select
              className="w-100"
              value={selectedDistrict}
              onChange={(id) => {
                onDistrictSelect(id);
              }}
            >
              <Option value={""}>{"All"}</Option>
              {district.map((value, index) => (
                <Option value={value.DistrictId} key={index}>
                  {dataLanguage === "la"
                    ? value.DistrictName
                    : value.DistrictNameEng}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={24} md={12} lg={4}>
            <Text>{t("VILLAGE")}</Text>
            <Select
              className="w-100"
              value={selectedVillage}
              onChange={(value) => {
                setSelectedVillage(value);
              }}
            >
              <Option value={""}>{"All"}</Option>
              {village.map((value, index) => (
                <Option value={value.VillageId} key={index}>
                  {dataLanguage === "la"
                    ? value.VillageName
                    : value.VillageNameEng || t("EMPTY")}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={24} md={12} lg={4}>
            <Text className="font-13">{t("KEYWORD")}</Text>
            <Input
              value={searchText}
              placeholder={t("HEAD_OF_HH_NAME")}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  onClickSearch();
                }
              }}
            />
          </Col>
          <Col span={24} md={12} lg={4} className="align-self-end">
            <Button type="primary" onClick={onClickSearch}>
              <i className="fas fa-search mr-2"></i>
              {t("SEARCH")}
            </Button>
          </Col>
        </Row>
      </section>

      {/* table */}

      <Table
        columns={columns}
        dataSource={data}
        rowKey="HHCode"
        pagination={{
          current: Number(page),
          pageSize: 10,
          total: totalPage * 10,
          onChange: (value) => {
            onPageChange(value);
          },
          showSizeChanger: false,
        }}
        className="hh-scored--table"
      />

      <GenerateDataComponent
        visible={showGenerate}
        setVisible={setGenerate}
        reloadData={reloadDataGenerate}
        dataLanguage={dataLanguage}
      />
    </>
  );
}

export default HouseholdScore;
