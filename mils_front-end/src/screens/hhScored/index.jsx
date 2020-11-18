import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import {
  Button,
  Col,
  Input,
  message,
  Row,
  Select,
  Table,
  Tag,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import householdScoreApi from "../../api/householdScoreApi";
import { regexTemplate } from "../../utils/regexTemplate";
import "./style.scss";

import GenerateDataComponent from "./component/GenerateDataComponent";
import houseHoldApi from "../../api/houseHoldApi";

function HouseholdScore(props) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [village, setVillage] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [minScored, setMinScored] = useState("");
  const [maxScored, setMaxScored] = useState("");

  const [showGenerate, setGenerate] = useState(false);
  const { t } = useTranslation();
  const { Text } = Typography;
  const { Option } = Select;
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    const getDataScored = async () => {
      setLoading(true);
      await householdScoreApi.getAllHouseholdScore().then((res) => {
        if (res.data.Status) {
          let { Data } = res.data;
          Data = Data.sort(compare);
          setData(Data);
          setSubData(Data);
        } else {
          message.error({
            content: t("FETCH_DATA_FAILED"),
            key: "message-form-role",
            duration: 1,
          });
        }
      });
      setLoading(false);
    };
    getDataScored();
  }, [t]);

  useEffect(() => {
    const getAllProvince = async () => {
      await houseHoldApi.getAllProvince().then((res) => {
        if (res.data.Status) {
          setProvince(res.data.Data);
        } else {
          message.error({
            content: t("FETCH_DATA_FAILED"),
            key: "message-form-role",
            duration: 1,
          });
        }
      });
    };
    getAllProvince();
  }, [t]);

  const getAllDistrict = (provinceId) => {
    houseHoldApi.getAllDistrict({ provinceId }).then((res) => {
      if (res.data.Status) {
        setDistrict(res.data.Data);
      } else {
        message.error({
          content: t("FETCH_DATA_FAILED"),
          key: "message-form-role",
          duration: 1,
        });
      }
    });
  };

  const getAllVillage = (districtId) => {
    houseHoldApi.getAllVillage({ districtId }).then((res) => {
      if (res.data.Status) {
        setVillage(res.data.Data);
      } else {
        message.error({
          content: t("FETCH_DATA_FAILED"),
          key: "message-form-role",
          duration: 1,
        });
      }
    });
  };

  const onSelectProvince = (id) => {
    getAllDistrict(id);
    setSelectedProvince(id);
    setSelectedDistrict("");
    setSelectedVillage("");
  };

  const onDistrictSelect = (id) => {
    getAllVillage(id);
    setSelectedDistrict(id);
    setSelectedVillage("");
  };

  const reloadDataGenerate = async (data) => {
    data = data.sort(compare);
    setMinScored("");
    setMaxScored("");
    setData(data);
    setSubData(data);
    setPage(1);
  };

  const onScoreChange = (value, name) => {
    const number = regexTemplate.NUMBER;
    if (name === "FROM") {
      number.test(value) ? setMinScored(value) : setMinScored("");
    } else {
      number.test(value) ? setMaxScored(value) : setMaxScored("");
    }
  };

  const onClickSearch = () => {
    let array = [...data];
    setPage(1);
    if (selectedProvince) {
      array = array.filter((value) => value.ProvinceId === selectedProvince);
    }
    if (selectedDistrict) {
      array = array.filter((value) => value.DistrictId === selectedDistrict);
    }
    if (selectedVillage) {
      array = array.filter((value) => value.VillageId === selectedVillage);
    }
    if (searchText) {
      array = array.filter((value) =>
        value.HHHeadName.includes(searchText.trim())
      );
    }
    if (minScored && maxScored) {
      array = array.filter(
        (value) =>
          value.PMTScored >= parseInt(minScored) &&
          value.PMTScored <= parseInt(maxScored)
      );
    }
    setSubData(array);
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
          <Col span={24} md={12} lg={6}>
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
          <Col span={24} md={12} lg={6}>
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
          <Col span={24} md={12} lg={6}>
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
          <Col span={24} md={12} lg={6}>
            <Text className="font-13">{t("HEAD_OF_HH_NAME")}</Text>
            <Input
              value={searchText}
              placeholder={t("SEARCH_HEAD_OF_HH_NAME")}
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
          <Col span={24} md={12} lg={6}>
            <Text className="font-13">{t("PMT_SCORED_FROM")}</Text>
            <Input
              placeholder={t("FROM")}
              value={minScored}
              onChange={(e) => {
                onScoreChange(e.target.value, "FROM");
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  onClickSearch();
                }
              }}
              className="d-inline-block"
            />
          </Col>
          <Col span={24} md={12} lg={6}>
            <Text className="font-13">{t("PMT_SCORED_TO")}</Text>
            <Input
              value={maxScored}
              placeholder={t("TO")}
              onChange={(e) => {
                onScoreChange(e.target.value, "TO");
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  onClickSearch();
                }
              }}
            />
          </Col>
          <Col span={24} md={12} lg={6}>
            <Text className="font-13 d-block">{t("SEARCH")}</Text>
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
        dataSource={subData}
        rowKey="HHCode"
        pagination={{
          current: Number(page),
          pageSize: 10,
          total: subData.length,
          onChange: (value) => {
            setPage(value);
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
