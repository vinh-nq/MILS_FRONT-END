import React, {useEffect, useState} from "react";
import {Button, Col, Divider, Input, Row, Select, Table, Tooltip, Typography} from "antd";
import PlusSquareOutlined from "@ant-design/icons/lib/icons/PlusSquareOutlined";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import HouseHoldMemberList from "./component/HHMemberList";
import PlotLandList from "./component/PlotLandList";
import houseHoldApi from "../../api/houseHoldApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import {useSelector} from "react-redux";

function ManageAssessment(props) {
    const [visibleMemberList, setVisibleMemberList] = useState(false);
    const [visiblePlotLand, setVisiblePlotLand] = useState(false);
    const [data, setData] = useState([]);
    const [province, setProvince] = useState([]);
    const [dataSelect, setDataSelect] = useState([]);
    const [district, setDistrict] = useState([]);
    const [village, setVillage] = useState([]);
    const [unit, setUnit] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const {Option} = Select;
    const {Text} = Typography;

    //Chuyên đổi ngôn ngữ sang tiếng anh và tiếng lào
    const dataLanguage = useSelector(
        (state) => state.languageReducer.objectLanguage.value
    ) || localStorage.getItem("i18nextLng");

    useEffect(() => {
        setDataSelect(province.map(el => ({
            Id: el.Id,
            text: dataLanguage === "la" ? el.ProvinceName : el.ProvinceNameEng,
        })))
    }, [dataLanguage]);

    useEffect(() => {
        getDataHouseHold();
        getProvince();
    }, []);


    const getDataHouseHold = async () => {
        setLoading(true);
        await houseHoldApi.searchHouseHold({
            provinceId: "-1",
            districtId: "-1",
            villageId: "-1",
            unitId: "-1",
            child: -1,
            pregnant: "-1",
            headName: "",
            currentPage: 1
        }).then(res => {
            console.log(res.data.houseHoldViewModels);
            setData(res.data.houseHoldViewModels);
            setTotalPage(res.TotalPage);
        });
        setLoading(false);
    };

    const getProvince = async () => {
        await houseHoldApi.getAllProvince().then(res => {
            setProvince(res.data);
            setDataSelect(res.data.map(el => ({
                Id: el.Id,
                text: dataLanguage === "la" ? el.ProvinceName : el.ProvinceNameEng,
            })))
        });
    };

    const getDistrict = async (provinceId) => {
        await houseHoldApi.getAllDistrict({provinceId}).then(res => {
            setDistrict(res.data);
        });
        setVillage([]);
        setUnit([]);
    };

    const getVillage = async (districtId) => {
        await houseHoldApi.getAllVillage({districtId}).then((res => setVillage(res.data)));
        setUnit([]);
    };

    const getUnit = async (villageId) => {
        await houseHoldApi.getAllUnit({villageId}).then(res => setUnit(res.data));
    };


    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Village',
            dataIndex: 'Village',
            key: 'Village '
        },
        {
            title: 'Unit',
            dataIndex: 'Unit',
            key: 'Unit',
        },
        {
            title: 'HH Level',
            dataIndex: 'HHLevel',
            key: 'HHLevel',
        },
        {
            title: 'Head of HH Name',
            dataIndex: 'HeadOfHHName',
            key: 'HeadOfHHName',
        },
        {
            title: 'Number of HH',
            dataIndex: 'TotalHHMembers',
            key: 'TotalHHMembers',
        },
        {
            title: 'Number plots',
            dataIndex: 'NumberPlots',
            key: 'NumberPlots',
        },
        {
            title: 'Number pregnant',
            dataIndex: 'NumberPregnant',
            key: 'NumberPregnant',
        },
        {
            title: 'Number child',
            dataIndex: 'NumberChild',
            key: 'NumberChild',
        },
        {
            title: 'Actions',
            key: 'actions',
            align: "center",
            dataIndex: 'actions',
            render: () => (
                <div className="d-flex justify-content-end">
                    <Tooltip placement="topLeft" title={"Member in family"}>
                        <Button type="primary" className="set-center-content mr-1" size="small" onClick={() => {
                            setVisibleMemberList(true)
                        }}>
                            <i className="fas fa-users"></i>
                        </Button>
                    </Tooltip>
                    <Tooltip placement="topLeft" title={"Land plot"}>
                        <Button type="primary" className="set-center-content mr-1" size="small" onClick={() => {
                            setVisiblePlotLand(true)
                        }}>
                            <i className="fas fa-mountain"></i>
                        </Button>
                    </Tooltip>
                    <Tooltip placement="topLeft" title={"Description"}>
                        <Button type="primary" className="set-center-content" size="small">
                            <i className="fas fa-info-circle"></i>
                        </Button>
                    </Tooltip>
                </div>
            ),
        }];

    const onSelectProvince = (id) => {
        getDistrict(id);
    };

    const renderProvinceSelect = () => {
        const language = localStorage.getItem("i18nextLng");
        return province.map((value, index) => (
            <Option value={value.Id}
                    key={index}
                    onChange={() => {
                        onSelectProvince(value.Id)
                    }}
            >
                {language === "la" ? value.ProvinceName : value.ProvinceNameEng}
            </Option>
        ))
    };


    const renderDistrictSelect = () => {

    };
    return (
        <div className="manage-assessment">
            {isLoading ? (
                <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2"/>
            ) : null}
            {/*Header của trang content*/}
            <section className="border-bottom mb-3">
                <div className="d-flex align-items-center mb-3">
                    <span className="h5 mb-0">Poverty Assessment List</span>
                    <span className="ml-auto">
                    <Button
                        className="set-center-content"
                        type="primary"
                        icon={<PlusSquareOutlined className="font-16"/>}
                    />
                </span>
                </div>
            </section>

            {/*Body của trang content*/}
            <section>
                {/*Tìm kiếm */}
                <Row gutter={16}>
                    <Col span={4}>
                        <Text className="font-13">Province</Text>
                        <Select className="w-100" placeholder="Select a province">
                            {dataSelect.map((value, index) => (
                                <Option value={value.Id}
                                        key={index}
                                        // onChange={() => {
                                        //     onSelectProvince(value.Id)
                                        // }}
                                >
                                    {value.text}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Text className="font-13">District</Text>
                        <Select className="w-100" placeholder="Select a district">
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Text className="font-13">Village</Text>
                        <Select className="w-100" placeholder="Select a village">
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Text className="font-13">Unit</Text>
                        <Select className="w-100" placeholder="Select a unit">
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </Col>
                </Row>
                <Row gutter={16} className="mt-2">
                    <Col span={4}>
                        <Text className="font-13">Children</Text>
                        <Select className="w-100" value={""}>
                            <Option value="">All</Option>
                            <Option value={1}>Have children</Option>
                            <Option value={2}>No Children</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Text className="font-13">Pregnant woman</Text>
                        <Select className="w-100" value={""}>
                            <Option value="">All</Option>
                            <Option value={1}>There is a pregnant woman</Option>
                            <Option value={2}>No pregnant woman</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Text className="font-13">Title</Text>
                        <Input placeholder="Search by title"/>
                    </Col>
                    <Col span={4}>
                        <div>
                            <Text className="font-13">Search</Text>
                        </div>
                        <Button type="primary" icon={<SearchOutlined className="ant--icon__middle"/>}>
                            Search
                        </Button>
                    </Col>
                </Row>

                {/*Table*/}
                <Divider orientation="left">Table data</Divider>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        current: Number(page),
                        total: totalPage,
                        onChange: (page) => {
                            setPage(page);
                        },
                        showSizeChanger: false,
                    }}
                    rowKey="Id"
                />
            </section>

            {/*Modal*/}
            <HouseHoldMemberList visibleMemberList={visibleMemberList} setVisibleMemberList={setVisibleMemberList}/>
            <PlotLandList visiblePlotLand={visiblePlotLand} setVisiblePlotLand={setVisiblePlotLand}/>
        </div>
    )
}

export default ManageAssessment;