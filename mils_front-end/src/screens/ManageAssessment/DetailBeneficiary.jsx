import React, {useEffect, useState} from "react";
import {Button, Col, Row, Table} from "antd";
import {DeleteOutlined, EditOutlined, PlusSquareOutlined} from "@ant-design/icons/lib/icons";
import {useTranslation} from "react-i18next";
import houseHoldApi from "../../api/houseHoldApi";
import {useSelector} from "react-redux";
import {getValueOfQueryParams} from "../../utils/getValueOfQueryParams";
import LoadingSpinner from "../../components/LoadingSpinner";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function DetailBeneficiary(props) {
    const [detailHouseHold, setDetailHouseHold] = useState({});
    const [isLoading, setLoading] = useState(false);

    const {t} = useTranslation();
    const dataLanguage = useSelector(
        (state) => state.languageReducer.objectLanguage.value
    ) || localStorage.getItem("i18nextLng");

    useEffect(() => {
        const hh_code = getValueOfQueryParams(props.location, "hh_code", "STRING");
        console.log(hh_code);
        getDetailHouseHold(hh_code);
    }, []);

    const defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    const getDetailHouseHold = async (hh_code) => {
        setLoading(true);
        await houseHoldApi.getDetailHouseHold({householdId: hh_code}).then(res => {
            setDetailHouseHold(res.data);
        });
        setLoading(false);
    };

    const changeYesNoForQuestion = (value) => {
        if(value === false || value === "false"){
            return "No";
        }else if (value === true || value === "true") {
            return "Yes";
        }else {
            return "";
        }
    }

    const columns = [
        {
            title: t("ITEM"),
            dataIndex: 'item',
            key: 'item ',
            render: (data, record, index) => (
                index + 1
            )
        },
        {
            title: t("MEMBER_NAME"),
            dataIndex: 'MemberName',
            key: 'MemberName',
            render: (data, record) => (
                <span>{dataLanguage === "la" ? record.MaritalStatus : record.MaritalStatusEng}</span>
            )
        },
        {
            title: t("MARITAL_STATUS"),
            dataIndex: 'maritalStatus',
            key: 'maritalStatus',
            render: (data, record) => (
                <span>{dataLanguage === "la" ? record.MaritalStatus : record.MaritalStatusEng}</span>
            )
        },
        {
            title: t("RELATION_TO_HOUSEHOLD"),
            dataIndex: 'RelationToHosueHold',
            key: 'RelationToHosueHold',
            render: (data, record) => (
                <span>{dataLanguage === "la" ? record.RelationToHosueHold : record.RelationToHosueHoldEng}</span>
            )
        },
        {
            title: t("GENDER"),
            dataIndex: 'gender',
            key: 'gender',
            render: (data, record) => (
                <span>{dataLanguage === "la" ? record.Gender : record.GenderEng}</span>
            )
        },
        {
            title: t("DOB"),
            dataIndex: 'DateOfBirth',
            key: 'DateOfBirth',
        },
        {
            title: "Action",
            key: "view",
            align: "center",
            dataIndex: "view",
            render: (data, record) => (
                <div className="d-flex justify-content-center">
                    <Button
                        className="set-center-content mr-1"
                        type="primary"
                        icon={<EditOutlined className="font-16"/>}
                    />
                    <Button
                        className="set-center-content"
                        type="primary"
                        danger
                        icon={<DeleteOutlined className="font-16"/>}
                    />
                </div>
            ),
        },
    ];

    const columnsPlotLandList = [
        {
            title: t("ITEM"),
            dataIndex: 'index',
            key: 'index',
            render: (data, record, index) => (
                index + 1
            )
        },
        {
            title: t("NAME_OF_PLOT"),
            dataIndex: 'NameOfPlot',
            key: 'NameOfPlot ',
        },
        {
            title: t("NO_OF_PLOT"),
            dataIndex: 'NoOfPlot',
            key: 'NoOfPlot',
        },
        {
            title: t("OWNED_OR_LEASED"),
            dataIndex: 'OwnedOrLeased',
            key: 'OwnedOrLeased',
            render: (data, record) => (
                dataLanguage === "la" ? record.OwnedOrLeased : record.OwnedOrLeasedEng
            )
        },
        {
            title: t("KIND_OF_LAND"),
            dataIndex: 'kindOfLand',
            key: 'kindOfLand',
            render: (data, record) => (
                dataLanguage === "la" ? record.KindOfLand : record.KindOfLandEng
            )
        },
        {
            title: t("TYPE_OF_LAND"),
            dataIndex: 'TypeOfLand',
            key: 'TypeOfLand',
            render: (data, record) => (
                dataLanguage === "la" ? record.TypeOfLand : record.TypeOfLandEng
            )
        },
        {
            title: "Action",
            key: "view",
            align: "center",
            dataIndex: "view",
            render: (data, record) => (
                <div className="d-flex justify-content-center">
                    <Button
                        className="set-center-content mr-1"
                        type="primary"
                        icon={<EditOutlined className="font-16"/>}
                    />
                    <Button
                        className="set-center-content"
                        type="primary"
                        danger
                        icon={<DeleteOutlined className="font-16"/>}
                    />
                </div>
            ),
        }
    ];

    const {
        LocationBeneficiary = {},
        GeneralInformationBeneficiary = {},
        Machine = {},
        StableOccupationAndIncome = {},
        Shelter= {},
        WaterAndPermanentEnergyBeneficiary= {},
        PrimaryPublicServiceForBeneficiary= {},
        LatLongForBeneficiary= {}
    } = detailHouseHold;

    return (
        <div className="detail-beneficiary-form">
            {isLoading ? (
                <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2"/>
            ) : null}
            {/*Header and title*/}
            <section className="border-bottom mb-3">
                <div className="d-flex align-items-center mb-3">
                    <span className="h5 mb-0">{t("BENEFICIARY_FORM")}</span>
                    <div className="d-flex ml-auto">
                        <Button
                            className="set-center-content mr-1"
                            type="primary"
                            icon={<PlusSquareOutlined className="font-16"/>}
                        />
                        <Button
                            className="set-center-content mr-1"
                            type="primary"
                            icon={<EditOutlined className="font-16"/>}
                        />
                        <Button
                            className="set-center-content"
                            type="primary"
                            icon={<DeleteOutlined className="font-16"/>}
                        />
                    </div>
                </div>
            </section>

            {/*Content*/}
            <section>

                <div className="hh-location">
                    <div className="mb-2 p-2 bg-primary text-white font-15 font-weight-500">
                        I. {t("BENEFICIARY_FORM")}
                    </div>
                    <Row className="mb-2 px-2" gutter={16}>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">{t("PROVINCE")}:{" "}
                            </span>
                            {dataLanguage === "la" ? LocationBeneficiary.Province : LocationBeneficiary.ProvinceEng}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">{t("DISTRICT")}:{" "}</span>
                            {dataLanguage === "la" ? LocationBeneficiary.District : LocationBeneficiary.DistrictEng}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("VILLAGE")}:{" "}</span>
                            {dataLanguage === "la" ? LocationBeneficiary.Village : LocationBeneficiary.VillageEng}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">{t("UNIT")}:{" "}</span>
                            {dataLanguage === "la" ? LocationBeneficiary.Unit : LocationBeneficiary.UnitEng}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("HH_NUMBER")}</span>: {LocationBeneficiary.HHNumber}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">{t("HH_LEVEL")}</span>: {LocationBeneficiary.HHLevel}
                        </Col>
                    </Row>
                </div>

                {/*General Information*/}
                <div className="general-information">
                    <div className="mb-2 p-2 bg-primary text-white font-15 font-weight-500">
                        II. {t("GENERAL_INFORMATION")}
                    </div>
                    <Row className="mb-2 px-2" gutter={16}>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("HEAD_OF_HH_NAME")}</span>:{" "}
                            {GeneralInformationBeneficiary.HeadOfHHName}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">{t("GENDER")}</span>:{" "}
                            {GeneralInformationBeneficiary.Gender}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("TELEPHONE")}</span>:{" "}
                            {GeneralInformationBeneficiary.Telephone1}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">{t("NUMBER_OF_HH")}</span>:{" "}
                            {GeneralInformationBeneficiary.NumberOfHH}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("FEMALE")}</span>:{" "}
                            {GeneralInformationBeneficiary.Female}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("NUMBER_PLOTS")}</span>:{" "}
                            {GeneralInformationBeneficiary.NumberPlots}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("DATE_OF_ENUMERATION")}</span>:{" "}
                            {GeneralInformationBeneficiary.DateOfEnumeration}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("ENUMERATION")}</span>:{" "}
                            {GeneralInformationBeneficiary.Enumeration}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("TELEPHONE")}</span>:{" "}
                            {GeneralInformationBeneficiary.TelePhone2}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("RESPONDENT")}</span>:{" "}
                            {GeneralInformationBeneficiary.Respondent}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("TELEPHONE")}</span>:{" "}
                            {GeneralInformationBeneficiary.TelePhone3}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("UPLOAD_IMAGE")}</span>: {" "}
                            <img src={GeneralInformationBeneficiary.ImageUrl} alt="Not Found"/>
                        </Col>
                    </Row>
                </div>

                {/*Household Member*/}
                <div className="household-member">
                    <div className="mb-2 p-2 bg-primary text-white font-15 font-weight-500">
                        III. {t("HOUSEHOLD_MEMBER_LIST")}
                    </div>
                    <div className="d-flex justify-content-end mb-2">
                        <Button
                            className="set-center-content mr-1"
                            type="primary"
                            icon={<PlusSquareOutlined className="font-16"/>}
                        />
                    </div>
                    <Table
                        columns={columns}
                        dataSource={(detailHouseHold.Members || [])}
                        pagination={{hideOnSinglePage: true}}
                        style={{overflowX: "auto", overflowY: "hidden"}}
                        rowKey="MemberId"
                    />
                </div>

                {/*Plot land List*/}
                <div className="plot-land-list">
                    <div className="mb-2 p-2 bg-primary text-white font-15 font-weight-500">
                        IV. {t("PLOT_LAND_LIST")}
                    </div>
                    <div className="d-flex justify-content-end mb-2">
                        <Button
                            className="set-center-content mr-1"
                            type="primary"
                            icon={<PlusSquareOutlined className="font-16"/>}
                        />
                    </div>
                    <Table
                        columns={columnsPlotLandList}
                        dataSource={(detailHouseHold.PlotLands || [])}
                        pagination={{hideOnSinglePage: true}}
                        style={{overflowX: "auto", overflowY: "hidden"}}
                        rowKey="PlotLandId"
                    />
                </div>

                <div className="survival-indicator">
                    <div className="mb-2 p-2 bg-primary text-white font-15 font-weight-500">
                        V.
                    </div>
                </div>

                {/*Solidly and safety house*/}
                <div className="safety-indicator">
                    <div className="mb-2 p-2 bg-primary text-white font-15 font-weight-500">
                        7.1 {t("SHELTER")}
                    </div>
                    <Row className="mb-2 px-2" gutter={16}>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("WALL_MATERIAL")}</span>: {" "}
                            {dataLanguage === "la" ? Shelter.WallMaterial : Shelter.WallMaterialEng}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">{t("FLOOR_MATERIAL")}</span>:{" "}
                            {dataLanguage === "la" ? Shelter.FloorMaterial : Shelter.FloorMaterialEng}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("ROOF_MATERIAL")}</span>:{" "}
                            {dataLanguage === "la" ? Shelter.RoofMaterial : Shelter.RoofMaterialEng}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">{t("AREA_MATERIAL")}</span>:{" "}
                            {dataLanguage === "la" ? Shelter.AreaMaterial : Shelter.AreaMaterialEng}
                        </Col>
                    </Row>
                </div>

                {/*Having Essential Property and insrtruments for daily life*/}
                <div className="insrtruments-indicator">
                    <div className="mb-2 p-2 bg-primary text-white font-15 font-weight-500">
                        7.2 {t("HAVING_ESSENTIAL_PROPERTY_AND_INSRTRUMENTS_FOR_DAILY_LIFE")}
                    </div>

                    <Row className="mb-2 px-2" gutter={16}>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("CARS")}</span>: {" "}
                            {changeYesNoForQuestion(Machine.Cars)}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">{t("MOTORCYCLES")}</span>:{" "}
                            {changeYesNoForQuestion(Machine.Motorcycles)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("BICYCLE")}</span>:{" "}
                            {changeYesNoForQuestion(Machine.Bicycle)}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">{t("TRICYCLE")}</span>:{" "}
                            {changeYesNoForQuestion(Machine.Tricycle)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("BOAT")}</span>:{" "}
                            {changeYesNoForQuestion(Machine.Boat)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("AIR_CONDITIONING")}</span>:{" "}
                            {changeYesNoForQuestion(Machine.AirConditioning)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("REFRIGERATOR")}</span>:{" "}
                            {changeYesNoForQuestion(Machine.Refrigerator)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("WASHING_MACHINE")}</span>:{" "}
                            {changeYesNoForQuestion(Machine.WashingMachine)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("TV")}</span>:{" "}
                            {changeYesNoForQuestion(Machine.TV)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("DESKTOP_LAPTOP_COMPUTERS")}</span>:{" "}
                            {changeYesNoForQuestion(Machine.DesktopLaptopComputers)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("LANDLINE")}</span>:{" "}
                            {changeYesNoForQuestion(Machine.Landline)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("MOBILE_PHONE")}</span>:{" "}
                            {changeYesNoForQuestion(Machine.MobilePhone)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("TWO_WHEEL_TRACTOR")}</span>:{" "}
                            {changeYesNoForQuestion(Machine.TwowheelTractor)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("FOUR_WHEEL_TRACTOR")}</span>:{" "}
                            {changeYesNoForQuestion(Machine.FourwheelTractor)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("ADEQUATE_AGRICULTURAL_EQUIPMENT")}</span>:{" "}
                            {changeYesNoForQuestion(Machine.AdequateAgriculturalEquipment)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("ADEQUATE_PRODUCTION_LAND")}</span>:{" "}
                            {changeYesNoForQuestion(Machine.AdequateProductionLand)}
                        </Col>
                    </Row>
                </div>

                {/*Having property and tools necessary for living and making a living*/}
                <div className="tools-indicator">
                    <div className="mb-2 p-2 bg-primary text-white font-15 font-weight-500">
                        7.3 Having property and tools necessary for living and making a living
                    </div>

                    <Row className="mb-2 px-2" gutter={16}>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("UNDER_14_YEARS")}</span>:{" "}
                            {StableOccupationAndIncome.TotalBellow_14 || ""}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">{t("BETWEEN_15-60")}</span>:{" "}
                            {StableOccupationAndIncome.TotalBetween_15_60 || ""}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("OVER_60")}</span>:{" "}
                            {StableOccupationAndIncome.TotalAbove_60 || ""}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">{t("DOING_REGULARLY")}</span>:{" "}
                            {dataLanguage === "la" ? (StableOccupationAndIncome.MainJob || "") : (StableOccupationAndIncome.MainJobEng || "")}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("GOOD_OR_SERVICE")}</span>:{" "}
                            {dataLanguage === "la" ? (StableOccupationAndIncome.MainGoods || "") : (StableOccupationAndIncome.MainGoodsEng || "")}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("HOUSEHOLD_DURING_THE_PAST_12_MONTHS_RECEIVED_ANY_REMITTANCES_IN_CASH_OR")}</span>:{" "}
                            {changeYesNoForQuestion(StableOccupationAndIncome.ReceivedBenfits)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("OWE_MONEY_OR_GOOD")}</span>:{" "}
                            {changeYesNoForQuestion(StableOccupationAndIncome.OweCredit)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("WHOM_WAS_THE_BORROWING")}</span>:{" "}
                            {dataLanguage === "la" ? (StableOccupationAndIncome.TypeOfLender || "") : (StableOccupationAndIncome.TypeOfLender || "")}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("WHY_DID_MEMBERS_OD_YOUR_HOUSEHOLD")}</span>:{" "}
                            {dataLanguage === "la" ? (StableOccupationAndIncome.BorrowingReason || "") : (StableOccupationAndIncome.BorrowingReasonEng || "")}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("DOES_ANY_MEMBER_OF_YOUR_HOUSEHOLD_IN_THE_LAST_COMPLETED_AGRICULTURE")}</span>:{" "}
                            {changeYesNoForQuestion(StableOccupationAndIncome.OwnAgri)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("DOES_ANY_MEMBER_OF_YOUR_HOUSEHOLD_WORKED(OWNED_OR_LEASED)")}</span>:{" "}
                            {changeYesNoForQuestion(StableOccupationAndIncome.MemberWork)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("PLEASE_PUT_THE_PLOT_NAME_OR_NO")}</span>:{" "}
                            {StableOccupationAndIncome.PlotRepeatCount}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("WHAT_KIND_OF_LAND_IS_THIS")}</span>:{" "}
                            {StableOccupationAndIncome.NumberPlots || ""}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("HAS_THIS_HOUSEHOLD_RAISED_ANY_LIVESTOCK_DURING_THE_LAST_12_MONTHS")}</span>:{" "}
                            {changeYesNoForQuestion(StableOccupationAndIncome.LiveStock)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("IS_ANYONE_IN_HOUSEHOLD_MEMBERS_IN_AGE_HAVE_COMPLETED_SECONDARY_SCHOOL")}</span>:{" "}
                            {StableOccupationAndIncome.CompletedPrimarySchool || ""}
                        </Col>
                    </Row>
                </div>

                {/*Have stable occupation and income*/}
                <div className="income-indicator">
                    <div className="mb-2 p-2 bg-primary text-white font-15 font-weight-500">
                        7.4 {t("HAVE_STABLE_OCCUPATION_AND_INCOME")}
                    </div>

                    <Row className="mb-2 px-2" gutter={16}>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("DURING_RAINING")}</span>:{" "}
                            {dataLanguage === "la" ? WaterAndPermanentEnergyBeneficiary.Water : WaterAndPermanentEnergyBeneficiary.WaterEng}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">{t("DURING_DRY")}</span>:{" "}
                            {dataLanguage === "la" ? WaterAndPermanentEnergyBeneficiary.WaterDry : WaterAndPermanentEnergyBeneficiary.WaterDryEng}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("TYPE_OF_TOILET")}</span>:{" "}
                            {dataLanguage === "la" ? WaterAndPermanentEnergyBeneficiary.ToiletType : WaterAndPermanentEnergyBeneficiary.ToiletTypeEng}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">{t("SOURCE_FOR_COOKING")}</span>:{" "}
                            {dataLanguage === "la" ? WaterAndPermanentEnergyBeneficiary.CookingSource : WaterAndPermanentEnergyBeneficiary.CookingSouceEng}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("SOURCE_FOR_LIGHTING")}</span>:{" "}
                            {dataLanguage === "la" ? WaterAndPermanentEnergyBeneficiary.EnergySource : WaterAndPermanentEnergyBeneficiary.EnergySourceEng}
                        </Col>
                    </Row>
                </div>

                {/*Accessing to primary public service*/}
                <div className="primary-public-service-indicator">
                    <div className="mb-2 p-2 bg-primary text-white font-15 font-weight-500">
                        7.5 {t("ACCESSING_TO_PRIMARY_PUBLIC_SERVICE")}
                    </div>

                    <Row className="mb-2 px-2" gutter={16}>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("PRIMARY_SCHOOL_OR_LOWER_SECONDARY_SCHOOL")}</span>:{" "}
                            {changeYesNoForQuestion(PrimaryPublicServiceForBeneficiary.PrimarySchool)}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">{t("A_PERMANENT_(DAILY)_MARKET")}</span>:{" "}
                            {changeYesNoForQuestion(PrimaryPublicServiceForBeneficiary.Market)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("DISPENSARY_OR_HEALTH")}</span>:{" "}
                            {changeYesNoForQuestion(PrimaryPublicServiceForBeneficiary.Dispensary)}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">{t("HOW_LONG_DOES_IT_NORMALLY_TAKE_TO_REACH_THE_DISPENSARY/HEALTH_POST")}</span>:{" "}
                            {PrimaryPublicServiceForBeneficiary.TimeDispensary}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("IS_THERE_A_HOSPITAL_IN_THIS_VILLAGE")}</span>:{" "}
                            {changeYesNoForQuestion(PrimaryPublicServiceForBeneficiary.Hospital)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("HOW_FAR_AWAY_IS_THE_NEAREST_HOSPITAL")}</span>:{" "}
                            {PrimaryPublicServiceForBeneficiary.DistanceNearestHospital}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("HOW_LONG_DOES_IT_NORMALLY_TAKE_TO_REACH_ANY_HOSPITAL")}</span>:{" "}
                            {PrimaryPublicServiceForBeneficiary.TImeNearestHospital}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("IS_THERE_ANY_SCHEDULED_PASSENGER_TRANSPORT_STOPPING_IN_THIS_VILLAGE")}</span>:{" "}
                            {changeYesNoForQuestion(PrimaryPublicServiceForBeneficiary.TransportStop)}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("IS_THIS_VILLAGE_CONNECTED_TO_AN_ELECTRIC_NETWORK")}</span>:{" "}
                            {changeYesNoForQuestion(PrimaryPublicServiceForBeneficiary.ElectricNetwork)}
                        </Col>
                    </Row>
                </div>

                {/*Development families have 8 standard groups, 11 contents, 19 indicators*/}
                <div className="primary-public-service-indicator">
                    <div className="mb-2 p-2 bg-primary text-white font-15 font-weight-500">
                        7.6 Development families have 8 standard groups, 11 contents, 19 indicators
                    </div>

                    <Row className="mb-2 px-2" gutter={16}>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">The family has set up the house according to the defined village plan</span>:{" "}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500"> All of your land and family members have a land title deed or a land use certificate </span>:{" "}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">The family has a house, a permanent shelter (strong project, the floor, the roof is made of durable materials, the service life is at least 20 years)</span>:{" "}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">Buildings related to the house, such as kitchens, latrines, stables, horticulture, wooden gardens, are arranged to be clean, beautiful, safe and convenient to use</span>:{" "}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">Contributed capital or labor to village development</span>:{" "}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">Be a model farming family in terms of production as a commodity or any production or other occupation that generates a steady income for the family without breaking the rules</span>:{" "}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">Households must have an average income higher than the regional average or more than 5.6 million kip per person per year, or about $ 700 per person per year</span>:{" "}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500"> As a family with a good education policy, pre-school children (0-3 years old) must attend pre-school or kindergarten, families with school-age children must attend primary school as required</span>:{" "}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">As a model health family</span>:{" "}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">As a cultural family</span>:{" "}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">As a family, exercise gender equality, promote child development and refrain from violence against women and children</span>:{" "}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">Family members aged 15 and over are politically educated, consciously involved in the village development process</span>:{" "}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">As a united family</span>:{" "}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">As a model family following the law (a family free of cases)</span>:{" "}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">A family of 3 good women</span>:{" "}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">Being a drug-free family</span>:{" "}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">A good defensive family</span>:{" "}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">Being a good family</span>:{" "}
                        </Col>
                    </Row>
                </div>

                {/*Map*/}
                <div className="tools-indicator">
                    <div className="mb-3 p-2 bg-primary text-white font-15 font-weight-500">
                        7.7 Location in map
                    </div>
                  <Row gutter={16}>
                      <Col span={8}>
                          <p className="mb-0 font-weight-500 font-16">Data DescriptionSave</p>
                           <p>
                               Photo
                               <img src={LatLongForBeneficiary.ImageUrl} alt="No image"/>
                           </p>
                          <p className="mb-0 font-weight-500 font-15">Location(GPS):</p>
                          <p>Latitude: {LatLongForBeneficiary.Lat}</p>
                         <p> Longitude:{LatLongForBeneficiary.Long}</p>
                      </Col>
                      <Col span={16}>
                          <div style={{ height: '400px', width: '100%' }}>
                              <GoogleMapReact
                                  bootstrapURLKeys={{ key: "AIzaSyAWDFlOfmcwhHzeF06x_dYJBrM2OfUHAjQ" }}
                                  defaultCenter={defaultProps.center}
                                  defaultZoom={defaultProps.zoom}
                              >
                                  <AnyReactComponent
                                      lat={59.955413}
                                      lng={30.337844}
                                      text="My Marker"
                                  />
                              </GoogleMapReact>
                          </div>
                      </Col>
                  </Row>
                </div>

            </section>
        </div>
    )
}

export default DetailBeneficiary;