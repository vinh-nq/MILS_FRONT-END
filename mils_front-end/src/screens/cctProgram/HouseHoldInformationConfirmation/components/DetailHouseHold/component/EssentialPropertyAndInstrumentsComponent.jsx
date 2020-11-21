import {Col, Row} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

function EssentialPropertyAndInstrumentsComponent(props) {
    const {changeYesNoForQuestion , Machine} = props;
    const {t} = useTranslation();

    return (
        <Row className="px-2" gutter={[16, 16]}>
            <Col span={24}>
                <span className="font-weight-600">{t("CARS")}</span>: {" "}
                {changeYesNoForQuestion(Machine.Cars)}
            </Col>
            <Col span={24}>
                <span className="font-weight-600">{t("MOTORCYCLES")}</span>:{" "}
                {changeYesNoForQuestion(Machine.Motorcycles)}
            </Col>
            <Col span={24}>
                <span className="font-weight-600">{t("BICYCLE")}</span>:{" "}
                {changeYesNoForQuestion(Machine.Bicycle)}
            </Col>
            <Col span={24}>
                <span className="font-weight-600">{t("TRICYCLE")}</span>:{" "}
                {changeYesNoForQuestion(Machine.Tricycle)}
            </Col>
            <Col span={24}>
                <span className="font-weight-600">{t("BOAT")}</span>:{" "}
                {changeYesNoForQuestion(Machine.Boat)}
            </Col>
            <Col span={24}>
                <span className="font-weight-600">{t("AIR_CONDITIONING")}</span>:{" "}
                {changeYesNoForQuestion(Machine.AirConditioning)}
            </Col>
            <Col span={24}>
                <span className="font-weight-600">{t("REFRIGERATOR")}</span>:{" "}
                {changeYesNoForQuestion(Machine.Refrigerator)}
            </Col>
            <Col span={24}>
                <span className="font-weight-600">{t("WASHING_MACHINE")}</span>:{" "}
                {changeYesNoForQuestion(Machine.WashingMachine)}
            </Col>
            <Col span={24}>
                <span className="font-weight-600">{t("TV")}</span>:{" "}
                {changeYesNoForQuestion(Machine.TV)}
            </Col>
            <Col span={24}>
                <span className="font-weight-600">{t("DESKTOP_LAPTOP_COMPUTERS")}</span>:{" "}
                {changeYesNoForQuestion(Machine.DesktopLaptopComputers)}
            </Col>
            <Col span={24}>
                <span className="font-weight-600">{t("LANDLINE")}</span>:{" "}
                {changeYesNoForQuestion(Machine.Landline)}
            </Col>
            <Col span={24}>
                <span className="font-weight-600">{t("MOBILE_PHONE")}</span>:{" "}
                {changeYesNoForQuestion(Machine.MobilePhone)}
            </Col>
            <Col span={24}>
                <span className="font-weight-600">{t("TWO_WHEEL_TRACTOR")}</span>:{" "}
                {changeYesNoForQuestion(Machine.TwowheelTractor)}
            </Col>
            <Col span={24}>
                <span className="font-weight-600">{t("FOUR_WHEEL_TRACTOR")}</span>:{" "}
                {changeYesNoForQuestion(Machine.FourwheelTractor)}
            </Col>
            <Col span={24}>
                <span className="font-weight-600">{t("ADEQUATE_AGRICULTURAL_EQUIPMENT")}</span>:{" "}
                {changeYesNoForQuestion(Machine.AdequateAgriculturalEquipment)}
            </Col>
            <Col span={24}>
                <span className="font-weight-600">{t("ADEQUATE_PRODUCTION_LAND")}</span>:{" "}
                {changeYesNoForQuestion(Machine.AdequateProductionLand)}
            </Col>
        </Row>
    )
}

export default EssentialPropertyAndInstrumentsComponent;