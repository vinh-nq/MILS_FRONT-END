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
        dataIndex: 'Village',
        key: 'Village ',
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