import {
  BackTop,
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
import { PATH } from "../../../../../../routers/Path";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";

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
  const [hh_code, setHHCode] = useState();

  //School selected
  const [haveGoToSchool, setGoToSchool] = useState(true);
  const [enrollInSchool, setEnrollInSchool] = useState("1");
  const [age, setAge] = useState("");
  const [checkGender, setCheckGender] = useState("");
  const [typeOfSchool, setTypeOfSchool] = useState("");

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
            setGoToSchool(res.data.Data.AreEnrolledInSchool);
            setEnrollInSchool(res.data.Data.CurrentlyStudyingId);
            setAge(res.data.Data.Age);
            setCheckGender(res.data.Data.GenderId);
            setTypeOfSchool(res.data.Data.HHSchoolTypeId);
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

  useEffect(() => {
    const getAllSelect = async () => {
      await Promise.all([
        getAllEthnicOrigin(),
        getAllMainJob(),
        getAllMainGood(),
        getAllSchoolType(),
        getAllLevel(),
        getAllMarital(),
        getAllRelation(),
        getAllDisability(),
        getAllGender(),
        getAllSchoolEnroll(),
      ]).then(
        ([
          dataEthnic,
          dataMainJob,
          dataMainGood,
          dataSchoolType,
          dataLevel,
          dataMartial,
          dataRelation,
          dataDisability,
          dataGender,
          dataSchoolEnroll,
        ]) => {
          setEthnicOrigin(dataEthnic.data.Data);
          setMainJob(dataMainJob.data.Data);
          setMainService(dataMainGood.data.Data);
          setSchoolType(dataSchoolType.data.Data);
          setLevel(dataLevel.data.Data);
          setMaritalStatus(dataMartial.data.Data);
          setRelation(dataRelation.data.Data);
          setDisability(dataDisability.data.Data);
          setGender(dataGender.data.Data);
          setSchoolEnroll(dataSchoolEnroll.data.Data);
        }
      );
    };
    getAllSelect();
  }, []);

  const getAllEthnicOrigin = () => {
    return dataDictionaryApi.GetAllEthnic({ keyword: "" });
  };

  const getAllMainJob = () => {
    return dataDictionaryApi.GetAllMainJob({ keyword: "" });
  };

  const getAllMainGood = () => {
    return dataDictionaryApi.GetAllMainGoodsServices({ keyword: "" });
  };

  const getAllSchoolType = () => {
    return dataDictionaryApi.GetAllSchoolType({ keyword: "" });
  };

  const getAllLevel = () => {
    return dataDictionaryApi.GetAllLevel({ keyword: "" });
  };

  const getAllMarital = () => {
    return dataDictionaryApi.GetAllMaritalStatus({ keyword: "" });
  };

  const getAllRelation = () => {
    return dataDictionaryApi.GetAllRelation({ keyword: "" });
  };

  const getAllDisability = () => {
    return dataDictionaryApi.GetAllDisability({ keyword: "" });
  };

  const getAllGender = () => {
    return dataDictionaryApi.GetAllGender({ keyword: "" });
  };

  const getAllSchoolEnroll = () => {
    return dataDictionaryApi.GetAllSchoolEnroll({ keyword: "" });
  };

  const disabledDate = (current) => {
    return current > moment();
  };

  const updateValueEducation = (value) => {
    value.MemberLevelId = value.MemberLevelId ? value.MemberLevelId : "";
    value.LevelAndClassAreEnrolledId = value.LevelAndClassAreEnrolledId
      ? value.LevelAndClassAreEnrolledId
      : "";
    value.Kindergarten = value.Kindergarten ? value.Kindergarten : "";
    value.Primary = value.Primary ? value.Primary : "";
    value.LowerSecondary = value.LowerSecondary ? value.LowerSecondary : "";
    value.UpperSecondary = value.UpperSecondary ? value.UpperSecondary : "";
    value.VocationalSchool = value.VocationalSchool
      ? value.VocationalSchool
      : "";
    value.UniversityInstitute = value.UniversityInstitute
      ? value.UniversityInstitute
      : "";
    value.HHSchoolTypeId = value.HHSchoolTypeId ? value.HHSchoolTypeId : "";
    value.HHLevelClassCompleted = value.HHLevelClassCompleted
      ? value.HHLevelClassCompleted
      : "";
    value.HHClassLcPre = value.HHClassLcPre ? value.HHClassLcPre : "";
    value.HHClassLcPrimary = value.HHClassLcPrimary
      ? value.HHClassLcPrimary
      : "";
    value.HHClassLcLs = value.HHClassLcLs ? value.HHClassLcLs : "";
    value.HHClassLcUs = value.HHClassLcUs ? value.HHClassLcUs : "";
    value.HHClassLcVoc = value.HHClassLcVoc ? value.HHClassLcVoc : "";
    value.HHClassLcUniv = value.HHClassLcUniv ? value.HHClassLcUniv : "";
    return value;
  };

  const handleAdd = async (value) => {
    setLoading(true);
    value.HHCode = hh_code;
    value.DisabilityTypeId = value.Disability ? value.DisabilityTypeId : "";
    value = updateValueEducation(value);
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
    value = updateValueEducation(value);
    value.DisabilityTypeId = value.Disability ? value.DisabilityTypeId : "";
    const objCover = {
      ...detailMember,
      ...value,
    };
    objCover.DateOfBirth = moment(value.DateOfBirth).format();
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

  const resetFieldsEducationOnSelect = () => {
    form.setFields([
      {
        name: "MemberLevelId",
        value: "",
        errors: [],
      },
      {
        name: "LevelAndClassAreEnrolledId",
        value: "",
        errors: [],
      },
      {
        name: "Kindergarten",
        value: "",
        errors: [],
      },
      {
        name: "Primary",
        value: "",
        errors: [],
      },
      {
        name: "LowerSecondary",
        value: "",
        errors: [],
      },
      {
        name: "UpperSecondary",
        value: "",
        errors: [],
      },
      {
        name: "VocationalSchool",
        value: "",
        errors: [],
      },
      {
        name: "UniversityInstitute",
        value: "",
        errors: [],
      },
      {
        name: "HHSchoolTypeId",
        value: "",
        errors: [],
      },
    ]);
  };

  const resetFieldsHighestEducationOnSelect = () => {
    form.setFields([
      {
        name: "HHLevelClassCompleted",
        value: "",
        errors: [],
      },
      {
        name: "HHClassLcPre",
        value: "",
        errors: [],
      },
      {
        name: "HHClassLcPrimary",
        value: "",
        errors: [],
      },
      {
        name: "HHClassLcLs",
        value: "",
        errors: [],
      },
      {
        name: "HHClassLcUs",
        value: "",
        errors: [],
      },
      {
        name: "HHClassLcVoc",
        value: "",
        errors: [],
      },
      {
        name: "HHClassLcUniv",
        value: "",
        errors: [],
      },
    ]);
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
      <BackTop
        className="scroll-top"
        target={() => document.getElementById("my-layout")}
      />
      <div className="d-flex align-items-center mb-3">
        <span className="h5 mb-0">
          {typeModal === "ADD" ? t("add") : t("update")} {t("FAMILY_MEMBER")}
        </span>
        <div className="d-flex ml-auto align-items-center mt-md-0 mt-2">
          <Button
            className="set-center-content mr-2"
            icon={<ArrowLeftOutlined />}
            type={"primary"}
            ghost
            onClick={() => {
              if (typeModal === "ADD") {
                history.push(`${PATH.DETAIL_HOUSEHOLD}?hh_code=${hh_code}`);
              } else {
                history.push(
                  `${PATH.DETAIL_HOUSEHOLD}?hh_code=${detailMember.HHCode}`
                );
              }
            }}
          >
            {t("BACK")}
          </Button>
          <Button
            className="set-center-content"
            icon={<SaveFilled />}
            style={{ borderColor: "#0C960C", color: "#0C960C" }}
            form="form-household-member"
            key="submit"
            htmlType="submit"
          >
            {t("SAVE")}
          </Button>
        </div>
      </div>
      <Row className="mb-2" gutter={[16, 16]}>
        <Col span={24}>
          <Text className="font-13 font-weight-500">
            1.{t("MEMBER_NAME")}{" "}
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
        <Col span={24}>
          <Text className="font-13 font-weight-500">
            2.{t("MARITAL_STATUS")}{" "}
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
        <Col span={24}>
          <Text className="font-13 font-weight-500">
            3.{t("RELATION_TO_HOUSEHOLD")}{" "}
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
        <Col span={24}>
          <Text className="font-13 font-weight-500">
            4.{t("GENDER")}{" "}
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
            <Select
              onChange={(value) => {
                setCheckGender(value);
              }}
            >
              {renderSelect(gender)}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Text className="font-13 font-weight-500">
            5.{t("DATE_OF_BIRTH")}{" "}
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
            <DatePicker
              onChange={(value, dateString) => {
                const years = moment().diff(dateString, "years", false);
                setAge(years);
                form.setFieldsValue({
                  Age: years,
                });
              }}
              className="w-100"
              disabledDate={disabledDate}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Text className="font-13 font-weight-500">
            {t("AGE")}{" "}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item name={"Age"} className="mb-0">
            <Input readOnly={true} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Text className="font-13 font-weight-500">
            6.{t("ETHNIC_ORIGIN")}{" "}
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
        {/*Nếu tuổi lớn hơn 2 thì hiển thị các câu hỏi từ 6 tới 9*/}
        {age >= 2 ? (
          <>
            <Col span={24}>
              <Text className="font-13 font-weight-500">
                7.{t("HAVE_YOU_EVER_BEEN_TO_SCHOOL_BEFORE")}
              </Text>
              <Form.Item
                name={"AreEnrolledInSchool"}
                className="mb-0"
                initialValue={true}
              >
                <Select
                  value={haveGoToSchool}
                  onChange={(value) => {
                    setGoToSchool(value);
                    if (enrollInSchool === "3" && !value) {
                      resetFieldsHighestEducationOnSelect();
                    }
                  }}
                >
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
            </Col>
            {/*Are you enrolled in school now? */}
            <Col span={24}>
              <Text className="font-13 font-weight-500">
                8.{t("ARE_YOU_CURRENTLY_STUDYING")}{" "}
                {/*<span style={{ paddingLeft: "3px", color: "red" }}>*</span>*/}
              </Text>
              <Form.Item
                name={"CurrentlyStudyingId"}
                className="mb-0"
                initialValue={"1"}
                rules={[
                  {
                    required: true,
                    message: `${t("ARE_YOU_CURRENTLY_STUDYING")} ${t(
                      "is_not_empty"
                    )}`,
                  },
                ]}
              >
                <Select
                  onChange={(id) => {
                    setEnrollInSchool(id);
                    if (id === "3") {
                      resetFieldsEducationOnSelect();
                    }
                    if (id === "3" && !haveGoToSchool) {
                      resetFieldsHighestEducationOnSelect();
                    }
                  }}
                  value={enrollInSchool}
                >
                  {renderSelect(schoolEnroll)}
                </Select>
              </Form.Item>
            </Col>

            {/*Có còn đi học bây giờ hay không?*/}
            {enrollInSchool === "1" || enrollInSchool === "2" ? (
              <>
                <Col span={24}>
                  <Text className="font-13 font-weight-500">
                    9.{t("WHAT_IS_THE_CURRENT_LEVEL_OF_EDUCATION")}{" "}
                    {/*<span style={{ paddingLeft: "3px", color: "red" }}>*</span>*/}
                  </Text>
                  <Form.Item
                    name={"MemberLevelId"}
                    className="mb-0"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: `${t(
                    //       "WHAT_IS_THE_CURRENT_LEVEL_OF_EDUCATION"
                    //     )} ${t("is_not_empty")}`,
                    //   },
                    // ]}
                  >
                    <Select>{renderSelect(level)}</Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Text className="font-13 font-weight-500">
                    {t("CURRENT_YEAR_LEVEL_OF_EDUCATION")}{" "}
                    {/*<span style={{ paddingLeft: "3px", color: "red" }}>*</span>*/}
                  </Text>
                  <Form.Item
                    name={"LevelAndClassAreEnrolledId"}
                    className="mb-0"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: `${t(
                    //       "WHAT_IS_THE_CURRENT_LEVEL_OF_EDUCATION"
                    //     )} ${t("is_not_empty")}`,
                    //   },
                    // ]}
                  >
                    <Select>{renderSelect(level)}</Select>
                  </Form.Item>
                </Col>
                <Col span={24} md={age >= 6 ? 12 : 24}>
                  <Text className="font-13 font-weight-500">
                    {`${t("KINDERGARTEN")}`}
                    {/*<span style={{ paddingLeft: "3px", color: "red" }}>*</span>*/}
                  </Text>
                  <Form.Item
                    name={"Kindergarten"}
                    className="mb-0"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: `${t("KINDERGARTEN")} ${t("is_not_empty")}`,
                    //   },
                    // ]}
                  >
                    <Select>
                      <Option value={0}>0</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {age >= 6 ? (
                  <>
                    <Col span={24} md={12}>
                      <Text className="font-13 font-weight-500">
                        {`${t("PRIMARY")}`}
                        {/*<span style={{ paddingLeft: "3px", color: "red" }}>*/}
                        {/*  **/}
                        {/*</span>*/}
                      </Text>
                      <Form.Item
                        name={"Primary"}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: `${t("PRIMARY")} ${t("is_not_empty")}`,
                        //   },
                        // ]}
                      >
                        <Select
                          onChange={(id) => {
                            const value = form.getFieldValue(
                              "HHClassLcPrimary"
                            );
                            if (value && id < value) {
                              form.setFieldsValue({
                                Primary: value,
                              });
                            }
                          }}
                        >
                          <Option value={1}>1</Option>
                          <Option value={2}>2</Option>
                          <Option value={3}>3</Option>
                          <Option value={4}>4</Option>
                          <Option value={5}>5</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                      <Text className="font-13 font-weight-500">
                        {` ${t("LOWER_SECONDARY")}`}
                        {/*<span style={{ paddingLeft: "3px", color: "red" }}>*/}
                        {/*  **/}
                        {/*</span>*/}
                      </Text>
                      <Form.Item
                        name={"LowerSecondary"}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: `${t("LOWER_SECONDARY")} ${t(
                        //       "is_not_empty"
                        //     )}`,
                        //   },
                        // ]}
                      >
                        <Select
                          onChange={(id) => {
                            const value = form.getFieldValue("HHClassLcLs");
                            if (value && id < value) {
                              form.setFieldsValue({
                                LowerSecondary: value,
                              });
                            }
                          }}
                        >
                          <Option value={1}>1</Option>
                          <Option value={2}>2</Option>
                          <Option value={3}>3</Option>
                          <Option value={4}>4</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                      <Text className="font-13 font-weight-500">
                        {`${t("UPPER_SECONDARY")}`}{" "}
                        {/*<span style={{ paddingLeft: "3px", color: "red" }}>*/}
                        {/*  **/}
                        {/*</span>*/}
                      </Text>
                      <Form.Item
                        name={"UpperSecondary"}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: `${t("LOWER_SECONDARY")} ${t(
                        //       "is_not_empty"
                        //     )}`,
                        //   },
                        // ]}
                      >
                        <Select
                          onChange={(id) => {
                            const value = form.getFieldValue("HHClassLcUs");
                            if (value && id < value) {
                              form.setFieldsValue({
                                UpperSecondary: value,
                              });
                            }
                          }}
                        >
                          <Option value={1}>1</Option>
                          <Option value={2}>2</Option>
                          <Option value={3}>3</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                      <Text className="font-13 font-weight-500">
                        {`${t("VOCATIONAL_SCHOOL")}`}{" "}
                        {/*<span style={{ paddingLeft: "3px", color: "red" }}>*/}
                        {/*  **/}
                        {/*</span>*/}
                      </Text>
                      <Form.Item
                        name={"VocationalSchool"}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: `${t("VOCATIONAL_SCHOOL")} ${t(
                        //       "is_not_empty"
                        //     )}`,
                        //   },
                        // ]}
                      >
                        <Select
                          onChange={(id) => {
                            const value = form.getFieldValue("HHClassLcVoc");
                            if (value && id < value) {
                              form.setFieldsValue({
                                VocationalSchool: value,
                              });
                            }
                          }}
                        >
                          <Option value={1}>1</Option>
                          <Option value={2}>2</Option>
                          <Option value={3}>3</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                      <Text className="font-13 font-weight-500">
                        {`${t("UNIVERSITY_INSTITUTE")} `}{" "}
                        {/*<span style={{ paddingLeft: "3px", color: "red" }}>*/}
                        {/*  **/}
                        {/*</span>*/}
                      </Text>
                      <Form.Item
                        name={"UniversityInstitute"}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: `${t("UNIVERSITY_INSTITUTE")} ${t(
                        //       "is_not_empty"
                        //     )}`,
                        //   },
                        // ]}
                      >
                        <Select
                          onChange={(id) => {
                            const value = form.getFieldValue("HHClassLcUniv");
                            if (value && id < value) {
                              form.setFieldsValue({
                                UniversityInstitute: value,
                              });
                            }
                          }}
                        >
                          <Option value={1}>1</Option>
                          <Option value={2}>2</Option>
                          <Option value={3}>3</Option>
                          <Option value={4}>4</Option>
                          <Option value={5}>5</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </>
                ) : null}
              </>
            ) : null}

            {/*Nếu tuổi lớn hơn 6 thì hiển thị các câu hỏi còn lại*/}
            {age >= 6 ? (
              <>
                {enrollInSchool === "1" || enrollInSchool === "2" ? (
                  <Col span={24}>
                    <Text className="font-13 font-weight-500">
                      10.{`${t("WHAT_TYPE_OF_SCHOOL_ARE_YOU_ATTENDING")}`}{" "}
                      <span style={{ paddingLeft: "3px", color: "red" }}>
                        *
                      </span>
                    </Text>
                    <Form.Item
                      name={"HHSchoolTypeId"}
                      className="mb-0"
                      rules={[
                        {
                          required: true,
                          message: `${t(
                            "WHAT_TYPE_OF_SCHOOL_ARE_YOU_ATTENDING"
                          )} ${t("is_not_empty")}`,
                        },
                      ]}
                    >
                      <Select
                        onChange={(value) => {
                          setTypeOfSchool(value);
                          if (value === "3") {
                            resetFieldsHighestEducationOnSelect();
                          }
                        }}
                      >
                        {renderSelect(schoolType)}
                      </Select>
                    </Form.Item>
                  </Col>
                ) : null}

                {(enrollInSchool === "3" && !haveGoToSchool) ||
                typeOfSchool === "3" ? null : (
                  <>
                    <Col span={24}>
                      <Text className="font-13 font-weight-500">
                        11.{t("HIGHER_EDUCATION_IS_GRADUATED")}{" "}
                        {/*<span style={{ paddingLeft: "3px", color: "red" }}>*/}
                        {/*  **/}
                        {/*</span>*/}
                      </Text>
                      <Form.Item
                        name={"HHLevelClassCompleted"}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: `${t("HIGHER_EDUCATION_IS_GRADUATED")} ${t(
                        //       "is_not_empty"
                        //     )}`,
                        //   },
                        // ]}
                      >
                        <Select>{renderSelect(level)}</Select>
                      </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                      <Text className="font-13 font-weight-500">
                        {`${t("HIGHEST_KINDERGARTEN")}`}
                        {/*<span style={{ paddingLeft: "3px", color: "red" }}>*/}
                        {/*  **/}
                        {/*</span>*/}
                      </Text>
                      <Form.Item
                        name={"HHClassLcPre"}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: `${t("HIGHEST_KINDERGARTEN")} ${t(
                        //       "is_not_empty"
                        //     )}`,
                        //   },
                        // ]}
                      >
                        <Select>
                          <Option value={0}>0</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                      <Text className="font-13 font-weight-500">
                        {`${t("HIGHEST_PRIMARY")}`}
                        {/*<span style={{ paddingLeft: "3px", color: "red" }}>*/}
                        {/*  **/}
                        {/*</span>*/}
                      </Text>
                      <Form.Item
                        name={"HHClassLcPrimary"}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: `${t("HIGHEST_PRIMARY")} ${t(
                        //       "is_not_empty"
                        //     )}`,
                        //   },
                        // ]}
                      >
                        <Select
                          onChange={(id) => {
                            const value = form.getFieldValue("Primary");
                            if (value && id > value) {
                              form.setFieldsValue({
                                HHClassLcPrimary: value,
                              });
                            }
                          }}
                        >
                          <Option value={1}>1</Option>
                          <Option value={2}>2</Option>
                          <Option value={3}>3</Option>
                          <Option value={4}>4</Option>
                          <Option value={5}>5</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                      <Text className="font-13 font-weight-500">
                        {` ${t("HIGHEST_LOWER_SECONDARY")}`}
                        {/*<span style={{ paddingLeft: "3px", color: "red" }}>*/}
                        {/*  **/}
                        {/*</span>*/}
                      </Text>
                      <Form.Item
                        name={"HHClassLcLs"}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: `${t("HIGHEST_LOWER_SECONDARY")} ${t(
                        //       "is_not_empty"
                        //     )}`,
                        //   },
                        // ]}
                      >
                        <Select
                          onChange={(id) => {
                            const value = form.getFieldValue("LowerSecondary");
                            if (value && id > value) {
                              form.setFieldsValue({
                                HHClassLcLs: value,
                              });
                            }
                          }}
                        >
                          <Option value={1}>1</Option>
                          <Option value={2}>2</Option>
                          <Option value={3}>3</Option>
                          <Option value={4}>4</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                      <Text className="font-13 font-weight-500">
                        {`${t("HIGHEST_UPPER_SECONDARY")}`}{" "}
                        {/*<span style={{ paddingLeft: "3px", color: "red" }}>*/}
                        {/*  **/}
                        {/*</span>*/}
                      </Text>
                      <Form.Item
                        name={"HHClassLcUs"}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: `${t("HIGHEST_UPPER_SECONDARY")} ${t(
                        //       "is_not_empty"
                        //     )}`,
                        //   },
                        // ]}
                      >
                        <Select
                          onChange={(id) => {
                            const value = form.getFieldValue("UpperSecondary");
                            if (value && id > value) {
                              form.setFieldsValue({
                                HHClassLcUs: value,
                              });
                            }
                          }}
                        >
                          <Option value={1}>1</Option>
                          <Option value={2}>2</Option>
                          <Option value={3}>3</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                      <Text className="font-13 font-weight-500">
                        {`${t("HIGHEST_VOCATIONAL_SCHOOL")}`}{" "}
                        {/*<span style={{ paddingLeft: "3px", color: "red" }}>*/}
                        {/*  **/}
                        {/*</span>*/}
                      </Text>
                      <Form.Item
                        name={"HHClassLcVoc"}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: `${t("HIGHEST_VOCATIONAL_SCHOOL")} ${t(
                        //       "is_not_empty"
                        //     )}`,
                        //   },
                        // ]}
                      >
                        <Select
                          onChange={(id) => {
                            const value = form.getFieldValue(
                              "VocationalSchool"
                            );
                            if (value && id > value) {
                              form.setFieldsValue({
                                HHClassLcVoc: value,
                              });
                            }
                          }}
                        >
                          <Option value={1}>1</Option>
                          <Option value={2}>2</Option>
                          <Option value={3}>3</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                      <Text className="font-13 font-weight-500">
                        {`${t("HIGHEST_UNIVERSITY_INSTITUTE")} `}{" "}
                        {/*<span style={{ paddingLeft: "3px", color: "red" }}>*/}
                        {/*  **/}
                        {/*</span>*/}
                      </Text>
                      <Form.Item
                        name={"HHClassLcUniv"}
                        className="mb-0"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: `${t("HIGHEST_UNIVERSITY_INSTITUTE")} ${t(
                        //       "is_not_empty"
                        //     )}`,
                        //   },
                        // ]}
                      >
                        <Select
                          onChange={(id) => {
                            const value = form.getFieldValue(
                              "UniversityInstitute"
                            );
                            if (value && id > value) {
                              form.setFieldsValue({
                                HHClassLcUniv: value,
                              });
                            }
                          }}
                        >
                          <Option value={1}>1</Option>
                          <Option value={2}>2</Option>
                          <Option value={3}>3</Option>
                          <Option value={4}>4</Option>
                          <Option value={5}>5</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </>
                )}
                {age >= 15 && age <= 60 ? (
                  <>
                    <Col span={24}>
                      <Text className="font-13 font-weight-500">
                        12.
                        {t(
                          "HAVE_YOU_WORKED_ON_YOUR_OWN_OR_ANY_OF_YOUR_OWN_BUSINESS_OR_ANY_OF_YOUR_FAMILY_MEMBERS"
                        )}
                      </Text>
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
                    <Col span={24}>
                      <Text className="font-13 font-weight-500">
                        13.
                        {t(
                          "HAVE_YOU_BEEN_WORKING_ON_YOUR_OWN_FARM_OR_WITH_A_FAMILY_MEMBER"
                        )}
                      </Text>
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
                    <Col span={24}>
                      <Text className="font-13 font-weight-500">
                        14.{t("HAVE_YOU_WORKED_ELSEWHERE_IN_THE_LAST_7_DAYS")}
                      </Text>
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
                    <Col span={24}>
                      <Text className="font-13 font-weight-500">
                        15.
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
                    <Col span={24}>
                      <Text className="font-13 font-weight-500">
                        16.
                        {t(
                          "MAINTAIN_THE_MAIN_WORK_YOU_DID_DURING_THE_LAST_7_DAYS"
                        )}{" "}
                        <span style={{ paddingLeft: "3px", color: "red" }}>
                          *
                        </span>
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
                    <Col span={24}>
                      <Text className="font-13 font-weight-500">
                        17.{t("WHAT_IS_YOUR_MAIN_JOB")}{" "}
                        <span style={{ paddingLeft: "3px", color: "red" }}>
                          *
                        </span>
                      </Text>
                      <Form.Item
                        name={"MainGoodId"}
                        className="mb-0"
                        rules={[
                          {
                            required: true,
                            message: `${t("WHAT_IS_YOUR_MAIN_JOB")} ${t(
                              "is_not_empty"
                            )}`,
                          },
                        ]}
                      >
                        <Select>{renderSelect(mainService)}</Select>
                      </Form.Item>
                    </Col>
                  </>
                ) : null}
                <Col span={24}>
                  <Text className="font-13 font-weight-500">
                    18.
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
                {checkGender === "2" && age >= 10 ? (
                  <Col span={24}>
                    <Text className="font-13 font-weight-500">
                      19.{t("ARE_YOU_PREGNANT")}
                    </Text>
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
                ) : null}

                <Col span={24}>
                  <Text className="font-13 font-weight-500">
                    20.{t("HAVE_A_PHYSICAL_DISORDER")}
                  </Text>
                  <Form.Item
                    name={"Disability"}
                    className="mb-0"
                    initialValue={true}
                  >
                    <Select
                      value={disabilities}
                      onChange={(value) => {
                        form.setFields([
                          {
                            name: "DisabilityTypeId",
                            value: "",
                            errors: [],
                          },
                        ]);
                        setDisabilities(value);
                      }}
                    >
                      <Option value={true}>{t("YES")}</Option>
                      <Option value={false}>{t("NO")}</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Text className="font-13 font-weight-500">
                    21.{t("INDICATE_THE_TYPE_OF_DEFECT")}{" "}
                  </Text>
                  <Form.Item
                    name={"DisabilityTypeId"}
                    className="mb-0"
                    rules={[
                      {
                        required: disabilities ? true : false,
                        message: `${t("INDICATE_THE_TYPE_OF_DEFECT")} ${t(
                          "is_not_empty"
                        )}`,
                      },
                    ]}
                  >
                    <Select disabled={disabilities ? false : true}>
                      {renderSelect(disability)}
                    </Select>
                  </Form.Item>
                </Col>
              </>
            ) : null}
          </>
        ) : null}
      </Row>
    </Form>
  );
}

export default MemberInHouseHold;
