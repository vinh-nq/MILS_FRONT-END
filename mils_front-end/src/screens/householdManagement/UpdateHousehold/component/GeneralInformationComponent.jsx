import {Col, Form, Row, Typography, Input, Select, DatePicker} from "antd";
import React from "react";
import {handleValidateFrom} from "../../../../utils/handleValidateFrom";
import {objectValidateForm} from "../validate/objectValidateForm";
import {regexTemplate} from "../../../../utils/regexTemplate";
import {useTranslation} from "react-i18next";
import moment from "moment";

function GeneralInformationComponent(props) {
    const {Text} = Typography;
    const {t} = useTranslation();
    const {Option} = Select;

    const disabledDate = (current) => {
        return current > moment();
    }

    return (
        <>
            <Row className="mb-2" gutter={16}>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("HEAD_OF_HH_NAME")}</Text>
                    <Form.Item
                        name={["GeneralInformationBeneficiary", "HeadOfHHName"]}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(20, true, "HEAD_OF_HH_NAME"),
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
                    <Text className="font-13 font-weight-500">{t("GENDER")}</Text>
                    <Form.Item
                        name={["GeneralInformationBeneficiary", "Gender"]}
                        className="mb-0"
                        initialValue={"Male"}
                    >
                        <Select>
                            <Option value="Male">
                                {t("MALE")}
                            </Option>
                            <Option value="Female">
                                {t("FEMALE")}
                            </Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("TELEPHONE")}</Text>
                    <Form.Item
                        name={["GeneralInformationBeneficiary", "Telephone1"]}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(20, true, "TELEPHONE"),
                                        t
                                    );
                                },
                            },
                            {
                                pattern: regexTemplate.PHONE,
                                message: t("required_phone"),
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("NUMBER_OF_HH")}</Text>
                    <Form.Item
                        name={["GeneralInformationBeneficiary", "NumberOfHH"]}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.telephone,
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
                       <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("FEMALE")}</Text>
                    <Form.Item
                        name={["GeneralInformationBeneficiary", "Female"]}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(2, true, "FEMALE"),
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
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("DATE_OF_ENUMERATION")}</Text>
                    <Form.Item
                        name={["GeneralInformationBeneficiary", "DateOfEnumeration"]}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `${t("DATE_OF_ENUMERATION")} ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <DatePicker className="w-100" disabledDate={disabledDate}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("ENUMERATION")}</Text>
                    <Form.Item
                        name={["GeneralInformationBeneficiary", "Enumeration"]}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(20, true, "ENUMERATION"),
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
                    <Text className="font-13 font-weight-500">{t("TELEPHONE")}</Text>
                    <Form.Item
                        name={["GeneralInformationBeneficiary", "TelePhone2"]}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.telephone,
                                        t
                                    );
                                },
                            },
                            {
                                pattern: regexTemplate.PHONE,
                                message: t("required_phone")
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("RESPONDENT")}</Text>
                    <Form.Item
                        name={["GeneralInformationBeneficiary", "Respondent"]}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(20, true, "RESPONDENT"),
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
                    <Text className="font-13 font-weight-500">{t("TELEPHONE")}</Text>
                    <Form.Item
                        name={["GeneralInformationBeneficiary", "TelePhone2"]}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.telephone,
                                        t
                                    );
                                },
                            },
                            {
                                pattern: regexTemplate.PHONE,
                                message: t("required_phone")
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}

export default GeneralInformationComponent;