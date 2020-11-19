import {Col, Row} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

function OccupationAndIncomeComponent(props) {
    const {WaterAndPermanentEnergyBeneficiary, dataLanguage} = props;
    const {t} = useTranslation();
    return (
        <Row className="px-2" gutter={[16, 16]}>
            <Col span={24}>
                <span className="font-weight-500">{t("DURING_RAINING")}</span>:{" "}
                {dataLanguage === "la" ? WaterAndPermanentEnergyBeneficiary.Water : WaterAndPermanentEnergyBeneficiary.WaterEng}
            </Col>
            <Col span={24}>
                <span className="font-weight-500">{t("DURING_DRY")}</span>:{" "}
                {dataLanguage === "la" ? WaterAndPermanentEnergyBeneficiary.WaterDry : WaterAndPermanentEnergyBeneficiary.WaterDryEng}
            </Col>
            <Col span={24}>
                <span className="font-weight-500">{t("TYPE_OF_TOILET")}</span>:{" "}
                {dataLanguage === "la" ? WaterAndPermanentEnergyBeneficiary.ToiletType : WaterAndPermanentEnergyBeneficiary.ToiletTypeEng}
            </Col>
            <Col span={24}>
                <span className="font-weight-500">{t("SOURCE_FOR_COOKING")}</span>:{" "}
                {dataLanguage === "la" ? WaterAndPermanentEnergyBeneficiary.CookingSource : WaterAndPermanentEnergyBeneficiary.CookingSouceEng}
            </Col>
            <Col span={24}>
                <span className="font-weight-500">{t("SOURCE_FOR_LIGHTING")}</span>:{" "}
                {dataLanguage === "la" ? WaterAndPermanentEnergyBeneficiary.EnergySource : WaterAndPermanentEnergyBeneficiary.EnergySourceEng}
            </Col>
        </Row>
    )
}

export default OccupationAndIncomeComponent;