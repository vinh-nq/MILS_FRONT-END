import React, { useEffect, useState } from "react";
import { Col, Form, Row, Select, Typography } from "antd";
import { handleValidateFrom } from "../../../../utils/handleValidateFrom";
import { objectValidateForm } from "../validate/objectValidateForm";
import Input from "antd/es/input";
import houseHoldApi from "../../../../api/houseHoldApi";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// import { regexTemplate } from "../../../../utils/regexTemplate";

function LocationComponent(props) {
  const { detailHouseHold, form } = props;

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
  // const [HHLevel, setHHLevel] = useState("");
  // const [HHNumber, setHHNumber] = useState("");
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    getProvince();
    if (detailHouseHold.LocationBeneficiary) {
      getDistrict(detailHouseHold.LocationBeneficiary.ProvinceId);
      getVillage(detailHouseHold.LocationBeneficiary.DistrictId);
      getUnit(detailHouseHold.LocationBeneficiary.VillageId);
    }
  }, [detailHouseHold.LocationBeneficiary]);

  // const formatHHNumberAndHHLevel = (value, length) => {
  //   const checkLength = length - value.length;
  //   for (let i = 0; i < checkLength; i++) {
  //     value = "0" + value;
  //   }
  //   return value;
  // };

  // useEffect(() => {
  //   let location = "";
  //   if (selectedUnit) location = selectedUnit;
  //   else if (selectedVillage) location = selectedVillage;
  //   else if (selectedDistrict) location = selectedDistrict;
  //   else if (selectedProvince) location = selectedProvince;
  //
  //   if (HHNumber && regexTemplate.NUMBER.test(HHNumber)) {
  //     location = location + formatHHNumberAndHHLevel(HHNumber, 3);
  //   }
  //
  //   if (HHLevel && regexTemplate.NUMBER.test(HHLevel)) {
  //     location = location + formatHHNumberAndHHLevel(HHLevel, 4);
  //   }
  //   form.setFields([
  //     {
  //       name: "HouseholdId",
  //       value: location,
  //       errors: [],
  //     },
  //   ]);
  // }, [
  //   selectedProvince,
  //   selectedDistrict,
  //   selectedVillage,
  //   selectedUnit,
  //   HHLevel,
  //   HHNumber,
  //   form,
  // ]);

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
    setSelectedDistrict("");
    setSelectedVillage("");
    setSelectedUnit("");
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
    setSelectedVillage("");
    setSelectedUnit("");
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
    setSelectedUnit("");
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
      <Row className="mb-2" gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">
            {t("PROVINCE")}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
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
          <Text className="font-13 font-weight-500">
            {t("DISTRICT")}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
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
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">
            {t("VILLAGE")}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
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
          <Text className="font-13 font-weight-500">
            {t("UNIT")}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
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
            <Select
              className="w-100"
              value={selectedUnit}
              onChange={(id) => {
                setSelectedUnit(id);
              }}
            >
              {renderUnitSelect()}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">
            {t("HH_NUMBER")}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={["LocationBeneficiary", "HHNumber"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkNumber(3, 0, "HH_NUMBER", true),
                    t
                  );
                },
              },
            ]}
          >
            <Input
            // onChange={(e) => {
            //   setHHNumber(e.target.value);
            // }}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">
            {t("HH_LEVEL")}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={["LocationBeneficiary", "HHLevel"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFrom(
                    rule,
                    value,
                    objectValidateForm.checkString(4, true, "HH_LEVEL"),
                    t
                  );
                },
              },
            ]}
          >
            <Input
            // onChange={(e) => {
            //   setHHLevel(e.target.value);
            // }}
            />
          </Form.Item>
        </Col>
        {/*<Col span={24} md={12}>*/}
        {/*  <Text className="font-13 font-weight-500">*/}
        {/*    {t("HH_CODE")}*/}
        {/*    <span style={{ paddingLeft: "3px", color: "red" }}>*</span>*/}
        {/*  </Text>*/}
        {/*  <Form.Item*/}
        {/*    name={["HouseholdId"]}*/}
        {/*    className="mb-0"*/}
        {/*    rules={[*/}
        {/*      {*/}
        {/*        validator(rule, value) {*/}
        {/*          return handleValidateFrom(*/}
        {/*            rule,*/}
        {/*            value,*/}
        {/*            objectValidateForm.checkString(30, true, "HH_CODE"),*/}
        {/*            t*/}
        {/*          );*/}
        {/*        },*/}
        {/*      },*/}
        {/*    ]}*/}
        {/*  >*/}
        {/*    <Input />*/}
        {/*  </Form.Item>*/}
        {/*</Col>*/}
      </Row>
    </div>
  );
}

export default LocationComponent;
