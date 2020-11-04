import {Col, Form, Row, Switch} from "antd";
import Text from "antd/es/typography/Text";
import React  from "react";
import {useTranslation} from "react-i18next";
import {regexTemplate} from "../../../../utils/regexTemplate";
import InputNumber from "antd/es/input-number";
import {handleValidateFrom} from "../../../../utils/handleValidateFrom";
import {objectValidateForm} from "../validate/objectValidateForm";

function SourceSurvivalComponent(props) {
    const {t} = useTranslation();

    return (
        <>
            <Row className="mb-2" gutter={16}>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Access to elementary or junior high school:</Text>
                    <Form.Item
                        name={["PrimaryPublicServiceForBeneficiary","PrimarySchool"]}
                        className="mb-0"
                        valuePropName="checked"
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
                        name={["PrimaryPublicServiceForBeneficiary","Market"]}
                        className="mb-0"
                        valuePropName="checked"
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
                        name={["PrimaryPublicServiceForBeneficiary","Dispensary"]}
                        className="mb-0"
                        valuePropName="checked"
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
                        name={["PrimaryPublicServiceForBeneficiary","TimeDispensary"]}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(5, true, "Time from home to health center or basic health service or pharmacy ........ Minutes"),
                                        t
                                    );
                                },
                            },
                            {
                                pattern: regexTemplate.NUMBER,
                                message: t("REQUIRE_NUMBER"),
                            }
                        ]}
                    >
                        <InputNumber className="w-100" min={0} max={100}/>
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Availability and access to hospitals:</Text>
                    <Form.Item
                        name={["PrimaryPublicServiceForBeneficiary","Hospital"]}
                        className="mb-0"
                        valuePropName="checked"
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
                        name={["PrimaryPublicServiceForBeneficiary","DistanceNearestHospital"]}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(5, true, "If not, the distance from home to the hospital .............. km"),
                                        t
                                    );
                                },
                            },
                            {
                                pattern: regexTemplate.NUMBER,
                                message: t("REQUIRE_NUMBER"),
                            }
                        ]}
                    >
                        <InputNumber className="w-100" min={0} max={100}/>
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Time from home to hospital:</Text>
                    <Form.Item
                        name={["PrimaryPublicServiceForBeneficiary","TImeNearestHospital"]}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(5, true, "Time from home to hospital"),
                                        t
                                    );
                                },
                            },
                            {
                                pattern: regexTemplate.NUMBER,
                                message: t("REQUIRE_NUMBER"),
                            }
                        ]}
                    >
                        <InputNumber className="w-100" min={0} max={100}/>
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">The house is located next to the road that can be traveled all year round:</Text>
                    <Form.Item
                        name={["PrimaryPublicServiceForBeneficiary","RoadAccess"]}
                        className="mb-0"
                        valuePropName="checked"
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
                        name={["PrimaryPublicServiceForBeneficiary","TransportStop"]}
                        className="mb-0"
                        valuePropName="checked"
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
                        name={["PrimaryPublicServiceForBeneficiary","ElectricNetwork"]}
                        className="mb-0"
                        valuePropName="checked"
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

