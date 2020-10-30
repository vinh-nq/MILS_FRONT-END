import {Modal, Table} from "antd";
import React from "react";
import {columnsTablePlotLand} from "../tableObject";


function PlotLandList(props) {
    const {visiblePlotLand, setVisiblePlotLand} = props;

    const columns = columnsTablePlotLand;
    const data = [
        {
            key: '1',
            index: "1",
            nameOfPlot: 'Longcudailongthong',
            noOfPlot: "01",
            ownedOrLeased: "4.Son,Daughter",
            kindOfLand: '1.Arable land for temporary crops',
            causeOfPlot: "land for temporary crops",
            typeOfLand: "3.Both wet and",
        },
        {
            key: '2',
            index: "2",
            nameOfPlot: 'Longcudailongthong',
            noOfPlot: "02",
            ownedOrLeased: "4.Son,Daughter",
            kindOfLand: '1.Arable land for temporary crops',
            causeOfPlot: "land for temporary crops",
            typeOfLand: "3.Both wet and",
        },
        {
            key: '3',
            index: "3",
            nameOfPlot: 'Longcudailongthong',
            noOfPlot: "03",
            ownedOrLeased: "4.Son,Daughter",
            kindOfLand: '1.Arable land for temporary crops',
            causeOfPlot: "land for temporary crops",
            typeOfLand: "3.Both wet and",
        },
    ];
    return (
        <Modal
            title="Household Member List"
            visible={visiblePlotLand}
            onOk={() => {
            }}
            onCancel={() => {
                setVisiblePlotLand(false)
            }}
            width= {"80%"}
            footer={null}
        >
        <Table
            columns={columns}
            dataSource={data}
            pagination={{hideOnSinglePage: true}}
            style={{overflow: "auto"}}
        />
        </Modal>
    )
}

export default PlotLandList;