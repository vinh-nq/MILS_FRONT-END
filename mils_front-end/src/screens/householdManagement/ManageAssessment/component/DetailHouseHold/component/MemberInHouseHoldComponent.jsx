import {Col, DatePicker, Form, Input, Row, Select, Typography} from "antd";
import {handleValidateFrom} from "../../../../../../utils/handleValidateFrom";
import {objectValidateForm} from "../validate/objectValidateForm";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import dataDictionaryApi from "../../../../../../api/dataDictionaryApi";

function MemberInHouseHold(props) {
    const {typeModal} = props;
    const [form] = Form.useForm();
    const {Option} = Select;
    const {Text} = Typography;
    const {t} = useTranslation();
    //state selection
    const [ethnicOrigin, setEthnicOrigin] = useState([]);

    useEffect(() => {

    },[]);

    const handleAdd = (value) => {

    };

    const handleUpdate = (value) => {

    }

    const getEthnicOrigin = async () => {
        await dataDictionaryApi.GetAllEthnic({keywords:""}).then(res => {
            setEthnicOrigin(res.data.Data);
        })
    }

    const renderSelect = (array) => {
        // return array.map((value,index) => (
        //     <Option value={value.Id} key={index}>{dataLanguage === "la" ? value.ValueOfLao : value.ValueOfEng}</Option>
        // ));
    };

    return (
        <Form
            id="form-household-member"
            form={form}
            onFinish={typeModal === "ADD" ? handleAdd : handleUpdate}
        >
            <p className="h5">Add family members</p>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Member Name</Text>
                    <Form.Item
                        name={"PlotLandId"}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(50, true, "Name of plot"),
                                        t
                                    );
                                },
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Marital status</Text>
                    <Form.Item
                        name={"OwnedOrLeasedId"}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `${t("Owned or leased")} ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select>
                            {/*{renderSelect(ownedLeased)}*/}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Relation to household</Text>
                    <Form.Item
                        name={"OwnedOrLeasedId"}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `${t("Owned or leased")} ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select>
                            {/*{renderSelect(ownedLeased)}*/}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Gender</Text>
                    <Form.Item
                        name={"KindOfLandId"}
                        className="mb-0"
                        initialValue={"Male"}
                    >
                        <Select>
                            <Option value={"Male"}>{t("MALE")}</Option>
                            <Option value={"FeMale"}>{t("FEMALE")}</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Date of birth</Text>
                    <Form.Item
                        name={"Date of birth"}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `${t("Cause of plot")} ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <DatePicker className="w-100"/>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Age</Text>
                    <Form.Item
                        name={"Age"}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkNumber(200, 0, "Age", true),
                                        t
                                    );
                                },
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Ethnic origin</Text>
                    <Form.Item
                        name={"Ethnic origin"}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `${t("Ethnic origin")} ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select>
                            {/*{renderSelect(ownedLeased)}*/}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Have you ever been to school before?</Text>
                    <Form.Item
                        name={"TypeOfLandId"}
                        className="mb-0"
                        initialValue={true}
                    >
                        <Select>
                            <Option value={true}>Yes</Option>
                            <Option value={false}>No</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Are you currently studying?</Text>
                    <Form.Item
                        name={"CauseOfPlotId"}
                        className="mb-0"
                        initialValue={true}
                    >
                        <Select>
                            <Option value={true}>Yes</Option>
                            <Option value={false}>No</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">What is the current level of education?</Text>
                    <Form.Item
                        name={"TypeOfLandId"}
                        className="mb-0"
                        rules={[
                            {
                                require: true,
                                message : `${t("What is the current level of education?")} ${t("is_not_empty")}`
                            }
                        ]}
                    >
                        <Select>
                            {renderSelect()}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Current year level of education</Text>
                    <Form.Item
                        name={"CauseOfPlotId"}
                        className="mb-0"
                        rules={[
                            {
                                require: true,
                                message : `${t("What is the current level of education?")} ${t("is_not_empty")}`
                            }
                        ]}
                    >
                        <Select>
                            {renderSelect()}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Kindergarten</Text>
                    <Form.Item
                        name={"Kindergarten"}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(50, true, "Kindergarten"),
                                        t
                                    );
                                },
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Primary</Text>
                    <Form.Item
                        name={"Primary"}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(50, true, "Primary"),
                                        t
                                    );
                                },
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Lower secondary</Text>
                    <Form.Item
                        name={"Lower secondary"}
                        className="mb-0"
                        rules={[
                            {
                                require: true,
                                message : `${t("Lower secondary")} ${t("is_not_empty")}`
                            }
                        ]}
                    >
                        <Select>
                            {renderSelect()}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Upper secondary</Text>
                    <Form.Item
                        name={"Upper secondary"}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(50, true, "Upper secondary"),
                                        t
                                    );
                                },
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Vocational school</Text>
                    <Form.Item
                        name={"Vocational school"}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(50, true, "Vocational school"),
                                        t
                                    );
                                },
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">University / Institute</Text>
                    <Form.Item
                        name={"University / Institute"}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(50, true, "University / Institute"),
                                        t
                                    );
                                },
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">What type of school are you attending?</Text>
                    <Form.Item
                        name={"What type of school are you attending"}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(50, true, "What type of school are you attending"),
                                        t
                                    );
                                },
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Higher education is graduated</Text>
                    <Form.Item
                        name={"CauseOfPlotId"}
                        className="mb-0"
                        rules={[
                            {
                                require: true,
                                message : `${t("Higher education is graduated")} ${t("is_not_empty")}`
                            }
                        ]}
                    >
                        <Select>
                            {renderSelect()}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">During the past 7 days, have you worked on your own or any of your own business or any of your family members?</Text>
                    <Form.Item
                        name={"TypeOfLandId"}
                        className="mb-0"
                        rules={[
                            {
                                require: true,
                                message : `${t("During the past 7 days, have you worked on your own or any of your own business or any of your family members")} ${t("is_not_empty")}`
                            }
                        ]}
                    >
                        <Select>
                            {renderSelect()}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">During the past 7 days, have you been working on your own farm or with a family member?</Text>
                    <Form.Item
                        name={"CauseOfPlotId"}
                        className="mb-0"
                        rules={[
                            {
                                require: true,
                                message : `${t("During the past 7 days, have you been working on your own farm or with a family member?")} ${t("is_not_empty")}`
                            }
                        ]}
                    >
                        <Select>
                            {renderSelect()}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Have you worked elsewhere in the last 7 days? For example, hiring for an enterprise, private, or public or other</Text>
                    <Form.Item
                        name={"TypeOfLandId"}
                        className="mb-0"
                        rules={[
                            {
                                require: true,
                                message : `${t("During the past 7 days, have you worked on your own or any of your own business or any of your family members")} ${t("is_not_empty")}`
                            }
                        ]}
                    >
                        <Select>
                            {renderSelect()}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Maintain the main work you did during the last 7 days</Text>
                    <Form.Item
                        name={"CauseOfPlotId"}
                        className="mb-0"
                        rules={[
                            {
                                require: true,
                                message : `${t("Maintain the main work you did during the last 7 days")} ${t("is_not_empty")}`
                            }
                        ]}
                    >
                        <Select>
                            {renderSelect()}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">What is your main job?</Text>
                    <Form.Item
                        name={"TypeOfLandId"}
                        className="mb-0"
                        rules={[
                            {
                                require: true,
                                message : `${t("During the past 7 days, have you worked on your own or any of your own business or any of your family members")} ${t("is_not_empty")}`
                            }
                        ]}
                    >
                        <Select>
                            {renderSelect()}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Have you been a Social Security member of any unit or participated in a health insurance program?</Text>
                    <Form.Item
                        name={"CauseOfPlotId"}
                        className="mb-0"
                        rules={[
                            {
                                require: true,
                                message : `${t("Have you been a Social Security member of any unit or participated in a health insurance program?")} ${t("is_not_empty")}`
                            }
                        ]}
                    >
                        <Select>
                            {renderSelect()}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Are you a Social Security member of a private company?</Text>
                    <Form.Item
                        name={"TypeOfLandId"}
                        className="mb-0"
                        rules={[
                            {
                                require: true,
                                message : `${t("Are you a Social Security member of a private company?")} ${t("is_not_empty")}`
                            }
                        ]}
                    >
                        <Select>
                            {renderSelect()}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Are you pregnant? (For women>> 10 years old)</Text>
                    <Form.Item
                        name={"CauseOfPlotId"}
                        className="mb-0"
                        initialValue={true}
                    >
                        <Select>
                            <Option value={true}>Pregnant</Option>
                            <Option value={false}>Not Pregnant</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Have a physical disorder?</Text>
                    <Form.Item
                        name={"TypeOfLandId"}
                        className="mb-0"
                        rules={[
                            {
                                require: true,
                                message : `${t("Are you a Social Security member of a private company?")} ${t("is_not_empty")}`
                            }
                        ]}
                    >
                        <Select>
                            {renderSelect()}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">If yes, indicate the type of defect</Text>
                    <Form.Item
                        name={"TypeOfLandId"}
                        className="mb-0"
                        rules={[
                            {
                                require: true,
                                message : `${t("Are you a Social Security member of a private company?")} ${t("is_not_empty")}`
                            }
                        ]}
                    >
                        <Select>
                            {renderSelect()}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default MemberInHouseHold;