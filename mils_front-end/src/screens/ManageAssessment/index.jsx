import React from "react";
import {Button, Col, Input, Row, Select, Table, Typography, Tag, Space, Divider, Tooltip} from "antd";
import PlusSquareOutlined from "@ant-design/icons/lib/icons/PlusSquareOutlined";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import {columnsTableIndex} from "./tableObject";
import HouseHoldMemberList from "./component/HHMemberList";
import PlotLandList from "./component/PlotLandList";

function ManageAssessment(props) {
    const [visibleMemberList,setVisibleMemberList] = useState(false);
    const [visiblePlotLand,setVisiblePlotLand] = useState(false);
    const {Option} = Select;
    const {Text} = Typography;

    const columns = [...columnsTableIndex,  {
        title: 'Actions',
        key: 'actions',
        align: "center",
        dataIndex: 'actions',
        render: () => (
            <div className="d-flex justify-content-end">
                <Tooltip placement="topLeft" title={"Member in family"}>
                    <Button type="primary" className="set-center-content mr-1" size="small" onClick={()=>{setVisibleMemberList(true)}}>
                        <i className="fas fa-users"></i>
                    </Button>
                </Tooltip>
                <Tooltip placement="topLeft" title={"Land plot"}>
                    <Button type="primary" className="set-center-content mr-1" size="small" onClick={()=>{setVisiblePlotLand(true)}}>
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

    const data = [
        {
            key: '1',
            index: '1',
            home : 'Houay Nam Yun',
            serial : "01",
            familyLevel : "01",
            headOfFamily: 'New York No. 1 Lake Park',
            familyNumber: "Hello",
            landPlot: "Hello",
            theGirlWasTaken: "Hello",
            Children: "Hello",
        },
        {
            key: '2',
            index: '2',
            home : 'Houay Nam Yun',
            serial : "02",
            familyLevel : "02",
            headOfFamily: 'New York No. 1 Lake Park',
            familyNumber: "Hello",
            landPlot: "Hello",
            theGirlWasTaken: "Hello",
            Children: "Hello",
        },
        {
            key: '3',
            index: '3',
            home : 'Houay Nam Yun',
            serial : "03",
            familyLevel : "03",
            headOfFamily: 'New York No. 1 Lake Park',
            familyNumber: "Hello",
            landPlot: "Hello",
            theGirlWasTaken: "Hello",
            Children: "Hello",
        },
    ];

    return (
        <div className="manage-assessment">
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
                <Row  gutter={16}>
                    <Col span={4}>
                        <Text className="font-13">Province</Text>
                        <Select className="w-100" placeholder="Select a province">
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
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
                <Table columns={columns} dataSource={data} />
            </section>

            {/*Modal*/}
            <HouseHoldMemberList visibleMemberList={visibleMemberList} setVisibleMemberList={setVisibleMemberList}/>
            <PlotLandList visiblePlotLand={visiblePlotLand} setVisiblePlotLand={setVisiblePlotLand}/>
        </div>
    )
}

export default ManageAssessment;