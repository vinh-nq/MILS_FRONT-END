import React from "react";
import {Button, Form,} from "antd";
import SaveFilled from "@ant-design/icons/lib/icons/SaveFilled";
import LocationComponent from "./component/LocationComponent";
import GeneralInformationComponent from "./component/GeneralInformationComponent";
import ShelterComponent from "./component/ShelterComponent";
import {useTranslation} from "react-i18next";
import InstrumentsForDailyLifeComponent from "./component/InsrtrumentsForDailyLifeComponent";
import "./scss/style.scss";
import PropertyAndToolsComponent from "./component/PropertyAndToolsComponent";
import SourceSurvivalComponent from "./component/SourceSurvivalComponent";

function AddBeneficiaryForm(props) {
    const [form] = Form.useForm();

    const {t} = useTranslation();

    const onSubmit = (value) => {
        console.log(value);
    };

    return (
        <div className="add-beneficiary-form">
            {/*Header and title*/}
            <section className="border-bottom mb-3">
                <div className="d-flex align-items-center mb-3">
                    <span className="h5 mb-0">Add Household</span>
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
            <Form form={form} name="control-hooks" id="form-household" onFinish={onSubmit}>
                <section className="mb-3">
                    <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
                        I. Location
                    </div>
                    <LocationComponent/>
                </section>
                
                <section className="mb-3">
                    <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
                        II. General Information
                    </div>
                    <GeneralInformationComponent />
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
                    <InstrumentsForDailyLifeComponent />
                </section>

                <section className="mb-3">
                    <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
                        7.3 Having property and tools necessary for living and making a living
                     </div>
                    <PropertyAndToolsComponent />
                </section>

                <section className="mb-3">
                    <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
                        7.4 Have a stable job and occupation or source of income
                    </div>
                    <SourceSurvivalComponent />
                </section>
            </Form>
        </div>
    )
}

export default AddBeneficiaryForm;