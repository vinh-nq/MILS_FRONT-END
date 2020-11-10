import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Divider,
  Input,
  Button,
  message,
  Tooltip,
  Menu,
  Dropdown,
  Select,
  Modal,
} from "antd";
import {
  SyncOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  LockOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { getValueFromLink } from "../../../utils/getValueFromLink";
import { regexTemplate } from "../../../utils/regexTemplate";
import Highlighter from "react-highlight-words";
import LoadingSpinner from "../../../components/LoadingSpinner";
import CCTProgramApi from "../../../api/CCTProgramApi";
import dataDictionaryApi from "../../../api/dataDictionaryApi";
import moment from "moment";
import "./styles.scss";
import { PATH } from "../../../routers/Path";

let timeOut = "";
export default function Enrollment(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [listHHCCTProgram, setListHHCCTProgram] = useState([]);
  const [listCCTConfirm, setListCCTConfirm] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [checkLoading, setCheckLoading] = useState(false);
  const [selectStatusCCT, setSelectStatusCCT] = useState("all");
  const [selectLockCCT, setSelectLockCCT] = useState("all");
  const { confirm } = Modal;
  const { Option } = Select;
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    let pageCheck = getValueFromLink(props.location, "page");
    if (!regexTemplate.NUMBER.test(pageCheck)) {
      props.history.push(PATH.EROLLMENT);
    } else {
      setPage(pageCheck);
    }
  }, [props.location, props.history]);

  useEffect(() => {
    return history.listen((location) => {
      if (`${location.pathname}${location.search}` === PATH.EROLLMENT) {
        setKeyword("");
      }
    });
  }, [history]);

  useEffect(() => {
    setKeyword(getValueFromLink(props.location, "hhHeadName", "STRING"));
    setSelectStatusCCT(
      getValueFromLink(props.location, "status", "STRING") || "all"
    );
    setSelectLockCCT(
      getValueFromLink(props.location, "isLocked", "STRING") || "all"
    );
    fetchDataHHCCTProgram(
      getValueFromLink(props.location, "hhHeadName", "STRING"),
      getValueFromLink(props.location, "status", "STRING") || "all",
      getValueFromLink(props.location, "isLocked", "STRING") || "all",
      getValueFromLink(props.location, "page", "STRING") || 1
    );
    fetchDataStatusConfirm();
  }, [props.location]);

  const fetchDataHHCCTProgram = async (
    hhHeadName,
    status,
    isLocked,
    currentPage
  ) => {
    setCheckLoading(true);
    return await CCTProgramApi.GetHHCCTConfirms({
      hhHeadName: hhHeadName,
      status: status === "all" ? -1 : status,
      isLocked: isLocked === "all" ? -1 : isLocked,
      currentPage: currentPage,
    }).then((res) => {
      setCheckLoading(false);
      setPage(res.data.Data.CurrentPage);
      setTotalPage(res.data.Data.TotalPage);
      setListHHCCTProgram(res.data.Data.hhCCTConfirms);
    });
  };

  const fetchDataStatusConfirm = async () => {
    return await dataDictionaryApi
      .GetAllCCTConfirmStatus({
        keyword: null,
      })
      .then((res) => {
        setListCCTConfirm(res.data.Data);
      })
      .catch((e) => {
        message.error(e.message);
      });
  };

  const changeStatus = async (value, idStatus) => {
    const arrayData = [
      {
        ...value,
        StatusId: idStatus,
      },
    ];
    setCheckLoading(true);
    return await CCTProgramApi.UpdateCCTConfirm({
      hHCCTConfirms: arrayData,
      hhHeadName: keyword,
      status: selectStatusCCT === "all" ? -1 : selectStatusCCT,
      isLocked: selectLockCCT === "all" ? -1 : selectLockCCT,
      currentPage: page,
    }).then((res) => {
      setCheckLoading(false);
      setListHHCCTProgram(res.data.Data.hhCCTConfirms);
    });
  };

  const changeLock = async (value) => {
    const arrayData = [
      {
        ...value,
        IsLocked: true,
      },
    ];
    setCheckLoading(true);
    return await CCTProgramApi.UpdateCCTConfirm({
      hHCCTConfirms: arrayData,
      hhHeadName: keyword,
      status: selectStatusCCT === "all" ? -1 : selectStatusCCT,
      isLocked: selectLockCCT === "all" ? -1 : selectLockCCT,
      currentPage: page,
    }).then((res) => {
      setCheckLoading(false);
      setListHHCCTProgram(res.data.Data.hhCCTConfirms);
    });
  };

  const tableColumnsConfirm = [
    {
      dataIndex: "HHCode",
      title: t("HHCode"),
      render: (text, record) => (
        <div>
          {record.IsLocked ? (
            <Tooltip title="Household was locked!" color={"volcano"}>
              <i className="fas fa-lock mr-1" style={{ color: "red" }}></i>
              <Highlighter
                highlightStyle={{ backgroundColor: "#96e0f7", padding: 0 }}
                searchWords={[keyword]}
                autoEscape
                textToHighlight={text ? text.toString() : ""}
              />
            </Tooltip>
          ) : (
            <Highlighter
              highlightStyle={{ backgroundColor: "#96e0f7", padding: 0 }}
              searchWords={[keyword]}
              autoEscape
              textToHighlight={text ? text.toString() : ""}
            />
          )}
        </div>
      ),
    },
    {
      dataIndex: "HHHeadName",
      title: t("HHHeadName"),
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
      dataIndex: "Village",
      title: t("Location"),
      render: (text, record) => (
        <span style={{ fontSize: "12px" }}>{`${
          dataLanguage === "la" ? record.Province : record.ProvinceEng
        } / ${dataLanguage === "la" ? record.District : record.DistrictEng} / ${
          dataLanguage === "la" ? record.Village : record.VillageEng
        }`}</span>
      ),
    },
    {
      dataIndex: "CreatedDate",
      title: t("CreatedDate"),
      render: (text) => <span>{moment(text, "DD/").format("DD/MM/YYYY")}</span>,
    },
    {
      dataIndex: "StatusId",
      title: t("Status"),
      render: (text, record) => (
        <span style={{ fontSize: "12px" }}>
          {record.StatusId === "3" ? (
            <Tag
              icon={<SyncOutlined />}
              color="gold"
              className="d-flex justify-content-center align-items-center"
              style={{ width: "80px" }}
            >
              {dataLanguage === "la" ? record.Status : record.StatusEng}
            </Tag>
          ) : null}
          {record.StatusId === "1" ? (
            <Tag
              icon={<CheckCircleOutlined />}
              color="success"
              className="d-flex justify-content-center align-items-center"
              style={{ width: "80px" }}
            >
              {dataLanguage === "la" ? record.Status : record.StatusEng}
            </Tag>
          ) : null}
          {record.StatusId === "2" ? (
            <Tag
              icon={<CloseCircleOutlined />}
              color="error"
              className="d-flex justify-content-center align-items-center"
              style={{ width: "80px" }}
            >
              {dataLanguage === "la" ? record.Status : record.StatusEng}
            </Tag>
          ) : null}
        </span>
      ),
    },
    {
      dataIndex: "HHCode",
      render: (text, record) => {
        return (
          <div className="d-flex justify-content-end">
            {record.IsLocked === true ? null : (
              <Dropdown
                overlay={
                  <Menu>
                    {record.StatusId !== "1" ? (
                      <Menu.Item
                        className="d-flex justify-content-start align-items-center"
                        onClick={() => {
                          changeStatus(record, "1");
                        }}
                      >
                        <CheckCircleOutlined style={{ color: "#32CD32" }} />{" "}
                        Approve
                      </Menu.Item>
                    ) : null}
                    {record.StatusId !== "2" ? (
                      <Menu.Item
                        className="d-flex justify-content-start align-items-center"
                        onClick={() => {
                          changeStatus(record, "2");
                        }}
                      >
                        <CloseCircleOutlined style={{ color: "#FF4500" }} />{" "}
                        Reject
                      </Menu.Item>
                    ) : null}
                    {record.StatusId !== "3" ? (
                      <Menu.Item
                        className="d-flex justify-content-start align-items-center"
                        onClick={() => {
                          changeStatus(record, "3");
                        }}
                      >
                        <SyncOutlined style={{ color: "gold" }} /> Waitting
                      </Menu.Item>
                    ) : null}
                    <Menu.Divider />
                    <Menu.Item
                      className="d-flex justify-content-start align-items-center"
                      onClick={() => {
                        confirm({
                          title: "Are you sure lock this household?",
                          icon: <ExclamationCircleOutlined />,
                          okText: "Yes",
                          okType: "danger",
                          cancelText: "No",
                          onOk() {
                            changeLock(record);
                          },
                          onCancel() {},
                        });
                      }}
                    >
                      <LockOutlined style={{ color: "#FF7F50" }} /> Lock
                    </Menu.Item>
                  </Menu>
                }
                placement="bottomRight"
              >
                <Button>
                  <i className="fas fa-ellipsis-v"></i>
                </Button>
              </Dropdown>
            )}
          </div>
        );
      },
    },
  ];

  const onSearchChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setPage(1);
      const lockLink = selectLockCCT ? `&isLocked=${selectLockCCT}` : ``;
      const statusLink = selectStatusCCT ? `&status=${selectStatusCCT}` : ``;
      const link = value
        ? `?hhHeadName=${value}${lockLink}${statusLink}&page=1`
        : ``;
      props.history.push({
        pathName: PATH.EROLLMENT,
        search: link,
      });
    }, 400);
  };

  const funcSelectStatusCCT = (value) => {
    const hhHeadName = keyword ? `&hhHeadName=${keyword}` : ``;
    const pageLink = `&page=1`;
    const lockLink = selectLockCCT ? `&isLocked=${selectLockCCT}` : ``;
    history.push(
      `${PATH.EROLLMENT}?status=${value}${hhHeadName}${lockLink}${pageLink}`
    );
  };

  const funcSelectLockCCT = (value) => {
    const hhHeadName = keyword ? `&hhHeadName=${keyword}` : ``;
    const pageLink = `&page=1`;
    const statusLink = selectStatusCCT ? `&status=${selectStatusCCT}` : ``;
    history.push(
      `${PATH.EROLLMENT}?isLocked=${value}${hhHeadName}${statusLink}${pageLink}`
    );
  };

  const onChangePage = (value) => {
    const hhHeadName = keyword ? `&hhHeadName=${keyword}` : ``;
    const statusLink = selectStatusCCT ? `&status=${selectStatusCCT}` : ``;
    const lockLink = selectLockCCT ? `&isLocked=${selectLockCCT}` : ``;
    history.push(
      `${PATH.EROLLMENT}?page=${value}${hhHeadName}${lockLink}${statusLink}`
    );
  };

  return (
    <div className="w-100 h-100">
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <div className="d-flex flex-row align-items-center justify-content-between row">
        <div className="col-xl-6 col-md-3 col-12">
          <span className="h5 mb-0">{t("ENROLLMENT")}</span>
        </div>
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
        <div className="col-xl-3 col-lg-3 col-12 col-sm-6 d-flex flex-row align-items-center mb-3">
          <span className="mr-2">{t("Status")}</span>
          <Select
            defaultValue="all"
            style={{ width: "200px" }}
            value={selectStatusCCT}
            onSelect={(value) => {
              funcSelectStatusCCT(value);
            }}
          >
            <Option value="all">{t("ALL")}</Option>
            {listCCTConfirm.map((el) => (
              <Option value={el.Id} key={el.Id}>
                {dataLanguage === "la" ? el.ValueOfLao : el.ValueOfEng}
              </Option>
            ))}
          </Select>
        </div>
        <div className="col-xl-3 col-lg-3 col-12 col-sm-6 d-flex flex-row align-items-center mb-3">
          <span className="mr-2">{t("Lock")}</span>
          <Select
            defaultValue="all"
            style={{ width: "200px" }}
            value={selectLockCCT}
            onSelect={(value) => {
              funcSelectLockCCT(value);
            }}
          >
            <Option value="all">{t("ALL")}</Option>
            <Option value="1">{t("Locked")}</Option>
            <Option value="2">{t("Unlocked")}</Option>
          </Select>
        </div>
      </div>
      <Table
        style={{ overflow: "auto" }}
        columns={tableColumnsConfirm}
        dataSource={listHHCCTProgram || []}
        size="small"
        rowKey="HHCode"
        pagination={{
          current: Number(page),
          pageSize: 10,
          total: 10 * totalPage,
          onChange: (page) => {
            onChangePage(page);
          },
          showSizeChanger: false,
        }}
        rowClassName={(record) => {
          return record.IsLocked ? "unavailable" : null;
        }}
      />
    </div>
  );
}
