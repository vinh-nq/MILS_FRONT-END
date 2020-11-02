import React, {useEffect, useState} from "react";
import {Button, Form,} from "antd";
import SaveFilled from "@ant-design/icons/lib/icons/SaveFilled";
import LocationComponent from "./component/LocationComponent";
import GeneralInformationComponent from "./component/GeneralInformationComponent";
import ShelterComponent from "./component/ShelterComponent";
import InstrumentsForDailyLifeComponent from "./component/InsrtrumentsForDailyLifeComponent";
import PropertyAndToolsComponent from "./component/PropertyAndToolsComponent";
import SourceSurvivalComponent from "./component/SourceSurvivalComponent";
import {useTranslation} from "react-i18next";
import "./scss/style.scss";
import {getValueOfQueryParams} from "../../../utils/getValueOfQueryParams";
import houseHoldApi from "../../../api/houseHoldApi";
import _ from 'lodash';
import moment from "moment";
import LoadingSpinner from "../../../components/LoadingSpinner";

function UpdateHousehold(props) {
    const [isLoading, setLoading] = useState(false);
    const [detailHouseHold, setDetailHouseHold] = useState({});

    const [form] = Form.useForm();

    const {t} = useTranslation();
    useEffect(() => {
        const hh_code = getValueOfQueryParams(props.location, "hh_code", "STRING");
        getDetailHouseHold(hh_code);
    }, []);

    const onSubmit = async (value) => {
        const objCover = {
            ...detailHouseHold,
            ...value.LocationBeneficiary,
            ...value.GeneralInformationBeneficiary,
            ...value.Shelter,
            ...value.Machine,
            ...value.StableOccupationAndIncome,
            ...value.WaterAndPermanentEnergyBeneficiary,
            ...value.PrimaryPublicServiceForBeneficiary,
            HHCode: getValueOfQueryParams(props.location, "hh_code", "STRING")
        };
        await houseHoldApi.updateHouseHold(objCover).then(res => {

        })
    };

    const getDetailHouseHold = async (hh_code) => {
        setLoading(true);
        await houseHoldApi.getDetailHouseHold({householdId: hh_code}).then(res => {
            const {DateOfEnumeration} = res.data.Data.GeneralInformationBeneficiary;
            res.data.Data.GeneralInformationBeneficiary.DateOfEnumeration = DateOfEnumeration ? moment(DateOfEnumeration) : undefined;
            setDetailHouseHold(res.data.Data);
            form.setFieldsValue(res.data.Data);
        });
        setLoading(false);
    };

    return (
        <div className="add-beneficiary-form">
            {/*Header and title*/}
            {isLoading ? (
                <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2"/>
            ) : null}
            <section className="border-bottom mb-3">
                <div className="d-flex align-items-center mb-3">
                    <span className="h5 mb-0">Update Household</span>
                    <span className="ml-auto">
                    <Button
                        className="set-center-content"
                        type="primary"
                        icon={<SaveFilled className="font-16"/>}
                        form="form-household"
                        key="submit"
                        htmlType="submit"
                    />
                </span>
                </div>
            </section>

            {/*Content*/}
            {
                _.isEmpty(detailHouseHold) ? null : (
                    <Form form={form} name="control-hooks" id="form-household" onFinish={onSubmit}>
                        <section className="mb-3">
                            <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
                                I. Location
                            </div>
                            <LocationComponent detailHouseHold={detailHouseHold}/>
                        </section>

                        <section className="mb-3">
                            <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
                                II. General Information
                            </div>
                            <GeneralInformationComponent detailHouseHold={detailHouseHold}/>
                        </section>

                        <section className="mb-3">
                            <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
                                V . General Information
                            </div>
                        </section>

                        <section className="mb-3">
                            <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
                                7.1 {t("SHELTER")}
                            </div>
                            <ShelterComponent/>
                        </section>

                        <section className="mb-3">
                            <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
                                7.2 {t("HAVING_ESSENTIAL_PROPERTY_AND_INSRTRUMENTS_FOR_DAILY_LIFE")}
                            </div>
                            <InstrumentsForDailyLifeComponent/>
                        </section>

                        <section className="mb-3">
                            <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
                                7.3 Having property and tools necessary for living and making a living
                            </div>
                            <PropertyAndToolsComponent/>
                        </section>

                        <section className="mb-3">
                            <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
                                7.4 Have a stable job and occupation or source of income
                            </div>
                            <SourceSurvivalComponent/>
                        </section>
                    </Form>
                )
            }

        </div>
    )
}

export default UpdateHousehold;