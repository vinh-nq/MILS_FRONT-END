import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row, Select, Typography} from "antd";
import {useTranslation} from "react-i18next";
import SaveFilled from "@ant-design/icons/lib/icons/SaveFilled";
import houseHoldApi from "../../../api/houseHoldApi";
import {useSelector} from "react-redux";

function AddBeneficiaryForm(props) {
    //state Province, district, village, unit
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [village, setVillage] = useState([]);
    const [unit, setUnit] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");
    const [selectedUnit, setSelectedUnit] = useState("");

    const {t} = useTranslation();
    const {Option} = Select;
    const {Text} = Typography;
    const [form] = Form.useForm();

    const dataLanguage = useSelector(
        (state) => state.languageReducer.objectLanguage.value
    ) || localStorage.getItem("i18nextLng");


    useEffect(() => {
        getProvince();
    }, []);

    const getProvince = async () => {
        await houseHoldApi.getAllProvince().then(res => {
            setProvince(res.data);
        });
    };

    const getDistrict = async (provinceId) => {
        await houseHoldApi.getAllDistrict({provinceId}).then(res => {
            setDistrict(res.data);
        });
    };

    const getVillage = async (districtId) => {
        await houseHoldApi.getAllVillage({districtId}).then((res => setVillage(res.data)));
    };

    const getUnit = async (villageId) => {
        await houseHoldApi.getAllUnit({villageId}).then(res => setUnit(res.data));
    };

    const onSelectProvince = (id) => {
        setSelectedProvince(id);
        getDistrict(id);
        if(id === "-1"){
            setSelectedDistrict("-1");
            setSelectedVillage("-1");
            setSelectedUnit("-1");
        }
        setVillage([]);
        setUnit([]);

    };

    const onSelectDistrict = (id) => {
        setSelectedDistrict(id);
        getVillage(id)
        if(id === "-1"){
            setSelectedVillage("-1");
            setSelectedUnit("-1");
        }
        setUnit([]);
    };

    const onSelectVillage = (id) => {
        setSelectedVillage(id);
        if(id === "-1"){
            setSelectedUnit("-1");
        }
        getUnit(id)
    };

    const onSelectUnit = (id) => {
        setSelectedUnit(id);
    };

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
    <div className="add-beneficiary-form">
        {/*Header and title*/}
        <section className="border-bottom mb-3">
            <div className="d-flex align-items-center mb-3">
                <span className="h5 mb-0">Add Beneficiary Form</span>
                <span className="ml-auto">
                    <Button
                        className="set-center-content"
                        type="primary"
                        icon={<SaveFilled className="font-16"/>}
                    />
                </span>
            </div>
        </section>

         {/*Content*/}
        <Form form={form} name="control-hooks">
         <section>
             <div className="mb-3 p-2 bg-primary text-white font-16 font-weight-500">
                 I. Location
             </div>
             <div className="hh-location">
                 <Row className="mb-2" gutter={16}>
                     <Col span={12}>
                         <Text className="font-13">{t("PROVINCE")}:</Text>
                         <Select className="w-100" value={selectedProvince} onChange={onSelectProvince}>
                             <Option value={""}>
                                 {""}
                             </Option>
                             {renderProvinceSelect()}
                         </Select>
                     </Col>
                     <Col span={12}>
                         <Text className="font-13">{t("DISTRICT")}:</Text>
                         <Select className="w-100" value={selectedDistrict} onChange={onSelectDistrict}>
                             <Option value={""}>
                                 {""}
                             </Option>
                             {renderDistrictSelect()}
                         </Select>
                     </Col>
                 </Row>
                 <Row className="mb-2" gutter={16}>
                     <Col span={12}>
                         <Text className="font-13">{t("VILLAGE")}:</Text>
                         <Select className="w-100" value={selectedVillage} onChange={onSelectProvince}>
                             <Option value={""}>
                                 {""}
                             </Option>
                             {renderVillageSelect()}
                         </Select>
                     </Col>
                     <Col span={12}>
                         <Text className="font-13">{t("UNIT")}:</Text>
                         <Select className="w-100" value={selectedUnit} onChange={onSelectDistrict}>
                             <Option value={""}>
                                 {""}
                             </Option>
                             {renderUnitSelect()}
                         </Select>
                     </Col>
                 </Row>
                 <Row className="mb-" gutter={16}>
                     <Col span={12}>
                         <Text className="font-13">HH Number</Text>
                         <Select className="w-100" value={selectedVillage} onChange={onSelectProvince}>
                             <Option value={""}>
                                 {""}
                             </Option>
                             {renderVillageSelect()}
                         </Select>
                     </Col>
                     <Col span={12}>
                         <Text className="font-13">{t("UNIT")}</Text>
                         <Select className="w-100" value={selectedUnit} onChange={onSelectDistrict}>
                             <Option value={""}>
                                 {""}
                             </Option>
                             {renderUnitSelect()}
                         </Select>
                     </Col>
                 </Row>
             </div>
         </section>
        </Form>
    </div>
    )
}

export default AddBeneficiaryForm;