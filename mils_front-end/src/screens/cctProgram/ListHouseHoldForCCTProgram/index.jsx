import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Input,
  message,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
// import downloadFileExcelApi from "../../../api/downloadFileExcelApi";
// import { saveAs } from "file-saver";
import { SaveOutlined, SearchOutlined } from "@ant-design/icons/lib/icons";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import GetHHCCTConfirms from "../../../api/CCTProgramApi";
import { useHistory } from "react-router-dom";
import { getValueOfQueryParams } from "../../../utils/getValueOfQueryParams";
import LoadingSpinner from "../../../components/LoadingSpinner";

function ListHouseholdForCCTProgram(props) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    getDataConfirm();
  }, [history.location]);

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

  const getDataConfirm = async () => {
    setLoading(true);
    const { page, status, isLocked, hhName } = getDataFromUrl();
    setPage(page);
    setSelectLocked(isLocked);
    setSelectedStatus(status);
    setHHName(hhName);
    await GetHHCCTConfirms.GetHHCCTConfirms({
      currentPage: page,
      isLocked: isLocked ? isLocked : "-1",
      status: status ? status : "-1",
      hhHeadName: hhName,
    }).then((res) => {
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

  const onClickSearch = () => {
    setPage(1);
    history.push(
      `/pmtscoredcomfirm?page=1&status=${selectedStatus}&islocked=${selectedLocked}&hhName=${hhName}`
    );
  };

  const handlePageChange = (value) => {
    setPage(value);
    history.push(
      `/pmtscoredcomfirm?page=${value}&status=${selectedStatus}&islocked=${selectedLocked}&hhName=${hhName}`
    );
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
      render: (data, record) => (
        <div style={{ minWidth: 100 }}>
          {dataLanguage === "la" ? record.Status : record.StatusEng}
        </div>
      ),
    },
    {
      title: t("LOCKED"),
      dataIndex: "IsLocked",
      align: "center",
      key: "IsLocked",
      render: (data) => {
        console.log(data);
        return (
          <div style={{ minWidth: 80 }}>
            <Checkbox defaultChecked={data} disabled />
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
          <span className="h5 mb-0">List Household For CCT Program</span>
          <span className="ml-auto d-flex flex-row">
            <Button
              className="set-center-content mr-2"
              icon={<i className="fas fa-file-excel mr-2"></i>}
              style={{ color: "#0c960c", border: "1px #0c960c solid" }}
              // onClick={async () => {
              //   setLoading(true);
              //   await downloadFileExcelApi
              //     .ExportMembers({
              //       villageId: selectedVillage === "-1" ? "" : selectedVillage,
              //     })
              //     .then((res) => {
              //       fetch(
              //         `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${res.data}`
              //       )
              //         .then((ress) => {
              //           return ress.blob();
              //         })
              //         .then((blobs) => {
              //           const fileExtension = ".xlsx";
              //           setLoading(false);
              //           saveAs(
              //             blobs,
              //             `${t("Member&PlotLand")}` + fileExtension
              //           );
              //         });
              //     });
              // }}
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
              <Option value={""}>All</Option>
              <Option value={"1"}>Waiting</Option>
              <Option value={"2"}>Accept</Option>
            </Select>
          </Col>
          <Col lg={6} md={12} sm={24}>
            <Text className="font-13">{t("BLOCKED")}</Text>
            <Select
              value={selectedLocked}
              className="w-100"
              onChange={(value) => setSelectLocked(value)}
            >
              <Option value={""}>All</Option>
              <Option value={"2"}>{t("ACTIVE")}</Option>
              <Option value={"1"}>{t("LOCKED")}</Option>
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
    </>
  );
}

export default ListHouseholdForCCTProgram;
