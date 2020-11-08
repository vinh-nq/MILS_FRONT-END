import React, { useEffect, useState } from "react";
import { Button, Col, Collapse, message, Popconfirm, Row, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons/lib/icons";
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
      lat: 0,
      lng: 0,
    },
    zoom: 17,
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
          const { LatLongForBeneficiary } = res.data.Data;
          let location = { ...defaultProps };
          location = {
            ...location,
            center: {
              lat: parseFloat(LatLongForBeneficiary.Lat),
              lng: parseFloat(LatLongForBeneficiary.Long),
            },
          };
          setDefaultProps(location);
          setDetailHouseHold(res.data.Data);
        });
      setLoading(false);
    };
    getDetailHouseHold(hh_code);
  }, []);

  const changeYesNoForQuestion = (value) => {
    if (value === false || value === "false") {
      return "No";
    } else if (value === true || value === "true") {
      return "Yes";
    } else {
      return "";
    }
  };

  const handleDeletePlotLand = async (id) => {
    setLoading(true);
    await plotLandApi.delete({ plotlandId: id }).then((res) => {
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
    });
  };

  const handleDeleteHouseHold = async () => {
    setLoading(true);
    await houseHoldApi.deleteHouseHold({ householdId: HHCode }).then((res) => {
      if (res.data.Status) {
        setLoading(false);
        message.success({
          content: t("DELETE_SUCCESS"),
          key: "message-form-role",
          duration: 1,
        });
        history.push(PATH.HOUSEHOLD_REGISTRATION);
      } else {
        setLoading(false);
        message.error({
          content: t("DELETE_FAILED"),
          key: "message-form-role",
          duration: 1,
        });
      }
    });
  };

  const handleDeleteMember = async (id) => {
    setLoading(true);
    await houseHoldApi.deleteMember({ memberId: id }).then((res) => {
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
    });
  };

  const columns = [
    {
      title: t("ITEM"),
      dataIndex: "item",
      key: "item ",
      render: (data, record, index) => index + 1,
    },
    {
      title: t("MEMBER_NAME"),
      dataIndex: "MemberName",
      key: "MemberName",
      render: (data) => <div style={{ minWidth: 100 }}>{data}</div>,
    },
    {
      title: t("MARITAL_STATUS"),
      dataIndex: "maritalStatus",
      key: "maritalStatus",
      render: (data, record) => (
        <div style={{ minWidth: 100 }}>
          {dataLanguage === "la"
            ? record.MaritalStatus
            : record.MaritalStatusEng}
        </div>
      ),
    },
    {
      title: t("RELATION_TO_HOUSEHOLD"),
      dataIndex: "RelationToHosueHold",
      key: "RelationToHosueHold",
      render: (data, record) => (
        <div style={{ minWidth: 100 }}>
          {dataLanguage === "la"
            ? record.RelationToHosueHold
            : record.RelationToHosueHoldEng}
        </div>
      ),
    },
    {
      title: t("GENDER"),
      dataIndex: "gender",
      key: "gender",
      render: (data, record) => (
        <div style={{ minWidth: 100 }}>
          {dataLanguage === "la" ? record.Gender : record.GenderEng}
        </div>
      ),
    },
    {
      title: t("DOB"),
      dataIndex: "DateOfBirth",
      key: "DateOfBirth",
      render: (data) => <div style={{ minWidth: 100 }}>{data}</div>,
    },
    {
      key: "view",
      align: "center",
      dataIndex: "view",
      render: (data, record) => (
        <div className="d-flex justify-content-end" style={{ minWidth: 120 }}>
          <Button
            className="set-center-content mr-1"
            type="primary"
            icon={<EditOutlined className="font-16" />}
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
              type="primary"
              danger
              icon={<DeleteOutlined className="font-16" />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const columnsPlotLandList = [
    {
      title: t("ITEM"),
      dataIndex: "index",
      key: "index",
      render: (data, record, index) => index + 1,
    },
    {
      title: t("NAME_OF_PLOT"),
      dataIndex: "NameOfPlot",
      key: "NameOfPlot ",
      render: (data) => <div style={{ minWidth: 150 }}>{data}</div>,
    },
    {
      title: t("NO_OF_PLOT"),
      dataIndex: "NoOfPlot",
      key: "NoOfPlot",
      render: (data) => <div style={{ minWidth: 100 }}>{data}</div>,
    },
    {
      title: t("OWNED_OR_LEASED"),
      dataIndex: "OwnedOrLeased",
      key: "OwnedOrLeased",
      render: (data, record) => (
        <div style={{ minWidth: 120 }}>
          {dataLanguage === "la"
            ? record.OwnedOrLeased
            : record.OwnedOrLeasedEng}
        </div>
      ),
    },
    {
      title: t("KIND_OF_LAND"),
      dataIndex: "kindOfLand",
      key: "kindOfLand",
      render: (data, record) => (
        <div style={{ minWidth: 120 }}>
          {dataLanguage === "la" ? record.KindOfLand : record.KindOfLandEng}
        </div>
      ),
    },
    {
      title: t("TYPE_OF_LAND"),
      dataIndex: "TypeOfLand",
      key: "TypeOfLand",
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
        <div className="d-flex justify-content-end" style={{ minWidth: 120 }}>
          <Button
            className="set-center-content mr-1"
            type="primary"
            icon={<EditOutlined className="font-16" />}
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
              type="primary"
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
    LatLongForBeneficiary = {},
  } = detailHouseHold;

  const setValuePlotLandModal = async (value, obj = {}) => {
    setTypeModalPlotLand(value);
    if (value === "UPDATE") {
      setLoading(true);
      await houseHoldApi
        .getInformationOfIndividualPlotLand({ plotlandId: obj.PlotLandId })
        .then((res) => {
          setObjectPlotLand(res.data.Data);
        });
      setLoading(false);
    } else {
      setObjectPlotLand(obj);
    }
    setVisiblePlotLand(true);
  };

  return (
    <div className="detail-beneficiary-form">
      {isLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      {/*Header and title*/}
      <section className="border-bottom mb-3">
        <div className="d-flex align-items-center mb-3">
          <span className="h5 mb-0">{t("BENEFICIARY_FORM")}</span>
          {HHCode ? (
            <div className="d-flex ml-auto">
              <Button
                className="set-center-content mr-1"
                type="primary"
                icon={<PlusSquareOutlined className="font-16" />}
                onClick={() => {
                  props.history.push(PATH.ADD_HOUSEHOLD);
                }}
              />
              <Button
                className="set-center-content mr-1"
                type="primary"
                icon={<EditOutlined className="font-16" />}
                onClick={() => {
                  props.history.push(
                    `${PATH.UPDATE_HOUSEHOLD}?hh_code=${HHCode}`
                  );
                }}
              />
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  handleDeleteHouseHold();
                }}
              >
                <Button
                  className="set-center-content"
                  type="primary"
                  icon={<DeleteOutlined className="font-16" />}
                />
              </Popconfirm>
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
            GeneralInformationBeneficiary={GeneralInformationBeneficiary}
          />
        </div>

        {/*Household Member*/}
        <div className="household-member">
          <div className="mb-2 p-2 title-detail-household">
            III. {t("HOUSEHOLD_MEMBER_LIST")}
          </div>
          {HHCode ? (
            <div className="d-flex justify-content-end mb-2">
              <Button
                className="set-center-content mr-1"
                type="primary"
                icon={<PlusSquareOutlined className="font-16" />}
                onClick={() => {
                  history.push(`${PATH.MEMBER_IN_HOUSEHOLD}?hh_code=${HHCode}`);
                }}
              />
            </div>
          ) : null}
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
          <div className="mb-2 p-2 title-detail-household">
            IV. {t("PLOT_LAND_LIST")}
          </div>
          {HHCode ? (
            <div className="d-flex justify-content-end mb-2">
              <Button
                className="set-center-content mr-1"
                type="primary"
                icon={<PlusSquareOutlined className="font-16" />}
                onClick={() => {
                  setValuePlotLandModal("ADD");
                }}
              />
            </div>
          ) : null}
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
            7.1 {t("SHELTER")}
          </div>
          <ShelterComponent dataLanguage={dataLanguage} Shelter={Shelter} />
        </div>

        {/*Having Essential Property and insrtruments for daily life*/}
        <div className="insrtruments-indicator">
          <div className="mb-2 p-2 title-detail-household">
            7.2 {t("HAVING_ESSENTIAL_PROPERTY_AND_INSRTRUMENTS_FOR_DAILY_LIFE")}
          </div>

          <EssentialPropertyAndInstrumentsComponent
            changeYesNoForQuestion={changeYesNoForQuestion}
            Machine={Machine}
          />
        </div>

        {/*Having property and tools necessary for living and making a living*/}
        <div className="tools-indicator">
          <div className="mb-2 p-2 title-detail-household">
            7.3 Having property and tools necessary for living and making a
            living
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
            7.4 {t("HAVE_STABLE_OCCUPATION_AND_INCOME")}
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
            7.5 {t("ACCESSING_TO_PRIMARY_PUBLIC_SERVICE")}
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
            7.6 Development families have 8 standard groups, 11 contents, 19
            indicators
          </div>
          <DevelopmentComponent />
        </div>

        {/*Map*/}
        <div className="tools-indicator">
          <div className="mb-3 p-2 title-detail-household">
            7.7 Location in map
          </div>
          <Row gutter={16}>
            <Col span={8}>
              <p className="mb-0 font-weight-500 font-16">
                Data DescriptionSave
              </p>
              <p>
                Photo
                <img src={LatLongForBeneficiary.ImageUrl} alt="No image" />
              </p>

              <p className="mb-0 font-weight-500 font-15">Location(GPS):</p>
              <p>Latitude: {defaultProps.center.lat}</p>
              <p> Longitude:{defaultProps.center.lng}</p>
            </Col>
            <Col span={16}>
              <div style={{ height: "400px", width: "100%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyDFscFGDtZL1daD8iYZKxFrGn2FXdHbMbw",
                  }}
                  center={defaultProps.center}
                  defaultZoom={defaultProps.zoom}
                >
                  <Marker
                    lat={defaultProps.center.lat}
                    lng={defaultProps.center.lng}
                    name="Location"
                  />
                </GoogleMapReact>
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
    </div>
  );
}

export default DetailBeneficiary;
