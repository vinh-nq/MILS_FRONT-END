import { Col, Form, Input, message, Row, Typography, Upload } from "antd";
import { handleValidateFrom } from "../../../../utils/handleValidateFrom";
import { objectValidateForm } from "../validate/objectValidateForm";
import React from "react";
import { useTranslation } from "react-i18next";

function LocationMapComponent(props) {
  const { t } = useTranslation();
  const { TextArea } = Input;
  const { Text } = Typography;

  return (
    <Row className="mb-2" gutter={16}>
      <Col span={24} md={12}>
        <Text className="font-13 font-weight-500">
          Longitude<span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </Text>
        <Form.Item
          name={["LatLongForBeneficiary", "Long"]}
          className="mb-0"
          rules={[
            {
              validator(rule, value) {
                return handleValidateFrom(
                  rule,
                  value,
                  objectValidateForm.checkString(20, true, "Longitude"),
                  t
                );
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={24} md={12}>
        <Text className="font-13 font-weight-500">
          Latitude<span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </Text>
        <Form.Item
          name={["LatLongForBeneficiary", "Lat"]}
          className="mb-0"
          rules={[
            {
              validator(rule, value) {
                return handleValidateFrom(
                  rule,
                  value,
                  objectValidateForm.checkString(20, true, "Latitude"),
                  t
                );
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Text className="font-13 font-weight-500">{t("DESCRIPTION")}</Text>
        <Form.Item
          name={["LatLongForBeneficiary", "Description"]}
          className="mb-0"
        >
          <TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            showCount
            maxLength={200}
          />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default LocationMapComponent;
