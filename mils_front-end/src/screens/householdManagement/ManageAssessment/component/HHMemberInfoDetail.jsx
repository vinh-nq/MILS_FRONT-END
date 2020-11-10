import { Button, Col, Row, Tag } from "antd";
import BackwardOutlined from "@ant-design/icons/lib/icons/BackwardOutlined";
import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function HHMemberInfoDetail(props) {
  const { objUser, setShowDetailMember } = props;
  const { t } = useTranslation();

  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");
  return (
    <div className="hhMemberInfo">
      <div className="text-right mb-2">
        <Button
          type="primary"
          onClick={() => {
            setShowDetailMember(false);
          }}
        >
          <BackwardOutlined className="font-16 ant--icon__middle" />
          {t("BACK")}
        </Button>
      </div>
      <div className="bg-primary p-2 font-16 font-500 text-white">
        {t("HOUSEHOLD_MEMBER_LIST")}
      </div>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">{t("PHOTO")}</span>
        </Col>
        <Col span={12}>
          <Tag color="#337AB7">
            <i className="fas fa-user"></i>
          </Tag>
        </Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">{t("MEMBER_NAME")}</span>
        </Col>
        <Col span={12}>{objUser.Data.MemberName}</Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">{t("GENDER")}</span>
        </Col>
        <Col span={12}>
          {dataLanguage === "la" ? objUser.Data.Gender : objUser.Data.GenderEng}
        </Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">{t("MARITAL_STATUS")}</span>
        </Col>
        <Col span={12}>
          {dataLanguage === "la"
            ? objUser.Data.MaritalStatus
            : objUser.Data.MaritalStatusEng}
        </Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">{t("DOB")}</span>
        </Col>
        <Col span={12}>{objUser.Data.DateOfBirth}</Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">{t("RELATION_TO_HOUSEHOLD")}</span>
        </Col>
        <Col span={12}>
          {dataLanguage === "la"
            ? objUser.Data.RelationToHosueHold
            : objUser.Data.RelationToHosueHoldEng}
        </Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">{t("AGE")}</span>
        </Col>
        <Col span={12}>{objUser.Data.Age}</Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">
            {t("ARE_YOU_ENROLLED_IN_SCHOOL_NOW")}
          </span>
        </Col>
        <Col span={12}>{objUser.Data.AreEnrolledInSchool ? "Yes" : "No"}</Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">
            {t("WHAT_LEVEL_AND_CLASS_ARE_YOU_ENROLLED_IN_NOW")}
          </span>
        </Col>
        <Col span={12}>
          {dataLanguage === "la"
            ? objUser.Data.LevelAndClassAreEnrolled
            : objUser.Data.LevelAndClassAreEnrolledEng}
        </Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">
            {t(
              "HAVE_YOU_WORKED_ON_YOUR_OWN_ACCOUNT_OR_IN_A_BUSINESS_BELONGING_TO_YOU_OR_SOMEONE_IN_YOUR_HOUSEHOLD"
            )}
          </span>
        </Col>
        <Col span={12}>{objUser.Data.Business ? "Yes" : "No"}</Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">
            {t(
              "HAVE_YOU_PERFORMED_ANY_ACTIVITY_ON_AGRICATURE_BY_YOU_OR_MEMBER_OF_YOUR_HOUSEHOLD"
            )}
          </span>
        </Col>
        <Col span={12}>{objUser.Data.Agricature ? "Yes" : "No"}</Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">
            {t(
              "HAVE_YOU_PERFORMED_ANY_ACTIVITY_FOR_SOMEONE_WHO_IS_NOT_LIVING_IN_THIS_HOUSEHOLD"
            )}
          </span>
        </Col>
        <Col span={12}>{objUser.Data.Outside ? "Yes" : "No"}</Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">
            {t("IN_THE_MAIN_JOB_THAT_YOU_HAD_DURING_THE_PAST_7_DAYS_ARE_YOU")}
          </span>
        </Col>
        <Col span={12}>
          {dataLanguage === "la"
            ? objUser.Data.MainJob
            : objUser.Data.MainJobEng}
        </Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">
            {t(
              "IN_THE_MAIN_JOB_WHAT_ARE_THE_MAIN_GOODS_OR_SERVICES_PRODUCED_AT_YOUR_PLACE_OF_WORK"
            )}
          </span>
        </Col>
        <Col span={12}>
          {dataLanguage === "la"
            ? objUser.Data.MainGood
            : objUser.Data.MainGoodEng}
        </Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">
            {t(
              "ARE_YOU_A_MEMBER_OF_ANY_PUBLIC_HEALTH_INSURANCE_SOCIAL_HEALTH_PROTECTION_SCHEMES"
            )}
          </span>
        </Col>
        <Col span={12}>{objUser.Data.HealthInsurance ? "Yes" : "No"}</Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">
            {t("ARE_YOU_A_MEMBER_OF_A_PRIVATE_HEALTH_INSURANCE")}
          </span>
        </Col>
        <Col span={12}>
          {objUser.Data.PrivateHealthInsurance ? "Yes" : "No"}
        </Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">{t("ARE_YOU_CURRENTLY_PREGNANT")}</span>
        </Col>
        <Col span={12}>{objUser.Data.Pregnant ? "Yes" : "No"}</Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">
            {t("DOES_THIS_PERSON_HAS_ANY_DISABILITY")}
          </span>
        </Col>
        <Col span={12}>{objUser.Data.Disability ? "Yes" : "No"}</Col>
      </Row>
      <Row gutter={24} className="mx-0 py-2 border-bottom">
        <Col span={12}>
          <span className="font-400">{t("WHAT_TYPE_OF_DISABILITIES")}</span>
        </Col>
        <Col span={12}>
          {dataLanguage === "la"
            ? objUser.Data.DisabilityType
            : objUser.Data.DisabilityTypeEng}
        </Col>
      </Row>
    </div>
  );
}

export default HHMemberInfoDetail;
