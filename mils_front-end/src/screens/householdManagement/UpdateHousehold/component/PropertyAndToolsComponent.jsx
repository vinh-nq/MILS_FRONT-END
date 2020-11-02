import React, {useEffect, useState} from "react";
import {Col, Form, Input, Row, Select, Switch} from "antd";
import Text from "antd/es/typography/Text";
import {useTranslation} from "react-i18next";
import InputNumber from "antd/es/input-number";
import {regexTemplate} from "../../../../utils/regexTemplate";
import {handleValidateFrom} from "../../../../utils/handleValidateFrom";
import {objectValidateForm} from "../validate/objectValidateForm";
import {useSelector} from "react-redux";
import dataDictionaryApi from "../../../../api/dataDictionaryApi";

function PropertyAndToolsComponent() {

    const [borrowingReason, setBorrowingReason] = useState([]);
    const {t} = useTranslation();
    const {Option} = Select;
    const dataLanguage = useSelector(
        (state) => state.languageReducer.objectLanguage.value
    ) || localStorage.getItem("i18nextLng");

    useEffect(() => {
        getBorrowingReason()
    }, []);

    const getBorrowingReason = async () => {
        await dataDictionaryApi.GetAllBorrowReason({keyword: ""}).then(res => {
            console.log(res);
            setBorrowingReason(res.data.Data);
        }).catch(error => {

        })
    };

    const renderSelect = () => {
        return borrowingReason.map((value, index) => (
            <Option value={value.Id} key={index}>{dataLanguage === "la" ? value.ValueOfLao : value.ValueOfEng}</Option>
        ));
    };

    return (
        <>
            {/*1-2*/}
            <Row className="mb-2" gutter={16}>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Number of family members under 14 years old:</Text>
                    <Form.Item
                        name={["StableOccupationAndIncome", "TotalBellow_14"]}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(10, true, "Number of family members under 14 years old"),
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
                    <Text className="font-13 font-weight-500">Number of family members between 14-60 years old:</Text>
                    <Form.Item
                        name={["StableOccupationAndIncome", "TotalBetween_15_60"]}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(10, true, "Number of family members between 14-60 years old"),
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
            </Row>
            {/*3-4*/}
            <Row className="mb-2" gutter={16}>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Number of family members over 60 years old:</Text>
                    <Form.Item
                        name={["StableOccupationAndIncome", "TotalAbove_60"]}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(10, true, "Number of family members over 60 years old"),
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
                        <InputNumber className="w-100" min={0} max={100} />
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Working groups of regular family members:</Text>
                    <Form.Item
                        name={["StableOccupationAndIncome", "MainJobId"]}
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
                        name={["StableOccupationAndIncome", "MainGoodsId"]}
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
                    <Text className="font-13 font-weight-500">During the past 12 months, family members have received
                        income from sources other than their main source of income:</Text>
                    <Form.Item
                        name={["StableOccupationAndIncome", "ReceivedBenfits"]}
                        className="mb-0"
                        valuePropName="checked"
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
                        name={["StableOccupationAndIncome", "OweCredit"]}
                        className="mb-0"
                        valuePropName="checked"
                    >
                        <Switch
                            checkedChildren="Yes" unCheckedChildren="No"
                        />
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Type of lender:</Text>
                    <Form.Item
                        name={["StableOccupationAndIncome", "TypeOfLenderId"]}
                        className="mb-0"
                        // rules={[
                        //     {
                        //         validator(rule, value) {
                        //             return handleValidateFrom(
                        //                 rule,
                        //                 value,
                        //                 objectValidateForm.checkString(50, true, "WHOM_WAS_THE_BORROWING"),
                        //                 t
                        //             );
                        //         },
                        //     }
                        // ]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
            {/*9-10*/}
            <Row className="mb-2" gutter={16}>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Why family members borrow money:</Text>
                    <Form.Item
                        name={["StableOccupationAndIncome", "BorrowingReasonId"]}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `${t("Why family members borrow money")} ${t("is_not_empty")}`,
                            }
                        ]}
                    >
                        <Select>
                            {renderSelect()}
                        </Select>
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Does any family member run any farm on their own land or
                        leased land:</Text>
                    <Form.Item
                        name={["StableOccupationAndIncome", "OwnAgri"]}
                        className="mb-0"
                        valuePropName="checked"
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
                    <Text className="font-13 font-weight-500">Have any family members used the land (owned or leased) in
                        the last production?</Text>
                    <Form.Item
                        name={["StableOccupationAndIncome", "MemberWork"]}
                        className="mb-0"
                        valuePropName="checked"
                    >
                        <Switch
                            checkedChildren="Yes" unCheckedChildren="No"
                        />
                    </Form.Item>
                </Col>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">If yes, specify the number of plots:</Text>
                    <Form.Item
                        name={["StableOccupationAndIncome", "NumberPlots"]}
                        className="mb-0"
                        initialValue={0}
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(10, true, "If yes, specify the number of plots"),
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
            </Row>
            {/*13-14*/}
            <Row className="mb-2" gutter={16}>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">Number of related plots:</Text>
                    <Form.Item
                        name={["StableOccupationAndIncome", "PlotRepeatCount"]}
                        className="mb-0"
                        initialValue={0}
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(10, true, "Number of related plots"),
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
                    <Text className="font-13 font-weight-500">Has there been livestock raising in the last 12 months
                        ?:</Text>
                    <Form.Item
                        name={["StableOccupationAndIncome", "LiveStock"]}
                        className="mb-0"
                        valuePropName="checked"
                    >
                        <Switch
                            checkedChildren="Yes" unCheckedChildren="No"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col className="mb-2" span={24}>
                    <Text className="font-13 font-weight-500">How many family members in the age group have a lower
                        secondary education ?:</Text>
                    <Form.Item
                        name={["StableOccupationAndIncome", "CompletedPrimarySchool"]}
                        className="mb-0"
                        initialValue={0}
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(10, true, "How many family members in the age group have a lower secondary education ?"),
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
            </Row>
        </>
    )
}

export default PropertyAndToolsComponent;