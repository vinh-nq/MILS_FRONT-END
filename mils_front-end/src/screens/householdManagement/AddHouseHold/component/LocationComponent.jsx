import React, {useEffect, useState} from "react";
import {Col, Form, Row, Select, Typography} from "antd";
import {handleValidateFrom} from "../../../../utils/handleValidateFrom";
import {objectValidateForm} from "../validate/objectValidateForm";
import {regexTemplate} from "../../../../utils/regexTemplate";
import Input from "antd/es/input";
import houseHoldApi from "../../../../api/houseHoldApi";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

function LocationComponent(props) {
    const {Text} = Typography;
    const {Option} = Select;
    const {t} = useTranslation();
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [village, setVillage] = useState([]);
    const [unit, setUnit] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");
    const [selectedUnit, setSelectedUnit] = useState("");

    const dataLanguage = useSelector(
        (state) => state.languageReducer.objectLanguage.value
    ) || localStorage.getItem("i18nextLng");

    useEffect(() => {
        getProvince();
    }, []);

    const getProvince = async () => {
        await houseHoldApi.getAllProvince().then(res => {
            setProvince(res.data.Data);
        });
    };

    const getDistrict = async (provinceId) => {
        await houseHoldApi.getAllDistrict({provinceId}).then(res => {
            setDistrict(res.data.Data);
        });
    };

    const getVillage = async (districtId) => {
        await houseHoldApi.getAllVillage({districtId}).then((res => setVillage(res.data.Data)));
    };

    const getUnit = async (villageId) => {
        await houseHoldApi.getAllUnit({villageId}).then(res => setUnit(res.data.Data));
    };

    const onSelectProvince = (id) => {
        setSelectedProvince(id);
        getDistrict(id);
        if (id === "-1") {
            setSelectedDistrict("-1");
            setSelectedVillage("-1");
            setSelectedUnit("-1");
            setVillage([]);
            setUnit([]);
        }
    };

    const onSelectDistrict = (id) => {
        setSelectedDistrict(id);
        getVillage(id);
        if (id === "-1") {
            setSelectedVillage("-1");
            setSelectedUnit("-1");
            setUnit([]);
        }
    };

    const onSelectVillage = (id) => {
        setSelectedVillage(id);
        if (id === "-1") {
            setSelectedUnit("-1");
        }
        getUnit(id);
    }

    const renderProvinceSelect = () => {
        return province.map((value, index) => (
            <Option value={value.Id}
                    key={index}
                    onChange={() => {
                        onSelectProvince(value.Id)
                    }}
            >
                {dataLanguage === "la" ? value.ProvinceName : value.ProvinceNameEng}
            </Option>
        ))
    };

    const renderDistrictSelect = () => {
        return district.map((value, index) => (
            <Option value={value.DistrictId}
                    key={index}
            >
                {dataLanguage === "la" ? value.DistrictName : value.DistrictNameEng}
            </Option>
        ))
    };

    const renderVillageSelect = () => {
        return village.map((value, index) => (
            <Option value={value.VillageId}
                    key={index}
            >
                {dataLanguage === "la" ? value.VillageName : (value.VillageNameEng || t("EMPTY"))}
            </Option>
        ))
    };

    const renderUnitSelect = () => {
        return unit.map((value, index) => (
            <Option value={value.UnitId}
                    key={index}
            >
                {dataLanguage === "la" ? value.UnitName : value.UnitNameEng}
            </Option>
        ))
    };

    return (
        <div className="hh-location">
            <Row className="mb-2" gutter={16}>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("PROVINCE")}:</Text>
                    <Form.Item
                        name="ProvinceId"
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `${t("PROVINCE")} ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select className="w-100" value={selectedProvince} onChange={onSelectProvince}>
                            <Option value={""}>
                                {""}
                            </Option>
                            {renderProvinceSelect()}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("DISTRICT")}:</Text>
                    <Form.Item
                        name="DistrictId"
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `${t("DISTRICT")} ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select className="w-100" value={selectedDistrict} onChange={onSelectDistrict}>
                            <Option value={""}>
                                {""}
                            </Option>
                            {renderDistrictSelect()}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("VILLAGE")}:</Text>
                    <Form.Item
                        name="VillageId"
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `${t("VILLAGE")} ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select className="w-100" value={selectedVillage} onChange={onSelectVillage}>
                            <Option value={""}>
                                {""}
                            </Option>
                            {renderVillageSelect()}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("UNIT")}:</Text>
                    <Form.Item
                        name="UnitId"
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `${t("UNIT")} ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select className="w-100" value={selectedUnit}>
                            <Option value={""}>
                                {""}
                            </Option>
                            {renderUnitSelect()}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("HH_NUMBER")}</Text>
                    <Form.Item
                        name="HHNumber"
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(20, true, "HH_NUMBER"),
                                        t
                                    );
                                },
                            },
                            {
                                pattern: regexTemplate.NUMBER,
                                message: t("REQUIRE_NUMBER"),
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("HH_LEVEL")}</Text>
                    <Form.Item
                        name="HHLevel"
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(20, true, "HH_LEVEL"),
                                        t
                                    );
                                },
                            },
                            {
                                pattern: regexTemplate.NUMBER,
                                message: t("REQUIRE_NUMBER"),
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
        </div>
    )
}

export default LocationComponent;