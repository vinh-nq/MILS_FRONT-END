import React from "react";
import { Col, Form, Row, Switch, Typography } from "antd";
import { useTranslation } from "react-i18next";

function InstrumentsForDailyLifeComponent() {
  const { t } = useTranslation();
  const { Text } = Typography;
  return (
    <>
      <Row gutter={16}>
        <Col md={12} span={24}>
          <ul className="pl-3">
            <li>
              <div className="d-flex align-items-center">
                <Text className="font-weight-500">{t("CARS")}</Text>
                <Form.Item
                  name={["Machine", "Cars"]}
                  className="mb-0 ml-2"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
                </Form.Item>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center">
                <Text className="font-weight-500">{t("MOTORCYCLES")}</Text>
                <Form.Item
                  name={["Machine", "Motorcycles"]}
                  className="mb-0 ml-2"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
                </Form.Item>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center">
                <Text className=" font-weight-500">{t("BICYCLE")}</Text>
                <Form.Item
                  name={["Machine", "Bicycle"]}
                  className="mb-0 ml-2"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
                </Form.Item>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center">
                <Text className=" font-weight-500">{t("TRICYCLE")}</Text>
                <Form.Item
                  name={["Machine", "Tricycle"]}
                  className="mb-0 ml-2"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
                </Form.Item>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center">
                <Text className=" font-weight-500">{t("BOAT")}</Text>
                <Form.Item
                  name={["Machine", "Boat"]}
                  className="mb-0 ml-2"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
                </Form.Item>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center">
                <Text className=" font-weight-500">
                  {t("AIR_CONDITIONING")}
                </Text>
                <Form.Item
                  name={["Machine", "AirConditioning"]}
                  className="mb-0 ml-2"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
                </Form.Item>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center">
                <Text className=" font-weight-500">{t("REFRIGERATOR")}</Text>
                <Form.Item
                  name={["Machine", "Refrigerator"]}
                  className="mb-0 ml-2"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
                </Form.Item>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center">
                <Text className=" font-weight-500">{t("WASHING_MACHINE")}</Text>
                <Form.Item
                  name={["Machine", "WashingMachine"]}
                  className="mb-0 ml-2"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
                </Form.Item>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center">
                <Text className=" font-weight-500">{t("TV")}</Text>
                <Form.Item
                  name={["Machine", "TV"]}
                  className="mb-0 ml-2"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
                </Form.Item>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center">
                <Text className=" font-weight-500">
                  {t("DESKTOP_LAPTOP_COMPUTERS")}
                </Text>
                <Form.Item
                  name={["Machine", "DesktopLaptopComputers"]}
                  className="mb-0 ml-2"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
                </Form.Item>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center">
                <Text className=" font-weight-500">{t("LANDLINE")}</Text>
                <Form.Item
                  name={["Machine", "Landline"]}
                  className="mb-0 ml-2"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
                </Form.Item>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center">
                <Text className=" font-weight-500">{t("MOBILE_PHONE")}</Text>
                <Form.Item
                  name={["Machine", "MobilePhone"]}
                  className="mb-0 ml-2"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
                </Form.Item>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center">
                <Text className=" font-weight-500">
                  {t("TWO_WHEEL_TRACTOR")}
                </Text>
                <Form.Item
                  name={["Machine", "TwowheelTractor"]}
                  className="mb-0 ml-2"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
                </Form.Item>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center">
                <Text className=" font-weight-500">
                  {t("FOUR_WHEEL_TRACTOR")}
                </Text>
                <Form.Item
                  name={["Machine", "FourwheelTractor"]}
                  className="mb-0 ml-2"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
                </Form.Item>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center">
                <Text className=" font-weight-500">
                  {t("ADEQUATE_AGRICULTURAL_EQUIPMENT")}
                </Text>
                <Form.Item
                  name={["Machine", "AdequateAgriculturalEquipment"]}
                  className="mb-0 ml-2"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
                </Form.Item>
              </div>
            </li>
            <li>
              <div className="d-flex align-items-center">
                <Text className=" font-weight-500">
                  {t("ADEQUATE_PRODUCTION_LAND")}
                </Text>
                <Form.Item
                  name={["Machine", "AdequateProductionLand"]}
                  className="mb-0 ml-2"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
                </Form.Item>
              </div>
            </li>
          </ul>
        </Col>
      </Row>
    </>
  );
}

export default InstrumentsForDailyLifeComponent;
