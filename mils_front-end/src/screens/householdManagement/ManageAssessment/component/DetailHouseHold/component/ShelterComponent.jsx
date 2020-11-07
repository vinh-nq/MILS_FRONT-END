import {Col, Row} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

function ShelterComponent(props) {
    const {dataLanguage, Shelter} = props;
    const {t} = useTranslation();
    return (
        <Row className="px-2" gutter={[16, 16]}>
            <Col span={24} md={12}>
                <span className="font-weight-500">{t("WALL_MATERIAL")}</span>: {" "}
                {dataLanguage === "la" ? Shelter.WallMaterial : Shelter.WallMaterialEng}
            </Col>
            <Col span={24} md={12}>
                <span className="font-weight-500">{t("FLOOR_MATERIAL")}</span>:{" "}
                {dataLanguage === "la" ? Shelter.FloorMaterial : Shelter.FloorMaterialEng}
            </Col>
            <Col span={24} md={12}>
                <span className="font-weight-500">{t("ROOF_MATERIAL")}</span>:{" "}
                {dataLanguage === "la" ? Shelter.RoofMaterial : Shelter.RoofMaterialEng}
            </Col>
            <Col span={24} md={12}>
                <span className="font-weight-500">{t("AREA_MATERIAL")}</span>:{" "}
                {dataLanguage === "la" ? Shelter.AreaMaterial : Shelter.AreaMaterialEng}
            </Col>
            <Col span={24} md={12}>
                <span className="font-weight-500">Roof Safety area</span>:{" "}
                {dataLanguage === "la" ? Shelter.SafetyArea : Shelter.SafetyAreaEng}
            </Col>
        </Row>
    )
}

export default ShelterComponent