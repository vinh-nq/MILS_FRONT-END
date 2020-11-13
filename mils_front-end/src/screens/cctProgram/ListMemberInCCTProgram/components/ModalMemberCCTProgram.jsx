import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Form, Switch, message, DatePicker } from "antd";
import houseHoldApi from "../../../../api/houseHoldApi";
import { PATH } from "../../../../routers/Path";
import Cookies from "universal-cookie";
import moment from "moment";
import { useHistory } from "react-router-dom";

function ModalMemberCCTProgram(props) {
  const { visible, setVisible, objectEdit } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    form.setFieldsValue({
      ...objectEdit,
      expire_date: objectEdit.expire_date
        ? moment(objectEdit.expire_date)
        : null,
    });
  }, [visible, form, objectEdit]);

  const handleCanncel = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleEditItem = async (value) => {
    await houseHoldApi
      .UpdateCCTMember(
        value,
        `Update Information Member : [${objectEdit.card_number}] ${objectEdit.cct_member_name}`
      )
      .then((res) => {
        handleCanncel();
        message.success({
          content: t("EDIT_SUCCESS"),
          key: "message-form-member",
          duration: 1,
        });
        history.push(
          `${PATH.LIST_OF_CCT_MEMBER}?keyword=${objectEdit.card_number}`
        );
      })
      .catch((error) =>
        message.error({
          content: (error || {}).message || t("Error"),
          key: "message-form-member",
          duration: 1,
        })
      );
  };

  const handleSubmit = (valueForm) => {
    let cookies = new Cookies();
    cookies = cookies.get("user");
    message.loading({ content: "Loading...", key: "message-form-member" });
    handleEditItem({
      cct_member_id: objectEdit.cct_member_id,
      cct_member_name: objectEdit.cct_member_name,
      cct_hh_member_id: objectEdit.cct_hh_member_id,
      created_date: objectEdit.created_date,
      expire_date: valueForm.expire_date.format("YYYY-MM-DD HH:mm"),
      type_of_card: objectEdit.type_of_card,
      active: valueForm.active,
      number_of_uses: objectEdit.number_of_uses,
      hh_code: objectEdit.hh_code,
      card_number: objectEdit.card_number,
      user_create_id: objectEdit.user_create_id,
      modified_date: moment().format("YYYY-MM-DD HH:mm"),
      user_modified_id: cookies.userId,
      have_card: objectEdit.have_card,
    });
  };

  const disabledDate = (current) => {
    return current < moment();
  };

  return (
    <Modal
      title={`${t("edit")} ${t("Member In CCT Program")}`}
      visible={visible}
      width="630px"
      okButtonProps={{
        form: "form-edit-member-management",
        key: "submit",
        htmlType: "submit",
        type: "primary",
      }}
      onCancel={handleCanncel}
      okText={`${t("update")}`}
      cancelText={t("cancel")}
      cancelButtonProps={{
        type: "default",
      }}
      forceRender
    >
      <Form
        id="form-edit-member-management"
        form={form}
        onFinish={handleSubmit}
      >
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-sm-6 col-12 mb-3">
            <span style={{ fontSize: "13px", fontWeight: "600" }}>
              {t("ID")} :{" "}
            </span>
            <span>{objectEdit.cct_member_id}</span>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-6 col-12 mb-3">
            <span style={{ fontSize: "13px", fontWeight: "600" }}>
              {t("card_number")} :{" "}
            </span>
            <span>{objectEdit.card_number}</span>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-6 col-12 mb-3">
            <span style={{ fontSize: "13px", fontWeight: "600" }}>
              {t("cct_member_name")} :{" "}
            </span>
            <span>{objectEdit.cct_member_name}</span>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-6 col-12 mb-3">
            <span style={{ fontSize: "13px", fontWeight: "600" }}>
              {t("hh_code")} :{" "}
            </span>
            <span>{objectEdit.hh_code}</span>
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-6 col-12">
            <span style={{ fontSize: "13px", fontWeight: "600" }}>
              {t("created_date")} :{" "}
            </span>
            <DatePicker
              className="ml-1"
              format="DD/MM/YYYY"
              value={moment(objectEdit.created_date)}
              disabled
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-sm-6 col-12 d-flex flex-row">
            <span
              style={{ fontSize: "13px", fontWeight: "600", paddingTop: "6px" }}
            >
              {t("expire_date")} :{" "}
            </span>
            <Form.Item
              name="expire_date"
              className="ml-1"
              rules={[
                {
                  required: true,
                  message: `${t("expire_date")} ${t("is_not_empty")}`,
                },
              ]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                disabledDate={disabledDate}
                inputReadOnly={true}
              />
            </Form.Item>
          </div>
          <div className="col-xl-4 col-lg-4 col-sm-4 col-12 mb-3 d-flex flex-row">
            <span
              style={{ fontSize: "13px", fontWeight: "600", paddingTop: "7px" }}
              className="mr-1"
            >
              {t("active")} :{" "}
            </span>
            <Form.Item name="active" valuePropName="checked">
              <Switch
                checkedChildren={t("ACTIVE MEMBER")}
                unCheckedChildren={t("DEACTIVE MEMBER")}
              />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default ModalMemberCCTProgram;
