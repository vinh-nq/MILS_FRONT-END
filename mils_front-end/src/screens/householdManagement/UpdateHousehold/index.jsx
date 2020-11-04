import React, {useEffect, useState} from "react";
import {Button, Form, message} from "antd";
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

// const defaultObj = {
//     "ProvinceId": "",
//     "Province": "",
//     "Year": "",
//     "ProvinceEng": "",
//     "VillageId": "",
//     "Village": "",
//     "VillageEng": "",
//     "DistrictId": "",
//     "District": "",
//     "DistrictEng": "",
//     "UnitId": "",
//     "Unit": "",
//     "UnitEng": "",
//     "HHNumber": "",
//     "HHLevel": "",
//     "HeadOfHHName": "",
//     "Telephone1": "",
//     "Female": "",
//     "NumberOfHH": "",
//     "DateOfEnumeration": "",
//     "Enumeration": "",
//     "TelePhone2": "",
//     "TelePhone3": "",
//     "Respondent": "",
//     "ImageUrl": "",
//     "MemberId": "",
//     "HHCode": "",
//     "MemberName": "",
//     "MaritalStatusId": "",
//     "MaritalStatus": "",
//     "MaritalStatusEng": "",
//     "RelationHouseHoldId": "",
//     "RelationToHosueHold": "",
//     "RelationToHosueHoldEng": "",
//     "GenderId": "",
//     "Gender": "",
//     "GenderEng": "",
//     "DateOfBirth": "",
//     "Age": 39,
//     "TribesId": "",
//     "Tribes": "",
//     "TribesEng": "",
//     "Pregnant": "",
//     "AreEnrolledInSchool": "",
//     "CurrentlyStudyingId": "",
//     "CurrentlyStudying": "",
//     "CurrentlyStudyingEng": "",
//     "MemberLevelId": "",
//     "MemberLevel": "",
//     "MemberLevelEng": "",
//     "LevelAndClassAreEnrolledId": "",
//     "LevelAndClassAreEnrolled": "",
//     "LevelAndClassAreEnrolledEng": "",
//     "Business": "",
//     "Agricature": "",
//     "Outside": "",
//     "MainJobId": "",
//     "MainJob": "",
//     "MainJobEng": "",
//     "MainGoodId": "",
//     "MainGood": "",
//     "MainGoodEng": "",
//     "HealthInsurance": "",
//     "PrivateHealthInsurance": "",
//     "Disability": "",
//     "DisabilityType": "",
//     "DisabilityTypeEng": "",
//     "PlotLandId": "",
//     "HHNum": "",
//     "PlotId": "",
//     "NameOfPlot": "",
//     "NoOfPlot": "",
//     "OwnedOrLeasedId": "",
//     "OwnedOrLeased": "",
//     "OwnedOrLeasedEng": "",
//     "KindOfLandId": "",
//     "KindOfLand": "",
//     "KindOfLandEng": "",
//     "CauseOfPlotId": "",
//     "CauseOfPlot": "",
//     "CauseOfPlotEng": "",
//     "TypeOfLandId": "",
//     "TypeOfLand": "",
//     "TypeOfLandEng": "",
//     "TotalRooms": "",
//     "WallMaterial": "",
//     "WallMaterialEng": "",
//     "FloorMaterial": "",
//     "FloorMaterialEng": "",
//     "RoofMaterial": "",
//     "RoofMaterialEng": "",
//     "AreaMaterial": "",
//     "AreaMaterialEng": "",
//     "WallMaterialId": "",
//     "FloorMaterialId": "",
//     "RoofMaterialId": "",
//     "AreaMaterialId": "",
//     "Cars": "",
//     "Motorcycles": "",
//     "Bicycle": "",
//     "Tricycle": "",
//     "Boat": "",
//     "AirConditioning":"",
//     "Refrigerator": "",
//     "WashingMachine": "",
//     "TV": "",
//     "DesktopLaptopComputers": "",
//     "Landline": "",
//     "MobilePhone": "",
//     "TwowheelTractor": "",
//     "FourwheelTractor": "",
//     "AdequateAgriculturalEquipment": "",
//     "AdequateProductionLand": "",
//     "TotalBellow_14": "",
//     "TotalBetween_15_60": "",
//     "TotalAbove_60": "",
//     "MainGoodsId": "",
//     "MainGoods": "",
//     "MainGoodsEng": "",
//     "ReceivedBenfits": "",
//     "OweCredit": "",
//     "TypeOfLenderId": "",
//     "TypeOfLender": "",
//     "TypeOfLenderEng": "",
//     "BorrowingReasonId": "",
//     "BorrowingReason": "",
//     "BorrowingReasonEng": "",
//     "OwnAgri": "",
//     "MemberWork": "",
//     "NumberPlots": "",
//     "PlotRepeatCount": "",
//     "LiveStock": "",
//     "CompletedPrimarySchool": "",
//     "WaterId": "",
//     "Water": "",
//     "WaterEng": "",
//     "WaterDryId": "",
//     "WaterDry": "",
//     "WaterDryEng": "",
//     "ToiletTypeId": "",
//     "ToiletType": "",
//     "ToiletTypeEng": "",
//     "CookingSourceId": "",
//     "CookingSource": "",
//     "CookingSouceEng": "",
//     "EnergySourceId": "",
//     "EnergySource": "",
//     "EnergySourceEng": "",
//     "PrimarySchool": "",
//     "Market": "",
//     "Dispensary": "",
//     "TimeDispensary": "",
//     "Hospital": "",
//     "DistanceNearestHospital": "",
//     "TImeNearestHospital": "",
//     "RoadAccess": "",
//     "TransportStop": "",
//     "ElectricNetwork": "",
//     "Lat": "",
//     "Long": ""
// };

