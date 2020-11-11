import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Form, Input, message, Select, Switch } from "antd";
import { objectValidateForm } from "../validate/objectValidateForm";
import { handleValidateFrom } from "../../../../utils/handleValidateFrom";
import roleManagementApi from "../../../../api/roleManagementApi";
import userManagementApi from "../../../../api/userManagementApi";
import { regexTemplate } from "../../../../utils/regexTemplate";
import Cookies from "universal-cookie";

function ModalUserManagement(props) {
  const {
    visible,
    setVisible,
    typeModal,
    setCheckLoading,
    fetchDataAllUser,
    idOject,
    listFunctionUserName,
    // listFunctionUserId,
  } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [listRole, setListRole] = useState([]);
  const [objectEdit, setObjectEdit] = useState({});
  let cookies = new Cookies();
  cookies = cookies.get("user");

  useEffect(() => {
    form.resetFields();
    const fetchDataUserAndRole = async () => {
      setCheckLoading(true);
      return await Promise.all([fetchDataUser(), fetchDataRoleUser()])
        .then(([resUser, resRole]) => {
          setCheckLoading(false);
          if (resRole.statusText !== "OK") {
            message.error("error role fetch");
          }
          if (resUser.statusText !== "OK") {
            message.error("error role function");
          }
          return [resUser.data, resRole.data];
        })
        .then(([dataUser, dataRole]) => {
          setListRole(dataRole);
          setObjectEdit(dataUser);
          form.setFieldsValue({
            ...dataUser,
            Active: dataUser.Active === 1 ? true : false,
            Enabled: dataUser.Enabled === 1 ? true : false,
          });
        });
    };
    const fetchDataRoleUserInModeAdd = async () => {
      const res = await roleManagementApi.GetAllRole({});
      setListRole(res.data);
    };
    const fetchDataUser = () => {
      return userManagementApi.GetUserById(
        {
          id: idOject,
        },
        `Get Information Of UserId : ${idOject}`
      );
    };
    const fetchDataRoleUser = () => {
      return roleManagementApi.GetAllRole({});
    };
    if (visible && typeModal === "edit") {
      fetchDataUserAndRole();
    }
    if (visible && typeModal === "add") {
      fetchDataRoleUserInModeAdd();
    }
  }, [visible, typeModal, form, idOject, setCheckLoading]);

  const handleCanncel = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleAddNew = async (value) => {
    await userManagementApi
      .InsertUser(value, `Insert New User ${value.UserName}`)
      .then((res) => {
        handleCanncel();
        if (!res.data.Status) {
          throw new Error(res.data.Messages);
        }
        message.success({
          content: t("ADD_SUCCESS"),
          key: "message-form-user",
          duration: 1,
        });
        fetchDataAllUser();
      })
      .catch((error) => {
        message.error({
          content: (error || {}).message || t("Error"),
          key: "message-form-user",
          duration: 1,
        });
      });
  };

  const handleEditItem = async (value) => {
    await userManagementApi
      .UpdateUser(
        value,
        `Update Information User [${value.UserId}] : ${value.UserName}`
      )
      .then((res) => {
        handleCanncel();
        message.success({
          content: t("EDIT_SUCCESS"),
          key: "message-form-user",
          duration: 1,
        });
        fetchDataAllUser();
      })
      .catch((error) => {
        handleCanncel();
        message.error({
          content: t("Error"),
          key: "message-form-user",
          duration: 1,
        });
      });
  };

  const handleSubmit = (valueForm) => {
    message.loading({ content: "Loading...", key: "message-form-user" });
    if (typeModal === "add") {
      handleAddNew({
        ...valueForm,
        Password: valueForm.PasswordUser,
        UserId: valueForm.UserId ? valueForm.UserId : null,
        Device_ID: valueForm.Device_ID ? valueForm.Device_ID : null,
        CreatedBy: cookies.UserName,
        Active: valueForm.Active ? 1 : 0,
        Enabled: valueForm.Enabled ? 1 : 0,
        UserCreateID: cookies.userId,
      });
    }
    if (typeModal === "edit") {
      handleEditItem({
        ...valueForm,
        Password: valueForm.PasswordUser || null,
        UserName: objectEdit.UserName,
        UserId: objectEdit.UserId,
        Device_ID: objectEdit.Device_ID,
        CreatedBy: objectEdit.CreatedBy,
        Active: valueForm.Active ? 1 : 0,
        Enabled: valueForm.Enabled ? 1 : 0,
        UserCreateID: objectEdit.UserCreateID,
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
              <span>{t("UserId")}</span>
              {/* <span style={{ paddingLeft: "3px", color: "red" }}>*</span> */}
            </div>
            <Form.Item
              name="UserId"
              // rules={[
              //   {
              //     validator(rule, value) {
              //       return handleValidateFrom(
              //         rule,
              //         value,
              //         {
              //           ...objectValidateForm.UserId,
              //           arrayDuplicate: listFunctionUserId || [],
              //           authCodeOld:
              //             typeModal !== "add"
              //               ? objectEdit.UserId.toLowerCase()
              //               : null,
              //         },
              //         t
              //       );
              //     },
              //   },
              // ]}
            >
              <Input disabled={typeModal === "edit"} />
            </Form.Item>
          </div>
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
                      {
                        ...objectValidateForm.UserName,
                        arrayDuplicate: listFunctionUserName || [],
                        authCodeOld:
                          typeModal !== "add"
                            ? objectEdit.UserName.toLowerCase()
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
              <span>{t("DeviceId")}</span>
              {/* <span style={{ paddingLeft: "3px", color: "red" }}>*</span> */}
            </div>
            <Form.Item
              name="Device_ID"
              // rules={[
              //   {
              //     validator(rule, value) {
              //       return handleValidateFrom(
              //         rule,
              //         value,
              //         objectValidateForm.DevideId,
              //         t
              //       );
              //     },
              //   },
              // ]}
            >
              <Input disabled={typeModal === "edit"} />
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
            {typeModal === "edit" ? (
              <Form.Item name="PasswordUser">
                <Input.Password />
              </Form.Item>
            ) : (
              <Form.Item
                name="PasswordUser"
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
            )}
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
            <Form.Item name="Active" valuePropName="checked">
              <Switch
                checkedChildren={t("ACTIVE")}
                unCheckedChildren={t("DEACTIVE")}
              />
            </Form.Item>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
            <Form.Item name="Enabled" valuePropName="checked">
              <Switch
                checkedChildren={t("ENABLE")}
                unCheckedChildren={t("DISABLE")}
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default ModalUserManagement;
