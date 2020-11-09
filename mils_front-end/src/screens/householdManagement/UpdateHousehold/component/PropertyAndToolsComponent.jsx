import React, { useEffect, useState } from "react";
import { Col, Form, Input, Row, Select, Switch } from "antd";
import Text from "antd/es/typography/Text";
import { useTranslation } from "react-i18next";
import { handleValidateFrom } from "../../../../utils/handleValidateFrom";
import { objectValidateForm } from "../validate/objectValidateForm";
import { useSelector } from "react-redux";
import dataDictionaryApi from "../../../../api/dataDictionaryApi";

function PropertyAndToolsComponent() {
  const [borrowingReason, setBorrowingReason] = useState([]);
  const [lenderType, setLenderType] = useState([]);

  const { t } = useTranslation();
  const { Option } = Select;
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    getBorrowingReason();
    getLenderType();
  }, []);

  const getBorrowingReason = async () => {
    await dataDictionaryApi.GetAllBorrowReason({ keyword: "" }).then((res) => {
      setBorrowingReason(res.data.Data);
    });
  };

  const getLenderType = async () => {
    await dataDictionaryApi.GetAllTypeOfLender({ keyword: "" }).then((res) => {
      setLenderType(res.data.Data);
    });
  };

  const renderSelect = (array) => {
    return array.map((value, index) => (
      <Option value={value.Id} key={index}>
        {dataLanguage === "la" ? value.ValueOfLao : value.ValueOfEng}
      </Option>
    ));
  };

  return (
    <>
      {/*1-2*/}
      <Row className="mb-2" gutter={16}>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">{t("UNDER_14_YEARS")}</Text>
          <Form.Item
            name={["StableOccupationAndIncome", "TotalBellow_14"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkNumber(
                      10,
                      0,
                      "UNDER_14_YEARS",
                      true
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
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">{t("BETWEEN_15-60")}</Text>
          <Form.Item
            name={["StableOccupationAndIncome", "TotalBetween_15-60"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkNumber(10, 0, "BETWEEN_15", true),
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
      {/*3-4*/}
      <Row className="mb-2" gutter={16}>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">{t("OVER_60")}</Text>
          <Form.Item
            name={["StableOccupationAndIncome", "TotalAbove_60"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkNumber(10, 0, "OVER_60", true),
                    t
                  );
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("WORKING_GROUPS_OF_REGULAR_FAMILY_MEMBERS")}
          </Text>
          <Form.Item
            name={["StableOccupationAndIncome", "MainJobId"]}
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
                      "WORKING_GROUPS_OF_REGULAR_FAMILY_MEMBERS"
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
      {/*5-6*/}
      <Row className="mb-2" gutter={16}>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("MAIN_OCCUPATIONS_OF_MOST_FAMILY_MEMBERS")}
          </Text>
          <Form.Item
            name={["StableOccupationAndIncome", "MainGoodsId"]}
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
                      "MAIN_OCCUPATIONS_OF_MOST_FAMILY_MEMBERS"
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
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("SOURCES_OTHER_THAN_THEIR_MAIN_SOURCE_OF_INCOME")}
          </Text>
          <Form.Item
            name={["StableOccupationAndIncome", "ReceivedBenfits"]}
            className="mb-0"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
        </Col>
      </Row>
      {/*7-8*/}
      <Row className="mb-2" gutter={16}>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("HAVE_FAMILY_MEMBERS_BORROWED_FROM_OTHER_PARTIES")}
          </Text>
          <Form.Item
            name={["StableOccupationAndIncome", "OweCredit"]}
            className="mb-0"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
        </Col>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">{t("TYPE_OF_LENDER")}</Text>
          <Form.Item
            name={["StableOccupationAndIncome", "TypeOfLenderId"]}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("TYPE_OF_LENDER")} ${t("is_not_empty")}`,
              },
            ]}
          >
            <Select>{renderSelect(lenderType)}</Select>
          </Form.Item>
        </Col>
      </Row>
      {/*9-10*/}
      <Row className="mb-2" gutter={16}>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("WHY_FAMILY_MEMBERS_BORROW_MONEY")}
          </Text>
          <Form.Item
            name={["StableOccupationAndIncome", "BorrowingReasonId"]}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("WHY_FAMILY_MEMBERS_BORROW_MONEY")} ${t(
                  "is_not_empty"
                )}`,
              },
            ]}
          >
            <Select>{renderSelect(borrowingReason)}</Select>
          </Form.Item>
        </Col>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t(
              "DOES_ANY_FAMILY_MEMBER_RUN_ANY_FARM_ON_THEIR_OWN_LAND_OR_LEASED_LAND"
            )}
          </Text>
          <Form.Item
            name={["StableOccupationAndIncome", "OwnAgri"]}
            className="mb-0"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
        </Col>
      </Row>
      {/*11-12*/}
      <Row className="mb-2" gutter={16}>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("LAND_OWNED_OR_LEASED")}
          </Text>
          <Form.Item
            name={["StableOccupationAndIncome", "MemberWork"]}
            className="mb-0"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
        </Col>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("SPECIFY_THE_NUMBER_OF_PLOTS")}
          </Text>
          <Form.Item
            name={["StableOccupationAndIncome", "NumberPlots"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkNumber(
                      10,
                      0,
                      "SPECIFY_THE_NUMBER_OF_PLOTS",
                      true
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
      {/*13-14*/}
      <Row className="mb-2" gutter={16}>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("NUMBER_OF_RELATED_PLOTS")}
          </Text>
          <Form.Item
            name={["StableOccupationAndIncome", "PlotRepeatCount"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkNumber(
                      10,
                      0,
                      "NUMBER_OF_RELATED_PLOTS",
                      true
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
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("LIVESTOCK_RAISING_IN_THE_LAST_12_MONTHS")}
          </Text>
          <Form.Item
            name={["StableOccupationAndIncome", "LiveStock"]}
            className="mb-0"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
        </Col>
      </Row>
      <Row className="mb-2" gutter={16}>
        <Col className="mb-2" span={24}>
          <Text className="font-13 font-weight-500">
            {t("LOWER_SECONDARY_EDUCATION")}
          </Text>
          <Form.Item
            name={["StableOccupationAndIncome", "CompletedPrimarySchool"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkNumber(
                      10,
                      0,
                      "LOWER_SECONDARY_EDUCATION",
                      true
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
    </>
  );
}

export default PropertyAndToolsComponent;
