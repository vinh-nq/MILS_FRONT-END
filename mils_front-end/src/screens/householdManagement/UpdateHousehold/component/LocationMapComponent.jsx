import { Col, Form, Input, message, Row, Typography, Upload } from "antd";
import { handleValidateFrom } from "../../../../utils/handleValidateFrom";
import { objectValidateForm } from "../validate/objectValidateForm";
import React from "react";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons/lib/icons";

const UploadButton = (props) => (
  <div>
    <PlusOutlined className="font-20" />
    <div className="font-16" style={{ marginTop: 8 }}>
      {props.text}
    </div>
  </div>
);

function LocationMapComponent(props) {
  const { hhImageUrl, setHHImageUrl, setHHImageUrlExtension } = props;

  const { t } = useTranslation();
  const { TextArea } = Input;
  const { Text } = Typography;
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
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error("Image must smaller than 4MB!");
    }
    return isJpgOrPng && isLt4M;
  }

  const handleChange = (info) => {
    const { name } = info.file;
    getBase64(info.file.originFileObj, (imageUrl) => {
      setHHImageUrl(imageUrl);
      setHHImageUrlExtension(name.split(".")[1]);
    });
  };

  return (
    <Row className="mb-2" gutter={16}>
      <Col span={24} md={12}>
        <Text className="font-13 font-weight-500">
          Longitude<span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </Text>
        <Form.Item
          name={["LatLongForBeneficiary", "Long"]}
          className="mb-0"
          rules={[
            {
              validator(rule, value) {
                return handleValidateFrom(
                  rule,
                  value,
                  objectValidateForm.checkString(20, true, "Longitude"),
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
          Latitude<span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </Text>
        <Form.Item
          name={["LatLongForBeneficiary", "Lat"]}
          className="mb-0"
          rules={[
            {
              validator(rule, value) {
                return handleValidateFrom(
                  rule,
                  value,
                  objectValidateForm.checkString(20, true, "Latitude"),
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
        <Text className="font-13 font-weight-500">{t("DESCRIPTION")}</Text>
        <Form.Item
          name={["LatLongForBeneficiary", "Description"]}
          className="mb-0"
        >
          <TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            showCount
            maxLength={200}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Text className="font-13 font-weight-500">{t("HH_IMAGE")}</Text>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader hh-registration-image-upload"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={(info) => {
            handleChange(info);
          }}
        >
          {hhImageUrl ? (
            <img src={hhImageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            <UploadButton text={t("UPLOAD_SIGNATURE")} />
          )}
        </Upload>
      </Col>
    </Row>
  );
}

export default LocationMapComponent;
