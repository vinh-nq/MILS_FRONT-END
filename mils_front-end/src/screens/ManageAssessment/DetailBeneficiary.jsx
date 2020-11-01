import React, {useEffect, useState} from "react";
import {Button, Col, Row, Table} from "antd";
import {DeleteOutlined, EditOutlined, PlusSquareOutlined} from "@ant-design/icons/lib/icons";
import {useTranslation} from "react-i18next";
import houseHoldApi from "../../api/houseHoldApi";
import {useSelector} from "react-redux";
import {getValueOfQueryParams} from "../../utils/getValueOfQueryParams";
import LoadingSpinner from "../../components/LoadingSpinner";


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

    const getDetailHouseHold = async (hh_code) => {
        setLoading(true);
        await houseHoldApi.getDetailHouseHold({householdId: hh_code}).then(res => {
            setDetailHouseHold(res.data);
        });
        setLoading(false);
    };

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

    const {LocationBeneficiary = {} , GeneralInformationBeneficiary = {} , Machine={}} = detailHouseHold;

    return (
        <div className="detail-beneficiary-form">
            {isLoading ? (
                <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2"/>
            ) : null}
            {/*Header and title*/}
            <section className="border-bottom mb-3">
                <div className="d-flex align-items-center mb-3">
                    <span className="h5 mb-0">Detail Beneficiary Form</span>
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
                        I. Location
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
                            <span className="font-weight-500">HH Number</span>: {LocationBeneficiary.HHNumber}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">HH Level</span>: {LocationBeneficiary.HHLevel}
                        </Col>
                    </Row>
                </div>

                {/*General Information*/}
                <div className="general-information">
                    <div className="mb-2 p-2 bg-primary text-white font-15 font-weight-500">
                        II. General Information
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
                            <span className="font-weight-500">Female</span>:{" "}
                            {GeneralInformationBeneficiary.Female}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("NUMBER_PLOTS")}</span>:{" "}
                            {GeneralInformationBeneficiary.NumberPlots}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Date of Enumeration</span>:{" "}
                            {GeneralInformationBeneficiary.DateOfEnumeration}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Enumeration</span>:{" "}
                            {GeneralInformationBeneficiary.Enumeration}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("TELEPHONE")}</span>:{" "}
                            {GeneralInformationBeneficiary.TelePhone2}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("Respondent")}</span>:{" "}
                            {GeneralInformationBeneficiary.Respondent}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">{t("TELEPHONE")}</span>:{" "}
                            {GeneralInformationBeneficiary.TelePhone3}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Image</span>: {" "}
                            <img src={GeneralInformationBeneficiary.ImageUrl} alt=""/>
                        </Col>
                    </Row>
                </div>

                {/*Household Member*/}
                <div className="household-member">
                    <div className="mb-2 p-2 bg-primary text-white font-15 font-weight-500">
                        III. Household Member
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
                        IV. Plot land List
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
                        7.1 Solidly and safety house
                    </div>
                </div>

                {/*Having Essential Property and insrtruments for daily life*/}
                <div className="insrtruments-indicator">
                    <div className="mb-2 p-2 bg-primary text-white font-15 font-weight-500">
                        7.2 Having Essential Property and insrtruments for daily life
                    </div>

                    <Row className="mb-2 px-2" gutter={16}>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Car</span>: {" "}
                            {Machine.Cars ? "Yes" : "No"}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">Motorcycles</span>:{" "}
                            {Machine.Motorcycles ? "Yes" : "No"}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Bicycle</span>:{" "}
                            {Machine.Bicycle ? "Yes" : "No"}
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">Tricycle</span>:{" "}
                            {Machine.Tricycle ? "Yes" : "No"}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Boat</span>:{" "}
                            {Machine.Boat ? "Yes" : "No"}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Air conditioning</span>:{" "}
                            {Machine.AirConditioning ? "Yes" : "No"}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Refrigerator</span>:{" "}
                            {Machine.Refrigerator ? "Yes" : "No"}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Washing machine</span>:{" "}
                            {Machine.WashingMachine ? "Yes" : "No"}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">TV</span>:{" "}
                            {Machine.TV ? "Yes" : "No"}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Desktop / Laptop Computers</span>:{" "}
                            {Machine.DesktopLaptopComputers ? "Yes" : "No"}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Landline</span>:{" "}
                            {Machine.Landline ? "Yes" : "No"}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Mobile Phone</span>:{" "}
                            {Machine.MobilePhone ? "Yes" : "No"}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">2 wheel tractor</span>:{" "}
                            {Machine.TwowheelTractor ? "Yes" : "No"}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">4 wheel tractor</span>:{" "}
                            {Machine.FourwheelTractor ? "Yes" : "No"}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Adequate agricultural equipment</span>:{" "}
                            {Machine.AdequateAgriculturalEquipment ? "Yes" : "No"}
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Adequate production land</span>:{" "}
                            {Machine.AdequateProductionLand ? "Yes" : "No"}
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
                            <span
                                className="font-weight-500">Number of family members under 14 years old</span>: <u>xxxxx</u>
                        </Col>
                        <Col span={12}>
                            <span
                                className="font-weight-500">Number of family members between 15-60 years old</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">Number of family members over 60 years old</span>: <u>xxxxx</u>
                        </Col>
                        <Col span={12}>
                            <span
                                className="font-weight-500">In the main job that you had doing regularly </span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">In this main job, what are the main goods or services produced at your place of work?</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Is anyone in your household during the past 12 months received any remittances in cash or</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Do any members of your household owe money or goods to anyone?</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">From whom was the borrowing made?</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Why did members od your household have to borrow money or goods?</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Does any member of your household in the last completed agriculture season owned  or leased any agricultural land, forest or grazing land?</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Does any member of your household worked(owned or leased) in the last completed  season?</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">If "yes", please put the Plot Name or No</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">What kind of land is this?</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Has this household raised any livestock during the last 12 months?</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Is anyone in household members in age have completed secondary school?</span>: <u>xxxxx</u>
                        </Col>
                    </Row>
                </div>

                {/*Have stable occupation and income*/}
                <div className="income-indicator">
                    <div className="mb-2 p-2 bg-primary text-white font-15 font-weight-500">
                        7.4 Have stable occupation and income
                    </div>

                    <Row className="mb-2 px-2" gutter={16}>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Drinking water facility during rainy</span>: <u>xxxxx</u>
                        </Col>
                        <Col span={12}>
                            <span
                                className="font-weight-500">Drinking water facility during dry season</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Type of toilet</span>: <u>xxxxx</u>
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">Main source for cooking</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Main source of energy for lighting</span>: <u>xxxxx</u>
                        </Col>
                    </Row>
                </div>

                {/*Accessing to primary public service*/}
                <div className="primary-public-service-indicator">
                    <div className="mb-2 p-2 bg-primary text-white font-15 font-weight-500">
                        7.5 Accessing to primary public service
                    </div>

                    <Row className="mb-2 px-2" gutter={16}>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Is there a Primary school or Lower secondary school located in this village?</span>: <u>xxxxx</u>
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500"> Is there a permanent (daily) market or at least two times per week in this village? </span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">Is there a dispensary or health post in this village?</span>: <u>xxxxx</u>
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">How long does it normally take to reach the dispensary/health post?</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500">Is there a hospital in this village?</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">If no, How far away is the nearest hospital?</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">How long does it normally take to reach any hospital?</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500"> Is there any scheduled passenger transport stopping in this village?</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">Is this village connected to an electric network?</span>: <u>xxxxx</u>
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
                            <span className="font-weight-500">The family has set up the house according to the defined village plan</span>: <u>xxxxx</u>
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500"> All of your land and family members have a land title deed or a land use certificate </span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">The family has a house, a permanent shelter (strong project, the floor, the roof is made of durable materials, the service life is at least 20 years)</span>: <u>xxxxx</u>
                        </Col>
                        <Col span={12}>
                            <span className="font-weight-500">Buildings related to the house, such as kitchens, latrines, stables, horticulture, wooden gardens, are arranged to be clean, beautiful, safe and convenient to use</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">Contributed capital or labor to village development</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">Be a model farming family in terms of production as a commodity or any production or other occupation that generates a steady income for the family without breaking the rules</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">Households must have an average income higher than the regional average or more than 5.6 million kip per person per year, or about $ 700 per person per year</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span className="font-weight-500"> As a family with a good education policy, pre-school children (0-3 years old) must attend pre-school or kindergarten, families with school-age children must attend primary school as required</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">As a model health family</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">As a cultural family</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">As a family, exercise gender equality, promote child development and refrain from violence against women and children</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">Family members aged 15 and over are politically educated, consciously involved in the village development process</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">As a united family</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">As a model family following the law (a family free of cases)</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">A family of 3 good women</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">Being a drug-free family</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">A good defensive family</span>: <u>xxxxx</u>
                        </Col>
                        <Col className="mb-2" span={12}>
                            <span
                                className="font-weight-500">Being a good family</span>: <u>xxxxx</u>
                        </Col>
                    </Row>
                </div>
            </section>
        </div>
    )
}

export default DetailBeneficiary;