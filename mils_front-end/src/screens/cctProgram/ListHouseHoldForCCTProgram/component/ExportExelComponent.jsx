import { Col, message, Modal, Row, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import houseHoldApi from "../../../../api/houseHoldApi";
import downloadFileExcelApi from "../../../../api/downloadFileExcelApi";
import { saveAs } from "file-saver";

function ExportExcelComponent(props) {
  const { visible, setVisible, statusArray = [], dataLanguage } = props;
  const [isLoading, setLoading] = useState(false);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [village, setVillage] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [status, setStatus] = useState("-1");
  const [isLocked, setLocked] = useState("-1");
  const { t } = useTranslation();
  const { Option } = Select;
  const { Text } = Typography;

  useEffect(() => {
    setStatus("-1");
    setLocked("-1");
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedVillage("");
  }, [visible]);

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

  const onExportFile = async () => {
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
      await downloadFileExcelApi
        .ExportHHCCTConfirm({
          id: location,
          status: status,
          isLocked: isLocked,
        })
        .then((res) => {
          fetch(
            `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${res.data}`
          )
            .then((res) => {
              return res.blob();
            })
            .then((blobs) => {
              const fileExtension = ".xlsx";
              saveAs(blobs, `${t("HouseHouseCCTProgram")}` + fileExtension);
            });
        });
      setLoading(false);
      setVisible(false);
    }
  };

  return (
    <Modal
      title="Export file CCT Program has confirm"
      visible={visible}
      width="900px"
      okButtonProps={{
        form: "form-add-service",
        key: "submit",
        htmlType: "submit",
        type: "primary",
      }}
      onCancel={() => {
        setVisible(false);
      }}
      onOk={onExportFile}
      okText="Export"
      cancelText={t("cancel")}
      cancelButtonProps={{
        type: "default",
      }}
      confirmLoading={isLoading}
      forceRender
    >
      <p className="font-16 font-weight-500">
        You position and status you want export
      </p>
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
        <Col md={12} span={24}>
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
        <Col md={12} span={24}>
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
        <Col md={12} span={24}>
          <Text>{t("STATUS")}</Text>
          <Select
            className="w-100"
            value={status}
            onChange={(value) => {
              setStatus(value);
            }}
          >
            <Option value={"-1"}>{t("ALL")}</Option>
            {statusArray.map((value, index) => (
              <Option value={value.Id} key={index}>
                {dataLanguage === "la" ? value.ValueOfLao : value.ValueOfEng}
              </Option>
            ))}
          </Select>
        </Col>
        <Col md={12} span={24}>
          <Text>{t("LOCKED")}</Text>
          <Select
            className="w-100"
            value={isLocked}
            onChange={(value) => {
              setLocked(value);
            }}
          >
            <Option value={"-1"}>{t("ALL")}</Option>
            <Option value={"1"}>{t("LOCKED")}</Option>
            <Option value={"2"}>{t("UNLOCKED")}</Option>
          </Select>
        </Col>
      </Row>
    </Modal>
  );
}

export default ExportExcelComponent;
