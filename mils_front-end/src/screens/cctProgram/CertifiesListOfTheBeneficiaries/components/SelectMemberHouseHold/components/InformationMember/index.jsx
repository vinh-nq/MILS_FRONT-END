import { Col, Row, Tag, Skeleton, Tooltip } from "antd";
import React from "react";
import { CloseSquareOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./styles.scss";

function InformationMember(props) {
  const { objUser, loading, setObjectUser } = props;
  const { t } = useTranslation();
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  return (
    <div className="hhMemberInfo-container">
      <div className="d-flex align-items-center justify-content-between title-content-member">
        <div className="p-2 font-500">{t("HOUSEHOLD_MEMBER_LIST")}</div>
        <Tooltip placement="top" title={"Hide Information Memeber"}>
          <CloseSquareOutlined
            style={{ color: "red" }}
            className="p-2 pointer"
            onClick={() => {
              setObjectUser({});
            }}
          />
        </Tooltip>
      </div>
      <Skeleton loading={loading} active>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={12}>
            <span className="font-400 font-12">{t("PHOTO")}</span>
          </Col>
          <Col span={12}>
            <Tag color="#337AB7">
              <i className="fas fa-user"></i>
            </Tag>
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={12}>
            <span className="font-400 font-12">{t("MEMBER_NAME")}</span>
          </Col>
          <Col span={12} className="font-12">
            {objUser.MemberName}
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={12}>
            <span className="font-400 font-12">{t("GENDER")}</span>
          </Col>
          <Col span={12} className="font-12">
            {dataLanguage === "la" ? objUser.Gender : objUser.GenderEng}
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={12}>
            <span className="font-400 font-12">{t("MARITAL_STATUS")}</span>
          </Col>
          <Col span={12} className="font-12">
            {dataLanguage === "la"
              ? objUser.MaritalStatus
              : objUser.MaritalStatusEng}
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={12}>
            <span className="font-400 font-12">{t("DOB")}</span>
          </Col>
          <Col span={12} className="font-12">
            {objUser.DateOfBirth}
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={12}>
            <span className="font-400 font-12">
              {t("RELATION_TO_HOUSEHOLD")}
            </span>
          </Col>
          <Col span={12} className="font-12">
            {dataLanguage === "la"
              ? objUser.RelationToHosueHold
              : objUser.RelationToHosueHoldEng}
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={12} className="font-12">
            <span className="font-400 font-12">{t("AGE")}</span>
          </Col>
          <Col span={12} className="font-12">
            {objUser.Age}
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={12}>
            <span className="font-400 font-12">
              {t("ARE_YOU_ENROLLED_IN_SCHOOL_NOW")}
            </span>
          </Col>
          <Col span={12} className="font-12">
            {objUser.AreEnrolledInSchool ? "Yes" : "No"}
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={19}>
            <span className="font-400 font-12">
              {t("WHAT_LEVEL_AND_CLASS_ARE_YOU_ENROLLED_IN_NOW")}
            </span>
          </Col>
          <Col span={5} className="font-12">
            {dataLanguage === "la"
              ? objUser.LevelAndClassAreEnrolled
              : objUser.LevelAndClassAreEnrolledEng}
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={19}>
            <span className="font-400 font-12">
              {t(
                "HAVE_YOU_WORKED_ON_YOUR_OWN_ACCOUNT_OR_IN_A_BUSINESS_BELONGING_TO_YOU_OR_SOMEONE_IN_YOUR_HOUSEHOLD"
              )}
            </span>
          </Col>
          <Col span={5} className="font-12">
            {objUser.Business ? "Yes" : "No"}
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={19}>
            <span className="font-400 font-12">
              {t(
                "HAVE_YOU_PERFORMED_ANY_ACTIVITY_ON_AGRICATURE_BY_YOU_OR_MEMBER_OF_YOUR_HOUSEHOLD"
              )}
            </span>
          </Col>
          <Col span={5} className="font-12">
            {objUser.Agricature ? "Yes" : "No"}
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={19}>
            <span className="font-400 font-12">
              {t(
                "HAVE_YOU_PERFORMED_ANY_ACTIVITY_FOR_SOMEONE_WHO_IS_NOT_LIVING_IN_THIS_HOUSEHOLD"
              )}
            </span>
          </Col>
          <Col span={5} className="font-12">
            {objUser.Outside ? "Yes" : "No"}
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={19}>
            <span className="font-400 font-12">
              {t("IN_THE_MAIN_JOB_THAT_YOU_HAD_DURING_THE_PAST_7_DAYS_ARE_YOU")}
            </span>
          </Col>
          <Col span={5} className="font-12">
            {dataLanguage === "la" ? objUser.MainJob : objUser.MainJobEng}
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={19}>
            <span className="font-400 font-12">
              {t(
                "IN_THE_MAIN_JOB_WHAT_ARE_THE_MAIN_GOODS_OR_SERVICES_PRODUCED_AT_YOUR_PLACE_OF_WORK"
              )}
            </span>
          </Col>
          <Col span={5} className="font-12">
            {dataLanguage === "la" ? objUser.MainGood : objUser.MainGoodEng}
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={19}>
            <span className="font-400 font-12">
              {t(
                "ARE_YOU_A_MEMBER_OF_ANY_PUBLIC_HEALTH_INSURANCE_SOCIAL_HEALTH_PROTECTION_SCHEMES"
              )}
            </span>
          </Col>
          <Col span={5} className="font-12">
            {objUser.HealthInsurance ? "Yes" : "No"}
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={19}>
            <span className="font-400 font-12">
              {t("ARE_YOU_A_MEMBER_OF_A_PRIVATE_HEALTH_INSURANCE")}
            </span>
          </Col>
          <Col span={5} className="font-12">
            {objUser.PrivateHealthInsurance ? "Yes" : "No"}
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={19}>
            <span className="font-400 font-12">
              {t("ARE_YOU_CURRENTLY_PREGNANT")}
            </span>
          </Col>
          <Col span={5} className="font-12">
            {objUser.Pregnant ? "Yes" : "No"}
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={19}>
            <span className="font-400 font-12">
              {t("DOES_THIS_PERSON_HAS_ANY_DISABILITY")}
            </span>
          </Col>
          <Col span={5} className="font-12">
            {objUser.Disability ? "Yes" : "No"}
          </Col>
        </Row>
        <Row gutter={24} className="mx-0 py-2 border-bottom">
          <Col span={19}>
            <span className="font-400 font-12">
              {t("WHAT_TYPE_OF_DISABILITIES")}
            </span>
          </Col>
          <Col span={5} className="font-12">
            {dataLanguage === "la"
              ? objUser.DisabilityType
              : objUser.DisabilityTypeEng}
          </Col>
        </Row>
      </Skeleton>
    </div>
  );
}

export default InformationMember;
