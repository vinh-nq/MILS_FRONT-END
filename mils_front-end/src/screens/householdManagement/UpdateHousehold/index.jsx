import React, { useEffect, useState } from "react";
import { Button, Form, message } from "antd";
import SaveFilled from "@ant-design/icons/lib/icons/SaveFilled";
import LocationComponent from "./component/LocationComponent";
import GeneralInformationComponent from "./component/GeneralInformationComponent";
import ShelterComponent from "./component/ShelterComponent";
import InstrumentsForDailyLifeComponent from "./component/InsrtrumentsForDailyLifeComponent";
import PropertyAndToolsComponent from "./component/PropertyAndToolsComponent";
import SourceSurvivalComponent from "./component/SourceSurvivalComponent";
import { useTranslation } from "react-i18next";
import "./scss/style.scss";
import { getValueOfQueryParams } from "../../../utils/getValueOfQueryParams";
import houseHoldApi from "../../../api/houseHoldApi";
import _ from "lodash";
import moment from "moment";
import LoadingSpinner from "../../../components/LoadingSpinner";
import EnergyUsedComponent from "./component/EneryUsedComponent";

function UpdateHousehold(props) {
  const [isLoading, setLoading] = useState(false);
  const [detailHouseHold, setDetailHouseHold] = useState({});

  const [form] = Form.useForm();

  const { t } = useTranslation();
  useEffect(() => {
    const hh_code = getValueOfQueryParams(props.location, "hh_code", "STRING");
    const getDetailHouseHold = async (hh_code) => {
      setLoading(true);
      await houseHoldApi
        .getDetailHouseHold({ householdId: hh_code })
        .then((res) => {
          const {
            DateOfEnumeration,
          } = res.data.Data.GeneralInformationBeneficiary;
          res.data.Data.GeneralInformationBeneficiary.DateOfEnumeration = DateOfEnumeration
            ? moment(DateOfEnumeration, "DD-MM-YYYY")
            : undefined;
          console.log(res.data.Status);
          setDetailHouseHold(res.data.Data);
          form.setFieldsValue(res.data.Data);
        });
      setLoading(false);
    };
    getDetailHouseHold(hh_code);
  }, [props.location, form]);

  const onSubmit = async (value) => {
    message.loading({ content: "Loading...", key: "message-form-role" });
    const objCover = {
      ...detailHouseHold,
      ...value.LocationBeneficiary,
      ...value.GeneralInformationBeneficiary,
      ...value.Shelter,
      ...value.Machine,
      ...value.StableOccupationAndIncome,
      ...value.WaterAndPermanentEnergyBeneficiary,
      ...value.PrimaryPublicServiceForBeneficiary,
      ...value.WaterAndPermanentEnergyBeneficiary,
      HHCode: getValueOfQueryParams(props.location, "hh_code", "STRING"),
    };
    await houseHoldApi.updateHouseHold(objCover).then((res) => {
      if (res.data.Status) {
        const {
          DateOfEnumeration,
        } = res.data.Data.GeneralInformationBeneficiary;
        res.data.Data.GeneralInformationBeneficiary.DateOfEnumeration = DateOfEnumeration
          ? moment(DateOfEnumeration, "DD-MM-YYYY")
          : undefined;
        setDetailHouseHold(res.data.Data);
        form.setFieldsValue(res.data.Data);
        message.success({
          content: t("EDIT_SUCCESS"),
          key: "message-form-role",
          duration: 1,
        });
      } else {
        message.error({
          content: t("EDIT_FAILED"),
          key: "message-form-role",
          duration: 1,
        });
      }
    });
  };

  return (
    <div className="add-beneficiary-form">
      {/*Header and title*/}
      {isLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <section className="border-bottom mb-3">
        <div className="d-flex align-items-center mb-3">
          <span className="h5 mb-0">Update Household</span>
          <span className="ml-auto">
            <Button
              className="set-center-content"
              type="primary"
              icon={<SaveFilled className="font-16" />}
              form="form-household"
              key="submit"
              htmlType="submit"
            />
          </span>
        </div>
      </section>

      {/*Content*/}
      {_.isEmpty(detailHouseHold) ? null : (
        <Form
          form={form}
          name="control-hooks"
          id="form-household"
          onFinish={onSubmit}
        >
          <section className="mb-3">
            <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
              I. Location
            </div>
            <LocationComponent detailHouseHold={detailHouseHold} form={form} />
          </section>

          <section className="mb-3">
            <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
              II. General Information
            </div>
            <GeneralInformationComponent
              detailHouseHold={detailHouseHold}
              form={form}
            />
          </section>

          <section className="mb-3">
            <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
              V. Clean water and permanent energy use
            </div>
            <EnergyUsedComponent />
          </section>

          <section className="mb-3">
            <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
              7.1 {t("SHELTER")}
            </div>
            <ShelterComponent />
          </section>

          <section className="mb-3">
            <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
              7.2{" "}
              {t("HAVING_ESSENTIAL_PROPERTY_AND_INSRTRUMENTS_FOR_DAILY_LIFE")}
            </div>
            <InstrumentsForDailyLifeComponent />
          </section>

          <section className="mb-3">
            <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
              7.3 Having property and tools necessary for living and making a
              living
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
      )}
    </div>
  );
}

export default UpdateHousehold;
