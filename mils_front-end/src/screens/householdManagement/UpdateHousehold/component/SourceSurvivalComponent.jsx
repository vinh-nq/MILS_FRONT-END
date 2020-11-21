import { Col, Form, Input, Row, Switch } from "antd";
import Text from "antd/es/typography/Text";
import React from "react";
import { useTranslation } from "react-i18next";
import {handleValidateFields} from "../../../../utils/handleValidateFields";
import { objectValidateForm } from "../validate/objectValidateForm";

function SourceSurvivalComponent(props) {
  const { t } = useTranslation();

  return (
    <>
      <Row className="mb-2" gutter={16}>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("ACCESS_TO_ELEMENTARY_OR_JUNIOR_HIGH_SCHOOL")}
          </Text>
          <Form.Item
            name={["PrimaryPublicServiceForBeneficiary", "PrimarySchool"]}
            className="mb-0"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
          </Form.Item>
        </Col>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("PERMANENT_MARKET_ACCESS_OR_REGULAR_TRADING_OF_GOODS")}
          </Text>
          <Form.Item
            name={["PrimaryPublicServiceForBeneficiary", "Market"]}
            className="mb-0"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
          </Form.Item>
        </Col>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("ACCESS_TO_A_HEALTH_CENTER_OR_BASIC_HEALTH_SERVICE_OR_PHARMACY")}
          </Text>
          <Form.Item
            name={["PrimaryPublicServiceForBeneficiary", "Dispensary"]}
            className="mb-0"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
          </Form.Item>
        </Col>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t(
              "TIME_FROM_HOME_TO_HEALTH_CENTER_OR_BASIC_HEALTH_SERVICE_OR_PHARMACY"
            )}
          </Text>
          <Form.Item
            name={["PrimaryPublicServiceForBeneficiary", "TimeDispensary"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFields(
                    rule,
                    value,
                    objectValidateForm.checkNumber(
                      10,
                      0,
                      "TIME_FROM_HOME_TO_HEALTH_CENTER_OR_BASIC_HEALTH_SERVICE_OR_PHARMACY",
                      false
                    ),
                    t
                  );
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("AVAILABILITY_AND_ACCESS_TO_HOSPITALS")}
          </Text>
          <Form.Item
            name={["PrimaryPublicServiceForBeneficiary", "Hospital"]}
            className="mb-0"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
          </Form.Item>
        </Col>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("THE_DISTANCE_FROM_HOME_TO_THE_HOSPITAL")}
          </Text>
          <Form.Item
            name={[
              "PrimaryPublicServiceForBeneficiary",
              "DistanceNearestHospital",
            ]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFields(
                    rule,
                    value,
                    objectValidateForm.checkNumber(
                      10,
                      0,
                      "THE_DISTANCE_FROM_HOME_TO_THE_HOSPITAL",
                      false
                    ),
                    t
                  );
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("TIME_FROM_HOME_TO_HOSPITAL")}
          </Text>
          <Form.Item
            name={["PrimaryPublicServiceForBeneficiary", "TImeNearestHospital"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFields(
                    rule,
                    value,
                    objectValidateForm.checkNumber(
                      10,
                      true,
                      "TIME_FROM_HOME_TO_HOSPITAL",
                      false
                    ),
                    t
                  );
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t(
              "THE_HOUSE_IS_LOCATED_NEXT_TO_THE_ROAD_THAT_CAN_BE_TRAVELED_ALL_YEAR_ROUND"
            )}
          </Text>
          <Form.Item
            name={["PrimaryPublicServiceForBeneficiary", "RoadAccess"]}
            className="mb-0"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
          </Form.Item>
        </Col>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("FAMILIES_TAKE_THE_BUS_THROUGH_THE_VILLAGE_ON_A_REGULAR_BASIS")}
          </Text>
          <Form.Item
            name={["PrimaryPublicServiceForBeneficiary", "TransportStop"]}
            className="mb-0"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
          </Form.Item>
        </Col>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("CONSUMED_INTERNET_SIGNAL_IN_THE_HOME")}
          </Text>
          <Form.Item
            name={["PrimaryPublicServiceForBeneficiary", "ElectricNetwork"]}
            className="mb-0"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren={t("YES")} unCheckedChildren={t("NO")} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default SourceSurvivalComponent;
