import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Form, Input, message, Select } from "antd";
import { objectValidateForm } from "../validate/objectValidateForm";
import { handleValidateFrom } from "../../../../utils/handleValidateFrom";
import dataDictionaryApi from "../../../../api/dataDictionaryApi";
import { useSelector } from "react-redux";

function ModaItem(props) {
  const { visible, setVisible, typeModal, objectEdit, reloadData } = props;
  const [listProvince, setListProvince] = useState([]);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    if (typeModal === "edit") {
      form.setFieldsValue({
        ...objectEdit,
        ProvinceId: objectEdit.Id.substr(0, 2),
        Id: objectEdit.Id.substr(2, 4),
      });
    } else {
      form.resetFields();
    }
    fetchDataProvince();
  }, [visible, typeModal, form, objectEdit]);

  const fetchDataProvince = async () => {
    await dataDictionaryApi
      .GetAllProvince({
        keyword: null,
      })
      .then((res) => {
        setListProvince(res.data.Data);
      });
  };

  const handleCanncel = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleAddNew = async (value) => {
    await dataDictionaryApi
      .InsertDistrict(
        value,
        `Insert New District [${value.Id}] - ${value.ValueOfEng}`
      )
      .then((res) => {
        handleCanncel();
        message.success({
          content: t("ADD_SUCCESS"),
          key: "message-form-role",
          duration: 1,
        });
        reloadData(value.ValueOfEng);
      })
      .catch((error) =>
        message.error({
          content: (error || {}).message || t("Error"),
          key: "message-form-role",
          duration: 1,
        })
      );
  };

  const handleEditItem = async (value) => {
    await dataDictionaryApi
      .UpdateDistrict(
        value,
        `Update District [${value.Id}] - ${value.ValueOfEng}`
      )
      .then((res) => {
        handleCanncel();
        message.success({
          content: t("EDIT_SUCCESS"),
          key: "message-form-role",
          duration: 1,
        });
        reloadData(value.ValueOfEng);
      })
      .catch((error) =>
        message.error({
          content: (error || {}).message || t("Error"),
          key: "message-form-role",
          duration: 1,
        })
      );
  };

  const handleSubmit = (valueForm) => {
    message.loading({ content: "Loading...", key: "message-form-role" });
    if (typeModal === "add") {
      handleAddNew({
        ...valueForm,
        Id: `${valueForm.ProvinceId}${valueForm.Id}`,
      });
    }
    if (typeModal === "edit") {
      handleEditItem({
        Id: objectEdit.Id,
        ValueOfEng: valueForm.ValueOfEng,
        ValueOfLao: valueForm.ValueOfLao,
      });
    }
  };

  return (
    <Modal
      title={`${typeModal === "add" ? t("add") : t("edit")} ${t("District")}`}
      visible={visible}
      width="630px"
      okButtonProps={{
        form: "form-district-management",
        key: "submit",
        htmlType: "submit",
        type: "primary",
      }}
      onCancel={handleCanncel}
      okText={`${typeModal === "add" ? t("add") : t("update")}`}
      cancelText={t("cancel")}
      cancelButtonProps={{
        type: "default",
      }}
      forceRender
    >
      <Form id="form-district-management" form={form} onFinish={handleSubmit}>
        <div>
          <span>{t("districtId")}</span>
          <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </div>
        <Form.Item
          name="Id"
          rules={[
            {
              validator(rule, value) {
                return handleValidateFrom(
                  rule,
                  value,
                  objectValidateForm.districtId,
                  t
                );
              },
            },
          ]}
        >
          <Input disabled={typeModal === "edit"} />
        </Form.Item>
        <div>
          <span>{t("Province")}</span>
          <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </div>
        <Form.Item
          name="ProvinceId"
          rules={[
            {
              required: true,
              message: `${t("Province")} ${t("is_not_empty")}`,
            },
          ]}
        >
          <Select placeholder="Select province" disabled={typeModal === "edit"}>
            {listProvince.map((el) => (
              <Select.Option value={el.Id} key={el.Id}>
                {dataLanguage === "la" ? el.ValueOfLao : el.ValueOfEng}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div>
          <span>{t("districtLa")}</span>
          <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </div>
        <Form.Item
          name="ValueOfLao"
          rules={[
            {
              validator(rule, value) {
                return handleValidateFrom(
                  rule,
                  value,
                  objectValidateForm.districtLa,
                  t
                );
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div>
          <span>{t("districtEn")}</span>
          <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </div>
        <Form.Item
          name="ValueOfEng"
          rules={[
            {
              validator(rule, value) {
                return handleValidateFrom(
                  rule,
                  value,
                  objectValidateForm.districtEn,
                  t
                );
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModaItem;
