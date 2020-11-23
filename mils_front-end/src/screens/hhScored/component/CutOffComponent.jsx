import {
  Button,
  Col,
  Input,
  message,
  Modal,
  Row,
  Table,
  Tag,
  Typography,
  Select,
  Tabs,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import getCutOff from "../../../api/getCutOff";
import CCTProgramApi from "../../../api/CCTProgramApi";
import { useSelector } from "react-redux";
import { messageError } from "../../../components/MessageError";
import Highlighter from "react-highlight-words";
import { saveAs } from "file-saver";

function CutOffComponent(props) {
  const { visible, setVisible } = props;
  const { Option } = Select;
  const [isLoading, setLoading] = useState(false);
  const [dataFilter, setDataFilter] = useState([]);

  const [page, setPage] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { TabPane } = Tabs;
  const [itemCutOff, setItemCutOff] = useState(0);
  const [loadingSelect, setLoadingSelect] = useState(false);
  const [listLevelCutOff, setListLevelCutOff] = useState([]);
  const [listVillageCutOff, setListVillageCutOff] = useState([]);

  const [blobFileData, setBlobFileData] = useState(null);

  const { Text } = Typography;
  const { t } = useTranslation();

  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    setShowTable(false);
    setSearchText("");
    setItemCutOff(0);
    setListLevelCutOff([]);
    setListVillageCutOff([]);
    if (visible) {
      setLoadingSelect(true);
      const fetchDataCutOffLevel = async () => {
        return await CCTProgramApi.GetCutOffLevel({})
          .then((res) => {
            setLoadingSelect(false);
            setListLevelCutOff(res.data.Data);
          })
          .catch((error) => {
            messageError({
              content: error,
              duration: 2,
            });
          });
      };
      fetchDataCutOffLevel();
    }
  }, [visible]);

  const columns = [
    {
      title: t("HHCode"),
      dataIndex: "HHCode",
      key: "HHCode",
      align: "center",
      render: (text) => (
        <div style={{ minWidth: 100 }}>
          <Highlighter
            highlightStyle={{ backgroundColor: "#96e0f7", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        </div>
      ),
    },
    {
      title: t("HEAD_OF_HH_NAME"),
      dataIndex: "HHHeadName",
      key: "HHHeadName",
      align: "center",
      render: (text) => (
        <div style={{ minWidth: 120 }}>
          <Highlighter
            highlightStyle={{ backgroundColor: "#96e0f7", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        </div>
      ),
    },
    {
      title: t("VillageId"),
      dataIndex: "VillageId",
      key: "VillageId",
      align: "center",
      render: (text) => <div style={{ minWidth: 50 }}>{text}</div>,
    },
    {
      title: t("HHNum"),
      dataIndex: "HHNum",
      key: "HHNum",
      align: "center",
      render: (text) => <div style={{ minWidth: 50 }}>{text}</div>,
    },
    {
      title: t("HHLevel"),
      dataIndex: "HHLevel",
      key: "HHLevel",
      align: "center",
      render: (text) => <div style={{ minWidth: 50 }}>{text}</div>,
    },
    {
      title: t("PMT_SCORED"),
      dataIndex: "PMTScored",
      key: "PMTScored",
      align: "center",
      render: (text) => (
        <div style={{ minWidth: 80 }}>
          <Tag color={"green"}>
            <span className="font-weight-600">{text}</span>
          </Tag>
        </div>
      ),
    },
    {
      title: t("Date"),
      dataIndex: "CalDateTime",
      key: "CalDateTime",
      align: "center",
      render: (text) => (
        <div style={{ minWidth: 100 }}>{text ? text : "-"}</div>
      ),
    },
  ];

  const onCutOff = async () => {
    if (listLevelCutOff.length === 0) {
      return message.error("List Level Cut Off Is Null !");
    }
    setLoading(true);
    await getCutOff
      .getAll({
        cutOff: listLevelCutOff.find((el) => `${el.Id}` === `${itemCutOff}`)
          .LevelValue,
      })
      .then((res) => {
        fetch(
          `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${res.data.Data.Base64Excel}`
        )
          .then((res) => {
            return res.blob();
          })
          .then((blobs) => {
            setBlobFileData(blobs);
          });
        setDataFilter(res.data.Data.PMTScoreds);
        setListVillageCutOff(
          [...new Set(res.data.Data.PMTScoreds.map((el) => el.VillageId))].map(
            (ele) => {
              const itemVillage = res.data.Data.PMTScoreds.find(
                (itemArray) => itemArray.VillageId === ele
              );
              return {
                VillageId: itemVillage.VillageId,
                Village: itemVillage.Village,
                VillageEng: itemVillage.VillageEng,
              };
            }
          )
        );
        setShowTable(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        messageError({
          content: error,
          duration: 2,
        });
      });
  };

  const footerModal = () => {
    return showTable
      ? [
          <Button
            key={"1"}
            type={"primary"}
            className="ml-auto"
            onClick={() => {
              setShowTable(false);
              setSearchText("");
            }}
          >
            {t("BACK")}
          </Button>,
        ]
      : [
          <Button
            key="1"
            onClick={() => {
              setVisible(false);
            }}
          >
            {t("CANCEL")}
          </Button>,
          <Button key="2" type="primary" loading={isLoading} onClick={onCutOff}>
            {t("CUTOFF")}
          </Button>,
        ];
  };

  const filterDataTale = (arrayData) => {
    let arraySearch = arrayData;
    if (searchText && searchText !== "") {
      arraySearch = arrayData.filter(
        (el) =>
          el.HHCode.toLowerCase().indexOf(searchText.trim().toLowerCase()) >=
            0 ||
          el.HHHeadName.toLowerCase().indexOf(
            searchText.trim().toLowerCase()
          ) >= 0
      );
    }
    return arraySearch;
  };

  return (
    <Modal
      title="Cut Off Household PMT Scored"
      visible={visible}
      width={showTable ? "90%" : "400px"}
      onCancel={() => {
        setVisible(false);
      }}
      onOk={onCutOff}
      cancelButtonProps={{
        type: "default",
      }}
      bodyStyle={{
        paddingTop: 8,
        paddingBottom: 0,
      }}
      style={showTable ? { top: 20 } : null}
      footer={footerModal()}
      forceRender
    >
      {showTable ? (
        <>
          <Row className="mb-2" gutter={[16]}>
            <Col
              span={24}
              md={8}
              lg={4}
              className="flex-row d-flex align-items-center"
            >
              <span className="mr-2">{t("Search")}</span>
              <Input
                value={searchText}
                placeholder={`${t("HEAD_OF_HH_NAME")} / ${t("HHCode")}`}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                allowClear
              />
            </Col>
            <Col
              span={24}
              md={8}
              lg={16}
              className="flex-row d-flex align-items-center justify-content-center"
            >
              <span className="mr-2" style={{ fontSize: "18px", color: "red" }}>
                {t("CUTOFFPOINT")}
                {` : `}
                {
                  listLevelCutOff.find(
                    (elee) => `${elee.Id}` === `${itemCutOff}`
                  ).LevelValue
                }
                {`%`}
              </span>
            </Col>
            <Col
              span={24}
              md={8}
              lg={4}
              className="flex-row d-flex align-items-center justify-content-end"
            >
              <Tooltip title="Export Excel">
                <Button
                  className="set-center-content mr-2"
                  icon={<i className="fas fa-file-excel mr-2"></i>}
                  style={{ color: "#0c960c", border: "1px #0c960c solid" }}
                  onClick={() => {
                    const fileExtension = ".xlsx";
                    saveAs(
                      blobFileData,
                      `${t("HouseHousePMTScore")}` + fileExtension
                    );
                  }}
                >
                  Export Excel
                </Button>
              </Tooltip>
            </Col>
          </Row>
          {listVillageCutOff.length > 1 ? (
            <Tabs style={{ marginBottom: 32 }} type="card" className="mt-3">
              {listVillageCutOff.map((item) => (
                <TabPane
                  tab={`${
                    dataLanguage === "la" ? item.Village : item.VillageEng
                  } ( ${
                    dataFilter.filter((el) => el.VillageId === item.VillageId)
                      .length
                  } Households)`}
                  key={item.VillageId}
                >
                  <Table
                    columns={columns}
                    dataSource={filterDataTale(dataFilter)
                      .filter((el) => el.VillageId === item.VillageId)
                      .sort((a, b) => a.PMTScored - b.PMTScored)}
                    rowKey="HHCode"
                    size="small"
                    pagination={{
                      current: Number(page),
                      pageSize: 12,
                      total: filterDataTale(dataFilter).filter(
                        (el) => el.VillageId === item.VillageId
                      ).length,
                      onChange: (value) => {
                        setPage(value);
                      },
                    }}
                    className="hh-scored--table"
                  />
                </TabPane>
              ))}
            </Tabs>
          ) : (
            <Table
              columns={columns}
              dataSource={filterDataTale(dataFilter)}
              rowKey="HHCode"
              size="small"
              pagination={{
                current: Number(page),
                pageSize: 12,
                total: filterDataTale(dataFilter).length,
                onChange: (value) => {
                  setPage(value);
                },
                // showSizeChanger: false,
              }}
              className="hh-scored--table"
            />
          )}
        </>
      ) : (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Text className="mr-2">{t("CUTOFFPOINT")} : </Text>
            <Select
              disabled={loadingSelect}
              loading={loadingSelect}
              defaultValue={itemCutOff}
              style={{ width: "150px" }}
              onSelect={(value) => {
                setItemCutOff(value);
              }}
            >
              {(listLevelCutOff || []).map((item) => (
                <Option key={item.Id} value={item.Id}>
                  [ {item.LevelName || "Default"} ] : {item.LevelValue}%
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      )}
    </Modal>
  );
}

export default CutOffComponent;
