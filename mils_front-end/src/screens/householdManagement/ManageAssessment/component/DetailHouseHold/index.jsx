import React, { useEffect, useState } from "react";
import { BackTop, Button, Col, message, Popconfirm, Row, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons/lib/icons";
import { useTranslation } from "react-i18next";
import houseHoldApi from "../../../../../api/houseHoldApi";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import GoogleMapReact from "google-map-react";
import { getValueOfQueryParams } from "../../../../../utils/getValueOfQueryParams";
import { useHistory } from "react-router-dom";
import { PATH } from "../../../../../routers/Path";
import PlotLandComponent from "./component/PlotLandComponent";
import plotLandApi from "../../../../../api/plotLandApi";
import DevelopmentComponent from "./component/DevelopmentFamilyComponent";
import PrimaryPublicServiceComponent from "./component/PrimaryPublicServiceComponent";
import OccupationAndIncomeComponent from "./component/OccupationAndIncomeComponent";
import ToolsForLivingComponent from "./component/ToolsForLivingComponent";
import EssentialPropertyAndInstrumentsComponent from "./component/EssentialPropertyAndInstrumentsComponent";
import ShelterComponent from "./component/ShelterComponent";
import GeneralInformationComponent from "./component/GeneralInformationComponent";
import AddressComponent from "./component/AddressComponent";
import "./scss/style.scss";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import { messageError } from "../../../../../components/MessageError";

const Marker = (props) => {
  const { name } = props;
  return (
    <span className="text-danger pointer" title={name}>
      <i className="fas fa-map-marker-alt font-24"></i>
    </span>
  );
};

function DetailBeneficiary(props) {
  const [detailHouseHold, setDetailHouseHold] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [HHCode, setHHCode] = useState("");
  const [visiblePlotLand, setVisiblePlotLand] = useState(false);
  const [typeModalPlotLand, setTypeModalPlotLand] = useState("ADD");
  const [objectPlotLand, setObjectPlotLand] = useState({});
  const [defaultProps, setDefaultProps] = useState({
    center: {
      lat: 17.974855,
      lng: 102.630867,
    },
    zoom: 10,
  });

  let history = useHistory();

  const { t } = useTranslation();
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    const hh_code = getValueOfQueryParams(
      history.location,
      "hh_code",
      "STRING"
    );
    setHHCode(hh_code);
    const getDetailHouseHold = async (hh_code) => {
      setLoading(true);
      await houseHoldApi
        .getDetailHouseHold({ householdId: hh_code })
        .then((res) => {
          setLoading(false);
          const { LatLongForBeneficiary } = res.data.Data;
          setDefaultProps((defaultProps) => {
            return {
              ...defaultProps,
              center: {
                lat: LatLongForBeneficiary.Lat
                  ? Number(LatLongForBeneficiary.Lat)
                  : 17.974855,
                lng: LatLongForBeneficiary.Long
                  ? Number(LatLongForBeneficiary.Long)
                  : 102.630867,
              },
            };
          });
          setDetailHouseHold(res.data.Data);
        })
        .catch((error) => {
          setLoading(false);
          messageError({
            content: error,
            duration: 2,
          });
        });
    };
    getDetailHouseHold(hh_code);
  }, [history.location]);

  const changeYesNoForQuestion = (value) => {
    if (value === false || value === "false") {
      return t("NO");
    } else if (value === true || value === "true") {
      return t("YES");
    } else {
      return "";
    }
  };

  const handleDeletePlotLand = async (id) => {
    setLoading(true);
    await plotLandApi
      .delete({ plotlandId: id })
      .then((res) => {
        if (res.data.Status) {
          setLoading(false);
          message.success({
            content: t("DELETE_SUCCESS"),
            key: "message-form-role",
            duration: 1,
          });
          const plotLandArray = { ...detailHouseHold };
          plotLandArray.PlotLands = res.data.Data;
          setDetailHouseHold(plotLandArray);
        } else {
          setLoading(false);
          message.error({
            content: t("DELETE_FAILED"),
            key: "message-form-role",
            duration: 1,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        messageError({
          content: error,
          duration: 2,
        });
      });
  };

  const handleDeleteMember = async (id) => {
    setLoading(true);
    await houseHoldApi
      .deleteMember({ memberId: id })
      .then((res) => {
        if (res.data.Status) {
          setLoading(false);
          message.success({
            content: t("DELETE_SUCCESS"),
            key: "message-form-role",
            duration: 1,
          });
          const memberArray = { ...detailHouseHold };
          memberArray.Members = res.data.Data;
          setDetailHouseHold(memberArray);
        } else {
          setLoading(false);
          message.error({
            content: t("DELETE_FAILED"),
            key: "message-form-role",
            duration: 1,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        messageError({
          content: error,
          duration: 2,
        });
      });
  };

  const columns = [
    {
      title: <span className="font-weight-600">{t("ITEM")}</span>,
      dataIndex: "item",
      key: "item ",
      align: "center",
      render: (data, record, index) => index + 1,
    },
    {
      title: <span className="font-weight-600">{t("MEMBER_NAME")}</span>,
      dataIndex: "MemberName",
      key: "MemberName",
      align: "center",
      render: (data) => <div style={{ minWidth: 100 }}>{data}</div>,
    },
    {
      title: <span className="font-weight-600">{t("MARITAL_STATUS")}</span>,
      dataIndex: "maritalStatus",
      key: "maritalStatus",
      align: "center",
      render: (data, record) => (
        <div style={{ minWidth: 100 }}>
          {dataLanguage === "la"
            ? record.MaritalStatus
            : record.MaritalStatusEng}
        </div>
      ),
    },
    {
      title: (
        <span className="font-weight-600">{t("RELATION_TO_HOUSEHOLD")}</span>
      ),
      dataIndex: "RelationToHosueHold",
      key: "RelationToHosueHold",
      align: "center",
      render: (data, record) => (
        <div style={{ minWidth: 100 }}>
          {dataLanguage === "la"
            ? record.RelationToHosueHold
            : record.RelationToHosueHoldEng}
        </div>
      ),
    },
    {
      title: <span className="font-weight-600">{t("GENDER")}</span>,
      dataIndex: "gender",
      key: "gender",
      align: "center",
      render: (data, record) => (
        <div style={{ minWidth: 100 }}>
          {dataLanguage === "la" ? record.Gender : record.GenderEng}
        </div>
      ),
    },
    {
      title: <span className="font-weight-600">{t("DOB")}</span>,
      dataIndex: "DateOfBirth",
      key: "DateOfBirth",
      align: "center",
      render: (data) => <div style={{ minWidth: 100 }}>{data}</div>,
    },
    {
      key: "view",
      align: "center",
      dataIndex: "view",
      render: (data, record) => (
        <div className="d-flex justify-content-end" style={{ minWidth: 60 }}>
          <Button
            className="set-center-content mr-1"
            icon={<EditOutlined />}
            size={"small"}
            type={"primary"}
            onClick={() => {
              history.push(
                `${PATH.UPDATE_MEMBER_IN_HOUSEHOLD}?memberId=${record.MemberId}`
              );
            }}
          />
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleDeleteMember(record.MemberId);
            }}
          >
            <Button
              className="set-center-content"
              danger
              size={"small"}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const columnsPlotLandList = [
    {
      title: <span className="font-weight-600">{t("ITEM")}</span>,
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (data, record, index) => index + 1,
    },
    {
      title: <span className="font-weight-600">{t("NAME_OF_PLOT")}</span>,
      dataIndex: "NameOfPlot",
      key: "NameOfPlot ",
      align: "center",
      render: (data) => <div style={{ minWidth: 150 }}>{data}</div>,
    },
    {
      title: <span className="font-weight-600">{t("NO_OF_PLOT")}</span>,
      dataIndex: "NoOfPlot",
      key: "NoOfPlot",
      align: "center",
      render: (data) => <div style={{ minWidth: 100 }}>{data}</div>,
    },
    {
      title: <span className="font-weight-600">{t("OWNED_OR_LEASED")}</span>,
      dataIndex: "OwnedOrLeased",
      key: "OwnedOrLeased",
      align: "center",
      render: (data, record) => (
        <div style={{ minWidth: 120 }}>
          {dataLanguage === "la"
            ? record.OwnedOrLeased
            : record.OwnedOrLeasedEng}
        </div>
      ),
    },
    {
      title: <span className="font-weight-600">{t("KIND_OF_LAND")}</span>,
      dataIndex: "kindOfLand",
      key: "kindOfLand",
      align: "center",
      render: (data, record) => (
        <div style={{ minWidth: 120 }}>
          {dataLanguage === "la" ? record.KindOfLand : record.KindOfLandEng}
        </div>
      ),
    },
    {
      title: <span className="font-weight-600">{t("TYPE_OF_LAND")}</span>,
      dataIndex: "TypeOfLand",
      key: "TypeOfLand",
      align: "center",
      render: (data, record) => (
        <div style={{ minWidth: 120 }}>
          {dataLanguage === "la" ? record.TypeOfLand : record.TypeOfLandEng}
        </div>
      ),
    },
    {
      key: "view",
      align: "center",
      dataIndex: "view",
      render: (data, record) => (
        <div className="d-flex justify-content-end" style={{ minWidth: 60 }}>
          <Button
            className="set-center-content mr-1"
            size={"small"}
            type={"primary"}
            icon={<EditOutlined />}
            onClick={() => {
              setValuePlotLandModal("UPDATE", record);
            }}
          />
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleDeletePlotLand(record.PlotLandId);
            }}
          >
            <Button
              className="set-center-content"
              size={"small"}
              danger
              icon={<DeleteOutlined className="font-16" />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const {
    LocationBeneficiary = {},
    GeneralInformationBeneficiary = {},
    Machine = {},
    StableOccupationAndIncome = {},
    Shelter = {},
    WaterAndPermanentEnergyBeneficiary = {},
    PrimaryPublicServiceForBeneficiary = {},
    DevelopmentFamilyViewModel = {},
    LatLongForBeneficiary = {},
  } = detailHouseHold;

  const setValuePlotLandModal = async (value, obj = {}) => {
    setTypeModalPlotLand(value);
    if (value === "UPDATE") {
      setLoading(true);
      await houseHoldApi
        .getInformationOfIndividualPlotLand({ plotlandId: obj.PlotLandId })
        .then((res) => {
          setLoading(false);
          setObjectPlotLand(res.data.Data);
        })
        .catch((error) => {
          setLoading(false);
          messageError({
            content: error,
            duration: 2,
          });
        });
    } else {
      setObjectPlotLand(obj);
    }
    setVisiblePlotLand(true);
  };

  const checkLongAndLat = () => {
    const { LatLongForBeneficiary = {} } = detailHouseHold;
    let isError = false;
    if (LatLongForBeneficiary.Lat && LatLongForBeneficiary.Long) {
      if (
        isNaN(LatLongForBeneficiary.Lat) ||
        isNaN(LatLongForBeneficiary.Long)
      ) {
        isError = true;
      } else if (
        LatLongForBeneficiary.Lat < -90 ||
        LatLongForBeneficiary.Lat > 90
      ) {
        isError = true;
      } else if (
        LatLongForBeneficiary.Long < -180 ||
        LatLongForBeneficiary.Long > 180.0
      ) {
        isError = true;
      } else {
        isError = false;
      }
    } else {
      isError = true;
    }
    return isError;
  };
  return (
    <div className="detail-beneficiary-form">
      {isLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : (
        <>
          <BackTop
            className="scroll-top"
            target={() => document.getElementById("my-layout")}
          />
          {/*Neu HHcode null thi k hien thi*/}
          {detailHouseHold.HHCode ? (
            <>
              <section className="border-bottom mb-3">
                <div className="d-md-flex align-items-center mb-3">
                  <span className="h5 mb-0">{t("BENEFICIARY_FORM")}</span>
                  {HHCode ? (
                    <div className="d-flex ml-auto">
                      <Button
                        className="set-center-content mr-lg-4 mr-1"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => {
                          props.history.push(PATH.HOUSEHOLD_REGISTRATION);
                        }}
                      >
                        {t("BACK")}
                      </Button>
                      <Button
                        className="set-center-content mr-1"
                        type={"primary"}
                        onClick={() => {
                          props.history.push(PATH.ADD_HOUSEHOLD);
                        }}
                      >
                        <i className="fas fa-plus mr-2"></i> {t("ADD")}
                      </Button>
                      <Button
                        className="set-center-content mr-1"
                        type={"primary"}
                        onClick={() => {
                          props.history.push(
                            `${PATH.UPDATE_HOUSEHOLD}?hh_code=${HHCode}`
                          );
                        }}
                      >
                        <i className="fas fa-edit mr-2"></i> {t("EDIT")}
                      </Button>
                    </div>
                  ) : null}
                </div>
              </section>

              {/*Content*/}
              <section>
                <div className="hh-location">
                  <div className="mb-2 p-2 title-detail-household">
                    I. {t("BENEFICIARY_FORM")}
                  </div>
                  <AddressComponent
                    LocationBeneficiary={LocationBeneficiary}
                    dataLanguage={dataLanguage}
                  />
                </div>

                {/*General Information*/}
                <div className="general-information">
                  <div className="mb-2 p-2 title-detail-household">
                    II. {t("GENERAL_INFORMATION")}
                  </div>
                  <GeneralInformationComponent
                    GeneralInformationBeneficiary={
                      GeneralInformationBeneficiary
                    }
                    LatLongForBeneficiary={LatLongForBeneficiary}
                  />
                </div>

                {/*Household Member*/}
                <div className="household-member">
                  <div className="d-flex align-items-center mb-2 p-2 title-detail-household">
                    III. {t("HOUSEHOLD_MEMBER_LIST")}
                    {HHCode ? (
                      <Button
                        className="ml-auto set-center-content"
                        type="dashed"
                        onClick={() => {
                          history.push(
                            `${PATH.MEMBER_IN_HOUSEHOLD}?hh_code=${HHCode}`
                          );
                        }}
                      >
                        <i className="fas fa-plus mr-2"></i> {t("ADD")}
                      </Button>
                    ) : null}
                  </div>
                  <Table
                    columns={columns}
                    dataSource={detailHouseHold.Members || []}
                    pagination={{ hideOnSinglePage: true }}
                    style={{ overflowX: "auto", overflowY: "hidden" }}
                    rowKey="MemberId"
                  />
                </div>

                {/*Plot land List*/}
                <div className="plot-land-list">
                  <div className="d-flex align-items-center mb-2 p-2 title-detail-household">
                    IV. {t("PLOT_LAND_LIST")}
                    {HHCode ? (
                      <Button
                        className="ml-auto set-center-content"
                        type="dashed"
                        onClick={() => {
                          setValuePlotLandModal("ADD");
                        }}
                      >
                        <i className="fas fa-plus mr-2"></i> {t("ADD")}
                      </Button>
                    ) : null}
                  </div>

                  <Table
                    columns={columnsPlotLandList}
                    dataSource={detailHouseHold.PlotLands || []}
                    pagination={{ hideOnSinglePage: true }}
                    style={{ overflowX: "auto", overflowY: "hidden" }}
                    rowKey="PlotLandId"
                  />
                </div>

                <div className="survival-indicator">
                  <div className="mb-2 p-2 title-detail-household">V.</div>
                </div>

                {/*Solidly and safety house*/}
                <div className="safety-indicator">
                  <div className="mb-2 p-2 title-detail-household">
                    5.1 {t("SHELTER")}
                  </div>
                  <ShelterComponent
                    dataLanguage={dataLanguage}
                    Shelter={Shelter}
                  />
                </div>

                {/*Having Essential Property and insrtruments for daily life*/}
                <div className="insrtruments-indicator">
                  <div className="mb-2 p-2 title-detail-household">
                    5.2{" "}
                    {t(
                      "HAVING_ESSENTIAL_PROPERTY_AND_INSRTRUMENTS_FOR_DAILY_LIFE"
                    )}
                  </div>

                  <EssentialPropertyAndInstrumentsComponent
                    changeYesNoForQuestion={changeYesNoForQuestion}
                    Machine={Machine}
                  />
                </div>

                {/*Having property and tools necessary for living and making a living*/}
                <div className="tools-indicator">
                  <div className="mb-2 p-2 title-detail-household">
                    5.3 {t("HAVING_PROPERTY_AND_TOOLS_NECESSARY_FOR_LIVING")}
                  </div>

                  <ToolsForLivingComponent
                    StableOccupationAndIncome={StableOccupationAndIncome}
                    dataLanguage={dataLanguage}
                    changeYesNoForQuestion={changeYesNoForQuestion}
                  />
                </div>
                {/*Have stable occupation and income*/}
                <div className="income-indicator">
                  <div className="mb-2 p-2 title-detail-household">
                    5.4 {t("HAVE_STABLE_OCCUPATION_AND_INCOME")}
                  </div>
                  <OccupationAndIncomeComponent
                    WaterAndPermanentEnergyBeneficiary={
                      WaterAndPermanentEnergyBeneficiary
                    }
                    dataLanguage={dataLanguage}
                  />
                </div>

                {/*Accessing to primary public service*/}
                <div className="primary-public-service-indicator">
                  <div className="mb-2 p-2 title-detail-household">
                    5.5 {t("ACCESSING_TO_PRIMARY_PUBLIC_SERVICE")}
                  </div>
                  <PrimaryPublicServiceComponent
                    PrimaryPublicServiceForBeneficiary={
                      PrimaryPublicServiceForBeneficiary
                    }
                    changeYesNoForQuestion={changeYesNoForQuestion}
                  />
                </div>

                {/*Development families have 8 standard groups, 11 contents, 19 indicators*/}
                <div className="primary-public-service-indicator">
                  <div className="mb-2 p-2 title-detail-household">
                    5.6{" "}
                    {t(
                      "DEVELOPMENT_FAMILIES_HAVE_8_STANDARD_GROUPS_11_CONTENTS_19_INDICATORS"
                    )}
                  </div>
                  <DevelopmentComponent
                    DevelopmentFamilyViewModel={DevelopmentFamilyViewModel}
                    changeYesNoForQuestion={changeYesNoForQuestion}
                  />
                </div>

                {/*Map*/}
                <div className="tools-indicator">
                  <div className="mb-3 p-2 title-detail-household">
                    VI. {t("LOCATION_IN_MAP")}
                  </div>
                  <Row gutter={16}>
                    <Col span={8}>
                      <p className="mb-2 font-weight-600 font-15">
                        Location(GPS):
                      </p>
                      <p className="mb-2">
                        Latitude: {LatLongForBeneficiary.Lat}
                      </p>
                      <p className="mb-2">
                        Longitude:{LatLongForBeneficiary.Long}
                      </p>
                    </Col>
                    <Col span={16}>
                      <div style={{ height: "400px", width: "100%" }}>
                        {!checkLongAndLat() ? (
                          <GoogleMapReact
                            bootstrapURLKeys={{
                              key: "AIzaSyDFscFGDtZL1daD8iYZKxFrGn2FXdHbMbw",
                            }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                          >
                            <Marker
                              lat={defaultProps.center.lat}
                              lng={defaultProps.center.lng}
                              titile="My Marker"
                            />
                          </GoogleMapReact>
                        ) : (
                          <div className="w-100 h-100 d-flex justify-content-center align-items-center flex-column border">
                            <i
                              style={{ fontSize: "40px" }}
                              className="fas fa-map-marked-alt"
                            ></i>
                            <p className="h3">{t("GOOGLE_MAP_NOT_FOUND")}</p>
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              </section>

              <PlotLandComponent
                typeModal={typeModalPlotLand}
                visible={visiblePlotLand}
                setVisible={setVisiblePlotLand}
                objectValue={objectPlotLand}
                HHCode={HHCode}
                detailHouseHold={detailHouseHold}
                setDetailHouseHold={setDetailHouseHold}
              />
            </>
          ) : (
            <div className="h2 text-danger text-center">{t("NOT_FOUND")}</div>
          )}
        </>
      )}
    </div>
  );
}
export default DetailBeneficiary;
