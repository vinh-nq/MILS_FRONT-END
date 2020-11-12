import React from "react";
import { Table, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { actionRedux } from "../../../../../../../redux/actions";
import "./styles.scss";

export default function ListMemberComponnets(props) {
  const { listMemebr, fetchDataObjectMember } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const listMember = useSelector((state) => state.memberReducer.listMember);

  const columns = [
    {
      title: t("PPId"),
      dataIndex: "PPId",
    },
    {
      title: t("MemberId"),
      dataIndex: "MemberId",
    },
    {
      title: t("MemberName"),
      dataIndex: "MemberName",
    },
    {
      render: (text, record) => (
        <div className="d-flex justify-content-end">
          <Tooltip placement="top" title={t("See Information")}>
            <InfoCircleOutlined
              className="pointer"
              style={{ fontSize: "16px", color: "blue" }}
              onClick={() => {
                fetchDataObjectMember(record.MemberId);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys: listMember.map((el) => el.MemberId),
    hideSelectAll: true,
    onSelect: (record, selected) => {
      if (selected) {
        dispatch({
          type: actionRedux.ADD_MEMBER_LIST_CCT_CONFIRM,
          payload: record,
        });
      } else {
        dispatch({
          type: actionRedux.DELETE_MEMBER_LIST_CCT_CONFIRM,
          payload: record,
        });
      }
    },
  };

  return (
    <Table
      rowSelection={rowSelection}
      style={{ width: "93%" }}
      className="table-container-expand"
      columns={columns}
      dataSource={listMemebr || []}
      rowKey={"MemberId"}
      pagination={false}
      size="small"
    />
  );
}
