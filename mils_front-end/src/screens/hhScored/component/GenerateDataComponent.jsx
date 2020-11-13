import { Col, message, Modal, Row, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CCTProgramApi from "../../../api/CCTProgramApi";
import houseHoldApi from "../../../api/houseHoldApi";

function GenerateDataComponent(props) {
  const { visible, setVisible, reloadData, dataLanguage } = props;
  const [isLoading, setLoading] = useState(false);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [village, setVillage] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");

  const { t } = useTranslation();
  const { Option } = Select;
  const { Text } = Typography;

  useEffect(() => {
    const getAllProvince = async () => {
      await houseHoldApi.getAllProvince().then((res) => {
        if (res.data.Status) {
          setProvince(res.data.Data);
        } else {
          message.error({
            content: t("FETCH_DATA_FAILED"),
            key: "message-form-role",
            duration: 1,
          });
        }
      });
    };
    getAllProvince();
  }, [t]);

  const getAllDistrict = (provinceId) => {
    houseHoldApi.getAllDistrict({ provinceId }).then((res) => {
      if (res.data.Status) {
        // console.log("generate", res.data.Data);
        setDistrict(res.data.Data);
      } else {
        message.error({
          content: t("FETCH_DATA_FAILED"),
          key: "message-form-role",
          duration: 1,
        });
      }
    });
  };

  const getAllVillage = (districtId) => {
    houseHoldApi.getAllVillage({ districtId }).then((res) => {
      if (res.data.Status) {
        setVillage(res.data.Data);
      } else {
        message.error({
          content: t("FETCH_DATA_FAILED"),
          key: "message-form-role",
          duration: 1,
        });
      }
    });
  };

  const onSelectProvince = (id) => {
    getAllDistrict(id);
    setSelectedProvince(id);
    setSelectedDistrict("");
    setSelectedVillage("");
  };

  const onDistrictSelect = (id) => {
    getAllVillage(id);
    setSelectedDistrict(id);
    setSelectedVillage("");
  };

  const onGenerate = async () => {
    let location = "";
    let error = true;
    if (!selectedProvince) {
      message.error({
        content: t("PROVINCE_EMPTY"),
        key: "message-form-role",
        duration: 1,
      });
    }

    if (selectedVillage) {
      error = false;
      location = selectedVillage;
    } else if (selectedDistrict) {
      error = false;
      location = selectedDistrict;
    } else if (selectedProvince) {
      error = false;
      location = selectedProvince;
    }
    if (!error) {
      setLoading(true);
      await CCTProgramApi.GenPMTScored({
        id: location,
      }).then((res) => {
        if (res.data.Status) {
          reloadData(res.data.Data);
        } else {
          message.error({
            content: t("FETCH_DATA_FAILED"),
            key: "message-form-role",
            duration: 1,
          });
        }
      });
      setLoading(false);
      setVisible(false);
    }
  };

  return (
    <Modal
      title="Generate new data"
      visible={visible}
      width="400px"
      okButtonProps={{
        form: "form-add-service",
        key: "submit",
        htmlType: "submit",
        type: "primary",
      }}
      onCancel={() => {
        setVisible(false);
      }}
      onOk={onGenerate}
      okText="Generate"
      cancelText={t("cancel")}
      cancelButtonProps={{
        type: "default",
      }}
      bodyStyle={{
        paddingTop: 8,
        paddingBottom: 0,
      }}
      confirmLoading={isLoading}
      forceRender
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Text>{t("PROVINCE")}</Text>
          <Select
            className="w-100"
            value={selectedProvince}
            onChange={(value) => {
              onSelectProvince(value);
            }}
          >
            {province.map((value, index) => (
              <Option value={value.Id} key={index}>
                {dataLanguage === "la"
                  ? value.ProvinceName
                  : value.ProvinceNameEng}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={24}>
          <Text>{t("DISTRICT")}</Text>
          <Select
            className="w-100"
            value={selectedDistrict}
            onChange={(id) => {
              onDistrictSelect(id);
            }}
          >
            <Option value={""}>{""}</Option>
            {district.map((value, index) => (
              <Option value={value.DistrictId} key={index}>
                {dataLanguage === "la"
                  ? value.DistrictName
                  : value.DistrictNameEng}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={24}>
          <Text>{t("VILLAGE")}</Text>
          <Select
            className="w-100"
            value={selectedVillage}
            onChange={(value) => {
              setSelectedVillage(value);
            }}
          >
            <Option value={""}>{""}</Option>
            {village.map((value, index) => (
              <Option value={value.VillageId} key={index}>
                {dataLanguage === "la"
                  ? value.VillageName
                  : value.VillageNameEng || t("EMPTY")}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </Modal>
  );
}

export default GenerateDataComponent;
