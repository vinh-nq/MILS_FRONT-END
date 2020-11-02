import React from "react";
import {Col, Form, Row, Switch, Typography} from "antd";
import {useTranslation} from "react-i18next";

function InstrumentsForDailyLifeComponent() {
    const {t} = useTranslation();
    const {Text} = Typography;
    return (
        <>
          <Row gutter={16}>
             <Col md={12} span={24}>
                 <ul className="pl-3">
                     <li>
                         <div className="d-flex align-items-center">
                             <Text className="font-weight-500">{t("CARS")}</Text>
                             <Form.Item
                                 name="Cars"
                                 className="mb-0 ml-2"
                                 initialValue={false}
                             >
                                 <Switch
                                     checkedChildren="Yes" unCheckedChildren="No"
                                 />
                             </Form.Item>
                         </div>
                     </li>
                     <li>
                         <div className="d-flex align-items-center">
                             <Text className="font-weight-500">{t("MOTORCYCLES")}</Text>
                             <Form.Item
                                 name="Motorcycles"
                                 className="mb-0 ml-2"
                                 initialValue={false}
                             >
                                 <Switch
                                     checkedChildren="Yes" unCheckedChildren="No"
                                 />
                             </Form.Item>
                         </div>
                     </li>
                     <li>
                         <div className="d-flex align-items-center">
                             <Text className=" font-weight-500">{t("BICYCLE")}</Text>
                             <Form.Item
                                 name="Bicycle"
                                 className="mb-0 ml-2"
                                 initialValue={false}
                             >
                                 <Switch
                                     checkedChildren="Yes" unCheckedChildren="No"
                                 />
                             </Form.Item>
                         </div>
                     </li>
                     <li>
                         <div className="d-flex align-items-center">
                             <Text className=" font-weight-500">{t("TRICYCLE")}</Text>
                             <Form.Item
                                 name="Tricycle"
                                 className="mb-0 ml-2"
                                 initialValue={false}
                             >
                                 <Switch
                                     checkedChildren="Yes" unCheckedChildren="No"
                                 />
                             </Form.Item>
                         </div>
                     </li>
                     <li>
                         <div className="d-flex align-items-center">
                             <Text className=" font-weight-500">{t("BOAT")}</Text>
                             <Form.Item
                                 name="Boat"
                                 className="mb-0 ml-2"
                                 initialValue={false}
                             >
                                 <Switch
                                     checkedChildren="Yes" unCheckedChildren="No"
                                 />
                             </Form.Item>
                         </div>
                     </li>
                     <li>
                         <div className="d-flex align-items-center">
                             <Text className=" font-weight-500">{t("AIR_CONDITIONING")}</Text>
                             <Form.Item
                                 name="AirConditioning"
                                 className="mb-0 ml-2"
                                 initialValue={false}
                             >
                                 <Switch
                                     checkedChildren="Yes" unCheckedChildren="No"
                                 />
                             </Form.Item>
                         </div>
                     </li>
                     <li>
                         <div className="d-flex align-items-center">
                             <Text className=" font-weight-500">{t("REFRIGERATOR")}</Text>
                             <Form.Item
                                 name="Refrigerator"
                                 className="mb-0 ml-2"
                                 initialValue={false}
                             >
                                 <Switch
                                     checkedChildren="Yes" unCheckedChildren="No"
                                 />
                             </Form.Item>
                         </div>
                     </li>
                     <li>
                         <div className="d-flex align-items-center">
                             <Text className=" font-weight-500">{t("WASHING_MACHINE")}</Text>
                             <Form.Item
                                 name="WashingMachine"
                                 className="mb-0 ml-2"
                                 initialValue={false}
                             >
                                 <Switch
                                     checkedChildren="Yes" unCheckedChildren="No"
                                 />
                             </Form.Item>
                         </div>
                     </li>
                 </ul>
             </Col>
              <Col md={12} span={24}>
                  <ul className="pl-3">
                      <li>
                          <div className="d-flex align-items-center">
                              <Text className=" font-weight-500">{t("TV")}</Text>
                              <Form.Item
                                  name="TV"
                                  className="mb-0 ml-2"
                                  initialValue={false}
                              >
                                  <Switch
                                      checkedChildren="Yes" unCheckedChildren="No"
                                  />
                              </Form.Item>
                          </div>
                      </li>
                      <li>
                          <div className="d-flex align-items-center">
                              <Text className=" font-weight-500">{t("DESKTOP_LAPTOP_COMPUTERS")}</Text>
                              <Form.Item
                                  name="DesktopLaptopComputers"
                                  className="mb-0 ml-2"
                                  initialValue={false}
                              >
                                  <Switch
                                      checkedChildren="Yes" unCheckedChildren="No"
                                  />
                              </Form.Item>
                          </div>
                      </li>
                      <li>
                          <div className="d-flex align-items-center">
                              <Text className=" font-weight-500">{t("LANDLINE")}</Text>
                              <Form.Item
                                  name="Landline"
                                  className="mb-0 ml-2"
                                  initialValue={false}
                              >
                                  <Switch
                                      checkedChildren="Yes" unCheckedChildren="No"
                                  />
                              </Form.Item>
                          </div>
                      </li>
                      <li>
                          <div className="d-flex align-items-center">
                              <Text className=" font-weight-500">{t("MOBILE_PHONE")}</Text>
                              <Form.Item
                                  name="MobilePhone"
                                  className="mb-0 ml-2"
                                  initialValue={false}
                              >
                                  <Switch
                                      checkedChildren="Yes" unCheckedChildren="No"
                                  />
                              </Form.Item>
                          </div>
                      </li>
                      <li>
                          <div className="d-flex align-items-center">
                              <Text className=" font-weight-500">{t("TWO_WHEEL_TRACTOR")}</Text>
                              <Form.Item
                                  name="TwowheelTractor"
                                  className="mb-0 ml-2"
                                  initialValue={false}
                              >
                                  <Switch
                                      checkedChildren="Yes" unCheckedChildren="No"
                                  />
                              </Form.Item>
                          </div>
                      </li>
                      <li>
                          <div className="d-flex align-items-center">
                              <Text className=" font-weight-500">{t("FOUR_WHEEL_TRACTOR")}</Text>
                              <Form.Item
                                  name="FourwheelTractor"
                                  className="mb-0 ml-2"
                                  initialValue={false}
                              >
                                  <Switch
                                      checkedChildren="Yes" unCheckedChildren="No"
                                  />
                              </Form.Item>
                          </div>
                      </li>
                      <li>
                          <div className="d-flex align-items-center">
                              <Text className=" font-weight-500">{t("ADEQUATE_AGRICULTURAL_EQUIPMENT")}</Text>
                              <Form.Item
                                  name="AdequateAgriculturalEquipment"
                                  className="mb-0 ml-2"
                                  initialValue={false}
                              >
                                  <Switch
                                      checkedChildren="Yes" unCheckedChildren="No"
                                  />
                              </Form.Item>
                          </div>
                      </li>
                      <li>
                          <div className="d-flex align-items-center">
                              <Text className=" font-weight-500">{t("ADEQUATE_PRODUCTION_LAND")}</Text>
                              <Form.Item
                                  name="AdequateProductionLand"
                                  className="mb-0 ml-2"
                                  initialValue={false}
                              >
                                  <Switch
                                      checkedChildren="Yes" unCheckedChildren="No"
                                  />
                              </Form.Item>
                          </div>
                      </li>
                  </ul>
              </Col>
          </Row>
        </>
    )
}

export default InstrumentsForDailyLifeComponent;