import {Button, Col, DatePicker, Form, Input, message, Row, Select, Typography} from "antd";
import {handleValidateFrom} from "../../../../../../utils/handleValidateFrom";
import {objectValidateForm} from "../validate/objectValidateForm";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import dataDictionaryApi from "../../../../../../api/dataDictionaryApi";
import {useSelector} from "react-redux";
import {getValueOfQueryParams} from "../../../../../../utils/getValueOfQueryParams";
import houseHoldApi from "../../../../../../api/houseHoldApi";
import moment from "moment";
import LoadingSpinner from "../../../../../../components/LoadingSpinner";
import {useHistory} from "react-router-dom";
import SaveFilled from "@ant-design/icons/lib/icons/SaveFilled";
import BackwardOutlined from "@ant-design/icons/lib/icons/BackwardOutlined";
import {PATH} from "../../../../../../routers/Path";

function MemberInHouseHold(props) {
    const {typeModal = "ADD"} = props;

    //state selection
    const [detailMember, setDetailMember] = useState({});
    const [ethnicOrigin, setEthnicOrigin] = useState([]);
    const [mainJob, setMainJob] = useState([]);
    const [mainService, setMainService] = useState([]);
    const [schoolType, setSchoolType] = useState([]);
    const [level, setLevel] = useState([]);
    const [maritalStatus, setMaritalStatus] = useState([]);
    const [relation, setRelation] = useState([]);
    const [disability, setDisability] = useState([]);
    const [gender, setGender] = useState([]);
    const [schoolEnroll, setSchoolEnroll] = useState([]);
    const [hh_code, setHHCode] = useState("");

    const [isLoading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const {Option} = Select;
    const {Text} = Typography;
    const {t} = useTranslation();

    const history = useHistory();

    const dataLanguage = useSelector(
        (state) => state.languageReducer.objectLanguage.value
    ) || localStorage.getItem("i18nextLng");

    useEffect(() => {
        const hh_code = getValueOfQueryParams(history.location, "hh_code", "STRING");
        setHHCode(hh_code);
        if (typeModal === "UPDATE") {
            const memberId = getValueOfQueryParams(history.location, "memberId", "STRING");
            const getDetailMember = async (memberId) => {
                setLoading(true);
                await houseHoldApi.getInformationOfIndividualMember({memberId: memberId}).then(res => {
                    const {DateOfBirth} = res.data.Data;
                    res.data.Data.DateOfBirth = DateOfBirth ? moment(DateOfBirth, "DD-MM-YYYY") : undefined;
                    setDetailMember(res.data.Data);
                    form.setFieldsValue(res.data.Data);
                });
                setLoading(false);
            };
            getDetailMember(memberId);
        }
    }, [form,history.location,typeModal]);

    //get all ethnic useEffect
    useEffect(() => {
        const getAllEthnicOrigin = async () => {
            await dataDictionaryApi.GetAllEthnic({keyword: ""}).then(res => {
                setEthnicOrigin(res.data.Data);
            }).catch(() => {
                message.error({
                    content: t("Error"),
                    key: "message-form-role",
                    duration: 1,
                })
            })
        };
        getAllEthnicOrigin();
    }, [t]);

    //get all mainjob useEffect
    useEffect(() => {
        const getAllMainJob = async () => {
            await dataDictionaryApi.GetAllMainJob({keyword: ""}).then(res => {
                setMainJob(res.data.Data);
            }).catch(() => {
                message.error({
                    content: t("Error"),
                    key: "message-form-role",
                    duration: 1,
                })
            })
        };
        getAllMainJob();
    }, [t]);

    //get all mainGood service
    useEffect(() => {
        const getAllMainGood = async () => {
            await dataDictionaryApi.GetAllMainGoodsServices({keyword: ""}).then(res => {
                setMainService(res.data.Data);
            }).catch(() => {
                message.error({
                    content: t("Error"),
                    key: "message-form-role",
                    duration: 1,
                })
            })
        };
        getAllMainGood();
    }, [t]);

    //Get all school
    useEffect(() => {
        const getAllSchoolType = async () => {
            await dataDictionaryApi.GetAllSchoolType({keyword: ""}).then(res => {
                setSchoolType(res.data.Data);
            }).catch(() => {
                message.error({
                    content: t("Error"),
                    key: "message-form-role",
                    duration: 1,
                })
            })
        };
        getAllSchoolType();
    }, [t]);

    //Get all level
    useEffect(() => {
        const getAllLevel = async () => {
            await dataDictionaryApi.GetAllLevel({keyword: ""}).then(res => {
                setLevel(res.data.Data);
            }).catch(() => {
                message.error({
                    content: t("Error"),
                    key: "message-form-role",
                    duration: 1,
                })
            })
        };
        getAllLevel();
    }, [t]);

    //Get all Marital Status
    useEffect(() => {
        const getAllMarital = async () => {
            await dataDictionaryApi.GetAllMaritalStatus({keyword: ""}).then(res => {
                setMaritalStatus(res.data.Data);
            }).catch(() => {
                message.error({
                    content: t("Error"),
                    key: "message-form-role",
                    duration: 1,
                })
            })
        };
        getAllMarital();
    }, [t]);

    //Get all Relation
    useEffect(() => {
        const getAllMarital = async () => {
            await dataDictionaryApi.GetAllRelation({keyword: ""}).then(res => {
                setRelation(res.data.Data);
            }).catch(() => {
                message.error({
                    content: t("Error"),
                    key: "message-form-role",
                    duration: 1,
                })
            })
        };
        getAllMarital();
    }, [t]);

    //Get all Disability
    useEffect(() => {
        const getAllMarital = async () => {
            await dataDictionaryApi.GetAllDisability({keyword: ""}).then(res => {
                setDisability(res.data.Data);
            }).catch(() => {
                message.error({
                    content: t("Error"),
                    key: "message-form-role",
                    duration: 1,
                })
            })
        };
        getAllMarital();
    }, [t]);

    //get all render
    useEffect(() => {
        const getAllGender = async () => {
            await dataDictionaryApi.GetAllGender({keyword: ""}).then(res => {
                setGender(res.data.Data);
            }).catch(() => {
                message.error({
                    content: t("Error"),
                    key: "message-form-role",
                    duration: 1,
                })
            })
        };
        getAllGender();
    }, [t]);

    //get all school enroll
    useEffect(() => {
        const getAllSchoolEnroll = async () => {
            await dataDictionaryApi.GetAllSchoolEnroll({keyword: ""}).then(res => {
                setSchoolEnroll(res.data.Data);
            }).catch(() => {
                message.error({
                    content: t("Error"),
                    key: "message-form-role",
                    duration: 1,
                })
            })
        };
        getAllSchoolEnroll();
    }, [t]);

    const handleAdd = async (value) => {
        message.loading({content: "Loading...", key: "message-form-role"});
        value.HHCode = hh_code;
        await houseHoldApi.addMember(value).then((res) => {
            if (res.data.Status) {
                message.success({
                    content: t("ADD_SUCCESS"),
                    key: "message-form-role",
                    duration: 1,
                });
                form.resetFields();
            } else {
                message.error({
                    content: t("ADD_FAILED"),
                    key: "message-form-role",
                    duration: 1,
                });
            }
        });
    };

    const handleUpdate = async (value) => {
        message.loading({content: "Loading...", key: "message-form-role"});
        const objCover = {
            ...detailMember,
            ...value,
        };
        await houseHoldApi.updateMember(objCover).then((res) => {
            if (res.data.Status) {
                message.success({
                    content: t("EDIT_SUCCESS"),
                    key: "message-form-role",
                    duration: 1,
                });
                history.push(`${PATH.DETAIL_HOUSEHOLD}?hh_code=${hh_code}`)
            } else {
                message.error({
                    content: t("EDIT_FAILED"),
                    key: "message-form-role",
                    duration: 1,
                });
            }
        });
    };


    const renderSelect = (array) => {
        return (array || []).map((value, index) => (
            <Option value={value.Id} key={index}>{dataLanguage === "la" ? value.ValueOfLao : value.ValueOfEng}</Option>
        ));
    };

    return (
        <Form
            id="form-household-member"
            form={form}
            onFinish={typeModal === "ADD" ? handleAdd : handleUpdate}
        >
            {isLoading ? (
                <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2"/>
            ) : null}
            <div className="d-flex align-items-center mb-3">
                <span className="h5 mb-0">{typeModal === "ADD" ? t("add") : t("update")} family members</span>
                <div className="d-flex ml-auto">
                    <Form.Item>
                        <Button
                            className="set-center-content mr-2"
                            type="primary"
                            icon={<SaveFilled className="font-16"/>}
                            key="submit"
                            htmlType="submit"
                        />
                    </Form.Item>
                    {
                        typeModal === "ADD" ? <Button
                            className="set-center-content"
                            type="primary"
                            icon={<BackwardOutlined  className="font-16"/>}
                            onClick={() => {history.push(`${PATH.DETAIL_HOUSEHOLD}?hh_code=${hh_code}`)}}
                        /> : null
                    }
                </div>
            </div>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Member Name</Text>
                    <Form.Item
                        name={"MemberName"}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(50, true, "Member Name"),
                                        t
                                    );
                                },
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Marital status</Text>
                    <Form.Item
                        name={"MaritalStatusId"}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `${t("Owned or leased")} ${t("Marital status")}`,
                            },
                        ]}
                    >
                        <Select>
                            {renderSelect(maritalStatus)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Relation to household</Text>
                    <Form.Item
                        name={"RelationHouseHoldId"}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `Relation to household ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select>
                            {renderSelect(relation)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Gender</Text>
                    <Form.Item
                        name={"GenderId"}
                        className="mb-0"
                        initialValue={"Male"}
                    >
                        <Select>
                            {renderSelect(gender)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Date of birth</Text>
                    <Form.Item
                        name={"DateOfBirth"}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `Date of birth ${t("is_not_empty")}`,
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
                        name={"TribesId"}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `Ethnic origin ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select>
                            {renderSelect(ethnicOrigin)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Have you ever been to school before?</Text>
                    <Form.Item
                        name={"AreEnrolledInSchool"}
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
                        name={"CurrentlyStudyingId"}
                        className="mb-0"
                        initialValue={true}
                    >
                        <Select>
                            {renderSelect(schoolEnroll)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">What is the current level of education?</Text>
                    <Form.Item
                        name={"MemberLevelId"}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `What is the current level of education? ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select>
                            {renderSelect(level)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Current year level of education</Text>
                    <Form.Item
                        name={"LevelAndClassAreEnrolledId"}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `Current year level of education ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select>
                            {renderSelect(level)}
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
                        <Input/>
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
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Lower secondary</Text>
                    <Form.Item
                        name={"LowerSecondary"}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(50, true, "Lower secondary"),
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
                    <Text className="font-13 font-weight-500">Upper secondary</Text>
                    <Form.Item
                        name={"UpperSecondary"}
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
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Vocational school</Text>
                    <Form.Item
                        name={"VocationalSchool"}
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
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">University / Institute</Text>
                    <Form.Item
                        name={"UniversityInstitute"}
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
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">What type of school are you attending?</Text>
                    <Form.Item
                        name={"HHSchoolTypeId"}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `What type of school are you attending? ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select>
                            {renderSelect(schoolType)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Higher education is graduated</Text>
                    <Form.Item
                        name={"HHLevelClassCompleted"}
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
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">During the past 7 days, have you worked on your own or any
                        of your own business or any of your family members?</Text>
                    <Form.Item
                        name={"Business"}
                        className="mb-0"
                        initialValue={true}
                    >
                        <Select>
                            <Option value={true}>{t("YES")}</Option>
                            <Option value={false}>{t("NO")}</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">During the past 7 days, have you been working on your own
                        farm or with a family member?</Text>
                    <Form.Item
                        name={"Agricature"}
                        className="mb-0"
                        initialValue={true}
                    >
                        <Select>
                            <Option value={true}>{t("YES")}</Option>
                            <Option value={false}>{t("NO")}</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Have you worked elsewhere in the last 7 days? For example,
                        hiring for an enterprise, private, or public or other</Text>
                    <Form.Item
                        name={"Outside"}
                        className="mb-0"
                        initialValue={true}
                    >
                        <Select>
                            <Option value={true}>{t("YES")}</Option>
                            <Option value={false}>{t("NO")}</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Maintain the main work you did during the last 7
                        days</Text>
                    <Form.Item
                        name={"MainJobId"}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(50, true, "Maintain the main work you did during the last 7 days"),
                                        t
                                    );
                                },
                            }
                        ]}
                    >
                        <Select>
                            {renderSelect(mainJob)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">What is your main job?</Text>
                    <Form.Item
                        name={"MainGoodId"}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `What is your main job? ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select>
                            {renderSelect(mainService)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Have you been a Social Security member of any unit or
                        participated in a health insurance program?</Text>
                    <Form.Item
                        name={"HealthInsurance"}
                        className="mb-0"
                        initialValue={true}
                    >
                        <Select>
                            <Option value={true}>{t("YES")}</Option>
                            <Option value={false}>{t("NO")}</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Are you a Social Security member of a private
                        company?</Text>
                    <Form.Item
                        name={"PrivateHealthInsurance"}
                        className="mb-0"
                        initialValue={true}
                    >
                        <Select>
                            <Option value={true}>{t("YES")}</Option>
                            <Option value={false}>{t("NO")}</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">Are you pregnant? (For women>> 10 years old)</Text>
                    <Form.Item
                        name={"Pregnant"}
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
                        name={"Disability"}
                        className="mb-0"
                        initialValue={true}
                    >
                        <Select>
                            <Option value={true}>{t("YES")}</Option>
                            <Option value={false}>{t("NO")}</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} lg={12}>
                    <Text className="font-13 font-weight-500">If yes, indicate the type of defect</Text>
                    <Form.Item
                        name={"DisabilityTypeId"}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `If yes, indicate the type of defect ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select>
                            {renderSelect(disability)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default MemberInHouseHold;