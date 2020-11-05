import {Col, Row} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

function AddressComponent(props) {
    const {LocationBeneficiary, dataLanguage} = props;
    const {t} = useTranslation();
    return (
        <Row className="px-2" gutter={[16, 16]}>
            <Col span={24} md={12}>
                <span className="font-weight-500">{t("PROVINCE")}:{" "}</span>
                {dataLanguage === "la" ? LocationBeneficiary.Province : LocationBeneficiary.ProvinceEng}
            </Col>
            <Col span={24} md={12}>
                <span className="font-weight-500">{t("DISTRICT")}:{" "}</span>
                {dataLanguage === "la" ? LocationBeneficiary.District : LocationBeneficiary.DistrictEng}
            </Col>
            <Col span={24} md={12}>
                <span className="font-weight-500">{t("VILLAGE")}:{" "}</span>
                {dataLanguage === "la" ? LocationBeneficiary.Village : LocationBeneficiary.VillageEng}
            </Col>
            <Col span={24} md={12}>
                <span className="font-weight-500">{t("UNIT")}:{" "}</span>
                {dataLanguage === "la" ? LocationBeneficiary.Unit : LocationBeneficiary.UnitEng}
            </Col>
            <Col span={24} md={12}>
                <span className="font-weight-500">{t("HH_NUMBER")}</span>: {LocationBeneficiary.HHNumber}
            </Col>
            <Col span={24} md={12}>
                <span className="font-weight-500">{t("HH_LEVEL")}</span>: {LocationBeneficiary.HHLevel}
            </Col>
        </Row>
    )
}

export default AddressComponent;