import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Form, Input, message } from "antd";
import { objectValidateForm } from "../validate/objectValidateForm";
import { handleValidateFrom } from "../../../../utils/handleValidateFrom";
import dataDictionaryApi from "../../../../api/dataDictionaryApi";

function ModaItem(props) {
  const {
    visible,
    setVisible,
    typeModal,
    objectEdit,
    reloadData,
    arrayDuplicate,
  } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (typeModal === "edit") {
      form.setFieldsValue(objectEdit);
    } else {
      form.resetFields();
    }
  }, [visible, typeModal, form, objectEdit]);

  const handleCanncel = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleAddNew = async (value) => {
    await dataDictionaryApi
      .InsertLandType(value)
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
          content: t("Error"),
          key: "message-form-role",
          duration: 1,
        })
      );
  };

  const handleEditItem = async (value) => {
    await dataDictionaryApi
      .UpdateLandType(value)
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
          content: t("Error"),
          key: "message-form-role",
          duration: 1,
        })
      );
  };

  const handleSubmit = (valueForm) => {
    message.loading({ content: "Loading...", key: "message-form-role" });
    if (typeModal === "add") {
      handleAddNew(valueForm);
    }
    if (typeModal === "edit") {
      handleEditItem({
        ...valueForm,
        Id: objectEdit.Id,
      });
    }
  };

  return (
    <Modal
      title={`${typeModal === "add" ? t("add") : t("edit")} ${t("LANDERTYPE")}`}
      visible={visible}
      width="630px"
      okButtonProps={{
        form: "form-landerType-management",
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
      <Form id="form-landerType-management" form={form} onFinish={handleSubmit}>
        <div>
          <span>{t("landerTypeId")}</span>
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
                  {
                    ...objectValidateForm.landerTypeId,
                    arrayDuplicate: arrayDuplicate,
                    authCodeOld:
                      typeModal !== "add" ? objectEdit.Id.toLowerCase() : null,
                  },
                  t
                );
              },
            },
          ]}
        >
          <Input disabled={typeModal === "edit"} />
        </Form.Item>
        <div>
          <span>{t("landerTypeLao")}</span>
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
                  objectValidateForm.landerTypeLao,
                  t
                );
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div>
          <span>{t("landerTypeEng")}</span>
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
                  objectValidateForm.landerTypeEng,
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