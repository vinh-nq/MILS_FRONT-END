import {
  Col,
  Form,
  Row,
  Typography,
  Input,
  Select,
  DatePicker,
  Upload,
  message,
} from "antd";
import React from "react";
import {handleValidateFields} from "../../../../utils/handleValidateFields";
import { objectValidateForm } from "../validate/objectValidateForm";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { PlusOutlined } from "@ant-design/icons/lib/icons";

const UploadButton = (props) => (
  <div>
    <PlusOutlined className="font-20" />
    <div className="font-16" style={{ marginTop: 8 }}>
      {props.text}
    </div>
  </div>
);

function GeneralInformationComponent(props) {
  const {
    EnumSignImage,
    setEnumSignImage,
    RespSignImage,
    setRespSignImage,
    ImageUrl,
    setImageUrl,
    setEnumSignImageExtension,
    setRespSignImageExtension,
    setImageUrlExtension,
    hhImageUrl,
    setHHImageUrl,
    setHHImageUrlExtension,
  } = props;

  const { Text } = Typography;
  const { t } = useTranslation();
  const { Option } = Select;
  const { TextArea } = Input;
  const disabledDate = (current) => {
    return current > moment();
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
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error("Image must smaller than 4MB!");
    }
    return isJpgOrPng && isLt4M;
  }

  const handleChange = (info, type) => {
    const { name } = info.file;
    getBase64(info.file.originFileObj, (imageUrl) => {
      if (type === "IMAGE") {
        setImageUrl(imageUrl);
        setImageUrlExtension(name.split(".")[1]);
      } else if (type === "HOUSEHOLD") {
        setHHImageUrl(imageUrl);
        setHHImageUrlExtension(name.split(".")[1]);
      } else if (type === "ENUMSIGN") {
        setEnumSignImage(imageUrl);
        setEnumSignImageExtension(name.split(".")[1]);
      } else {
        setRespSignImage(imageUrl);
        setRespSignImageExtension(name.split(".")[1]);
      }
    });
  };

  return (
    <>
      <Row className="mb-2" gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">
            {t("HEAD_OF_HH_NAME")}
            <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
          </Text>
          <Form.Item
            name={["GeneralInformationBeneficiary", "HeadOfHHName"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFields(
                    rule,
                    value,
                      objectValidateForm.checkString(
                      50,
                      false,
                      "HEAD_OF_HH_NAME"
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
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">{t("GENDER")}</Text>
          <Form.Item
            name={["GeneralInformationBeneficiary", "Gender"]}
            className="mb-0"
            initialValue={"Male"}
            rules={[
              {
                require: true,
                message: `${t("GENDER")} ${t("is_not_empty")}`,
              },
            ]}
          >
            <Select>
              <Option value="Male">{t("MALE")}</Option>
              <Option value="Female">{t("FEMALE")}</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">{t("TELEPHONE")}</Text>
          <Form.Item
            name={["GeneralInformationBeneficiary", "Telephone1"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFields(
                    rule,
                    value,
                    objectValidateForm.checkNumber(20, 0, "TELEPHONE", false),
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
          <Text className="font-13 font-weight-500">{t("NUMBER_OF_HH")}</Text>
          <Form.Item
            name={["GeneralInformationBeneficiary", "NumberOfHH"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFields(
                    rule,
                    value,
                    objectValidateForm.checkNumber(
                      20,
                      0,
                      "NUMBER_OF_HH",
                        false
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
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">{t("FEMALE")}</Text>
          <Form.Item
            name={["GeneralInformationBeneficiary", "Female"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFields(
                    rule,
                    value,
                    objectValidateForm.checkNumber(20, 0, "FEMALE", false),
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
            {t("DATE_OF_ENUMERATION")}
          </Text>
          <Form.Item
            name={["GeneralInformationBeneficiary", "DateOfEnumeration"]}
            className="mb-0"
            initialValue={moment()}
            rules={[
              {
                required: true,
                message: `${t("DATE_OF_ENUMERATION")} ${t("is_not_empty")}`,
              },
            ]}
          >
            <DatePicker className="w-100" disabledDate={disabledDate} />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">{t("ENUMERATION")}</Text>
          <Form.Item
            name={["GeneralInformationBeneficiary", "Enumeration"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFields(
                    rule,
                    value,
                    objectValidateForm.checkString(20, false, "ENUMERATION"),
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
          <Text className="font-13 font-weight-500">{t("TELEPHONE")}</Text>
          <Form.Item
            name={["GeneralInformationBeneficiary", "TelePhone2"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFields(
                    rule,
                    value,
                    objectValidateForm.checkNumber(20, 0, "TELEPHONE", false),
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
          <Text className="font-13 font-weight-500">{t("RESPONDENT")}</Text>
          <Form.Item
            name={["GeneralInformationBeneficiary", "Respondent"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFields(
                    rule,
                    value,
                    objectValidateForm.checkString(20, false, "RESPONDENT"),
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
          <Text className="font-13 font-weight-500">{t("TELEPHONE")}</Text>
          <Form.Item
            name={["GeneralInformationBeneficiary", "TelePhone3"]}
            className="mb-0"
            rules={[
              {
                validator(rule, value) {
                  return handleValidateFields(
                    rule,
                    value,
                    objectValidateForm.checkNumber(20, 0, "TELEPHONE", false),
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
              autoSize={{ minRows: 2, maxRows: 3 }}
              showCount
              maxLength={300}
            />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">{t("HH_IMAGE")}</Text>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader hh-registration-image-upload"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={(info) => {
              handleChange(info, "HOUSEHOLD");
            }}
          >
            {hhImageUrl ? (
              <img src={hhImageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <UploadButton text={t("HH_IMAGE")} />
            )}
          </Upload>
        </Col>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">
            {t("SIGNATURE_COLLECTOR")}
          </Text>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader hh-registration-image-upload"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={(info) => {
              handleChange(info, "ENUMSIGN");
            }}
          >
            {EnumSignImage ? (
              <img src={EnumSignImage} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <UploadButton text={t("SIGNATURE_COLLECTOR")} />
            )}
          </Upload>
        </Col>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">
            {t("SIGNATURE_RESPONDENT")}
          </Text>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader hh-registration-image-upload"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={(info) => {
              handleChange(info, "RESPSIGN");
            }}
          >
            {RespSignImage ? (
              <img src={RespSignImage} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <UploadButton text={t("SIGNATURE_RESPONDENT")} />
            )}
          </Upload>
        </Col>
        <Col span={24} md={12}>
          <Text className="font-13 font-weight-500">{t("UPLOAD_IMAGE")}</Text>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader hh-registration-image-upload"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={(info) => {
              handleChange(info, "IMAGE");
            }}
          >
            {ImageUrl ? (
              <img src={ImageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <UploadButton text={t("UPLOAD_IMAGE")} />
            )}
          </Upload>
        </Col>
      </Row>
    </>
  );
}

export default GeneralInformationComponent;
