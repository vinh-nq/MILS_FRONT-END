import { Col, Image, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { API_URL } from "../../../../../../constants/config";

function GeneralInformationComponent(props) {
  const { GeneralInformationBeneficiary } = props;
  const { t } = useTranslation();
  // console.log("run here");
  return (
    <Row className="px-2" gutter={[16, 16]}>
      <Col span={24} md={12}>
        <span className="font-weight-500">{t("HEAD_OF_HH_NAME")}</span>:{" "}
        {GeneralInformationBeneficiary.HeadOfHHName}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">{t("GENDER")}</span>:{" "}
        {GeneralInformationBeneficiary.Gender}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">{t("TELEPHONE")}</span>:{" "}
        {GeneralInformationBeneficiary.Telephone1}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">{t("NUMBER_OF_HH")}</span>:{" "}
        {GeneralInformationBeneficiary.NumberOfHH}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">{t("FEMALE")}</span>:{" "}
        {GeneralInformationBeneficiary.Female}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">{t("NUMBER_PLOTS")}</span>:{" "}
        {GeneralInformationBeneficiary.NumberPlots}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">{t("DATE_OF_ENUMERATION")}</span>:{" "}
        {GeneralInformationBeneficiary.DateOfEnumeration}
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">{t("ENUMERATION")}</span>:{" "}
        {GeneralInformationBeneficiary.Enumeration}
      </Col>
      <Col span={24}>
        <span className="font-weight-500">{t("TELEPHONE")}</span>:{" "}
        {GeneralInformationBeneficiary.TelePhone2}
      </Col>
      <Col span={24}>
        <div className="signature-image">
          <p className="font-weight-500 mb-0">{t("SIGNATURE")}:</p>
          <div className="border text-center w-100 py-2">
            <Image
              className="pointer"
              width={250}
              height={160}
              src={`${API_URL}${GeneralInformationBeneficiary.EnumSignImage}`}
              alt={t("NOT_FOUND")}
            />
          </div>
        </div>
      </Col>
      <Col span={24} md={12}>
        <span className="font-weight-500">{t("RESPONDENT")}</span>:{" "}
        {GeneralInformationBeneficiary.Respondent}
      </Col>
      <Col span={24} md={12} className="align-self-md-center">
        <span className="font-weight-500">{t("TELEPHONE")}</span>:{" "}
        {GeneralInformationBeneficiary.TelePhone3}
      </Col>
      <Col span={24}>
        <div className="signature-image">
          <p className="font-weight-500 mb-0">{t("SIGNATURE")}:</p>
          <div className="border text-center w-100 py-2">
            <Image
              className="pointer"
              width={250}
              height={160}
              src={`${API_URL}${GeneralInformationBeneficiary.RespSignImage}`}
              alt={t("NOT_FOUND")}
            />
          </div>
        </div>
      </Col>
      <Col span={24}>
        <div className="signature-image">
          <p className="font-weight-500 mb-0">{t("UPLOAD_IMAGE")}:</p>
          <div className="border text-center w-100 py-2">
            <Image
              className="pointer"
              width={250}
              height={160}
              src={`${API_URL}${GeneralInformationBeneficiary.ImageUrl}`}
              alt={t("NOT_FOUND")}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default GeneralInformationComponent;
