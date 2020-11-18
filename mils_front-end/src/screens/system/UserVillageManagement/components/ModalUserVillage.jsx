import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Form, message, Select } from "antd";
import roleManagementApi from "../../../../api/roleManagementApi";
import dataDictionaryApi from "../../../../api/dataDictionaryApi";
import houseHoldApi from "../../../../api/houseHoldApi";
import userManagementApi from "../../../../api/userManagementApi";
import userVillageApi from "../../../../api/userVillageApi";
import { useSelector } from "react-redux";
import { messageError } from "../../../../components/MessageError";

function ModalUserVillage(props) {
  const {
    visible,
    setVisible,
    typeModal,
    objectEdit,
    fetchDataAllRole,
  } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [listProvince, setListProvince] = useState([]);
  const [listUser, setListUser] = useState([]);
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
          fetchDataUserData(),
          fetchDataProvinceData(),
          fetchDataDistrictData(idProvince),
          fetchDataVillageData(idDistrict),
        ])
          .then(([resUser, resProvince, resDistrict, resVillage]) => {
            setListProvince(resProvince.data.Data);
            if (typeModal === "add") {
              setCheckDisale(false);
              setCheckDisaleVillage(false);
            }
            setListDistrict(resDistrict.data.Data);
            setListVillage(resVillage.data.Data);
            setListUser(resUser.data);
          })
          .catch((error) => {
            messageError({
              content: error,
              duration: 2,
            });
          });
      };
      fetchAllDataEdit(
        objectEdit.village_id.substr(0, 2),
        objectEdit.village_id.substr(0, 4)
      );

      form.setFieldsValue({
        provinceId: objectEdit.village_id.substr(0, 2),
        districtId: objectEdit.village_id.substr(0, 4),
        villageId: objectEdit.village_id,
        userID: objectEdit.user_id,
      });
    } else {
      const fetchAllDataEdit = async () => {
        await Promise.all([fetchDataUserData(), fetchDataProvinceData()])
          .then(([resUser, resProvince]) => {
            setListProvince(resProvince.data.Data);
            setListUser(resUser.data);
          })
          .catch((error) => {
            messageError({
              content: error,
              duration: 2,
            });
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

  const fetchDataUserData = () => {
    return userManagementApi.GetAllUser({
      keyword: null,
    });
  };

  // const fetchDataUser = async () => {
  //   await userManagementApi
  //     .GetAllUser({
  //       keyword: null,
  //     })
  //     .then((res) => {
  //       setListUser(res.data);
  //     });
  // };

  // const fetchDataProvince = async () => {
  //   await dataDictionaryApi
  //     .GetAllProvince({
  //       keyword: null,
  //     })
  //     .then((res) => {
  //       setListProvince(res.data.Data);
  //     });
  // };

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
    await userVillageApi
      .Insert(
        value,
        `Insert Permision For Account ${value.user_id} For Village ${value.village_id}`
      )
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
      .UpdateRole(value)
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
    message.loading({ content: "Loading...", key: "message-form-role" });
    if (typeModal === "add") {
      handleAddNew({
        Id: null,
        user_id: valueForm.userID,
        village_id: valueForm.villageId,
        FullName: null,
        UserName: null,
        villname: null,
        villnameeng: null,
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
      title={`${typeModal === "add" ? t("add") : t("edit")} ${t(
        "USERVILLAGE"
      )}`}
      visible={visible}
      width="630px"
      okButtonProps={{
        form: "form-userVillage-management",
        key: "submit",
        htmlType: "submit",
        type: "primary",
        disabled: typeModal === "edit",
      }}
      onCancel={handleCanncel}
      okText={`${typeModal === "add" ? t("add") : t("update")}`}
      cancelText={t("cancel")}
      cancelButtonProps={{
        type: "default",
      }}
      forceRender
    >
      <Form
        id="form-userVillage-management"
        form={form}
        onFinish={handleSubmit}
      >
        <div>
          <span>{t("UserName")}</span>
          <span style={{ paddingLeft: "3px", color: "red" }}>*</span>
        </div>
        <Form.Item
          name="userID"
          rules={[
            {
              required: true,
              message: `${t("UserName")} ${t("is_not_empty")}`,
            },
          ]}
        >
          <Select placeholder="Select User" disabled={typeModal === "edit"}>
            {listUser.map((el) => (
              <Select.Option value={`${el.UserId}`} key={el.UserId}>
                <div className="d-flex align-items-center flex-row">
                  <div className="mr-4 d-flex" style={{ flex: 1 }}>
                    <span style={{ fontWeight: "600" }}>{t("UserName")} :</span>
                    <span className="ml-1">{el.UserName}</span>
                  </div>
                  <div className="mr-4 d-flex" style={{ flex: 1 }}>
                    <span style={{ fontWeight: "600" }}>{t("FullName")} :</span>
                    <span className="ml-1">{el.FullName}</span>
                  </div>
                </div>
              </Select.Option>
            ))}
          </Select>
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
      </Form>
    </Modal>
  );
}

export default ModalUserVillage;