function UpdateHousehold(props) {
    const {typeModal} = props;
    const [isLoading, setLoading] = useState(false);
    const [detailHouseHold, setDetailHouseHold] = useState({});
    const history = useHistory();
  const [form] = Form.useForm();

  const { t } = useTranslation();
    useEffect(() => {
       if(typeModal === "UPDATE"){
           const hh_code = getValueOfQueryParams(history.location, "hh_code", "STRING");
           const getDetailHouseHold = async (hh_code) => {
               setLoading(true);
               await houseHoldApi.getDetailHouseHold({householdId: hh_code}).then(res => {
                   const {DateOfEnumeration} = res.data.Data.GeneralInformationBeneficiary;
                   res.data.Data.GeneralInformationBeneficiary.DateOfEnumeration = DateOfEnumeration ? moment(DateOfEnumeration,"DD-MM-YYYY") : undefined;
                   setDetailHouseHold(res.data.Data);
                   form.setFieldsValue(res.data.Data);
               });
               setLoading(false);
           };
           getDetailHouseHold(hh_code);
       }
    }, [form,history.location]);

  const handleAdd = async (value) => {
      message.loading({ content: "Loading...", key: "message-form-role" });
      const objCover = {
          HHCode: value.HHCode,
          ...value.LocationBeneficiary,
          ...value.GeneralInformationBeneficiary,
          ...value.Shelter,
          ...value.Machine,
          ...value.StableOccupationAndIncome,
          ...value.WaterAndPermanentEnergyBeneficiary,
          ...value.PrimaryPublicServiceForBeneficiary,
          ...value.WaterAndPermanentEnergyBeneficiary,
          ...value.LatLongForBeneficiary
      };
      await houseHoldApi.addHouseHold(objCover).then((res) => {
          if (res.data.Status) {
              form.resetFields();
              message.success({
                  content: t("ADD_SUCCESS"),
                  key: "message-form-role",
                  duration: 1,
              });
          } else {
              message.error({
                  content: t("ADD_FAILED"),
                  key: "message-form-role",
                  duration: 1,
              });
          }
      });
  };

  const handleUpdate = async (value) => {
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
        ...value.LatLongForBeneficiary,
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
      {_.isEmpty(detailHouseHold) && typeModal === "UPDATE"? null : (
        <Form
          form={form}
          name="control-hooks"
          id="form-household"
          onFinish={typeModal === "ADD" ? handleAdd : handleUpdate}
        >
          <section className="mb-3">
            <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
              I. Location
            </div>
            <LocationComponent detailHouseHold={detailHouseHold} form={form} typeModal={typeModal}/>
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
            <section className="mb-3">
                <div className="mb-3 p-2 title-gray text-dark font-16 font-weight-500">
                    7.4 Location in map
                </div>
                <LocationMapComponent />
            </section>
        </Form>
      )}
    </div>
  );
}

export default UpdateHousehold;