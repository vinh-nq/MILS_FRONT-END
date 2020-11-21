import React from "react";
import { Col, Row, Table } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
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
  const { defaultProps, detailHouseHold } = props;

  const { t } = useTranslation();
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  const changeYesNoForQuestion = (value) => {
    if (value === false || value === "false") {
      return "No";
    } else if (value === true || value === "true") {
      return "Yes";
    } else {
      return "";
    }
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

  return (
    <div className="detail-beneficiary-form">
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
          <div className="d-flex align-items-center mb-2 p-2 title-detail-household">
            III. {t("HOUSEHOLD_MEMBER_LIST")}
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
            7.3 {t("HAVING_PROPERTY_AND_TOOLS_NECESSARY_FOR_LIVING")}
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
            7.6{" "}
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
            7.7 {t("LOCATION_IN_MAP")}
          </div>
          <Row gutter={16}>
            <Col span={8}>
              <p className="mb-0">
                <span className="font-weight-600">Data Description:</span>{" "}
                {LatLongForBeneficiary.Description}
              </p>
              <p className="mb-2 font-weight-600 font-15">Location(GPS):</p>
              <p className="mb-2">Latitude: {defaultProps.center.lat}</p>
              <p className="mb-2">Longitude:{defaultProps.center.lng}</p>
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
    </div>
  );
}

export default DetailBeneficiary;
