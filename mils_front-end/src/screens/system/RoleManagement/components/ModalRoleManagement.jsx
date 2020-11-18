import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Form, Input, message } from "antd";
import { objectValidateForm } from "../validate/objectValidateForm";
import { handleValidateFrom } from "../../../../utils/handleValidateFrom";
import roleManagementApi from "../../../../api/roleManagementApi";

function ModalRoleManagement(props) {
  const {
    visible,
    setVisible,
    typeModal,
    objectEdit,
    fetchDataAllRole,
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
    await roleManagementApi
      .InsertRole(value, `Insert New Role : ${value.RoleName}`)
      .then((res) => {
        handleCanncel();
        message.success({
          content: t("ADD_SUCCESS"),
          key: "message-form-role",
          duration: 1,
        });
        fetchDataAllRole();
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
    await roleManagementApi
      .UpdateRole(value, `Update Role : [${value.RoleId}] ${value.RoleName}`)
      .then((res) => {
        handleCanncel();
        message.success({
          content: t("EDIT_SUCCESS"),
          key: "message-form-role",
          duration: 1,
        });
        fetchDataAllRole();
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
    message.loading({
      content: "Loading...",
      key: "message-form-role",
      duration: 20,
    });
    if (typeModal === "add") {
      handleAddNew({
        RoleId: null,
        ...valueForm,
        Permissions: [],
      });
    }
    if (typeModal === "edit") {
      handleEditItem({
        RoleId: objectEdit.RoleId,
        ...valueForm,
        Permissions: [],
      });
    }
  };

  return (
    <Modal
      title={`${typeModal === "add" ? t("add") : t("edit")} ${t("ROLE")}`}
      visible={visible}
      width="630px"
      okButtonProps={{
        form: "form-role-management",
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
      <Form id="form-role-management" form={form} onFinish={handleSubmit}>
        {typeModal === "add" ? null : (
          <>
            <div>
              <span>{t("ROLE_ID")}</span>
              <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
            </div>
            <Form.Item
              name="RoleId"
              rules={[
                {
                  validator(rule, value) {
                    return handleValidateFrom(
                      rule,
                      value,
                      objectValidateForm.RoleId,
                      t
                    );
                  },
                },
              ]}
            >
              <Input disabled={typeModal === "edit"} />
            </Form.Item>
          </>
        )}
        <div>
          <span>{t("ROLE_NAME")}</span>
          <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </div>
        <Form.Item
          name="RoleName"
          rules={[
            {
              validator(rule, value) {
                return handleValidateFrom(
                  rule,
                  value,
                  objectValidateForm.RoleName,
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

export default ModalRoleManagement;
