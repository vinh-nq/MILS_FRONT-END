import React from "react";
import {Tag} from "antd";

export const columnsTableIndex = [
    {
        title: '#',
        dataIndex: 'index',
        key: 'index',
    },
    {
        title: 'Village',
        dataIndex: 'home',
        key: 'home ',
    },
    {
        title: 'Unit',
        dataIndex: 'serial',
        key: 'serial',
    },
    {
        title: 'HH Level',
        dataIndex: 'familyLevel',
        key: 'familyLevel',
    },
    {
        title: 'Head of HH Name',
        dataIndex: 'headOfFamily',
        key: 'headOfFamily',
    },
    {
        title: 'Number of HH',
        dataIndex: 'familyNumber',
        key: 'familyNumber',
    },
    {
        title: 'Number plots',
        dataIndex: 'landPlot',
        key: 'landPlot',
    },
    {
        title: 'Number pregnant',
        dataIndex: 'theGirlWasTaken',
        key: 'theGirlWasTaken',
    },
    {
        title: 'Number child',
        dataIndex: 'Children',
        key: 'Children',
    }
]

export const columnsTableHHMember = [
    {
        title: '#',
        dataIndex: 'icon',
        key: 'icon',
        render: () => (
           <Tag color="#337AB7"><i className="fas fa-user"></i></Tag>
        )
    },
    {
        title: 'Item',
        dataIndex: 'item',
        key: 'item ',
    },
    {
        title: 'Member Name',
        dataIndex: 'memberName',
        key: 'memberName',
    },
    {
        title: 'Marital status',
        dataIndex: 'maritalStatus',
        key: 'maritalStatus',
    },
    {
        title: 'Relation to household',
        dataIndex: 'relationToHousehold',
        key: 'relationToHousehold',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Date of birth',
        dataIndex: 'DOB',
        key: 'DOB',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Number pregnant',
        dataIndex: 'numberPregnant',
        key: 'numberPregnant',
    }
]

export const columnsTablePlotLand = [
    {
        title: 'Index',
        dataIndex: 'index',
        key: 'index',
    },
    {
        title: 'Name of Plot',
        dataIndex: 'nameOfPlot',
        key: 'nameOfPlot ',
    },
    {
        title: 'No of plot',
        dataIndex: 'noOfPlot',
        key: 'noOfPlot',
    },
    {
        title: 'Owned or leased',
        dataIndex: 'ownedOrLeased',
        key: 'ownedOrLeased',
    },
    {
        title: 'Kind of land',
        dataIndex: 'kindOfLand',
        key: 'kindOfLand',
    },
    {
        title: 'Cause of plot',
        dataIndex: 'causeOfPlot',
        key: 'causeOfPlot',
    },
    {
        title: 'Type of land',
        dataIndex: 'typeOfLand',
        key: 'typeOfLand',
    }
]