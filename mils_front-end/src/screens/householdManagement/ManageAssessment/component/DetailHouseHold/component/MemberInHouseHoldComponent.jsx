import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Typography,
} from "antd";
import { handleValidateFrom } from "../../../../../../utils/handleValidateFrom";
import { objectValidateForm } from "../validate/objectValidateForm";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dataDictionaryApi from "../../../../../../api/dataDictionaryApi";
import { useSelector } from "react-redux";
import { getValueOfQueryParams } from "../../../../../../utils/getValueOfQueryParams";
import houseHoldApi from "../../../../../../api/houseHoldApi";
import moment from "moment";
import LoadingSpinner from "../../../../../../components/LoadingSpinner";
import { useHistory } from "react-router-dom";
import SaveFilled from "@ant-design/icons/lib/icons/SaveFilled";
import BackwardOutlined from "@ant-design/icons/lib/icons/BackwardOutlined";
import { PATH } from "../../../../../../routers/Path";

function MemberInHouseHold(props) {
  const { typeModal = "ADD" } = props;

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

  const [disabilities, setDisabilities] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  const { Text } = Typography;
  const { t } = useTranslation();

  const history = useHistory();

  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    if (typeModal === "UPDATE") {
      const memberId = getValueOfQueryParams(
        history.location,
        "memberId",
        "STRING"
      );
      const getDetailMember = async (memberId) => {
        setLoading(true);
        await houseHoldApi
          .getInformationOfIndividualMember({ memberId: memberId })
          .then((res) => {
            const { DateOfBirth, Disability } = res.data.Data;
            res.data.Data.DateOfBirth = DateOfBirth
              ? moment(DateOfBirth, "DD-MM-YYYY")
              : undefined;
            setDisabilities(Disability);
            setDetailMember(res.data.Data);
            form.setFieldsValue(res.data.Data);
          });
        setLoading(false);
      };
      getDetailMember(memberId);
    } else {
      const hh_code = getValueOfQueryParams(
        history.location,
        "hh_code",
        "STRING"
      );
      setHHCode(hh_code);
    }
  }, [form, history.location, typeModal]);

  //get all ethnic useEffect
  useEffect(() => {
    const getAllEthnicOrigin = async () => {
      await dataDictionaryApi
        .GetAllEthnic({ keyword: "" })
        .then((res) => {
          setEthnicOrigin(res.data.Data);
        })
        .catch(() => {
          message.error({
            content: t("Error"),
            key: "message-form-role",
            duration: 1,
          });
        });
    };
    getAllEthnicOrigin();
  }, [t]);

  //get all mainjob useEffect
  useEffect(() => {
    const getAllMainJob = async () => {
      await dataDictionaryApi
        .GetAllMainJob({ keyword: "" })
        .then((res) => {
          setMainJob(res.data.Data);
        })
        .catch(() => {
          message.error({
            content: t("Error"),
            key: "message-form-role",
            duration: 1,
          });
        });
    };
    getAllMainJob();
  }, [t]);

  //get all mainGood service
  useEffect(() => {
    const getAllMainGood = async () => {
      await dataDictionaryApi
        .GetAllMainGoodsServices({ keyword: "" })
        .then((res) => {
          setMainService(res.data.Data);
        })
        .catch(() => {
          message.error({
            content: t("Error"),
            key: "message-form-role",
            duration: 1,
          });
        });
    };
    getAllMainGood();
  }, [t]);

  //Get all school
  useEffect(() => {
    const getAllSchoolType = async () => {
      await dataDictionaryApi
        .GetAllSchoolType({ keyword: "" })
        .then((res) => {
          setSchoolType(res.data.Data);
        })
        .catch(() => {
          message.error({
            content: t("Error"),
            key: "message-form-role",
            duration: 1,
          });
        });
    };
    getAllSchoolType();
  }, [t]);

  //Get all level
  useEffect(() => {
    const getAllLevel = async () => {
      await dataDictionaryApi
        .GetAllLevel({ keyword: "" })
        .then((res) => {
          setLevel(res.data.Data);
        })
        .catch(() => {
          message.error({
            content: t("Error"),
            key: "message-form-role",
            duration: 1,
          });
        });
    };
    getAllLevel();
  }, [t]);

  //Get all Marital Status
  useEffect(() => {
    const getAllMarital = async () => {
      await dataDictionaryApi
        .GetAllMaritalStatus({ keyword: "" })
        .then((res) => {
          setMaritalStatus(res.data.Data);
        })
        .catch(() => {
          message.error({
            content: t("Error"),
            key: "message-form-role",
            duration: 1,
          });
        });
    };
    getAllMarital();
  }, [t]);

  //Get all Relation
  useEffect(() => {
    const getAllMarital = async () => {
      await dataDictionaryApi
        .GetAllRelation({ keyword: "" })
        .then((res) => {
          setRelation(res.data.Data);
        })
        .catch(() => {
          message.error({
            content: t("Error"),
            key: "message-form-role",
            duration: 1,
          });
        });
    };
    getAllMarital();
  }, [t]);

  //Get all Disability
  useEffect(() => {
    const getAllMarital = async () => {
      await dataDictionaryApi
        .GetAllDisability({ keyword: "" })
        .then((res) => {
          setDisability(res.data.Data);
        })
        .catch(() => {
          message.error({
            content: t("Error"),
            key: "message-form-role",
            duration: 1,
          });
        });
    };
    getAllMarital();
  }, [t]);

  //get all render
  useEffect(() => {
    const getAllGender = async () => {
      await dataDictionaryApi
        .GetAllGender({ keyword: "" })
        .then((res) => {
          setGender(res.data.Data);
        })
        .catch(() => {
          message.error({
            content: t("Error"),
            key: "message-form-role",
            duration: 1,
          });
        });
    };
    getAllGender();
  }, [t]);

  //get all school enroll
  useEffect(() => {
    const getAllSchoolEnroll = async () => {
      await dataDictionaryApi
        .GetAllSchoolEnroll({ keyword: "" })
        .then((res) => {
          setSchoolEnroll(res.data.Data);
        })
        .catch(() => {
          message.error({
            content: t("Error"),
            key: "message-form-role",
            duration: 1,
          });
        });
    };
    getAllSchoolEnroll();
  }, [t]);

  const disabledDate = (current) => {
    return current > moment();
  };

  const handleAdd = async (value) => {
    setLoading(true);
    value.HHCode = hh_code;
    value.DisabilityTypeId = value.Disability ? value.DisabilityTypeId : "";
    await houseHoldApi.addMember(value).then((res) => {
      if (res.data.Status) {
        setLoading(false);
        message.success({
          content: t("ADD_SUCCESS"),
          key: "message-form-role",
          duration: 1,
        });
        form.resetFields();
      } else {
        setLoading(false);
        message.error({
          content: t("ADD_FAILED"),
          key: "message-form-role",
          duration: 1,
        });
      }
    });
  };

  const handleUpdate = async (value) => {
    setLoading(true);
    const objCover = {
      ...detailMember,
      ...value,
    };
    objCover.DateOfBirth = moment(value.DateOfBirth).format();
    value.DisabilityTypeId = value.Disability ? value.DisabilityTypeId : "";
    await houseHoldApi.updateMember(objCover).then((res) => {
      if (res.data.Status) {
        setLoading(false);
        message.success({
          content: t("EDIT_SUCCESS"),
          key: "message-form-role",
          duration: 1,
        });
      } else {
        setLoading(false);
        message.error({
          content: t("EDIT_FAILED"),
          key: "message-form-role",
          duration: 1,
        });
      }
    });
  };

  const submitFailed = async () => {
    message.error({
      content: t("HAVE_FIELD_ERROR"),
      key: "message-form-role",
      duration: 2,
    });
  };

  const renderSelect = (array) => {
    return (array || []).map((value, index) => (
      <Option value={value.Id} key={index}>
        {dataLanguage === "la" ? value.ValueOfLao : value.ValueOfEng}
      </Option>
    ));
  };

  return (
    <Form
      id="form-household-member"
      form={form}
      onFinish={typeModal === "ADD" ? handleAdd : handleUpdate}
      onFinishFailed={submitFailed}
    >
      {isLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <div className="d-flex align-items-center mb-3">
        <span className="h5 mb-0">
          {typeModal === "ADD" ? t("add") : t("update")} {t("FAMILY_MEMBER")}
        </span>
        <div className="d-flex ml-auto">
          <Form.Item>
            <Button
              className="set-center-content mr-2"
              type="primary"
              icon={<SaveFilled className="font-16" />}
              key="submit"
              htmlType="submit"
            />
          </Form.Item>
          <Button
            className="set-center-content"
            type="primary"
            icon={<BackwardOutlined className="font-16" />}
            onClick={() => {
              if (typeModal === "ADD") {
                history.push(`${PATH.DETAIL_HOUSEHOLD}?hh_code=${hh_code}`);
              } else {
                history.push(
                  `${PATH.DETAIL_HOUSEHOLD}?hh_code=${detailMember.HHCode}`
                );
              }
            }}
          />
        </div>
      </div>
      <Row className="mb-2" gutter={16}>
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {t("MEMBER_NAME")}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"MemberName"}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkString(50, true, "MEMBER_NAME"),
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
          <Text className="font-13 font-weight-500">
            {t("MARITAL_STATUS")}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"MaritalStatusId"}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("MARITAL_STATUS")} ${t("Marital status")}`,
              },
            ]}
          >
            <Select>{renderSelect(maritalStatus)}</Select>
          </Form.Item>
        </Col>
      </Row>
      <Row className="mb-2" gutter={16}>
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {t("RELATION_TO_HOUSEHOLD")}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"RelationHouseHoldId"}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("RELATION_TO_HOUSEHOLD")} ${t("is_not_empty")}`,
              },
            ]}
          >
            <Select>{renderSelect(relation)}</Select>
          </Form.Item>
        </Col>
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {t("GENDER")}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"GenderId"}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("GENDER")} ${t("is_not_empty")}`,
              },
            ]}
          >
            <Select>{renderSelect(gender)}</Select>
          </Form.Item>
        </Col>
      </Row>
      <Row className="mb-2" gutter={16}>
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {t("DATE_OF_BIRTH")}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"DateOfBirth"}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("DATE_OF_BIRTH")} ${t("is_not_empty")}`,
              },
            ]}
          >
            <DatePicker className="w-100" disabledDate={disabledDate} />
          </Form.Item>
        </Col>
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {t("AGE")}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"Age"}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkNumber(200, 0, "AGE", true),
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
          <Text className="font-13 font-weight-500">
            {t("ETHNIC_ORIGIN")}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"TribesId"}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("ETHNIC_ORIGIN")} ${t("is_not_empty")}`,
              },
            ]}
          >
            <Select>{renderSelect(ethnicOrigin)}</Select>
          </Form.Item>
        </Col>
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {t("HAVE_YOU_EVER_BEEN_TO_SCHOOL_BEFORE")}
          </Text>
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
          <Text className="font-13 font-weight-500">
            {t("ARE_YOU_CURRENTLY_STUDYING")}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"CurrentlyStudyingId"}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("ARE_YOU_CURRENTLY_STUDYING")} ${t(
                  "is_not_empty"
                )}`,
              },
            ]}
          >
            <Select>{renderSelect(schoolEnroll)}</Select>
          </Form.Item>
        </Col>
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {t("WHAT_IS_THE_CURRENT_LEVEL_OF_EDUCATION")}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"MemberLevelId"}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("WHAT_IS_THE_CURRENT_LEVEL_OF_EDUCATION")} ${t(
                  "is_not_empty"
                )}`,
              },
            ]}
          >
            <Select>{renderSelect(level)}</Select>
          </Form.Item>
        </Col>
      </Row>
      <Row className="mb-2" gutter={16}>
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {t("CURRENT_YEAR_LEVEL_OF_EDUCATION")}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"LevelAndClassAreEnrolledId"}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("WHAT_IS_THE_CURRENT_LEVEL_OF_EDUCATION")} ${t(
                  "is_not_empty"
                )}`,
              },
            ]}
          >
            <Select>{renderSelect(level)}</Select>
          </Form.Item>
        </Col>
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {`${t("CLASS_OF")} ${t("KINDERGARTEN").toLowerCase()}`}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"Kindergarten"}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkString(50, true, "KINDERGARTEN"),
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
          <Text className="font-13 font-weight-500">
            {`${t("CLASS_OF")} ${t("PRIMARY").toLowerCase()}`}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"Primary"}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkString(50, true, "PRIMARY"),
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
          <Text className="font-13 font-weight-500">
            {`${t("CLASS_OF")} ${t("LOWER_SECONDARY").toLowerCase()}`}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"LowerSecondary"}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkString(50, true, "LOWER_SECONDARY"),
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
          <Text className="font-13 font-weight-500">
            {`${t("CLASS_OF")} ${t("UPPER_SECONDARY").toLowerCase()}`}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"UpperSecondary"}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkString(50, true, "UPPER_SECONDARY"),
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
          <Text className="font-13 font-weight-500">
            {`${t("CLASS_OF")} ${t("VOCATIONAL_SCHOOL").toLowerCase()}`}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"VocationalSchool"}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkString(
                      50,
                      true,
                      "VOCATIONAL_SCHOOL"
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
      </Row>
      <Row className="mb-2" gutter={16}>
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {`${t("CLASS_OF")} ${t("UNIVERSITY_INSTITUTE").toLowerCase()}`}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"UniversityInstitute"}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkString(
                      50,
                      true,
                      "UNIVERSITY_INSTITUTE"
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
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {`${t("CLASS_OF")} ${t(
              "WHAT_TYPE_OF_SCHOOL_ARE_YOU_ATTENDING"
            ).toLowerCase()}`}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"HHSchoolTypeId"}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("WHAT_TYPE_OF_SCHOOL_ARE_YOU_ATTENDING")} ${t(
                  "is_not_empty"
                )}`,
              },
            ]}
          >
            <Select>{renderSelect(schoolType)}</Select>
          </Form.Item>
        </Col>
      </Row>
      <Row className="mb-2" gutter={16}>
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {t("HIGHER_EDUCATION_IS_GRADUATED")}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"HHLevelClassCompleted"}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkString(
                      50,
                      true,
                      "HIGHER_EDUCATION_IS_GRADUATED"
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
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {t(
              "HAVE_YOU_WORKED_ON_YOUR_OWN_OR_ANY_OF_YOUR_OWN_BUSINESS_OR_ANY_OF_YOUR_FAMILY_MEMBERS"
            )}
          </Text>
          <Form.Item name={"Business"} className="mb-0" initialValue={true}>
            <Select>
              <Option value={true}>{t("YES")}</Option>
              <Option value={false}>{t("NO")}</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row className="mb-2" gutter={16}>
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {t(
              "HAVE_YOU_BEEN_WORKING_ON_YOUR_OWN_FARM_OR_WITH_A_FAMILY_MEMBER"
            )}
          </Text>
          <Form.Item name={"Agricature"} className="mb-0" initialValue={true}>
            <Select>
              <Option value={true}>{t("YES")}</Option>
              <Option value={false}>{t("NO")}</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {t("HAVE_YOU_WORKED_ELSEWHERE_IN_THE_LAST_7_DAYS")}
          </Text>
          <Form.Item name={"Outside"} className="mb-0" initialValue={true}>
            <Select>
              <Option value={true}>{t("YES")}</Option>
              <Option value={false}>{t("NO")}</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row className="mb-2" gutter={16}>
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {t("MAINTAIN_THE_MAIN_WORK_YOU_DID_DURING_THE_LAST_7_DAYS")}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"MainJobId"}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkString(
                      50,
                      true,
                      "MAINTAIN_THE_MAIN_WORK_YOU_DID_DURING_THE_LAST_7_DAYS"
                    ),
                    t
                  );
                },
              },
            ]}
          >
            <Select>{renderSelect(mainJob)}</Select>
          </Form.Item>
        </Col>
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {t("WHAT_IS_YOUR_MAIN_JOB")}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={"MainGoodId"}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("WHAT_IS_YOUR_MAIN_JOB")} ${t("is_not_empty")}`,
              },
            ]}
          >
            <Select>{renderSelect(mainService)}</Select>
          </Form.Item>
        </Col>
      </Row>
      <Row className="mb-2" gutter={16}>
        <Col span={24} lg={12}>
          <Text className="font-13 font-weight-500">
            {t(
              "SOCIAL_SECURITY_MEMBER_OF_ANY_UNIT_OR_PARTICIPATED_IN_A_HEALTH"
            )}
          </Text>
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
          <Text className="font-13 font-weight-500">
            {t("ARE_YOU_A_SOCIAL_SECURITY_MEMBER_OF_A_PRIVATE_COMPANY")}
          </Text>
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
      <Row className="mb-2" gutter={[16, 10]}>
        <Col md={24} lg={12} xl={12}>
          <Text className="font-13 font-weight-500">
            {t("HAVE_A_PHYSICAL_DISORDER")}
          </Text>
          <Form.Item name={"Disability"} className="mb-0" initialValue={true}>
            <Select
              value={disabilities}
              onChange={(value) => {
                form.setFieldsValue({ DisabilityTypeId: "" });
                setDisabilities(value);
              }}
            >
              <Option value={true}>{t("YES")}</Option>
              <Option value={false}>{t("NO")}</Option>
            </Select>
          </Form.Item>
        </Col>
        {disabilities ? (
          <Col md={24} lg={12} xl={12}>
            <Text className="font-13 font-weight-500">
              {t("INDICATE_THE_TYPE_OF_DEFECT")}{" "}
              <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
            </Text>
            <Form.Item
              name={"DisabilityTypeId"}
              className="mb-0"
              rules={[
                {
                  required: true,
                  message: `${t("INDICATE_THE_TYPE_OF_DEFECT")} ${t(
                    "is_not_empty"
                  )}`,
                },
              ]}
            >
              <Select>{renderSelect(disability)}</Select>
            </Form.Item>
          </Col>
        ) : null}
        <Col md={24} lg={12} xl={12}>
          <Text className="font-13 font-weight-500">
            {t("ARE_YOU_PREGNANT")}
          </Text>
          <Form.Item name={"Pregnant"} className="mb-0" initialValue={true}>
            <Select>
              <Option value={true}>Pregnant</Option>
              <Option value={false}>Not Pregnant</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default MemberInHouseHold;
