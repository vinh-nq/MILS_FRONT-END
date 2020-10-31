import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Form, Input, message, Select } from "antd";
import { objectValidateForm } from "../validate/objectValidateForm";
import { handleValidateFrom } from "../../../../utils/handleValidateFrom";
import roleManagementApi from "../../../../api/roleManagementApi";
import { regexTemplate } from "../../../../utils/regexTemplate";

function ModalUserManagement(props) {
  const {
    visible,
    setVisible,
    typeModal,
    objectEdit,
    fetchDataAllRole,
  } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [listRole, setListRole] = useState([]);

  useEffect(() => {
    if (typeModal === "edit") {
      form.setFieldsValue(objectEdit);
    } else {
      form.resetFields();
    }
    if (visible) {
      fetchDataRoleUser();
    }
  }, [visible, typeModal, form, objectEdit]);

  const fetchDataRoleUser = async () => {
    return await roleManagementApi.GetAllRole({}).then((res) => {
      setListRole(res.data);
    });
  };

  const handleCanncel = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleAddNew = async (value) => {
    await roleManagementApi
      .InsertRole(value)
      .then((res) => {
        handleCanncel();
        message.success({
          content: t("ADD_SUCCESS"),
          key: "message-form-user",
          duration: 1,
        });
        fetchDataAllRole();
      })
      .catch((error) =>
        message.error({
          content: t("Error"),
          key: "message-form-user",
          duration: 1,
        })
      );
  };

  const handleEditItem = async (value) => {
    await roleManagementApi
      .UpdateRole(value)
      .then((res) => {
        handleCanncel();
        message.success({
          content: t("EDIT_SUCCESS"),
          key: "message-form-user",
          duration: 1,
        });
        fetchDataAllRole();
      })
      .catch((error) =>
        message.error({
          content: t("Error"),
          key: "message-form-user",
          duration: 1,
        })
      );
  };

  const handleSubmit = (valueForm) => {
    message.loading({ content: "Loading...", key: "message-form-user" });
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
      title={`${typeModal === "add" ? t("add") : t("edit")} ${t("USER")}`}
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
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
            <div>
              <span>{t("UserName")}</span>
              <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
            </div>
            <Form.Item
              name="UserName"
              rules={[
                {
                  validator(rule, value) {
                    return handleValidateFrom(
                      rule,
                      value,
                      objectValidateForm.UserName,
                      t
                    );
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
            <div>
              <span>{t("FullName")}</span>
              <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
            </div>
            <Form.Item
              name="FullName"
              rules={[
                {
                  validator(rule, value) {
                    return handleValidateFrom(
                      rule,
                      value,
                      objectValidateForm.FullName,
                      t
                    );
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
            <div>
              <span>{t("Mobilephone")}</span>
              <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
            </div>
            <Form.Item
              name="Mobilephone"
              rules={[
                {
                  validator(rule, value) {
                    return handleValidateFrom(
                      rule,
                      value,
                      objectValidateForm.Mobilephone,
                      t
                    );
                  },
                },
                {
                  pattern: regexTemplate.PHONE,
                  message: t("required_phone"),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
            <div>
              <span>{t("Email")}</span>
              <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
            </div>
            <Form.Item
              name="Email"
              rules={[
                {
                  type: "email",
                  message: t("required_email"),
                },
                {
                  validator(rule, value) {
                    return handleValidateFrom(
                      rule,
                      value,
                      objectValidateForm.Email,
                      t
                    );
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
            <div>
              <span>{t("Department")}</span>
              <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
            </div>
            <Form.Item
              name="Department"
              rules={[
                {
                  validator(rule, value) {
                    return handleValidateFrom(
                      rule,
                      value,
                      objectValidateForm.Department,
                      t
                    );
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
            <div>
              <span>{t("Type")}</span>
              <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
            </div>
            <Form.Item
              name="Type"
              rules={[
                {
                  validator(rule, value) {
                    return handleValidateFrom(
                      rule,
                      value,
                      objectValidateForm.Type,
                      t
                    );
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
            <div>
              <span>{t("RoleName")}</span>
              <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
            </div>
            <Form.Item
              name="RoleId"
              rules={[
                {
                  required: true,
                  message: `${t("RoleName")} ${t("is_not_empty")}`,
                },
              ]}
            >
              <Select placeholder="Select role">
                {listRole.map((el) => (
                  <Select.Option value={el.RoleId} key={el.RoleId}>
                    {el.RoleName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
            <div>
              <span>{t("Password")}</span>
              <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
            </div>
            <Form.Item
              name="Password"
              rules={[
                {
                  validator(rule, value) {
                    return handleValidateFrom(
                      rule,
                      value,
                      objectValidateForm.Password,
                      t
                    );
                  },
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default ModalUserManagement;
