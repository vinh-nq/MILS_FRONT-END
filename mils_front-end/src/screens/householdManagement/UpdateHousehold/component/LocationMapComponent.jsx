import {Col, Form, Input, Row, Select, Typography} from "antd";
import {handleValidateFrom} from "../../../../utils/handleValidateFrom";
import {objectValidateForm} from "../validate/objectValidateForm";
import React from "react";
import {useTranslation} from "react-i18next";

function LocationMapComponent(props) {
    const {t} = useTranslation();
    const {Text} = Typography;
return (
    <Row className="mb-2" gutter={16}>
        <Col span={24} md={12}>
            <Text className="font-13 font-weight-500">Longitude</Text>
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
                    }
                ]}
            >
                <Input/>
            </Form.Item>
        </Col>
        <Col span={24} md={12}>
            <Text className="font-13 font-weight-500">Latitude</Text>
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
                    }
                ]}
            >
                <Input/>
            </Form.Item>
        </Col>
    </Row>
)
}

export default LocationMapComponent;