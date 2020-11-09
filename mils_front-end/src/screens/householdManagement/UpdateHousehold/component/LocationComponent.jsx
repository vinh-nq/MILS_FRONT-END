import React, { useEffect, useState } from "react";
import { Col, Form, Row, Select, Typography, Upload, message } from "antd";
import { handleValidateFrom } from "../../../../utils/handleValidateFrom";
import { objectValidateForm } from "../validate/objectValidateForm";
import Input from "antd/es/input";
import houseHoldApi from "../../../../api/houseHoldApi";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons/lib/icons";

const UploadButton = (props) => (
  <div>
    <PlusOutlined className="font-20" />
    <div className="font-16" style={{ marginTop: 8 }}>
      {props.text}
    </div>
  </div>
);

function LocationComponent(props) {
  const {
    detailHouseHold,
    form,
    EnumSignImage,
    setEnumSignImage,
    RespSignImage,
    setRespSignImage,
    ImageUrl,
    setImageUrl,
    setEnumSignImageExtension,
    setRespSignImageExtension,
    setImageUrlExtension,
  } = props;

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
    if (detailHouseHold.LocationBeneficiary) {
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

  //Upload image

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    if (img) {
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    }
  };

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (info, type) => {
    const { name } = info.file;
    getBase64(info.file.originFileObj, (imageUrl) => {
      if (type === "IMAGE") {
        setImageUrl(imageUrl);
        setImageUrlExtension(name.split(".")[1]);
      } else if (type == "ENUMSIGN") {
        setEnumSignImage(imageUrl);
        setEnumSignImageExtension(name.split(".")[1]);
      } else {
        setRespSignImage(imageUrl);
        setRespSignImageExtension(name.split(".")[1]);
      }
    });
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
                    objectValidateForm.checkNumber(3, 0, "HH_NUMBER", true),
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
                    objectValidateForm.checkString(4, true, "HH_LEVEL"),
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
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">{t("SIGNATURE")}</Text>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={(info) => {
              handleChange(info, "ENUMSIGN");
            }}
            className="hh-registration-image-upload"
          >
            {EnumSignImage ? (
              <img src={EnumSignImage} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <UploadButton text={t("UPLOAD_SIGNATURE")} />
            )}
          </Upload>
        </Col>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">{t("SIGNATURE")}</Text>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={(info) => {
              handleChange(info, "RESPSIGN");
            }}
            className="hh-registration-image-upload"
          >
            {RespSignImage ? (
              <img src={RespSignImage} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <UploadButton text={t("UPLOAD_SIGNATURE")} />
            )}
          </Upload>
        </Col>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">{t("IMAGE")}</Text>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={(info) => {
              handleChange(info, "IMAGE");
            }}
            className="hh-registration-image-upload"
          >
            {ImageUrl ? (
              <img src={ImageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <UploadButton text={t("UPLOAD_IMAGE")} />
            )}
          </Upload>
        </Col>
      </Row>
    </div>
  );
}

export default LocationComponent;
