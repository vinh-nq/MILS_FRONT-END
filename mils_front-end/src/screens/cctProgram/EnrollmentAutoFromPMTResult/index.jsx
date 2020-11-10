import React, { useEffect, useState } from "react";
import {
  Transfer,
  Result,
  Table,
  Tag,
  List,
  Input,
  Button,
  message,
  Tooltip,
  Steps,
  Modal,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import difference from "lodash/difference";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner";
import CCTProgramApi from "../../../api/CCTProgramApi";
import CascaderFilter from "./components/CascaderFilter";
import "./styles.scss";
import { PATH } from "../../../routers/Path";

export default function ENROLLONDEMAND(props) {
  const { t } = useTranslation();
  const { Step } = Steps;
  const [current, setCurrent] = React.useState(0);
  const history = useHistory();
  const [checkLoading, setCheckLoading] = useState(false);
  const [valueLocation, setValueLocation] = useState("");
  const [PMTScore, setPMTScore] = useState(0);
  const [targetKeys, setTargetKeys] = useState([]);
  const [maxScore, setMaxScore] = useState(0);
  const [minScore, setMinScore] = useState(0);
  const [pointFrom, setPointFrom] = useState();
  const [pointTo, setPointTo] = useState();
  const [dataHH, setDataHH] = useState([]);
  const [listHHConfirm, setListHHConfirm] = useState(false);
  const [listHHConfig, setListHHConfig] = useState(false);
  const { confirm } = Modal;
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  const steps = [
    {
      title: "Select HouseHold",
    },
    {
      title: "Reconfirm",
    },
    {
      title: "Done",
    },
  ];

  useEffect(() => {
    const fetchDataPMTScore = async () => {
      setCheckLoading(true);
      return await CCTProgramApi.GetScoreConfig({}).then((res) => {
        setCheckLoading(false);
        setPMTScore(Number(res.data.Data));
      });
    };
    fetchDataPMTScore();
  }, []);

  const GenPMTScored = async (idProvince, idDistrict, idVillage) => {
    setCheckLoading(true);
    return await CCTProgramApi.GenPMTScored({
      provinceId: idProvince,
      districtId: idDistrict,
      villageId: idVillage,
    }).then((res) => {
      setCheckLoading(false);
      setDataHH(res.data.Data);
      setMinScore(
        Math.min(...res.data.Data.map((el) => Number(el.PMTScored))) || 0
      );
      setMaxScore(
        Math.max(...res.data.Data.map((el) => Number(el.PMTScored))) || 0
      );
    });
  };
  //Gender Data HH when have PMT score
  const genderDataHH = () => {
    if (!valueLocation || valueLocation.length === 0) {
      message.error("Please select Province/ Disytrict/ Village!");
      return;
    }
    setTargetKeys([]);
    setListHHConfig([]);
    setListHHConfirm([]);
    switch (valueLocation.length) {
      case 1:
        //Case Province
        GenPMTScored(valueLocation[0], null, null);
        break;
      case 2:
        //Case District
        GenPMTScored(valueLocation[0], valueLocation[1], null);
        break;
      case 3:
        //Case Village
        GenPMTScored(valueLocation[0], valueLocation[1], valueLocation[2]);
        break;
      default:
        break;
    }
  };
  // Customize Table Transfer
  const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps} showSelectAll={false}>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === "left" ? leftColumns : rightColumns;

        const rowSelection = {
          getCheckboxProps: (item) => ({
            disabled: listDisabled || item.disabled,
          }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter((item) => !item.disabled)
              .map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ key }, selected) {
            onItemSelect(key, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };

        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            style={{ pointerEvents: listDisabled ? "none" : null }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) return;
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
          />
        );
      }}
    </Transfer>
  );

  const leftTableColumns = [
    {
      dataIndex: "title",
      title: t("HHCode"),
      render: (text, record) => (
        <div>
          {record.IsLocked ? (
            <Tooltip title="Household was locked!" color={"volcano"}>
              <i className="fas fa-lock mr-1" style={{ color: "red" }}></i>
              <span style={{ fontSize: "12px" }}>{text}</span>
            </Tooltip>
          ) : (
            <span style={{ fontSize: "12px" }}>{text}</span>
          )}
        </div>
      ),
    },
    {
      dataIndex: "description",
      title: t("HHHeadName"),
      render: (text) => <span style={{ fontSize: "12px" }}>{text}</span>,
    },
    {
      dataIndex: "StatusId",
      title: t("Status"),
      render: (text, record) => (
        <span style={{ fontSize: "12px" }}>
          {dataLanguage === "la" ? record.Status : record.StatusEng}
        </span>
      ),
    },
    {
      dataIndex: "PMTScored",
      title: t("PMTScored"),
      sorter: {
        compare: (a, b) => a.PMTScored - b.PMTScored,
      },
      width: "110px",
      defaultSortOrder: "ascend",
      render: (text) => {
        return text > PMTScore ? (
          <div className="d-flex justify-content-end">
            <Tag color="red">{text}</Tag>
          </div>
        ) : (
          <div className="d-flex justify-content-end">
            <Tag color="green">{text}</Tag>
          </div>
        );
      },
    },
  ];

  const tableColumnsConfirm = [
    {
      dataIndex: "title",
      title: t("HHCode"),
      render: (text, record) => (
        <div>
          {record.IsLocked ? (
            <Tooltip title="Household was locked!" color={"volcano"}>
              <i className="fas fa-lock mr-1" style={{ color: "red" }}></i>
              <span style={{ fontSize: "12px" }}>{text}</span>
            </Tooltip>
          ) : (
            <span style={{ fontSize: "12px" }}>{text}</span>
          )}
        </div>
      ),
    },
    {
      dataIndex: "description",
      title: t("HHHeadName"),
      render: (text) => <span style={{ fontSize: "12px" }}>{text}</span>,
    },
    {
      dataIndex: "StatusId",
      title: t("Status"),
      render: (text, record) => (
        <span style={{ fontSize: "12px" }}>
          {dataLanguage === "la" ? record.Status : record.StatusEng}
        </span>
      ),
    },
    {
      dataIndex: "PMTScored",
      title: t("PMTScored"),
      sorter: {
        compare: (a, b) => a.PMTScored - b.PMTScored,
      },
      width: "110px",
      render: (text) => {
        return text > PMTScore ? (
          <div className="d-flex justify-content-end">
            <Tag color="red">{text}</Tag>
          </div>
        ) : (
          <div className="d-flex justify-content-end">
            <Tag color="green">{text}</Tag>
          </div>
        );
      },
    },
  ];

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectHouseHold = () => {
    if (pointFrom > pointTo) {
      message.error("Score From have to less than Score To !");
      return;
    }
    const dataFilter = dataHH.filter(
      (el) =>
        el.PMTScored <= (pointTo || maxScore) &&
        el.PMTScored >= (pointFrom || minScore) &&
        !el.IsLocked
    );
    setTargetKeys(dataFilter.map((el) => el.HHCode));
  };

  const addDataHouseHold = async () => {
    const dataPost = listHHConfirm.map((el) => {
      return {
        ...el,
        CreatedDate: null,
        CreatedBy: null,
        UpdatedDate: null,
        UpdatedBy: null,
      };
    });
    message.loading({
      content: "Loading...",
      key: "AddHHEnrollment",
      duration: 30,
    });
    return await CCTProgramApi.AddNewCCTConfirm(dataPost)
      .then((res) => {
        message.success({ content: t("ADD_SUCCESS"), key: "AddHHEnrollment" });
        setTargetKeys([]);
        setListHHConfig([]);
        setListHHConfirm([]);
        setCurrent(2);
      })
      .catch((e) => {
        message.error({ content: e.message, key: "AddHHEnrollment" });
      });
  };

  const next = async () => {
    if (current === 0) {
      if (targetKeys.length <= 0) {
        message.warning("You have to select Househod!");
        return;
      }
      setListHHConfirm(
        targetKeys
          .map((el) => {
            const object = dataHH.find((ele) => ele.HHCode === el);
            return {
              ...object,
            };
          })
          .filter((el) => !el.Status)
      );
      setListHHConfig(
        targetKeys
          .map((el) => {
            const object = dataHH.find((ele) => ele.HHCode === el);
            return {
              ...object,
            };
          })
          .filter((el) => el.Status)
      );
    }
    if (current === 1) {
      if (listHHConfig.length > 0) {
        message.error(`List Of Existed Items have ${listHHConfig.length} item`);
        return;
      }
      if (listHHConfirm.length <= 0) {
        message.error(`Please select households !`);
        return;
      }
      return await addDataHouseHold();
    }
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const setDataOveride = (objectData) => {
    setListHHConfirm([objectData, ...listHHConfirm]);
    setListHHConfig(
      listHHConfig.filter((el) => el.HHCode !== objectData.HHCode)
    );
  };

  const setDataOverideAll = () => {
    setListHHConfirm([...listHHConfig, ...listHHConfirm]);
    setListHHConfig([]);
  };

  const setDataCancelAll = () => {
    setListHHConfig([]);
  };

  const setDataCancel = (objectData) => {
    setListHHConfig(
      listHHConfig.filter((el) => el.HHCode !== objectData.HHCode)
    );
  };

  const resetData = () => {
    setCurrent(0);
    setValueLocation([]);
    setDataHH([]);
  };

  return (
    <div className="w-100 h-100">
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <div className="d-flex flex-row align-items-center justify-content-between row">
        <div className="col-xl-6 col-md-3 col-12">
          <span className="h5 mb-0">{t("ENROLLONDEMAND")}</span>
        </div>
        <div className="col-xl-6 col-md-9 col-12 d-flex flex-row justify-content-end align-items-end row pr-4">
          <CascaderFilter
            valueLocation={valueLocation}
            setValueLocation={setValueLocation}
            disabled={current !== 0}
          />
          <Button
            className="col-xl-2 col-md-2 col-2"
            style={{ fontSize: "12px" }}
            onClick={genderDataHH}
            type="primary"
            disabled={current !== 0}
          >
            {t("Gender Data")}
          </Button>
        </div>
      </div>
      <Steps current={current} className="mt-3">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="w-100">
        {current === 0 ? (
          <>
            <div className="row mb-1 mt-3 d-flex align-items-center">
              <div className="col-xl-2 col-lg-3 col-md-3 col-12">
                <span className="mb-2" style={{ fontWeight: "600" }}>
                  {t("PMT Score")}
                </span>
                <span className="mb-2 ml-1">
                  <Tag color="blue">{PMTScore}</Tag>
                </span>
              </div>
              {dataHH.length > 0 ? (
                <>
                  <div className="col-xl-2 col-lg-3 col-md-3 col-12">
                    <span className="mb-2" style={{ fontWeight: "600" }}>
                      {t("Max score")}
                    </span>
                    <span className="mb-2 ml-1">
                      <Tag color="orange">{maxScore}</Tag>
                    </span>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-3 col-12">
                    <span className="mb-2" style={{ fontWeight: "600" }}>
                      {t("Min score")}
                    </span>
                    <span className="mb-2 ml-1">
                      <Tag color="cyan">{minScore}</Tag>
                    </span>
                  </div>
                  <div className="col-xl-6 col-lg-3 col-md-3 col-12">
                    <span className="mb-2" style={{ fontWeight: "600" }}>
                      Have
                    </span>
                    <span className="mb-2 ml-1">
                      <Tag color="volcano">
                        {
                          dataHH.filter(
                            (el) => el.PMTScored < PMTScore && !el.IsLocked
                          ).length
                        }
                      </Tag>
                    </span>
                    <span className="mb-2" style={{ fontWeight: "600" }}>
                      HH with below PMT scores medium.
                    </span>
                    {dataHH.filter(
                      (el) => el.PMTScored < PMTScore && !el.IsLocked
                    ).length > 0 ? (
                      <Tooltip
                        placement="top"
                        title={`Quick select ${
                          dataHH.filter(
                            (el) => el.PMTScored < PMTScore && !el.IsLocked
                          ).length
                        } households`}
                      >
                        <Button
                          className="ml-1"
                          style={{
                            height: "25px",
                            fontSize: "11px",
                            border: "1px solid blue",
                            color: "blue",
                          }}
                          onClick={(event) => {
                            event.preventDefault();
                            setTargetKeys(
                              dataHH
                                .filter(
                                  (el) =>
                                    el.PMTScored < PMTScore && !el.IsLocked
                                )
                                .map((el) => el.HHCode)
                            );
                          }}
                        >
                          Select{" "}
                          {
                            dataHH.filter(
                              (el) => el.PMTScored < PMTScore && !el.IsLocked
                            ).length
                          }{" "}
                          Households
                        </Button>
                      </Tooltip>
                    ) : null}
                  </div>
                </>
              ) : null}
            </div>
            {dataHH.length > 0 ? (
              <div className="mb-3 mt-3 d-flex flex-row">
                <span className="mb-2" style={{ fontWeight: "600" }}>
                  {t("Select Households Have Score From")}
                </span>
                <Input
                  style={{ width: "80px", height: "25px" }}
                  className="ml-1"
                  onChange={(e) => {
                    setPointFrom(e.target.value);
                  }}
                />
                <span className="mb-1 ml-1" style={{ fontWeight: "600" }}>
                  {t("To")}
                </span>
                <Input
                  style={{ width: "80px", height: "25px" }}
                  className="ml-1"
                  onChange={(e) => {
                    setPointTo(e.target.value);
                  }}
                />
                <Button
                  className="ml-2 d-flex align-items-center"
                  style={{ height: "25px" }}
                  type="primary"
                  onClick={onSelectHouseHold}
                >
                  {t("Select HouseHold")}
                </Button>
              </div>
            ) : null}

            <TableTransfer
              dataSource={dataHH.map((el) => ({
                ...el,
                key: el.HHCode,
                title: el.HHCode,
                description: el.HHHeadName,
                PMTScored: el.PMTScored,
                disabled: el.IsLocked,
              }))}
              targetKeys={targetKeys}
              locale={{
                itemUnit: t("HouseHold"),
                itemsUnit: t("HouseHolds"),
                searchPlaceholder: t("Search HouseHold Id"),
              }}
              showSearch={true}
              onChange={onChange}
              filterOption={(inputValue, item) =>
                item.title.indexOf(inputValue) !== -1 ||
                item.description.indexOf(inputValue) !== -1
              }
              leftColumns={leftTableColumns}
              rightColumns={leftTableColumns}
              operationStyle={{
                color: "red",
              }}
              style={{ overflow: "auto" }}
              className="container-tranfer-data mt-1"
            />
          </>
        ) : null}
        {current === 1 ? (
          <div className="mt-3 row">
            {listHHConfig.length > 0 ? (
              <div className="col-xl-6 col-lg-6 col-12">
                <List
                  header={
                    <div className="w-100 d-flex justify-content-between align-items-center">
                      <span>List Of Existed Items</span>
                      <div>
                        <Button
                          style={{ fontSize: "11px", height: "24px" }}
                          type="primary"
                          onClick={() => {
                            confirm({
                              title: "Do you want to overide all items?",
                              icon: <ExclamationCircleOutlined />,
                              onOk() {
                                setDataOverideAll();
                              },
                              onCancel() {},
                            });
                          }}
                        >
                          Overide {listHHConfig.map((el) => el.HHCode).length}{" "}
                          Households
                        </Button>
                        <Button
                          className="ml-1"
                          style={{ fontSize: "11px", height: "24px" }}
                          danger
                          onClick={() => {
                            confirm({
                              title: "Do you want to cancel all items?",
                              icon: <ExclamationCircleOutlined />,
                              onOk() {
                                setDataCancelAll();
                              },
                              onCancel() {},
                            });
                          }}
                        >
                          Cancel {listHHConfig.map((el) => el.HHCode).length}{" "}
                          Households
                        </Button>
                      </div>
                    </div>
                  }
                  footer={null}
                  bordered
                  dataSource={listHHConfig.map((el) => el.HHCode)}
                  renderItem={(item) => {
                    const objectData = listHHConfig.find(
                      (el) => el.HHCode === item
                    );
                    return (
                      <List.Item className="p-2">
                        <div className="d-flex flex-row align-items-center w-100">
                          <span style={{ fontSize: "11px", fontWeight: "600" }}>
                            {objectData.HHCode}
                          </span>
                          <span
                            style={{ fontSize: "12px", minWidth: "130px" }}
                            className="ml-4"
                          >
                            {objectData.HHHeadName}
                          </span>
                          <span
                            style={{ fontSize: "12px", width: "130px" }}
                            className="ml-2"
                          >
                            {objectData.Status}
                          </span>
                          <div
                            className="d-flex flex-row justify-content-end"
                            style={{ flex: 1 }}
                          >
                            <Button
                              style={{
                                height: "20px",
                                fontSize: "12px",
                                width: "50px",
                              }}
                              className="d-flex flex-row justify-content-center align-items-center"
                              type="primary"
                              onClick={() => {
                                setDataOveride(objectData);
                              }}
                            >
                              Overide
                            </Button>
                            <Button
                              style={{
                                height: "20px",
                                fontSize: "12px",
                                width: "50px",
                              }}
                              className="d-flex flex-row justify-content-center align-items-center ml-2"
                              danger
                              onClick={() => {
                                setDataCancel(objectData);
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </List.Item>
                    );
                  }}
                  size="small"
                />
              </div>
            ) : null}
            <div className="col">
              <Table
                style={{ overflow: "auto" }}
                rowSelection={{
                  onChange: (data) => {
                    setTargetKeys(data);
                  },
                  selectedRowKeys: targetKeys,
                }}
                columns={tableColumnsConfirm}
                dataSource={(listHHConfirm || []).map((el) => {
                  return {
                    ...el,
                    key: el.HHCode,
                    title: el.HHCode,
                    description: el.HHHeadName,
                    PMTScored: el.PMTScored,
                    disabled: el.IsLocked,
                  };
                })}
                size="small"
              />
            </div>
          </div>
        ) : null}
        {current === 2 ? (
          <Result
            status="success"
            title="Successfully Add List Househod!"
            extra={[
              <Button
                key="console"
                onClick={() => {
                  resetData();
                }}
              >
                {t("Select More Household")}
              </Button>,
              <Button
                type="primary"
                key="console1"
                onClick={() => {
                  history.push(PATH.EROLLMENT_AUTO_FROM_PMT_RESULT);
                }}
              >
                {t("See List HouseHold Enrollment")}
              </Button>,
            ]}
          />
        ) : null}
        <div className="w-100 d-flex justify-content-end align-items-center mt-3">
          {current < 2 && current !== 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              {t("Previous")}
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              {current === 1 ? t("Enrollment To CCT Program") : t("Next")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
