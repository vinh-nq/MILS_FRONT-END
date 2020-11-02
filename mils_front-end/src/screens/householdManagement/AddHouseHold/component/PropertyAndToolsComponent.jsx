import React from "react";
import {Col, Form, Input, Row, Switch} from "antd";
import Text from "antd/es/typography/Text";
import {useTranslation} from "react-i18next";
import InputNumber from "antd/es/input-number";
import {regexTemplate} from "../../../../utils/regexTemplate";
import {handleValidateFrom} from "../../../../utils/handleValidateFrom";
import {objectValidateForm} from "../validate/objectValidateForm";

function PropertyAndToolsComponent() {
    const {t} = useTranslation();
    return (
        <>
            {/*1-2*/}
            <Row className="mb-2" gutter={16}>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Number of family members under 14 years old:</Text>
                    <Form.Item
                        name="TotalBellow_14"
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
                    <Text className="font-13 font-weight-500">Number of family members between 14-60 years old:</Text>
                    <Form.Item
                        name="TotalBetween_15_60"
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
            </Row>
            {/*3-4*/}
            <Row className="mb-2" gutter={16}>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Number of family members over 60 years old:</Text>
                    <Form.Item
                        name="TotalAbove_60"
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
                    <Text className="font-13 font-weight-500">Working groups of regular family members:</Text>
                    <Form.Item
                        name="MainJobId"
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(50, true, "Working groups of regular family members"),
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
            {/*5-6*/}
            <Row className="mb-2" gutter={16}>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">The main occupations of most family members work:</Text>
                    <Form.Item
                        name="MainGoodsId"
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(50, true, "The main occupations of most family members work"),
                                        t
                                    );
                                },
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">During the past 12 months, family members have received income from sources other than their main source of income:</Text>
                    <Form.Item
                        name="ReceivedBenfits"
                        className="mb-0"
                        initialValue={false}
                    >
                        <Switch
                            checkedChildren="Yes" unCheckedChildren="No"
                        />
                    </Form.Item>
                </Col>
            </Row>
            {/*7-8*/}
            <Row className="mb-2" gutter={16}>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Have family members borrowed from other parties:</Text>
                    <Form.Item
                        name="OweCredit"
                        className="mb-0"
                        initialValue={false}
                    >
                        <Switch
                            checkedChildren="Yes" unCheckedChildren="No"
                        />
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Type of lender:</Text>
                    <Form.Item
                        name="TypeOfLenderId"
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(50, true, "WHOM_WAS_THE_BORROWING"),
                                        t
                                    );
                                },
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            {/*9-10*/}
            <Row className="mb-2" gutter={16}>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Why family members borrow money:</Text>
                    <Form.Item
                        name="BorrowingReasonId"
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(50, true, "Why family members borrow money"),
                                        t
                                    );
                                },
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Does any family member run any farm on their own land or leased land:</Text>
                    <Form.Item
                        name="OwnAgri"
                        className="mb-0"
                        initialValue={false}
                    >
                        <Switch
                            checkedChildren="Yes" unCheckedChildren="No"
                        />
                    </Form.Item>
                </Col>
            </Row>
            {/*11-12*/}
            <Row className="mb-2" gutter={16}>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Have any family members used the land (owned or leased) in the last production?</Text>
                    <Form.Item
                        name="MemberWork"
                        className="mb-0"
                        initialValue={false}
                    >
                        <Switch
                            checkedChildren="Yes" unCheckedChildren="No"
                        />
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">If yes, specify the number of plots:</Text>
                    <Form.Item
                        name="NumberPlots"
                        className="mb-0"
                        initialValue={0}
                        rules={[
                            {
                                pattern: regexTemplate.NUMBER,
                                message: t("REQUIRE_NUMBER"),
                            }
                        ]}
                    >
                        <InputNumber className="w-100" min={0} max={100} defaultValue={0}/>
                    </Form.Item>
                </Col>
            </Row>
            {/*13-14*/}
            <Row className="mb-2" gutter={16}>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Number of related plots:</Text>
                    <Form.Item
                        name="PlotRepeatCount"
                        className="mb-0"
                        initialValue={0}
                        rules={[
                            {
                                pattern: regexTemplate.NUMBER,
                                message: t("REQUIRE_NUMBER"),
                            }
                        ]}
                    >
                        <InputNumber className="w-100" min={0} max={100} defaultValue={0}/>
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Has there been livestock raising in the last 12 months ?:</Text>
                    <Form.Item
                        name="LiveStock"
                        className="mb-0"
                        initialValue={false}
                    >
                        <Switch
                            checkedChildren="Yes" unCheckedChildren="No"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">How many family members in the age group have a lower secondary education ?:</Text>
                    <Form.Item
                        name="CompletedPrimarySchool"
                        className="mb-0"
                        initialValue={0}
                        rules={[
                            {
                                pattern: regexTemplate.NUMBER,
                                message: t("REQUIRE_NUMBER"),
                            }
                        ]}
                    >
                        <InputNumber className="w-100" min={0} max={100} defaultValue={0}/>
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}

export default PropertyAndToolsComponent;