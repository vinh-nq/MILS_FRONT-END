import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Form, Input, message } from "antd";
import { objectValidateForm } from "../validate/objectValidateForm";
import { handleValidateFrom } from "../../../../utils/handleValidateFrom";
import functionManagementApi from "../../../../api/functionManagementApi";
import { PATH } from "../../../../routers/Path";
import { useHistory } from "react-router-dom";

function ModalFunctionManagement(props) {
  const {
    visible,
    setVisible,
    typeModal,
    objectEdit,
    listFunctionCode,
  } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const history = useHistory();

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
    await functionManagementApi
      .InsertFunction(value)
      .then((res) => {
        handleCanncel();
        history.push({
          pathName: PATH.FUNCTION_LIST_MANAGEMENT,
          search: `?keyword=${value.FunctionName}&page=1`,
        });
        message.success({
          content: t("ADD_SUCCESS"),
          key: "message-form-function",
          duration: 1,
        });
      })
      .catch((error) =>
        message.error({
          content: t("Error"),
          key: "message-form-function",
          duration: 1,
        })
      );
  };

  const handleEditItem = async (value) => {
    await functionManagementApi
      .UpdateFunction(value)
      .then((res) => {
        handleCanncel();
        history.push({
          pathName: PATH.FUNCTION_LIST_MANAGEMENT,
          search: `?keyword=${value.FunctionName}&page=1`,
        });
        message.success({
          content: t("EDIT_SUCCESS"),
          key: "message-form-function",
          duration: 1,
        });
      })
      .catch((error) =>
        message.error({
          content: t("Error"),
          key: "message-form-function",
          duration: 1,
        })
      );
  };

  const handleSubmit = (valueForm) => {
    message.loading({ content: "Loading...", key: "message-form-function" });
    if (typeModal === "add") {
      handleAddNew(valueForm);
    }
    if (typeModal === "edit") {
      handleEditItem(valueForm);
    }
  };

  return (
    <Modal
      title={`${typeModal === "add" ? t("add") : t("edit")} ${t("FUNCTION")}`}
      visible={visible}
      width="630px"
      okButtonProps={{
        form: "form-function-management",
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
      <Form id="form-function-management" form={form} onFinish={handleSubmit}>
        <div>
          <span>{t("FunctionCode")}</span>
          <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </div>
        <Form.Item
          name="FunctionCode"
          rules={[
            {
              validator(rule, value) {
                return handleValidateFrom(
                  rule,
                  value,
                  {
                    ...objectValidateForm.FunctionCode,
                    arrayDuplicate: listFunctionCode || [],
                    authCodeOld:
                      typeModal !== "add"
                        ? objectEdit.FunctionCode.toLowerCase()
                        : null,
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
          <span>{t("FunctionName")}</span>
          <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </div>
        <Form.Item
          name="FunctionName"
          rules={[
            {
              validator(rule, value) {
                return handleValidateFrom(
                  rule,
                  value,
                  objectValidateForm.FunctionName,
                  t
                );
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div>
          <span>{t("GroupName")}</span>
          <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </div>
        <Form.Item
          name="GroupName"
          rules={[
            {
              validator(rule, value) {
                return handleValidateFrom(
                  rule,
                  value,
                  objectValidateForm.GroupName,
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

export default ModalFunctionManagement;
