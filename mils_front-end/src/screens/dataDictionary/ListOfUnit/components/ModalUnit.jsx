import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Form, message, Select, Input } from "antd";
import dataDictionaryApi from "../../../../api/dataDictionaryApi";
import houseHoldApi from "../../../../api/houseHoldApi";
import { objectValidateForm } from "../validate/objectValidateForm";
import { handleValidateFrom } from "../../../../utils/handleValidateFrom";
import { useSelector } from "react-redux";
import { PATH } from "../../../../routers/Path";
import { useHistory } from "react-router-dom";

function ModalUnit(props) {
  const { visible, setVisible, typeModal, objectEdit } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const history = useHistory();
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listVillage, setListVillage] = useState([]);
  const [checkDisable, setCheckDisale] = useState(true);
  const [checkDisableVillage, setCheckDisaleVillage] = useState(true);

  const [loadingDistrict, setLoadingDistrict] = useState(false);
  const [loadingVillage, setLoadingVillage] = useState(false);

  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    if (typeModal === "edit") {
      setCheckDisale(true);
      setCheckDisaleVillage(true);
      const fetchAllDataEdit = async (idProvince, idDistrict) => {
        await Promise.all([
          fetchDataProvinceData(),
          fetchDataDistrictData(idProvince),
          fetchDataVillageData(idDistrict),
        ]).then(([resProvince, resDistrict, resVillage]) => {
          setListProvince(resProvince.data.Data);
          if (typeModal === "add") {
            setCheckDisale(false);
            setCheckDisaleVillage(false);
          }
          setListDistrict(resDistrict.data.Data);
          setListVillage(resVillage.data.Data);
        });
      };
      fetchAllDataEdit(
        objectEdit.VillageId.substr(0, 2),
        objectEdit.VillageId.substr(0, 4)
      );

      form.setFieldsValue({
        ...objectEdit,
        provinceId: objectEdit.VillageId.substr(0, 2),
        districtId: objectEdit.VillageId.substr(0, 4),
        villageId: objectEdit.VillageId,
      });
    } else {
      const fetchAllDataEdit = async () => {
        await Promise.all([fetchDataProvinceData()]).then(([resProvince]) => {
          setListProvince(resProvince.data.Data);
        });
      };
      fetchAllDataEdit();
      setCheckDisale(true);
      setCheckDisaleVillage(true);
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

  const fetchDataVillageData = (districtId) => {
    setListVillage([]);
    return houseHoldApi.getAllVillage({
      districtId: districtId,
    });
  };

  const fetchDataDistrict = async (idProvince) => {
    // setListDistrict([]);
    setLoadingDistrict(true);
    await houseHoldApi
      .getAllDistrict({
        provinceId: idProvince,
      })
      .then((res) => {
        if (typeModal === "add") {
          setCheckDisale(false);
        }
        setLoadingDistrict(false);
        setListDistrict(res.data.Data);
      });
  };

  const fetchDataVillage = async (idDistrict) => {
    setListVillage([]);
    setLoadingVillage(true);
    await houseHoldApi
      .getAllVillage({
        districtId: idDistrict,
      })
      .then((res) => {
        if (typeModal === "add") {
          setCheckDisaleVillage(false);
        }
        setLoadingVillage(false);
        setListVillage(res.data.Data);
      });
  };

  const handleCanncel = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleAddNew = async (value) => {
    await dataDictionaryApi
      .InsertUnit(
        value,
        `Insert Unit [${value.UnitId}]-${value.UnitNameEng} For Village ${value.VillageId}`
      )
      .then((res) => {
        handleCanncel();
        message.success({
          content: t("ADD_SUCCESS"),
          key: "message-form-unit",
          duration: 1,
        });
        history.push(
          `${PATH.LIST_OF_UNIT}?keyword=${value.VillageId}${value.UnitName}&page=1`
        );
      })
      .catch((error) =>
        message.error({
          content: t("Error"),
          key: "message-form-unit",
          duration: 1,
        })
      );
  };

  const handleSubmit = (valueForm) => {
    message.loading({ content: "Loading...", key: "message-form-role" });
    if (typeModal === "add") {
      handleAddNew({
        UnitId: null,
        VillageId: valueForm.villageId,
        UnitName: valueForm.UnitName,
        UnitNameEng: valueForm.UnitNameEng,
      });
    }
  };

  return (
    <Modal
      title={`${typeModal === "add" ? t("add") : t("edit")} ${t("UNIT")}`}
      visible={visible}
      width="630px"
      okButtonProps={{
        form: "form-unit-management",
        key: "submit",
        htmlType: "submit",
        type: "primary",
        disabled: typeModal === "edit",
        style:
          typeModal === "add"
            ? null
            : {
                display: "none",
              },
      }}
      onCancel={handleCanncel}
      okText={`${typeModal === "add" ? t("add") : t("update")}`}
      cancelText={t("cancel")}
      cancelButtonProps={{
        type: "default",
      }}
      forceRender
    >
      <Form id="form-unit-management" form={form} onFinish={handleSubmit}>
        {typeModal === "add" ? null : (
          <>
            <div>
              <span>{t("UnitId")}</span>
              <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
            </div>
            <Form.Item name="UnitId">
              <Input disabled={true} />
            </Form.Item>
          </>
        )}
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
                villageId: null,
              });
              setCheckDisale(true);
              setCheckDisaleVillage(true);
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
          <Select
            placeholder="Select district"
            disabled={checkDisable}
            onSelect={(value) => {
              form.setFieldsValue({
                villageId: null,
              });
              setCheckDisaleVillage(true);
              fetchDataVillage(value);
            }}
            loading={loadingDistrict}
          >
            {listDistrict.map((el) => (
              <Select.Option value={el.DistrictId} key={el.DistrictId}>
                {dataLanguage === "la" ? el.DistrictName : el.DistrictNameEng}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div>
          <span>{t("villageId")}</span>
          <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </div>
        <Form.Item
          name="villageId"
          rules={[
            {
              required: true,
              message: `${t("Village")} ${t("is_not_empty")}`,
            },
          ]}
        >
          <Select
            placeholder="Select village"
            disabled={checkDisableVillage}
            loading={loadingVillage}
          >
            {listVillage.map((el) => (
              <Select.Option value={el.VillageId} key={el.VillageId}>
                {listVillage === "la" ? el.VillageName : el.VillageNameEng}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div>
          <span>{t("UnitName")}</span>
          <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </div>
        <Form.Item
          name="UnitName"
          rules={[
            {
              validator(rule, value) {
                return handleValidateFrom(
                  rule,
                  value,
                  objectValidateForm.UnitName,
                  t
                );
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div>
          <span>{t("UnitNameEng")}</span>
          <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </div>
        <Form.Item
          name="UnitNameEng"
          rules={[
            {
              validator(rule, value) {
                return handleValidateFrom(
                  rule,
                  value,
                  objectValidateForm.UnitNameEng,
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

export default ModalUnit;
