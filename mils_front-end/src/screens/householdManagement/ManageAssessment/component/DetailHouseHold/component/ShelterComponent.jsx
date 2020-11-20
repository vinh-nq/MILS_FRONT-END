import { Col, Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

function ShelterComponent(props) {
  const { dataLanguage, Shelter } = props;
  const { t } = useTranslation();
  return (
    <Row className="px-2" gutter={[16, 16]}>
      <Col span={24}>
        <span className="font-weight-600">{t("TOTAL_ROOMS")}</span>:{" "}
        {Shelter.TotalRooms}
      </Col>
      <Col span={24}>
        <span className="font-weight-600">{t("WALL_MATERIAL")}</span>:{" "}
        {dataLanguage === "la" ? Shelter.WallMaterial : Shelter.WallMaterialEng}
      </Col>
      <Col span={24}>
        <span className="font-weight-600">{t("FLOOR_MATERIAL")}</span>:{" "}
        {dataLanguage === "la"
          ? Shelter.FloorMaterial
          : Shelter.FloorMaterialEng}
      </Col>
      <Col span={24}>
        <span className="font-weight-600">{t("ROOF_MATERIAL")}</span>:{" "}
        {dataLanguage === "la" ? Shelter.RoofMaterial : Shelter.RoofMaterialEng}
      </Col>
      <Col span={24}>
        <span className="font-weight-600">{t("ROOF_SAFETY_AREA")}</span>:{" "}
        {dataLanguage === "la" ? Shelter.SafetyArea : Shelter.SafetyAreaEng}
      </Col>
    </Row>
  );
}

export default ShelterComponent;
