import {Col, Row} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

function GeneralInformationComponent(props) {
    const {GeneralInformationBeneficiary} = props;
    const {t} = useTranslation();
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
            <Col span={24} md={12}>
                <span className="font-weight-500">{t("TELEPHONE")}</span>:{" "}
                {GeneralInformationBeneficiary.TelePhone2}
            </Col>
            <Col span={24} md={12}>
                <span className="font-weight-500">{t("RESPONDENT")}</span>:{" "}
                {GeneralInformationBeneficiary.Respondent}
            </Col>
            <Col span={24} md={12}>
                <span className="font-weight-500">{t("TELEPHONE")}</span>:{" "}
                {GeneralInformationBeneficiary.TelePhone3}
            </Col>
            <Col span={24} md={12}>
                <span className="font-weight-500">{t("UPLOAD_IMAGE")}</span>: {" "}
                <img src={GeneralInformationBeneficiary.ImageUrl || ""} alt="Not found"/>
            </Col>
        </Row>
    )
}

export default GeneralInformationComponent;