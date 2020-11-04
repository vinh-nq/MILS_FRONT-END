import {Col, Form, Input, message, Modal, Row, Select, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {handleValidateFrom} from "../../../../../../utils/handleValidateFrom";
import {objectValidateForm} from "../validate/objectValidateForm";
import {useTranslation} from "react-i18next";
import dataDictionaryApi from "../../../../../../api/dataDictionaryApi";
import {useSelector} from "react-redux";
import plotLandApi from "../../../../../../api/plotLandApi";

const defaultObject = {
    "PlotLandId": "",
    "Year": "",
    "HHCode": "",
    "VillageId": "",
    "Unit": "",
    "HHNum": "",
    "HHLevel": "",
    "PlotId": "",
    "NameOfPlot": "",
    "NoOfPlot": "",
    "OwnedOrLeasedId": "",
    "OwnedOrLeased": "",
    "OwnedOrLeasedEng": "",
    "KindOfLandId": "",
    "KindOfLand": "",
    "KindOfLandEng": "",
    "CauseOfPlotId": "",
    "CauseOfPlot": "",
    "CauseOfPlotEng": "",
    "TypeOfLandId": "",
    "TypeOfLand": "",
    "TypeOfLandEng": ""
};

function PlotLandComponent(props) {
    const {typeModal , visible, setVisible, objectValue, HHCode} = props;
    const [ownedLeased, setOwnedLeased] = useState([]);
    const [kindLand, setKindLand] = useState([]);
    const [causePlot, setCausePlot] = useState([]);
    const [typeLand, setTypeLand] = useState([]);

    const {t} = useTranslation();
    const [form] = Form.useForm();
    const {Text} = Typography;
    const {Option} = Select;

    const dataLanguage =
        useSelector((state) => state.languageReducer.objectLanguage.value) ||
        localStorage.getItem("i18nextLng");

    useEffect(() => {
        getOwnedOrLeased();
        getKindOfLand();
        getCauseOfPlot();
        getTypeOfLand();
    }, []);

    useEffect(() => {
        if(typeModal === "UPDATE"){
            console.log(objectValue);
            form.setFieldsValue(objectValue);
        }else{
            form.setFieldsValue(defaultObject);
        }
    }, [visible]);

    const getOwnedOrLeased = async () => {
        await dataDictionaryApi.GetAllPlotStatus({keyword: ""}).then(res => {
            if(res.data.Status){
                setOwnedLeased(res.data.Data);
            }else{
                message.error({
                    content: t("Error"),
                    key: "message-form-role",
                    duration: 1,
                })
            }
        })
    }

    const getKindOfLand = async () => {
        await dataDictionaryApi.GetAllPlotType({keyword: ""}).then(res => {
            if(res.data.Status){
                setKindLand(res.data.Data || []);
            }else{
                message.error({
                    content: t("Error"),
                    key: "message-form-role",
                    duration: 1,
                })
            }
        })
    }

    const getCauseOfPlot = async () => {
        await dataDictionaryApi.GetAllPlotCause({keyword: ""}).then(res => {
            if(res.data.Status){
                setCausePlot(res.data.Data);
            }else{
                message.error({
                    content: t("Error"),
                    key: "message-form-role",
                    duration: 1,
                })
            }
        })
    }

    const getTypeOfLand = async () => {
        await dataDictionaryApi.GetAllLandType({keyword: ""}).then(res => {
            if(res.data.Status){
                setTypeLand(res.data.Data);
            }else{
                message.error({
                    content: t("Error"),
                    key: "message-form-role",
                    duration: 1,
                })
            }
        })
    };

    const handleCloseModal = () => {
        setVisible(false);
        form.resetFields();
    };

    const handleAdd = async (value) => {
        message.loading({ content: "Loading...", key: "message-form-role" });
        const objData = {...defaultObject,...value};
        objData.HHCode = HHCode;
        await plotLandApi.add(objData).then(res => {
            if(res.data.Status){
                message.success({
                    content: t("ADD_SUCCESS"),
                    key: "message-form-role",
                    duration: 1,
                });
            }else{
                message.error({
                    content: t("ADD_FAILED"),
                    key: "message-form-role",
                    duration: 1,
                });
            }
        })
        handleCloseModal();
    };

    const handleUpdate = async (value) => {
        message.loading({ content: "Loading...", key: "message-form-role" });
        const objData = {...objectValue,...value};
        await plotLandApi.update(objData).then(res => {
            if(res.data.Status){
                message.success({
                    content: t("EDIT_SUCCESS"),
                    key: "message-form-role",
                    duration: 1,
                });
            }else{
                message.error({
                    content: t("EDIT_FAILED"),
                    key: "message-form-role",
                    duration: 1,
                });
            }
        })
        handleCloseModal();
    };

    const renderSelect = (array) => {
        return array.map((value,index) => (
            <Option value={value.Id} key={index}>{dataLanguage === "la" ? value.ValueOfLao : value.ValueOfEng}</Option>
        ));
    };

    return (
       <>
           <Modal
               title={`${typeModal === "ADD" ? t("add") : t("edit")} plot land`}
               visible={visible}
               width="800px"
               okButtonProps={{
                   form: "form-add-service",
                   key: "submit",
                   htmlType: "submit",
                   type: "primary",
               }}
               onCancel={handleCloseModal}
               okText={`${typeModal === "ADD" ? t("add") : t("update")}`}
               cancelText={t("cancel")}
               cancelButtonProps={{
                   type: "default",
               }}
               forceRender
           >
               <Form
                   id="form-add-service"
                   form={form}
                   onFinish={typeModal === "ADD" ? handleAdd : handleUpdate}
               >
                   <Row className="mb-2" gutter={16}>
                   {/*    <Col span={24} md={12}>*/}
                   {/*        <Text className="font-13 font-weight-500">Plot Land ID:</Text>*/}
                   {/*        <Form.Item*/}
                   {/*            name={"PlotLandId"}*/}
                   {/*            className="mb-0"*/}
                   {/*            rules={[*/}
                   {/*                {*/}
                   {/*                    validator(rule, value) {*/}
                   {/*                        return handleValidateFrom(*/}
                   {/*                            rule,*/}
                   {/*                            value,*/}
                   {/*                            objectValidateForm.checkString(50, true, "Name of plot"),*/}
                   {/*                            t*/}
                   {/*                        );*/}
                   {/*                    },*/}
                   {/*                },*/}
                   {/*            ]}*/}
                   {/*        >*/}
                   {/*            <Input disabled={typeModal === "UPDATE" ? true : false}/>*/}
                   {/*        </Form.Item>*/}
                   {/*    </Col>*/}
                       <Col span={24}>
                           <Text className="font-13 font-weight-500">Plot ID:</Text>
                           <Form.Item
                               name={"PlotId"}
                               className="mb-0"
                               rules={[
                                   {
                                       validator(rule, value) {
                                           return handleValidateFrom(
                                               rule,
                                               value,
                                               objectValidateForm.checkString(50, true, "Name of plot"),
                                               t
                                           );
                                       },
                                   },
                               ]}
                           >
                               <Input />
                           </Form.Item>
                       </Col>
                   </Row>
                   <Row className="mb-2" gutter={16}>
                       <Col span={24} md={12}>
                           <Text className="font-13 font-weight-500">Name of plot</Text>
                           <Form.Item
                               name={"NameOfPlot"}
                               className="mb-0"
                               rules={[
                                   {
                                       validator(rule, value) {
                                           return handleValidateFrom(
                                               rule,
                                               value,
                                               objectValidateForm.checkString(50, true, "Name of plot"),
                                               t
                                           );
                                       },
                                   },
                               ]}
                           >
                               <Input />
                           </Form.Item>
                       </Col>
                       <Col span={24} md={12}>
                           <Text className="font-13 font-weight-500">No of plot</Text>
                           <Form.Item
                               name={"NoOfPlot"}
                               className="mb-0"
                               rules={[
                                   {
                                       validator(rule, value) {
                                           return handleValidateFrom(
                                               rule,
                                               value,
                                               objectValidateForm.checkNumber(10000, 0, "No of plot",true),
                                               t
                                           );
                                       },
                                   }
                               ]}
                           >
                               <Input/>
                           </Form.Item>
                       </Col>
                   </Row>
                   <Row className="mb-2" gutter={16}>
                       <Col span={24} md={12}>
                           <Text className="font-13 font-weight-500">Owned or leased</Text>
                           <Form.Item
                               name={"OwnedOrLeasedId"}
                               className="mb-0"
                               rules={[
                                   {
                                       required: true,
                                       message: `${t("Owned or leased")} ${t("is_not_empty")}`,
                                   },
                               ]}
                           >
                               <Select>
                                   {renderSelect(ownedLeased)}
                               </Select>
                           </Form.Item>
                       </Col>
                       <Col span={24} md={12}>
                           <Text className="font-13 font-weight-500">Kind of land</Text>
                           <Form.Item
                               name={"KindOfLandId"}
                               className="mb-0"
                               rules={[
                                   {
                                       required: true,
                                       message: `Kind of land ${t("is_not_empty")}`,
                                   },
                               ]}
                           >
                               <Select>
                                   {renderSelect(kindLand)}
                               </Select>
                           </Form.Item>
                       </Col>
                   </Row>
                   <Row className="mb-2" gutter={16}>
                       <Col span={24} md={12}>
                           <Text className="font-13 font-weight-500">Cause of plot</Text>
                           <Form.Item
                               name={"CauseOfPlotId"}
                               className="mb-0"
                               rules={[
                                   {
                                       required: true,
                                       message: `${t("Cause of plot")} ${t("is_not_empty")}`,
                                   },
                               ]}
                           >
                               <Select>
                                   {renderSelect(causePlot)}
                               </Select>
                           </Form.Item>
                       </Col>
                       <Col span={24} md={12}>
                           <Text className="font-13 font-weight-500">Type of land</Text>
                           <Form.Item
                               name={"TypeOfLandId"}
                               className="mb-0"
                               rules={[
                                   {
                                       required: true,
                                       message: `${t("Type of land")} ${t("is_not_empty")}`,
                                   },
                               ]}
                           >
                               <Select>
                                   {renderSelect(typeLand)}
                               </Select>
                           </Form.Item>
                       </Col>
                   </Row>
               </Form>
           </Modal>
       </>
   )
}

export default PlotLandComponent;