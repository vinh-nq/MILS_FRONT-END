import {Col, Form, Row, Typography, Select, InputNumber} from "antd";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import dataDictionaryApi from "../../../../api/dataDictionaryApi";
import {useSelector} from "react-redux";
import {handleValidateFrom} from "../../../../utils/handleValidateFrom";
import {objectValidateForm} from "../validate/objectValidateForm";
import {regexTemplate} from "../../../../utils/regexTemplate";

function ShelterComponent(props) {
    const {Text} = Typography;
    const {t} = useTranslation();
    const {Option} = Select;

    const dataLanguage = useSelector(
        (state) => state.languageReducer.objectLanguage.value
    ) || localStorage.getItem("i18nextLng");

    const [wall, setWall] = useState([]);
    const [roof, setRoof] = useState([]);
    const [floor, setFloor] = useState([]);
    // const [area, setArea] = useState([]);

    useEffect(() => {
        getWallMaterial();
        getRoofMaterial();
        getFloorMaterial();
    },[]);

    const getWallMaterial = async () => {
        await dataDictionaryApi.GetAllWallMaterail({keyword:""}).then(res => {
            setWall(res.data.Data);
        }).catch(error => {

        })
    };

    const getRoofMaterial = async () => {
        await dataDictionaryApi.GetAllRoofMaterail({keyword:""}).then(res => {
            setRoof(res.data.Data);
        }).catch(error => {

        })
    };

    const getFloorMaterial = async () => {
        await dataDictionaryApi.GetAllFloorMaterail({keyword:""}).then(res => {
            setFloor(res.data.Data);
        }).catch(error => {

        })
    };

    // const getAreaMaterial = async () => {
    //     await dataDictionaryApi.GetAll({keyword:""}).then(res => {
    //         setWall(res.data.Data);
    //     }).catch(error => {
    //
    //     })
    // };

    const renderSelect = (array) => {
        return array.map((value,index) => (
            <Option value={value.Id} key={index}>{dataLanguage === "la" ? value.ValueOfLao : value.ValueOfEng}</Option>
        ));
    };

    return (
        <>
            <Row className="mb-2" gutter={16}>
                <Col span={24}>
                    <Text className="font-13 font-weight-500">{t("TOTAL_ROOMS")}</Text>
                    <Form.Item
                        name={["Shelter","TotalRooms"]}
                        className="mb-0"
                        rules={[
                            {
                                validator(rule, value) {
                                    return handleValidateFrom(
                                        rule,
                                        value,
                                        objectValidateForm.checkString(2, true, "TOTAL_ROOMS"),
                                        t
                                    );
                                },
                            },
                            {
                                pattern: regexTemplate.PHONE,
                                message: t("required_phone"),
                            }
                        ]}
                    >
                        <InputNumber className="w-100" min={0} max={100}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("WALL_MATERIAL")}</Text>
                    <Form.Item
                        name={["Shelter","WallMaterialId"]}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `${t("WALL_MATERIAL")} ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select>
                            {renderSelect(wall)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("FLOOR_MATERIAL")}</Text>
                    <Form.Item
                        name={["Shelter","FloorMaterialId"]}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `${t("FLOOR_MATERIAL")} ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select>
                            {renderSelect(floor)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("ROOF_MATERIAL")}</Text>
                    <Form.Item
                        name={["Shelter","RoofMaterialId"]}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `${t("ROOF_MATERIAL")} ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select>
                            {renderSelect(roof)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("AREA_MATERIAL")}</Text>
                    <Form.Item
                        name={["Shelter","AreaMaterialId"]}
                        className="mb-0"
                        rules={[
                            {
                                required: true,
                                message: `${t("AREA_MATERIAL")} ${t("is_not_empty")}`,
                            },
                        ]}
                    >
                        <Select>
                            <Option value={"1"}>No Risk area</Option>
                            <Option value={"2"}>River bank/landslide </Option>
                            <Option value={"3"}>Dangerous road</Option>
                            <Option value={"4"}>Risky for flood</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}

export default ShelterComponent;