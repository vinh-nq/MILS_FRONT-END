import React, { useEffect, useState } from "react";
import { Col, Form, Row, Select, Typography } from "antd";
import { handleValidateFrom } from "../../../../utils/handleValidateFrom";
import { objectValidateForm } from "../validate/objectValidateForm";
import { regexTemplate } from "../../../../utils/regexTemplate";
import Input from "antd/es/input";
import houseHoldApi from "../../../../api/houseHoldApi";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function LocationComponent(props) {
  const { detailHouseHold, form, typeModal } = props;
  const { Text } = Typography;
  const { Option } = Select;
  const { t } = useTranslation();
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [village, setVillage] = useState([]);
  const [unit, setUnit] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");

  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    getProvince();
    if(detailHouseHold.LocationBeneficiary){
      getDistrict(detailHouseHold.LocationBeneficiary.ProvinceId);
      getVillage(detailHouseHold.LocationBeneficiary.DistrictId);
      getUnit(detailHouseHold.LocationBeneficiary.VillageId);
    }
  }, []);

  const getProvince = async () => {
    await houseHoldApi.getAllProvince().then((res) => {
      setProvince(res.data.Data);
    });
  };

  const getDistrict = async (provinceId) => {
    await houseHoldApi.getAllDistrict({ provinceId }).then((res) => {
      setDistrict(res.data.Data);
    });
  };

  const getVillage = async (districtId) => {
    await houseHoldApi
      .getAllVillage({ districtId })
      .then((res) => setVillage(res.data.Data));
  };

  const getUnit = async (villageId) => {
    await houseHoldApi
      .getAllUnit({ villageId })
      .then((res) => setUnit(res.data.Data));
  };

  const onSelectProvince = (id) => {
    setSelectedProvince(id);
    getDistrict(id);
    form.setFields([
      {
        name: ["LocationBeneficiary", "DistrictId"],
        value: null,
      },
      {
        name: ["LocationBeneficiary", "VillageId"],
        value: null,
      },
      {
        name: ["LocationBeneficiary", "UnitId"],
        value: null,
      },
    ]);
  };

  const onSelectDistrict = (id) => {
    setSelectedDistrict(id);
    getVillage(id);
    form.setFields([
      {
        name: ["LocationBeneficiary", "VillageId"],
        value: null,
      },
      {
        name: ["LocationBeneficiary", "UnitId"],
        value: null,
      },
    ]);
  };

  const onSelectVillage = (id) => {
    setSelectedVillage(id);
    form.setFields([
      {
        name: ["LocationBeneficiary", "UnitId"],
        value: null,
      },
    ]);
    getUnit(id);
  };

  const renderProvinceSelect = () => {
    return province.map((value, index) => (
      <Option
        value={value.Id}
        key={index}
        onChange={() => {
          onSelectProvince(value.Id);
        }}
      >
        {dataLanguage === "la" ? value.ProvinceName : value.ProvinceNameEng}
      </Option>
    ));
  };

  const renderDistrictSelect = () => {
    return district.map((value, index) => (
      <Option value={value.DistrictId} key={index}>
        {dataLanguage === "la" ? value.DistrictName : value.DistrictNameEng}
      </Option>
    ));
  };

  const renderVillageSelect = () => {
    return village.map((value, index) => (
      <Option value={value.VillageId} key={index}>
        {dataLanguage === "la"
          ? value.VillageName
          : value.VillageNameEng || t("EMPTY")}
      </Option>
    ));
  };

  const renderUnitSelect = () => {
    return unit.map((value, index) => (
      <Option value={value.UnitId} key={index}>
        {dataLanguage === "la" ? value.UnitName : value.UnitNameEng}
      </Option>
    ));
  };

  return (
    <div className="hh-location">
      {
        typeModal === "UPDATE" ? null :   <Row className="mb-2" gutter={16}>
          <Col span={24}>
            <Text className="font-13 font-weight-500">{t("HH_CODE")}</Text>
            <Form.Item
                name={"HHCode"}
                className="mb-0"
                rules={[
                  {
                    validator(rule, value) {
                      return handleValidateFrom(
                          rule,
                          value,
                          objectValidateForm.checkString(20, true, "HH_CODE"),
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
      }
      <Row className="mb-2" gutter={16}>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">{t("PROVINCE")}:</Text>
          <Form.Item
            name={["LocationBeneficiary", "ProvinceId"]}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("PROVINCE")} ${t("is_not_empty")}`,
              },
            ]}
          >
            <Select
              className="w-100"
              value={selectedProvince}
              onChange={onSelectProvince}
            >
              {renderProvinceSelect()}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">{t("DISTRICT")}:</Text>
          <Form.Item
            name={["LocationBeneficiary", "DistrictId"]}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("DISTRICT")} ${t("is_not_empty")}`,
              },
            ]}
          >
            <Select
              className="w-100"
              value={selectedDistrict}
              onChange={onSelectDistrict}
            >
              {renderDistrictSelect()}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row className="mb-2" gutter={16}>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">{t("VILLAGE")}:</Text>
          <Form.Item
            name={["LocationBeneficiary", "VillageId"]}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("VILLAGE")} ${t("is_not_empty")}`,
              },
            ]}
          >
            <Select
              className="w-100"
              value={selectedVillage}
              onChange={onSelectVillage}
            >
              {renderVillageSelect()}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">{t("UNIT")}:</Text>
          <Form.Item
            name={["LocationBeneficiary", "UnitId"]}
            className="mb-0"
            rules={[
              {
                required: true,
                message: `${t("UNIT")} ${t("is_not_empty")}`,
              },
            ]}
          >
            <Select className="w-100" value={selectedUnit}>
              {renderUnitSelect()}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row className="mb-2" gutter={16}>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">{t("HH_NUMBER")}</Text>
          <Form.Item
            name={["LocationBeneficiary", "HHNumber"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkNumber(1000, 0, "HH_NUMBER", true),
                    t
                  );
                },
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">{t("HH_LEVEL")}</Text>
          <Form.Item
            name={["LocationBeneficiary", "HHLevel"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                      rule,
                      value,
                      objectValidateForm.checkString(20, true, "HH_LEVEL"),
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
    </div>
  );
}

export default LocationComponent;
