import { Col, Form, Row, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import dataDictionaryApi from "../../../../api/dataDictionaryApi";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function EnergyUsedComponent(props) {
  const { Text } = Typography;
  const [water, setWater] = useState([]);
  const [toilet, setToilet] = useState([]);
  const [cooking, setCooking] = useState([]);
  const [energy, setEnergy] = useState([]);
  const { Option } = Select;
  const { t } = useTranslation();

  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    getRainingWater();
    getToiletType();
    getEnergyLighting();
    getSourceCooking();
  }, []);

  const getRainingWater = async () => {
    await dataDictionaryApi.GetAllDrinkingWater({ keyword: "" }).then((res) => {
      setWater(res.data.Data);
    });
  };

  const getToiletType = async () => {
    await dataDictionaryApi.GetAllToilet({ keyword: "" }).then((res) => {
      setToilet(res.data.Data);
    });
  };
  const getEnergyLighting = async () => {
    await dataDictionaryApi.GetAllEnergySource({ keyword: "" }).then((res) => {
      setEnergy(res.data.Data);
    });
  };

  const getSourceCooking = async () => {
    await dataDictionaryApi.GetAllCookingSource({ keyword: "" }).then((res) => {
      setCooking(res.data.Data);
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
      <Row className="mb-2" gutter={[16, 16]}>
        <Col span={24}>
          <Text className="font-13 font-weight-500">
            {t("DURING_RAINING")}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={["WaterAndPermanentEnergyBeneficiary", "WaterId"]}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("Drinking water facility during dry season")} ${t(
                  "is_not_empty"
                )}`,
              },
            ]}
          >
            <Select>{renderSelect(water)}</Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Text className="font-13 font-weight-500">
            {t("DURING_DRY")}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={["WaterAndPermanentEnergyBeneficiary", "WaterDryId"]}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("Drinking water facility during dry season")} ${t(
                  "is_not_empty"
                )}`,
              },
            ]}
          >
            <Select>{renderSelect(water)}</Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Text className="font-13 font-weight-500">
            {t("TYPE_OF_TOILET")}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={["WaterAndPermanentEnergyBeneficiary", "ToiletTypeId"]}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("Type of toilet")} ${t("is_not_empty")}`,
              },
            ]}
          >
            <Select>{renderSelect(toilet)}</Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Text className="font-13 font-weight-500">
            {t("SOURCE_FOR_COOKING")}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={["WaterAndPermanentEnergyBeneficiary", "CookingSourceId"]}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("Main source for cooking")} ${t("is_not_empty")}`,
              },
            ]}
          >
            <Select>{renderSelect(cooking)}</Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Text className="font-13 font-weight-500">
            {t("SOURCE_FOR_LIGHTING")}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={["WaterAndPermanentEnergyBeneficiary", "EnergySourceId"]}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("Main source of energy for lighting")} ${t(
                  "is_not_empty"
                )}`,
              },
            ]}
          >
            <Select>{renderSelect(energy)}</Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default EnergyUsedComponent;
