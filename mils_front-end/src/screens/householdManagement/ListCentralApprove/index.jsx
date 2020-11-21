import React, { useEffect, useState } from "react";
import {
  Table,
  Divider,
  Input,
  Button,
  message,
  Select,
  Badge,
  Modal,
  Tag,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons/lib/icons";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { getValueFromLink } from "../../../utils/getValueFromLink";
import Highlighter from "react-highlight-words";
import LoadingSpinner from "../../../components/LoadingSpinner";
import householdLogApi from "../../../api/householdLogApi";
import approveHouseHoldApi from "../../../api/approveHouseHoldApi";
import "./styles.scss";
import { PATH } from "../../../routers/Path";
import { messageError } from "../../../components/MessageError";
import CascaderFilter from "./components/CascaderFilter";
import { actionRedux } from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";

export default function ListCentralApprove(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [filterVillage, setFilterVillage] = useState("all");
  const [checkLoading, setCheckLoading] = useState(false);
  const [listHouseHold, setListHouseHold] = useState([]);
  const [userVillage, setUserVillage] = useState(null);
  const dispatch = useDispatch();
  const { confirm } = Modal;
  const listItems = useSelector(
    (state) => state.centralApproveReducer.listItems
  );
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    return history.listen((location) => {
      if (`${location.pathname}${location.search}` === PATH.CENTRAL_APPROVE) {
        setKeyword("");
      }
    });
  }, [history]);

  useEffect(() => {
    let cookies = new Cookies();
    cookies = cookies.get("user");
    const fetchDataListHouseHold = () => {
      return approveHouseHoldApi.GetHHForCentral({
        region: getValueFromLink(props.location, "region", "STRING") || null,
        keyword: getValueFromLink(props.location, "keyword", "STRING") || null,
        user_id: cookies.userId,
        pageNum: getValueFromLink(props.location, "page", "STRING") || 1,
        pageSize: 12,
      });
    };
    const fetchDataVillage = () => {
      return householdLogApi.GetVillageByUser({
        UserId: cookies.userId,
      });
    };
    const fetchDataCMConfirmartion = async () => {
      setCheckLoading(true);
      return await Promise.all([fetchDataVillage(), fetchDataListHouseHold()])
        .then(([resVillageUser, resDataHouseHold]) => {
          setCheckLoading(false);
          setListHouseHold(resDataHouseHold.data.listOfObj);
          setTotalPage(resDataHouseHold.data.Total);
          setUserVillage(resVillageUser.data);
          if (resVillageUser.data.length !== 1) {
            setFilterVillage(
              getValueFromLink(props.location, "region", "STRING") || "all"
            );
          } else {
            if (resVillageUser.data.length === 0) {
              setFilterVillage(resVillageUser.data[0].village_id);
            }
          }
        })
        .catch((error) => {
          setCheckLoading(false);
          messageError({
            content: error,
            duration: 2,
          });
        });
    };
    setKeyword(getValueFromLink(props.location, "keyword", "STRING"));
    setPage(getValueFromLink(props.location, "page", "STRING") || 1);
    fetchDataCMConfirmartion();
  }, [props.location]);

  const renderStatusJSX = (value) => {
    switch (value.toLowerCase()) {
      case "rejected":
        return <Tag color="red">{t("Rejected")}</Tag>;
      case "pending":
        return <Tag color="gold">{t("Pending")}</Tag>;
      case "approved":
        return <Tag color="green">{t("Approved")}</Tag>;
      default:
        return <div>__</div>;
    }
  };

  const columns = [
    {
      title: t("ID"),
      dataIndex: "hh_id",
      key: "hh_id",
      render: (text) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#96e0f7", padding: 0 }}
          searchWords={[keyword]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ),
    },
    {
      title: "HHHeadName",
      dataIndex: "hh_head_name",
      key: "hh_head_name",
      render: (text) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#96e0f7", padding: 0 }}
          searchWords={[keyword]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ),
    },
    {
      dataIndex: "village_id",
      title: t("Location"),
      render: (text, record) => (
        <span style={{ fontSize: "12px" }}>{`${
          dataLanguage === "la" ? record.provname : record.provnameeng
        } / ${
          dataLanguage === "la" ? record.distnamelao : record.distnameeng
        } / ${
          dataLanguage === "la" ? record.village_name : record.villnameeng
        }/ ${record.unit_name}`}</span>
      ),
    },
    {
      dataIndex: "district_status_name",
      title: t("district_status_name"),
      render: (text, record) => {
        return renderStatusJSX(text);
      },
    },
    {
      dataIndex: "central_status_name",
      title: t("central_status_name"),
      render: (text, record) => {
        return renderStatusJSX(text);
      },
    },
    {
      key: "actions",
      align: "center",
      dataIndex: "actions",
      render: (data, record) => {
        return (
          <div className="d-flex justify-content-end" style={{ minWidth: 80 }}>
            <Button
              className="set-center-content mr-1"
              icon={<i className="fas fa-info-circle"></i>}
              size={"small"}
              type="primary"
              onClick={() => {
                dispatch({
                  type: actionRedux.UPDATE_STATUS_PAGE_ON_CENTRAL_APPROVE,
                  payload: {
                    page: page,
                    region: filterVillage,
                    keyword: keyword,
                  },
                });
                history.push(
                  `${PATH.HOUSEHOLD_DETAIL_ON_CENTRAL_APPROVE}?hh_code=${record.hh_code}`
                );
              }}
            />
          </div>
        );
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys: listItems.map((item) => item.hh_id),
    hideSelectAll: true,
    getCheckboxProps: (item) => ({
      disabled:
        `${item.Status_Approve_District}${item.Status_Approve_Central}${item.Status_Reject}` ===
        "220",
    }),
    onSelect: (record, selected) => {
      if (listItems.length > 0) {
        if (
          record.Status_Approve_District ===
            listItems[0].Status_Approve_District &&
          record.Status_Approve_Central ===
            listItems[0].Status_Approve_Central &&
          record.Status_Reject === listItems[0].Status_Reject
        ) {
          if (selected) {
            dispatch({
              type: actionRedux.ADD_CENTRAL_APPROVE,
              payload: record,
            });
          } else {
            dispatch({
              type: actionRedux.DELETE_CENTRAL_APPROVE,
              payload: record,
            });
          }
        } else {
          message.warning(t("Only select household have same status!"));
        }
      } else {
        if (selected) {
          dispatch({
            type: actionRedux.ADD_CENTRAL_APPROVE,
            payload: record,
          });
        } else {
          dispatch({
            type: actionRedux.DELETE_CENTRAL_APPROVE,
            payload: record,
          });
        }
      }
    },
  };

  const onChangePage = (number) => {
    setPage(number);
    let region = "";
    if (userVillage.length !== 1) {
      region = filterVillage === "all" ? "" : `&region=${filterVillage}`;
    }
    const keywordData = keyword ? `&keyword=${keyword}` : "";
    history.push(
      `${PATH.CENTRAL_APPROVE}?page=${number}${region}${keywordData}`
    );
  };

  const onSearchHandle = () => {
    let region = "";
    if (userVillage.length !== 1) {
      region = filterVillage === "all" ? "" : `&region=${filterVillage}`;
    }
    const keywordData = keyword ? `&keyword=${keyword}` : "";
    history.push(`${PATH.CENTRAL_APPROVE}?page=1${region}${keywordData}`);
  };

  return (
    <div className="w-100 h-100">
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <div className="d-flex flex-row align-items-center justify-content-between row">
        <div className="col-xl-4 col-md-5 col-12">
          <span className="h5 mb-0">{t("CENTRALAPPROVE")}</span>
        </div>
      </div>
      <Divider />
      <div className="row">
        <div className="col-xl-2 col-lg-2 col-12 col-sm-4 d-flex flex-column align-items-start justify-content-end mb-3">
          <span style={{ fontSize: "12px" }}>{t("Keyword")}</span>
          <Input
            id="demo-foo-search"
            type="text"
            placeholder={t("PLEASE_INPUT_KEYWORD")}
            style={{ width: "100%" }}
            allowClear
            value={keyword}
            onChange={(event) => {
              event.preventDefault();
              setKeyword(event.target.value);
            }}
          />
        </div>
        {userVillage && userVillage.length === 0 ? (
          <div className="col-xl-4 col-lg-4 col-12 col-sm-6 d-flex flex-row align-items-end justify-content-end mb-3">
            <CascaderFilter setFilterVillage={setFilterVillage} />
          </div>
        ) : null}
        {userVillage && userVillage.length === 1 ? (
          <div className="col-xl-4 col-lg-4 col-12 col-sm-6 d-flex flex-column align-items-end justify-content-end mb-3">
            <div className="d-flex flex-column align-items-start justify-content-end">
              <span>{t("Select Village")}</span>
              <Input
                id="demo-foo-search-01"
                type="text"
                placeholder={t("PLEASE_INPUT_KEYWORD")}
                style={{ width: "250px" }}
                value={
                  dataLanguage === "la"
                    ? userVillage[0].villname
                    : userVillage[0].villnameeng
                }
                disabled
              />
            </div>
          </div>
        ) : null}
        {userVillage && userVillage.length > 1 ? (
          <div className="col-xl-4 col-lg-4 col-12 col-sm-6 d-flex flex-column align-items-end justify-content-end mb-3">
            <div className="d-flex flex-column align-items-start justify-content-end">
              <span>{t("Select Village")}</span>
              <Select
                value={filterVillage}
                style={{ width: "250px" }}
                onChange={(value) => {
                  setFilterVillage(value);
                }}
              >
                <Select.Option value="all">{t("ALL")}</Select.Option>
                {userVillage.map((items) => (
                  <Select.Option
                    key={items.village_id}
                    value={items.village_id}
                  >
                    {dataLanguage === "la" ? items.villname : items.villnameeng}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        ) : null}
        <div className="col-xl-2 col-lg-2 col-12 col-sm-2 d-flex flex-column align-items-end justify-content-end mb-3">
          <Button
            type="primary"
            onClick={() => {
              onSearchHandle();
            }}
          >
            <div className="d-flex flex-row justify-content-center align-items-center">
              <SearchOutlined className="mr-1" />
              <span>{t("Search")}</span>
            </div>
          </Button>
        </div>
        <div className="col-xl-4 col-lg-4 col-12 col-sm-12 d-flex flex-row align-items-end justify-content-end mb-3">
          {listItems.length === 0 ? null : (
            <>
              <Button
                onClick={() => {
                  dispatch({
                    type: actionRedux.SET_LIST_CENTRAL_APPROVE,
                    payload: [],
                  });
                }}
                className="mr-2"
              >
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <DeleteOutlined></DeleteOutlined>
                  <span className="ml-2">{t("Clear All")}</span>
                </div>
              </Button>
              {["201"].includes(
                `${listItems[0].Status_Approve_District}${listItems[0].Status_Approve_Central}${listItems[0].Status_Reject}`
              ) ? null : (
                <div className="mr-3">
                  <Badge count={listItems.length} overflowCount={999}>
                    <Button
                      danger
                      onClick={() => {
                        const sendRequest = async () => {
                          let cookies = new Cookies();
                          cookies = cookies.get("user");
                          message.loading({
                            content: "Loading...",
                            key: "message-form-approved-cm",
                            duration: 30,
                          });
                          return await approveHouseHoldApi
                            .CentralReject(
                              {
                                HouseHolds: listItems.map(
                                  (el) => `${el.hh_code}`
                                ),
                                Status_Approve_District: 0,
                                Status_Approve_Central: 0,
                                Status_Reject: 0,
                                Status_Block_Data: 0,
                                DateTime_Approve_Action: 0,
                                User_Approve_Action: Number(cookies.userId),
                                district_status_name: 0,
                                central_status_name: 0,
                                full_name: cookies.fullName,
                              },
                              `Central Reject : ${listItems.length} Households`
                            )
                            .then((res) => {
                              message.success({
                                content: t("REJECT_SUCCESS"),
                                key: "message-form-approved-cm",
                                duration: 1,
                              });
                              history.push(
                                `${history.location.pathname}${history.location.search}`
                              );
                              dispatch({
                                type: actionRedux.SET_LIST_CENTRAL_APPROVE,
                                payload: [],
                              });
                            })
                            .catch((error) => {
                              setCheckLoading(false);
                              messageError({
                                content: error,
                                key: "message-form-approved-cm",
                                duration: 2,
                              });
                            });
                        };
                        confirm({
                          title: `Are you sure reject for ${listItems.length} households`,
                          icon: <ExclamationCircleOutlined />,
                          okText: "Yes",
                          okType: "danger",
                          cancelText: "No",
                          onOk() {
                            sendRequest();
                          },
                          onCancel() {},
                        });
                      }}
                    >
                      <div className="d-flex flex-row justify-content-center align-items-center">
                        <i className="fas fa-reply"></i>
                        <span className="ml-2">{t("Reject")}</span>
                      </div>
                    </Button>
                  </Badge>
                </div>
              )}
              <div>
                <Badge count={listItems.length} overflowCount={999}>
                  <Button
                    style={{ color: "#52c41a", borderColor: "#52c41a" }}
                    onClick={() => {
                      const sendRequest = async () => {
                        let cookies = new Cookies();
                        cookies = cookies.get("user");
                        message.loading({
                          content: "Loading...",
                          key: "message-form-approved-cm",
                          duration: 30,
                        });
                        return await approveHouseHoldApi
                          .CentralApprove(
                            {
                              HouseHolds: listItems.map(
                                (el) => `${el.hh_code}`
                              ),
                              Status_Approve_District: 0,
                              Status_Approve_Central: 0,
                              Status_Reject: 0,
                              Status_Block_Data: 0,
                              DateTime_Approve_Action: 0,
                              User_Approve_Action: Number(cookies.userId),
                              district_status_name: 0,
                              central_status_name: 0,
                              full_name: cookies.fullName,
                            },
                            `Central Approve : ${listItems.length} Households`
                          )
                          .then((res) => {
                            message.success({
                              content: t("APPROVED_SUCCESS"),
                              key: "message-form-approved-cm",
                              duration: 1,
                            });
                            history.push(
                              `${history.location.pathname}${history.location.search}`
                            );
                            dispatch({
                              type: actionRedux.SET_LIST_CENTRAL_APPROVE,
                              payload: [],
                            });
                          })
                          .catch((error) => {
                            setCheckLoading(false);
                            messageError({
                              content: error,
                              key: "message-form-approved-cm",
                              duration: 2,
                            });
                          });
                      };
                      confirm({
                        title: `Are you sure approve for ${listItems.length} households`,
                        icon: <ExclamationCircleOutlined />,
                        okText: "Yes",
                        okType: "danger",
                        cancelText: "No",
                        onOk() {
                          sendRequest();
                        },
                        onCancel() {},
                      });
                    }}
                  >
                    <div className="d-flex flex-row justify-content-center align-items-center">
                      <i className="fas fa-check"></i>
                      <span className="ml-2">
                        {t("Approve")}
                        {/* {["100", "001"].includes(
                          `${listItems[0].Status_Approve_District}${listItems[0].Status_Approve_Central}${listItems[0].Status_Reject}`
                        )
                          ? 
                          : t("Request Central")} */}
                      </span>
                    </div>
                  </Button>
                </Badge>
              </div>
            </>
          )}
        </div>
      </div>
      <Table
        rowSelection={rowSelection}
        style={{ overflow: "auto" }}
        columns={columns}
        dataSource={listHouseHold || []}
        size="small"
        rowKey="hh_id"
        pagination={{
          current: Number(page),
          pageSize: 12,
          total: totalPage,
          onChange: (page) => {
            onChangePage(page);
          },
          showSizeChanger: false,
        }}
      />
    </div>
  );
}
