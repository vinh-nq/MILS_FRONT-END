import {Col, Form, Row, Typography, Select, InputNumber} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

function ShelterComponent(props) {
    const {Text} = Typography;
    const {t} = useTranslation();
    const {Option} = Select;

    return (
        <>
            <Row className="mb-2" gutter={16}>
                <Col span={24}>
                    <Text className="font-13 font-weight-500">{t("TOTAL_ROOMS")}</Text>
                    <Form.Item
                        name="TotalRooms"
                        className="mb-0"
                    >
                        <InputNumber className="w-100" defaultValue={1} min={1} max={100}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("WALL_MATERIAL")}</Text>
                    <Form.Item
                        name="WallMaterialId"
                        className="mb-0"
                        initialValue={1}
                    >
                        <Select>
                            <Option value={1}>Brick/block</Option>
                            <Option value={2}>Concrete</Option>
                            <Option value={3}>Unbaked brick</Option>
                            <Option value={4}>Wood</Option>
                            <Option value={5}>Bamboo</Option>
                            <Option value={6}>Tin</Option>
                            <Option value={7}>Mud</Option>
                            <Option value={8}>Others</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("FLOOR_MATERIAL")}</Text>
                    <Form.Item
                        name="FloorMaterialId"
                        className="mb-0"
                        initialValue={1}
                    >
                        <Select>
                            <Option value={1}>Marble/Ceramic</Option>
                            <Option value={2}>Floor tile Cement</Option>
                            <Option value={3}>Concrete/brick</Option>
                            <Option value={4}>Wood</Option>
                            <Option value={5}>Bamboo</Option>
                            <Option value={6}>Earth/Clay</Option>
                            <Option value={7}>Others</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row className="mb-2" gutter={16}>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("ROOF_MATERIAL")}</Text>
                    <Form.Item
                        name="RoofMaterialId"
                        className="mb-0"
                        initialValue={1}
                    >
                        <Select>
                            <Option value={1}>Concrete</Option>
                            <Option value={2}>Wood</Option>
                            <Option value={3}>Metal sheet/Zinc</Option>
                            <Option value={4}>Tile</Option>
                            <Option value={5}>Grass</Option>
                            <Option value={6}>Leaves</Option>
                            <Option value={7}>Others</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} md={12}>
                    <Text className="font-13 font-weight-500">{t("AREA_MATERIAL")}</Text>
                    <Form.Item
                        name="AreaMaterialId"
                        className="mb-0"
                        initialValue={1}
                    >
                        <Select>
                            <Option value={1}>No Risk area</Option>
                            <Option value={2}>River bank/landslide </Option>
                            <Option value={3}>Dangerous road</Option>
                            <Option value={4}>Risky for flood</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}

export default ShelterComponent;