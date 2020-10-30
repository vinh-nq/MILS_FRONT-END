import React, {useEffect, useState} from "react";
import {Button, Modal, Table, Tooltip} from "antd";
import {columnsTableHHMember} from "../tableObject";
import HHMemberInfoDetail from "./HHMemberInfoDetail";

function HouseHoldMemberList(props) {
    const {visibleMemberList, setVisibleMemberList} = props;
    const [showDetailMember, setShowDetailMember] = useState(false);
    useEffect(() => {
        setShowDetailMember(false);
    }, [visibleMemberList]);

    const columns = [...columnsTableHHMember, {
        title: 'View Detail',
        key: 'view',
        align: "center",
        dataIndex: 'view',
        render: () => (
            <div className="d-flex justify-content-center">
                <Tooltip placement="topLeft" title={"Member in family"}>
                    <Button type="primary" className="set-center-content mr-1" size="small" onClick={() => {
                        setShowDetailMember(true)
                    }}>
                        <i className="fas fa-info-circle"></i>
                    </Button>
                </Tooltip>
            </div>
        ),
    }];
    const data = [
        {
            key: '1',
            item: '01',
            memberName: "Longcudailongthong",
            maritalStatus: "Married",
            relationToHousehold: '4.Son,Daughter',
            gender: "Male",
            DOB: "21-10-1996",
            age: "24",
            numberPregnant: "No",
        },
        {
            key: '2',
            item: '01',
            memberName: "Longcudailongthong",
            maritalStatus: "Married",
            relationToHousehold: '4.Son,Daughter',
            gender: "Male",
            DOB: "21-10-1996",
            age: "24",
            numberPregnant: "No",
        },
        {
            key: '3',
            item: '01',
            memberName: "Longcudailongthong",
            maritalStatus: "Married",
            relationToHousehold: '4.Son,Daughter',
            gender: "Male",
            DOB: "21-10-1996",
            age: "24",
            numberPregnant: "1",
        },
    ];

    return (
        <Modal
            title="Household Member List"
            visible={visibleMemberList}
            onOk={() => {
            }}
            onCancel={() => {
                setVisibleMemberList(false)
            }}
            width={showDetailMember ? "800px" : "80%"}
        >
            {
                showDetailMember ? <HHMemberInfoDetail setShowDetailMember={setShowDetailMember}/> :
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={{hideOnSinglePage: true}}
                        style={{overflow: "auto"}}
                    />
            }
        </Modal>
    )
}

export default HouseHoldMemberList;