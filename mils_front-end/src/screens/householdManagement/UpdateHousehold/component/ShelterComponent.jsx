import { Col, Form, Row, Typography, Select, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dataDictionaryApi from "../../../../api/dataDictionaryApi";
import { useSelector } from "react-redux";
import { handleValidateFrom } from "../../../../utils/handleValidateFrom";
import { objectValidateForm } from "../validate/objectValidateForm";

function ShelterComponent(props) {
  const { Text } = Typography;
  const { t } = useTranslation();
  const { Option } = Select;

  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  const [wall, setWall] = useState([]);
  const [roof, setRoof] = useState([]);
  const [floor, setFloor] = useState([]);
  const [roofSafety, setRoofSafety] = useState([]);

  useEffect(() => {
    const getWallMaterial = async () => {
      await dataDictionaryApi
        .GetAllWallMaterail({ keyword: "" })
        .then((res) => {
          setWall(res.data.Data);
        })
        .catch(() => {
          message.error({
            content: t("FETCH_DATA_FAILED"),
            key: "message-form-role",
            duration: 1,
          });
        });
    };
    getWallMaterial();
  }, [t]);

  useEffect(() => {
    const getRoofMaterial = async () => {
      await dataDictionaryApi
        .GetAllRoofMaterail({ keyword: "" })
        .then((res) => {
          setRoof(res.data.Data);
        })
        .catch(() => {
          message.error({
            content: t("FETCH_DATA_FAILED"),
            key: "message-form-role",
            duration: 1,
          });
        });
    };
    getRoofMaterial();
  }, [t]);

  useEffect(() => {
    const getFloorMaterial = async () => {
      await dataDictionaryApi
        .GetAllFloorMaterail({ keyword: "" })
        .then((res) => {
          setFloor(res.data.Data);
        })
        .catch(() => {
          message.error({
            content: t("FETCH_DATA_FAILED"),
            key: "message-form-role",
            duration: 1,
          });
        });
    };
    getFloorMaterial();
  }, [t]);

  useEffect(() => {
    const getRoofSafety = async () => {
      await dataDictionaryApi
        .GetAllSafetyArea({ keyword: "" })
        .then((res) => {
          setRoofSafety(res.data.Data);
        })
        .catch(() => {
          message.error({
            content: t("FETCH_DATA_FAILED"),
            key: "message-form-role",
            duration: 1,
          });
        });
    };
    getRoofSafety();
  }, [t]);

  const renderSelect = (array) => {
    return array.map((value, index) => (
      <Option value={value.Id} key={index}>
        {dataLanguage === "la" ? value.ValueOfLao : value.ValueOfEng}
      </Option>
    ));
  };

  return (
    <>
      <Row className="mb-2" gutter={16}>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">
            {t("TOTAL_ROOMS")}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={["Shelter", "TotalRooms"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkNumber(20, 0, "TOTAL_ROOMS", true),
                    t
                  );
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">
            {t("ROOF_SAFETY_AREA")}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={["Shelter", "SafetyAreaId"]}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `Roof safety area ${t("is_not_empty")}`,
              },
            ]}
          >
            <Select>{renderSelect(roofSafety)}</Select>
          </Form.Item>
        </Col>
      </Row>
      <Row className="mb-2" gutter={16}>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">
            {t("WALL_MATERIAL")}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={["Shelter", "WallMaterialId"]}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("WALL_MATERIAL")} ${t("is_not_empty")}`,
              },
            ]}
          >
            <Select>{renderSelect(wall)}</Select>
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">
            {t("FLOOR_MATERIAL")}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={["Shelter", "FloorMaterialId"]}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("FLOOR_MATERIAL")} ${t("is_not_empty")}`,
              },
            ]}
          >
            <Select>{renderSelect(floor)}</Select>
          </Form.Item>
        </Col>
      </Row>
      <Row className="mb-2" gutter={16}>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">
            {t("ROOF_MATERIAL")}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={["Shelter", "RoofMaterialId"]}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("ROOF_MATERIAL")} ${t("is_not_empty")}`,
              },
            ]}
          >
            <Select>{renderSelect(roof)}</Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default ShelterComponent;
