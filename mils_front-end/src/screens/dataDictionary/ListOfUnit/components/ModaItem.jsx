import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Form, Input, message, Select } from "antd";
import { objectValidateForm } from "../validate/objectValidateForm";
import { handleValidateFrom } from "../../../../utils/handleValidateFrom";
import dataDictionaryApi from "../../../../api/dataDictionaryApi";
import houseHoldApi from "../../../../api/houseHoldApi";
import { useSelector } from "react-redux";

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
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [checkDisable, setCheckDisale] = useState(true);
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    if (typeModal === "edit") {
      setCheckDisale(true);
      const fetchAllDataEdit = async (idProvince) => {
        await Promise.all([
          fetchDataProvinceData(),
          fetchDataDistrictData(idProvince),
        ]).then(([resProvince, resDistrict]) => {
          setListProvince(resProvince.data.Data);
          if (typeModal === "add") {
            setCheckDisale(false);
          }
          setListDistrict(resDistrict.data.Data);
        });
      };
      fetchAllDataEdit(objectEdit.Id.substr(0, 2));
      form.setFieldsValue({
        ...objectEdit,
        provinceId: objectEdit.Id.substr(0, 2),
        districtId: objectEdit.Id.substr(0, 4),
        Id: objectEdit.Id.substr(4, 7),
      });
    } else {
      fetchDataProvince();
      setCheckDisale(true);
      form.resetFields();
    }
  }, [visible, typeModal, form, objectEdit]);

  const fetchDataProvinceData = () => {
    return dataDictionaryApi.GetAllProvince({
      keyword: null,
    });
  };

  const fetchDataDistrictData = (idProvince) => {
    setListDistrict([]);
    return houseHoldApi.getAllDistrict({
      provinceId: idProvince,
    });
  };

  const fetchDataProvince = async () => {
    await dataDictionaryApi
      .GetAllProvince({
        keyword: null,
      })
      .then((res) => {
        setListProvince(res.data.Data);
      });
  };

  const fetchDataDistrict = async (idProvince) => {
    setListDistrict([]);
    await houseHoldApi
      .getAllDistrict({
        provinceId: idProvince,
      })
      .then((res) => {
        if (typeModal === "add") {
          setCheckDisale(false);
        }
        setListDistrict(res.data.Data);
      });
  };

  const handleCanncel = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleAddNew = async (value) => {
    await dataDictionaryApi
      .InsertVillage(
        value,
        `Insert New Village [${value.Id}] - ${value.ValueOfEng}`
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
          content: t("Error"),
          key: "message-form-role",
          duration: 1,
        })
      );
  };

  const handleEditItem = async (value) => {
    await dataDictionaryApi
      .UpdateVillage(
        value,
        `Update Village [${value.Id}] - ${value.ValueOfEng}`
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
          content: t("Error"),
          key: "message-form-role",
          duration: 1,
        })
      );
  };

  const handleSubmit = (valueForm) => {
    message.loading({ content: "Loading...", key: "message-form-role" });
    if (typeModal === "add") {
      handleAddNew({
        Id: `${valueForm.districtId}${valueForm.Id}`,
        ValueOfLao: valueForm.ValueOfLao,
        ValueOfEng: valueForm.ValueOfEng,
      });
    }
    if (typeModal === "edit") {
      handleEditItem({
        Id: objectEdit.Id,
        ValueOfLao: valueForm.ValueOfLao,
        ValueOfEng: valueForm.ValueOfEng,
      });
    }
  };

  return (
    <Modal
      title={`${typeModal === "add" ? t("add") : t("edit")} ${t("Village")}`}
      visible={visible}
      width="630px"
      okButtonProps={{
        form: "form-village-management",
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
      <Form id="form-village-management" form={form} onFinish={handleSubmit}>
        <div>
          <span>{t("villageId")}</span>
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
                    ...objectValidateForm.villageId,
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
          <span>{t("Province")}</span>
          <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </div>
        <Form.Item
          name="provinceId"
          rules={[
            {
              required: true,
              message: `${t("Province")} ${t("is_not_empty")}`,
            },
          ]}
        >
          <Select
            placeholder="Select province"
            disabled={typeModal === "edit"}
            onSelect={(value) => {
              form.setFieldsValue({
                districtId: null,
              });
              setCheckDisale(true);
              fetchDataDistrict(value);
            }}
          >
            {listProvince.map((el) => (
              <Select.Option value={el.Id} key={el.Id}>
                {dataLanguage === "la" ? el.ValueOfLao : el.ValueOfEng}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div>
          <span>{t("District")}</span>
          <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </div>
        <Form.Item
          name="districtId"
          rules={[
            {
              required: true,
              message: `${t("District")} ${t("is_not_empty")}`,
            },
          ]}
        >
          <Select placeholder="Select district" disabled={checkDisable}>
            {listDistrict.map((el) => (
              <Select.Option value={el.DistrictId} key={el.DistrictId}>
                {dataLanguage === "la" ? el.DistrictName : el.DistrictNameEng}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div>
          <span>{t("villageLa")}</span>
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
                  objectValidateForm.villageLa,
                  t
                );
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div>
          <span>{t("villageEn")}</span>
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
                  objectValidateForm.villageEn,
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
