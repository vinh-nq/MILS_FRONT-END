import React, { useEffect, useState } from "react";
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

import { SearchOutlined } from "@ant-design/icons/lib/icons";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import GetHHCCTConfirms from "../../../api/CCTProgramApi";
import { useHistory } from "react-router-dom";
import { getValueOfQueryParams } from "../../../utils/getValueOfQueryParams";
import LoadingSpinner from "../../../components/LoadingSpinner";
import dataDictionaryApi from "../../../api/dataDictionaryApi";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import UnlockOutlined from "@ant-design/icons/lib/icons/UnlockOutlined";
import ExportExcelComponent from "./component/ExportExelComponent";
import { PATH } from "../../../routers/Path";

function ListHouseholdForCCTProgram(props) {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [statusConfirm, setStatusConfirm] = useState([]);
  const [hhName, setHHName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLocked, setSelectLocked] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { Text } = Typography;
  const { Option } = Select;
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  //get params from URL
  const getDataFromUrl = () => {
    let page = getValueOfQueryParams(history.location, "page");
    let status = getValueOfQueryParams(history.location, "status", "STRING");
    let isLocked = getValueOfQueryParams(
      history.location,
      "islocked",
      "STRING"
    );
    let hhName = getValueOfQueryParams(history.location, "hhName", "STRING");
    return {
      page,
      status,
      isLocked,
      hhName,
    };
  };

  const getDataConfirm = async (obj) => {
    setLoading(true);
    await GetHHCCTConfirms.GetHHCCTConfirms(obj).then((res) => {
      if (res.data.Status) {
        setData(res.data.Data.hhCCTConfirms);
        setTotalPage(res.data.Data.TotalPage);
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

  useEffect(() => {
    const { page, status, isLocked, hhName } = getDataFromUrl();
    setPage(page);
    setSelectLocked(isLocked ? isLocked : "all");
    setSelectedStatus(status ? status : "all");
    setHHName(hhName);
    getDataConfirm({
      currentPage: page,
      isLocked: isLocked === "all" || !isLocked ? "-1" : isLocked,
      status: status === "all" || !isLocked ? "-1" : status,
      hhHeadName: hhName,
    });
  }, []);

  useEffect(() => {
    const getAllStatusConfirm = async () => {
      await dataDictionaryApi
        .GetAllCCTConfirmStatus({ keyword: "" })
        .then((res) => {
          if (res.data.Status) {
            setStatusConfirm(res.data.Data);
          } else {
            message.error({
              content: t("FETCH_DATA_FAILED"),
              key: "message-form-role",
              duration: 1,
            });
          }
        });
    };
    getAllStatusConfirm();
  }, [t]);

  const onClickSearch = () => {
    setPage(1);
    history.push(
      `${PATH.EROLLMENT}?page=1&status=${selectedStatus}&islocked=${selectedLocked}&hhName=${hhName}`
    );
    getDataConfirm({
      currentPage: 1,
      isLocked: selectedLocked !== "all" ? selectedLocked : "-1",
      status: selectedStatus !== "all" ? selectedStatus : "-1",
      hhHeadName: hhName,
    });
  };

  const handlePageChange = (value) => {
    setPage(value);
    const { status, isLocked, hhName } = getDataFromUrl();
    history.push(
      `${PATH.EROLLMENT}?page=${value}&status=${status}&islocked=${isLocked}&hhName=${hhName}`
    );
    getDataConfirm({
      currentPage: value,
      isLocked: isLocked === "all" || !isLocked ? "-1" : isLocked,
      status: status === "all" || !isLocked ? "-1" : status,
      hhHeadName: hhName,
    });
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
      title: t("STATUS"),
      dataIndex: "Status",
      key: "Status",
      align: "center",
      render: (data, record) => {
        const Status = (props) => (
          <div style={{ minWidth: 100 }}>
            <Tag color={props.color}>
              {dataLanguage === "la" ? record.Status : record.StatusEng}
            </Tag>
          </div>
        );
        if (record.StatusId === "1") {
          return <Status color={"green"} />;
        } else if (record.StatusId === "2") {
          return <Status color={"red"} />;
        } else if (record.StatusId === "3") {
          return <Status color={"warning"} />;
        } else {
          return <Status color={"default"} />;
        }
      },
    },
    {
      title: t("LOCKED"),
      dataIndex: "IsLocked",
      align: "center",
      key: "IsLocked",
      render: (data) => {
        return (
          <div style={{ minWidth: 80 }}>
            {data ? (
              <LockOutlined className="text-danger font-18" />
            ) : (
              <UnlockOutlined className="text-primary font-18" />
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      {/*Header*/}
      <section>
        {isLoading ? (
          <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
        ) : null}
        <div className="d-flex align-items-center mb-3">
          <span className="h5 mb-0">{t("ENROLLMENT")}</span>
          <span className="ml-auto d-flex flex-row">
            <Button
              className="set-center-content mr-2"
              icon={<i className="fas fa-file-excel mr-2"></i>}
              style={{ color: "#0c960c", border: "1px #0c960c solid" }}
              onClick={() => {
                setVisible(true);
              }}
            >
              Export Excel
            </Button>
          </span>
        </div>
      </section>

      {/*Search*/}
      <section className="mb-3">
        <Row gutter={[16, 16]}>
          <Col lg={6} md={12} sm={24}>
            <Text className="font-13">{t("HEAD_OF_HH_NAME")}</Text>
            <Input
              value={hhName}
              onChange={(e) => {
                setHHName(e.target.value);
              }}
            />
          </Col>
          <Col lg={6} md={12} sm={24}>
            <Text className="font-13">{t("STATUS")}</Text>
            <Select
              value={selectedStatus}
              className="w-100"
              onChange={(value) => setSelectedStatus(value)}
            >
              <Option value={"all"}>All</Option>
              {statusConfirm.map((value, index) => (
                <Option value={value.Id} key={index}>
                  {dataLanguage === "la" ? value.ValueOfLao : value.ValueOfEng}
                </Option>
              ))}
            </Select>
          </Col>
          <Col lg={6} md={12} sm={24}>
            <Text className="font-13">{t("LOCKED")}</Text>
            <Select
              value={selectedLocked}
              className="w-100"
              onChange={(value) => setSelectLocked(value)}
            >
              <Option value={"all"}>All</Option>
              <Option value={"1"}>{t("LOCKED")}</Option>
              <Option value={"2"}>{t("UNLOCKED")}</Option>
            </Select>
          </Col>
          <Col lg={6} md={12} sm={24}>
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

      {/*List data household have PMT scored was accepted*/}
      <section>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="HHCode"
          pagination={{
            current: Number(page),
            pageSize: 10,
            total: totalPage * 10,
            onChange: (value) => {
              handlePageChange(value);
            },
            showSizeChanger: false,
          }}
        />
      </section>
      {/*Modal export*/}
      <section>
        <ExportExcelComponent
          visible={visible}
          setVisible={setVisible}
          statusArray={statusConfirm}
          dataLanguage={dataLanguage}
        />
      </section>
    </>
  );
}

export default ListHouseholdForCCTProgram;
