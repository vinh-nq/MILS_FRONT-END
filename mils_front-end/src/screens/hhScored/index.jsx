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
  Tooltip,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import { ArrowRightOutlined } from "@ant-design/icons/lib/icons";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import { getValueOfQueryParams } from "../../utils/getValueOfQueryParams";
import houseHoldApi from "../../api/houseHoldApi";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import houseHoldScoreApi from "../../api/householdScoreApi";
import { regexTemplate } from "../../utils/regexTemplate";
function HouseholdScore(props) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [province, setProvince] = useState([]);
  const [village, setVillage] = useState([]);
  const [district, setDistrict] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [minScored, setMinScored] = useState(0);
  const [maxScored, setMaxScored] = useState(10000);

  const { t } = useTranslation();
  const { Text } = Typography;
  const { Option } = Select;
  const history = useHistory();
  const [page, setPage] = useState(1);

  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  const checkDataFromUrl = () => {
    let provinceId = getValueOfQueryParams(
      history.location,
      "provinceId",
      "STRING"
    );
    let districtId = getValueOfQueryParams(
      history.location,
      "districtId",
      "STRING"
    );
    let villageId = getValueOfQueryParams(
      history.location,
      "villageId",
      "STRING"
    );
    setSelectedProvince(provinceId);
    setSelectedDistrict(districtId);
    setSelectedVillage(villageId);
    return {
      provinceId: provinceId,
      districtId: districtId,
      villageId: villageId,
    };
  };

  useEffect(() => {
    getRegions(checkDataFromUrl());
  }, [history]);

  useEffect(() => {
    const getDataScore = async () => {
      await houseHoldScoreApi.getAllHouseholdScore().then((res) => {
        if (res.data.Status) {
          let Data = res.data;
          const compare = (a, b) => {
            if (a.PMTScored < b.PMTScored) {
              return -1;
            }
            if (a.PMTScored > b.PMTScored) {
              return 1;
            }
            return 0;
          };
          Data = Data.sort(compare); // setMaxScored()
          setData(Data);
        } else {
          message.error({
            content: t("FETCH_DATA_FAILED"),
            key: "message-form-role",
            duration: 1,
          });
        }
      });
    };
    getDataScore();
  }, []);

  const getRegions = async (params) => {
    setLoading(true);
    await Promise.all([
      getProvincePromiseAll(),
      getDistrictPromiseAll(params.provinceId),
      getDistrictVillageAll(params.districtId),
    ]).then(([resProvince, resDistrict, resVillage, resUnit]) => {
      setProvince(resProvince.data.Data);
      setDistrict(resDistrict.data.Data);
      setVillage(resVillage.data.Data);
    });
    setLoading(false);
  };

  const getProvincePromiseAll = () => {
    return houseHoldApi.getAllProvince();
  };

  const getDistrictPromiseAll = (provinceId) => {
    if (provinceId !== "-1") {
      return houseHoldApi.getAllDistrict({ provinceId });
    } else {
      return {
        data: {
          Data: [],
        },
      };
    }
  };

  const getDistrictVillageAll = (districtId) => {
    if (districtId !== "-1") {
      return houseHoldApi.getAllVillage({ districtId });
    } else {
      return {
        data: {
          Data: [],
        },
      };
    }
  };

  const getDistrict = async (provinceId) => {
    await houseHoldApi.getAllDistrict({ provinceId }).then((res) => {
      setDistrict(res.data.Data);
    });
  };

  const getVillage = async (districtId) => {
    await houseHoldApi
      .getAllVillage({ districtId })
      .then((res) => setVillage(res.data.Data));
  };

  const onSelectProvince = (id) => {
    setSelectedProvince(id);
    setSelectedDistrict("");
    setSelectedVillage("");
    setDistrict([]);
    setVillage([]);
    getDistrict(id);
  };

  const onSelectDistrict = (id) => {
    setSelectedDistrict(id);
    setSelectedVillage("");
    setVillage([]);
    getVillage(id);
  };

  const onSelectVillage = (id) => {
    setSelectedVillage(id);
  };

  const onScoreChange = (value, name) => {
    const number = regexTemplate.NUMBER;
    setPage(1);
    if (name === "FROM") {
      number.test(value)
        ? value > maxScored
          ? setMinScored(0)
          : setMinScored(value)
        : setMinScored(0);
    } else {
      number.test(value)
        ? value < minScored
          ? setMaxScored(10000)
          : setMaxScored(value)
        : setMaxScored(10000);
    }
  };

  const renderData = () => {
    let array = [...data];
    if (searchText) {
      array = array.filter((value) =>
        value.HHHeadName.includes(searchText.trim())
      );
    }
    array = array.filter(
      (value) => value.PMTScored >= minScored && value.PMTScored <= maxScored
    );
    return array;
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
      title: t("HEAD_OF_HH_NAME"),
      dataIndex: "HHHeadName",
      key: "HHHeadName",
    },
    {
      title: t("PROVINCE"),
      dataIndex: "Province",
      key: "Province",
      render: (data, record) =>
        dataLanguage === "la" ? record.Province : record.ProvinceEng,
    },
    {
      title: t("DISTRICT"),
      dataIndex: "District",
      key: "District",
      render: (data, record) =>
        dataLanguage === "la" ? record.District : record.DistrictEng,
    },
    {
      title: t("VILLAGE"),
      dataIndex: "Village",
      key: "Village",
      render: (data, record) =>
        dataLanguage === "la" ? record.Village : record.VillageEng,
    },
    {
      title: "PMT Scored",
      dataIndex: "PMTScored",
      key: "PMTScored",
      render: (data) => data,
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
          <span className="h5 mb-0">House hold list score</span>
          <Tooltip placement="bottom" title="Select household for CCT program">
            <Button
              type="primary"
              className="d-flex align-items-center justify-content-center"
            >
              Next <ArrowRightOutlined className="font-20" />
            </Button>
          </Tooltip>
        </div>
      </section>

      {/* Search*/}
      <section>
        <Row gutter={[16, 16]}>
          <Col span={24} md={12} lg={6}>
            <Text className="font-13">{t("PROVINCE")}</Text>
            <Select
              className="w-100"
              value={selectedProvince}
              onChange={onSelectProvince}
            >
              {province.map((value, index) => (
                <Option
                  value={value.Id}
                  key={index}
                  onChange={() => {
                    onSelectProvince(value.Id);
                  }}
                >
                  {dataLanguage === "la"
                    ? value.ProvinceName
                    : value.ProvinceNameEng}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={24} md={12} lg={6}>
            <Text className="font-13">{t("DISTRICT")}</Text>
            <Select
              className="w-100"
              value={selectedDistrict}
              onChange={onSelectDistrict}
            >
              <Option value={""}>{""}</Option>
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
            <Text className="font-13">{t("VILLAGE")}</Text>
            <Select
              className="w-100"
              value={selectedVillage}
              onChange={onSelectVillage}
            >
              <Option value={""}>{""}</Option>
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
            <div>
              <Text className="font-13">Generate new data</Text>
            </div>
            <Button
              type="primary"
              icon={<SearchOutlined className="ant--icon__middle" />}
              // onClick={onSearchChange}
            >
              Generate
            </Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24} md={12} lg={6}>
            <Text className="font-13">Household name</Text>
            <Input
              value={searchText}
              onChange={(e) => {
                setPage(1);
                setSearchText(e.target.value);
              }}
            />
          </Col>
          <Col span={24} md={12} lg={6}>
            <Row gutter={[8, 16]}>
              <Col span={12}>
                <Text className="font-13">PMT Scored From</Text>
                <Input
                  placeholder="From"
                  value={minScored}
                  onChange={(e) => {
                    onScoreChange(e.target.value, "FROM");
                  }}
                  className="d-inline-block"
                />
              </Col>
              <Col span={12}>
                <Text className="font-13">PMT Scored To</Text>
                <Input
                  value={maxScored}
                  placeholder="To"
                  onChange={(e) => {
                    onScoreChange(e.target.value, "TO");
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </section>

      {/* table */}

      <Table
        columns={columns}
        dataSource={renderData()}
        rowKey="HHCode"
        pagination={{
          current: Number(page),
          pageSize: 10,
          total: renderData().length,
          onChange: (value) => {
            setPage(value);
          },
          showSizeChanger: false,
        }}
        className="hh-scored--table"
      />
    </>
  );
}

export default HouseholdScore;
