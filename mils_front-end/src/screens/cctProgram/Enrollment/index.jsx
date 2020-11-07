import React, { useEffect, useState } from "react";
import { Transfer, Switch, Table, Tag, Divider, Input } from "antd";
import { PlusSquareOutlined, EditOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import difference from "lodash/difference";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner";
import CCTProgramApi from "../../../api/CCTProgramApi";
import "./styles.scss";
import { useRef } from "react";

export default function Enrollment(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [checkLoading, setCheckLoading] = useState(false);
  const [targetKeys, setTargetKeys] = useState();
  const [pointFrom, setPointFrom] = useState();
  const [pointTo, setPointTo] = useState();
  const [dataHH, setDataHH] = useState([]);
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  useEffect(() => {
    const fetchDataPMT = async () => {
      return await CCTProgramApi.GetPMTScored({}).then((res) => {
        setDataHH(res.data.Data);
      });
    };
    fetchDataPMT();
  }, []);

  // Customize Table Transfer
  const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps} showSelectAll={false}>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === "left" ? leftColumns : rightColumns;

        const rowSelection = {
          getCheckboxProps: (item) => ({
            disabled: listDisabled || item.disabled,
          }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter((item) => !item.disabled)
              .map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ key }, selected) {
            onItemSelect(key, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };

        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            style={{ pointerEvents: listDisabled ? "none" : null }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) return;
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
            rowClassName={(record) => {
              return record.PMTScored > 3000 ? "unavailable" : "available";
            }}
          />
        );
      }}
    </Transfer>
  );

  const leftTableColumns = [
    {
      dataIndex: "title",
      title: "HHCode",
    },
    {
      dataIndex: "description",
      title: "HHHeadName",
    },
    {
      dataIndex: "PMTScored",
      title: "PMTScored",
      sorter: {
        compare: (a, b) => a.PMTScored - b.PMTScored,
      },
      defaultSortOrder: "ascend",
      render: (text) => {
        return text > 3000 ? (
          <Tag color="red">{text}</Tag>
        ) : (
          <Tag color="green">{text}</Tag>
        );
      },
    },
  ];
  const rightTableColumns = [
    {
      dataIndex: "title",
      title: "HHCode",
    },
    {
      dataIndex: "description",
      title: "HHHeadName",
    },
    {
      dataIndex: "PMTScored",
      title: "PMTScored",
      sorter: {
        compare: (a, b) => a.PMTScored - b.PMTScored,
      },
      defaultSortOrder: "ascend",
      render: (text) => {
        return text > 3000 ? (
          <Tag color="red">{text}</Tag>
        ) : (
          <Tag color="green">{text}</Tag>
        );
      },
    },
  ];

  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <div className="w-100 h-100">
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="h5 mb-0">{t("EROLLMENT")}</span>
      </div>
      <Divider />
      <div className="mb-2">
        <span className="mb-2" style={{ fontWeight: "600" }}>
          Số điểm PMT hệ thống :
        </span>
        <span className="mb-2 ml-1">1000</span>
      </div>
      <div className="mb-2">
        <span className="mb-2" style={{ fontWeight: "600" }}>
          Filter By Ponit From
        </span>
        <Input
          style={{ width: "60px" }}
          className="ml-1"
          onChange={(e) => {
            setPointFrom(e.target.value);
          }}
        />
        <span className="mb-1 ml-1" style={{ fontWeight: "400" }}>
          (Point)
        </span>
        <span className="mb-1 ml-1" style={{ fontWeight: "600" }}>
          To
        </span>
        <Input style={{ width: "60px" }} className="ml-1" />
        <span className="mb-1 ml-1" style={{ fontWeight: "400" }}>
          (Point)
        </span>
      </div>
      <TableTransfer
        dataSource={dataHH.map((el) => ({
          key: el.HHCode,
          title: el.HHCode,
          description: el.HHHeadName,
          PMTScored: el.PMTScored,
          //   disabled: i % 4 === 0,
          //   tag: mockTags[i % 3],
        }))}
        targetKeys={targetKeys}
        // disabled={true}
        showSearch={true}
        onChange={onChange}
        filterOption={(inputValue, item) =>
          item.title.indexOf(inputValue) !== -1
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
        render={(record) => {
          console.log(record);
          return <div>AA</div>;
        }}
        operationStyle={{
          color: "red",
        }}
      />
    </div>
  );
}
