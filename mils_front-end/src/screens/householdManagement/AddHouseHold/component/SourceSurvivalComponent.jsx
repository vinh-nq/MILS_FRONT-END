import {Col, Form, Row, Switch} from "antd";
import Text from "antd/es/typography/Text";
import React from "react";
import {useTranslation} from "react-i18next";
import {regexTemplate} from "../../../../utils/regexTemplate";
import InputNumber from "antd/es/input-number";


function SourceSurvivalComponent(props) {
    const {t} = useTranslation();
    return (
        <>
            <Row className="mb-2" gutter={16}>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Access to elementary or junior high school:</Text>
                    <Form.Item
                        name="PrimarySchool"
                        className="mb-0"
                        initialValue={false}
                    >
                        <Switch
                            checkedChildren="Yes" unCheckedChildren="No"
                        />
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Permanent market access or regular trading of goods:</Text>
                    <Form.Item
                        name="Market"
                        className="mb-0"
                        initialValue={false}
                    >
                        <Switch
                            checkedChildren="Yes" unCheckedChildren="No"
                        />
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Access to a health center or basic health service or pharmacy:</Text>
                    <Form.Item
                        name="Dispensary"
                        className="mb-0"
                        initialValue={false}
                    >
                        <Switch
                            checkedChildren="Yes" unCheckedChildren="No"
                        />
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Time from home to health center or basic health service or pharmacy ........ Minutes:</Text>
                    <Form.Item
                        name="TimeDispensary"
                        className="mb-0"
                        initialValue={0}
                        rules={[
                            {
                                pattern: regexTemplate.NUMBER,
                                message: t("REQUIRE_NUMBER"),
                            }
                        ]}
                    >
                        <InputNumber className="w-100" min={0} max={100} defaultValue={1}/>
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Availability and access to hospitals:</Text>
                    <Form.Item
                        name="Hospital"
                        className="mb-0"
                        initialValue={false}
                    >
                        <Switch
                            checkedChildren="Yes" unCheckedChildren="No"
                        />
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">If not, the distance from home to the hospital .............. km:</Text>
                    <Form.Item
                        name="DistanceNearestHospital"
                        className="mb-0"
                        initialValue={0}
                        rules={[
                            {
                                pattern: regexTemplate.NUMBER,
                                message: t("REQUIRE_NUMBER"),
                            }
                        ]}
                    >
                        <InputNumber className="w-100" min={0} max={100} defaultValue={1}/>
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Time from home to hospital:</Text>
                    <Form.Item
                        name="TImeNearestHospital"
                        className="mb-0"
                        initialValue={0}
                        rules={[
                            {
                                pattern: regexTemplate.NUMBER,
                                message: t("REQUIRE_NUMBER"),
                            }
                        ]}
                    >
                        <InputNumber className="w-100" min={0} max={100} defaultValue={1}/>
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">The house is located next to the road that can be traveled all year round:</Text>
                    <Form.Item
                        name="RoadAccess"
                        className="mb-0"
                        initialValue={false}
                    >
                        <Switch
                            checkedChildren="Yes" unCheckedChildren="No"
                        />
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Families take the bus through the village on a regular basis:</Text>
                    <Form.Item
                        name="TransportStop"
                        className="mb-0"
                        initialValue={false}
                    >
                        <Switch
                            checkedChildren="Yes" unCheckedChildren="No"
                        />
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Consumed internet signal in the home:</Text>
                    <Form.Item
                        name="ElectricNetwork"
                        className="mb-0"
                        initialValue={false}
                    >
                        <Switch
                            checkedChildren="Yes" unCheckedChildren="No"
                        />
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}

export default SourceSurvivalComponent

