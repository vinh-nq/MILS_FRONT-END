import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import {
  Button,
  Col,
  Divider,
  Input,
  message,
  Row,
  Select,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import { getValueOfQueryParams } from "../../utils/getValueOfQueryParams";
import houseHoldApi from "../../api/houseHoldApi";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import houseHoldScoreApi from "../../api/householdScoreApi";
import { regexTemplate } from "../../utils/regexTemplate";
import "./style.scss";
import {
  LinkOutlined,
  SearchOutlined,
  OrderedListOutlined,
} from "@ant-design/icons/lib/icons";
import { PATH } from "../../routers/Path";
import CCTProgramApi from "../../api/CCTProgramApi";

function HouseholdScore(props) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [province, setProvince] = useState([]);
  const [village, setVillage] = useState([]);
  const [district, setDistrict] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [minScored, setMinScored] = useState("");
  const [maxScored, setMaxScored] = useState("");

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
    getRegions(checkDataFromUrl());
  }, [history, t]);

  const getDataScored = () => {
    return houseHoldScoreApi.getAllHouseholdScore();
  };

  const setDataScored = (res) => {
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
  };

  const getRegions = async (params) => {
    setLoading(true);
    await Promise.all([
      getProvincePromiseAll(),
      getDistrictPromiseAll(params.provinceId),
      getDistrictVillageAll(params.districtId),
      getDataScored(),
    ]).then(([resProvince, resDistrict, resVillage, resScored]) => {
      setProvince(resProvince.data.Data);
      setDistrict(resDistrict.data.Data);
      setVillage(resVillage.data.Data);
      setDataScored(resScored);
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

  const onGenerateChange = async () => {
    setLoading(true);
    await CCTProgramApi.GetPMTScored({
      provinceId: selectedProvince,
      districtId: selectedDistrict,
      villageId: selectedVillage,
    }).then((res) => {
      if (res.data.Status) {
        let { Data } = res.data;
        Data = Data.sort(compare);
        setMinScored("");
        setMaxScored("");
        setData(Data);
        setSubData(Data);
        setPage(1);
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
          <Tag color={"green"}>{data}</Tag>
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
          <Tooltip placement="bottom" title={t("GO_TO_EROLLMENT")}>
            <Button
              type="primary"
              className="d-flex align-items-center justify-content-center px-1"
              onClick={() => {
                props.history.push(PATH.EROLLMENT);
              }}
            >
              <LinkOutlined className="font-20" />
            </Button>
          </Tooltip>
        </div>
      </section>

      {/* Search*/}
      <section>
        <Divider orientation="left" className="my-0 font-16 font-weight-500">
          <span className="text--underline__color">
            {t("GENERATE_NEW_DATE")}
          </span>
        </Divider>
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
              <Text className="font-13">{t("GENERATE_NEW_DATE")}</Text>
            </div>
            <Button
              type="primary"
              icon={
                <OrderedListOutlined className="ant--icon__middle font-20" />
              }
              onClick={onGenerateChange}
            >
              {t("GENERATE")}
            </Button>
          </Col>
        </Row>
        <Divider orientation="left" className="my-0 font-16 font-weight-500">
          <span className="text--underline__color">{t("SEARCH")}</span>
        </Divider>
        <Row gutter={[16, 16]}>
          <Col span={24} md={12} lg={6}>
            <Text className="font-13">{t("HEAD_OF_HH_NAME")}</Text>
            <Input
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </Col>
          <Col span={24} md={12} lg={6}>
            <Row gutter={[8, 16]}>
              <Col span={12}>
                <Text className="font-13">{t("PMT_SCORED_FROM")}</Text>
                <Input
                  placeholder={t("FROM")}
                  value={minScored}
                  onChange={(e) => {
                    onScoreChange(e.target.value, "FROM");
                  }}
                  className="d-inline-block"
                />
              </Col>
              <Col span={12}>
                <Text className="font-13">{t("PMT_SCORED_TO")}</Text>
                <Input
                  value={maxScored}
                  placeholder={t("TO")}
                  onChange={(e) => {
                    onScoreChange(e.target.value, "TO");
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24} md={12} lg={6}>
            <Text className="font-13 d-block">{t("SEARCH")}</Text>
            <Button
              type="primary"
              icon={<SearchOutlined className="ant--icon__middle" />}
              onClick={onClickSearch}
            >
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
    </>
  );
}

export default HouseholdScore;
