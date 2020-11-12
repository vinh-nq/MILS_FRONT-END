import React from "react";
import { Table } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { actionRedux } from "../../../../../../../redux/actions";
import "./styles.scss";

export default function ModalListMemberSelect() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const listMember = useSelector((state) => state.memberReducer.listMember);

  const columns = [
    {
      title: t("MemberId"),
      dataIndex: "MemberId",
    },
    {
      title: t("HHCode"),
      dataIndex: "HHCode",
    },
    {
      title: t("PPId"),
      dataIndex: "PPId",
    },
    {
      title: t("MemberName"),
      dataIndex: "MemberName",
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
    <>
      <div className="d-flex align-items-center mb-2">
        <span className="font-500">{t("Number Of Selected Member")} : </span>
        <span className="ml-1">{listMember.length}</span>
      </div>
      <Table
        rowSelection={rowSelection}
        style={{ width: "100%" }}
        className="table-container-expand"
        columns={columns}
        dataSource={listMember || []}
        rowKey={"MemberId"}
        size="small"
      />
    </>
  );
}
