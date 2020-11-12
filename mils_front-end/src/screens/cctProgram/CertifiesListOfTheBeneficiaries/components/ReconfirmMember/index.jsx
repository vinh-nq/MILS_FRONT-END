import React from "react";
import { Table, Button, message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { actionRedux } from "../../../../../redux/actions";
import houseHoldApi from "../../../../../api/houseHoldApi";
import Cookies from "universal-cookie";
import "./styles.scss";

export default function ReconfirmMember(props) {
  const { t } = useTranslation();
  const { setCurrent } = props;
  const dispatch = useDispatch();
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

  const columnsTableMemberHaveCard = [
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

  const insertMemberCCT = async () => {
    let cookies = new Cookies();
    cookies = cookies.get("user");
    message.loading({
      content: "Loading...",
      key: "AddMemberCCTPrograms",
      duration: 30,
    });
    return await houseHoldApi
      .InsertMemberCCT(
        {
          UserId: cookies.userId,
          Members: listMember
            .filter((el) => !el.have_card)
            .map((el) => ({
              cct_member_id: el.MemberId,
              cct_member_name: el.MemberName,
              cct_hh_member_id: el.PPId,
              created_date: null,
              expire_date: null,
              type_of_card: null,
              active: true,
              number_of_uses: null,
              hh_code: el.HHCode,
              user_create_id: cookies.userId,
              modified_date: null,
              user_modified_id: null,
              have_card: true,
            })),
          Status: null,
          Message: null,
        },
        `Add ${
          listMember.filter((el) => !el.have_card).length
        } Member To CCT Program`
      )
      .then((res) => {
        dispatch({
          type: actionRedux.SET_LIST_MEMBER,
          payload: [],
        });
        setCurrent(2);
        message.success({
          content: t("ADD_SUCCESS"),
          key: "AddMemberCCTPrograms",
        });
      })
      .catch((e) => {
        message.error({ content: e.message, key: "AddMemberCCTPrograms" });
      });
  };

  return (
    <div className="row mt-3">
      <div className="col-12 mb-2 d-flex justify-content-end">
        <Button
          className="d-flex flex-row align-items-center"
          type="primary"
          onClick={(event) => {
            event.preventDefault();
            setCurrent(0);
          }}
        >
          <LeftOutlined />
          <span>Back</span>
        </Button>
        <Button
          className="d-flex flex-row align-items-center ml-2"
          type="primary"
          onClick={(event) => {
            event.preventDefault();
            insertMemberCCT();
          }}
          disabled={listMember.filter((el) => !el.have_card).length === 0}
        >
          <span>Add List Members</span>
          <RightOutlined />
        </Button>
      </div>
      {listMember.filter((el) => el.have_card).length !== 0 ? (
        <div className="col-xl-6 col-lg-6 col-sm-12">
          <span style={{ fontSize: "18px" }}>
            {t("List People Already A Member")}
          </span>
          <Table
            style={{ width: "100%" }}
            className="table-container-expand-reconfirm"
            columns={columnsTableMemberHaveCard}
            dataSource={listMember.filter((el) => el.have_card) || []}
            rowKey={"MemberId"}
            size="small"
          />
        </div>
      ) : null}
      <div className="col">
        <span style={{ fontSize: "18px" }}>{t("List People")}</span>
        <Table
          style={{ width: "100%" }}
          className="table-container-expand-reconfirm"
          columns={columns}
          dataSource={listMember.filter((el) => !el.have_card) || []}
          rowKey={"MemberId"}
          size="small"
        />
      </div>
    </div>
  );
}
