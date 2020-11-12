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
import { useHistory } from "react-router-dom";
import LocationMapComponent from "./component/LocationMapComponent";
import BackwardOutlined from "@ant-design/icons/lib/icons/BackwardOutlined";
import { PATH } from "../../../routers/Path";
import { API_URL } from "../../../constants/config";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";

function UpdateHousehold(props) {
  const { typeModal } = props;
  const [isLoading, setLoading] = useState(false);
  const [detailHouseHold, setDetailHouseHold] = useState({});
  const history = useHistory();
  const [HHCode, setHHCode] = useState("");
  //update state image
  const [EnumSignImage, setEnumSignImage] = useState("");
  const [RespSignImage, setRespSignImage] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [EnumSignImageExtension, setEnumSignImageExtension] = useState("");
  const [RespSignImageExtension, setRespSignImageExtension] = useState("");
  const [ImageUrlExtension, setImageUrlExtension] = useState("");

  const [form] = Form.useForm();

  const { t } = useTranslation();

  useEffect(() => {
    if (typeModal === "UPDATE") {
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
            const { GeneralInformationBeneficiary } = res.data.Data;
            const {
              DateOfEnumeration,
            } = res.data.Data.GeneralInformationBeneficiary;
            res.data.Data.GeneralInformationBeneficiary.DateOfEnumeration = DateOfEnumeration
              ? moment(DateOfEnumeration, "DD-MM-YYYY")
              : undefined;
            setImageUrl(
              GeneralInformationBeneficiary.ImageUrl
                ? `${API_URL}${GeneralInformationBeneficiary.ImageUrl}`
                : ""
            );
            setEnumSignImage(
              GeneralInformationBeneficiary.EnumSignImage
                ? `${API_URL}${GeneralInformationBeneficiary.EnumSignImage}`
                : ""
            );
            setRespSignImage(
              GeneralInformationBeneficiary.RespSignImage
                ? `${API_URL}${GeneralInformationBeneficiary.RespSignImage}`
                : ""
            );
            setDetailHouseHold(res.data.Data);
            form.setFieldsValue(res.data.Data);
          });
        setLoading(false);
      };
      getDetailHouseHold(hh_code);
    }
  }, [form, history.location, typeModal]);

  const formatHHNumberAndHHLevel = (value, length) => {
    const checkLength = length - value.length;
    for (let i = 0; i < checkLength; i++) {
      value = "0" + value;
    }
    return value;
  };

  const formatBase64 = (value) => {
    value = value
      .replace("data:image/jpeg;base64,", "")
      .replace("data:image/png;base64,", "")
      .replace(API_URL, "");
    return value;
  };

  const handleAdd = async (value) => {
    setLoading(true);
    const objCover = {
      ...value.LocationBeneficiary,
      ...value.GeneralInformationBeneficiary,
      ...value.Shelter,
      ...value.Machine,
      ...value.StableOccupationAndIncome,
      ...value.WaterAndPermanentEnergyBeneficiary,
      ...value.PrimaryPublicServiceForBeneficiary,
      ...value.WaterAndPermanentEnergyBeneficiary,
      ...value.LatLongForBeneficiary,
      ImageUrl: formatBase64(ImageUrl),
      RespSignImage: formatBase64(RespSignImage),
      EnumSignImage: formatBase64(EnumSignImage),
      EnumSignImageExtension,
      RespSignImageExtension,
      ImageUrlExtension,
    };
    objCover.HHNumber = formatHHNumberAndHHLevel(objCover.HHNumber, 3);
    objCover.HHLevel = formatHHNumberAndHHLevel(objCover.HHLevel, 4);
    await houseHoldApi
      .addHouseHold(objCover, `Add New HouseHold`)
      .then((res) => {
        if (res.data.Status) {
          setLoading(false);
          if (res.data.Messages === "Household Code already exists") {
            message.error({
              content: t("CODE_DUPLICATE"),
              key: "message-form-role",
              duration: 2,
            });
          } else {
            form.resetFields();
            setEnumSignImage("");
            setRespSignImage("");
            setImageUrl("");
            setEnumSignImageExtension("");
            setRespSignImageExtension("");
            setImageUrlExtension("");
            message.success({
              content: t("ADD_SUCCESS"),
              key: "message-form-role",
              duration: 1,
            });
          }
        } else {
          setLoading(false);
          message.error({
            content: t("ADD_FAILED"),
            key: "message-form-role",
            duration: 1,
          });
        }
      });
  };

  const handleUpdate = async (value) => {
    setLoading(true);
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
      ...value.LatLongForBeneficiary,
      HHCode: detailHouseHold.HouseholdId,
      ImageUrl: formatBase64(ImageUrl),
      RespSignImage: formatBase64(RespSignImage),
      EnumSignImage: formatBase64(EnumSignImage),
      EnumSignImageExtension,
      RespSignImageExtension,
      ImageUrlExtension,
    };
    objCover.HHNumber = formatHHNumberAndHHLevel(objCover.HHNumber, 3);
    objCover.HHLevel = formatHHNumberAndHHLevel(objCover.HHLevel, 4);
    await houseHoldApi.updateHouseHold(objCover).then((res) => {
      if (res.data.Status) {
        setLoading(false);
        if (res.data.Messages === "Household Code already exists") {
          message.error({
            content: t("CODE_DUPLICATE"),
            key: "message-form-role",
            duration: 2,
          });
        } else {
          const {
            DateOfEnumeration,
          } = res.data.Data.GeneralInformationBeneficiary;
          res.data.Data.GeneralInformationBeneficiary.DateOfEnumeration = DateOfEnumeration
            ? moment(DateOfEnumeration, "DD-MM-YYYY")
            : undefined;
          setDetailHouseHold(res.data.Data);
          setHHCode(res.data.Data.HouseholdId);
          form.setFieldsValue(res.data.Data);
          message.success({
            content: t("EDIT_SUCCESS"),
            key: "message-form-role",
            duration: 1,
          });
        }
      } else {
        setLoading(false);
        message.error({
          content: t("EDIT_FAILED"),
          key: "message-form-role",
          duration: 1,
        });
      }
    });
  };

  const submitFailed = async () => {
    message.error({
      content: t("HAVE_FIELD_ERROR"),
      key: "message-form-role",
      duration: 2,
    });
  };

  return (
    <>
      <div className="add-beneficiary-form">
        {/*Header and title*/}
        {isLoading ? (
          <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
        ) : null}
        <section className="border-bottom mb-3">
          <div className="d-md-flex align-items-center mb-3">
            <span className="h5 mb-0">
              {typeModal === "ADD" ? t("add") : t("update")} Household
            </span>
            <div className="d-flex ml-auto align-items-center mt-md-0 mt-2">
              <Button
                className="set-center-content mr-2"
                type="primary"
                icon={<ArrowLeftOutlined />}
                onClick={() => {
                  if (typeModal === "UPDATE") {
                    history.push(`${PATH.DETAIL_HOUSEHOLD}?hh_code=${HHCode}`);
                  } else {
                    history.push(`${PATH.HOUSEHOLD_REGISTRATION}`);
                  }
                }}
              >
                {t("BACK")}
              </Button>
              <Button
                className="set-center-content"
                type="primary"
                icon={<SaveFilled />}
                form="form-household"
                key="submit"
                htmlType="submit"
              >
                {t("SAVE")}
              </Button>
            </div>
          </div>
        </section>

        {/*Content*/}
        {_.isEmpty(detailHouseHold) && typeModal === "UPDATE" ? null : (
          <Form
            form={form}
            name="control-hooks"
            id="form-household"
            onFinish={typeModal === "ADD" ? handleAdd : handleUpdate}
            onFinishFailed={submitFailed}
          >
            <section className="mb-3">
              <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
                I. Location
              </div>
              <LocationComponent
                detailHouseHold={detailHouseHold}
                form={form}
              />
            </section>

            <section className="mb-3">
              <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
                II. General Information
              </div>
              <GeneralInformationComponent
                detailHouseHold={detailHouseHold}
                form={form}
                typeModal={typeModal}
                EnumSignImage={EnumSignImage}
                RespSignImage={RespSignImage}
                ImageUrl={ImageUrl}
                setEnumSignImage={setEnumSignImage}
                setRespSignImage={setRespSignImage}
                setImageUrl={setImageUrl}
                setEnumSignImageExtension={setEnumSignImageExtension}
                setRespSignImageExtension={setRespSignImageExtension}
                setImageUrlExtension={setImageUrlExtension}
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
            <section className="mb-3">
              <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
                7.4 Location in map
              </div>
              <LocationMapComponent />
            </section>
          </Form>
        )}
      </div>
    </>
  );
}

export default UpdateHousehold;
