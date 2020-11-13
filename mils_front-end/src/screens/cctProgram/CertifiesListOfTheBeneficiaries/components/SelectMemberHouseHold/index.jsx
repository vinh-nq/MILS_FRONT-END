import React, { useState } from "react";
import { Button, Table, Badge, Input, message, Modal } from "antd";
import { UnorderedListOutlined, RightOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import ListMemberComponents from "./components/ListMemerComponents";
import InformationMember from "./components/InformationMember";
import ModalListMemberSelect from "./components/ModalListMemberSelect";
import houseHoldApi from "../../../../../api/houseHoldApi";
import * as _ from "lodash";
import { actionRedux } from "../../../../../redux/actions";
import "./styles.scss";
import Cookies from "universal-cookie";

let timeOut = "";
export default function SelectMemberHouseHold(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [objUser, setObjectUser] = useState({});
  const [visileModal, setVisibleModal] = useState(false);
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");
  const {
    listHouseHold,
    totalPage,
    page,
    setCurrent,
    keyword,
    setKeyword,
    setCheckLoading,
    getApprovedHouseholds,
    disabled,
  } = props;
  const listMember = useSelector((state) => state.memberReducer.listMember);

  const columns = [
    {
      title: t("HHCode"),
      dataIndex: "HHCode",
      key: "HHCode",
      render: (text) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#96e0f7", padding: 0 }}
          searchWords={[keyword]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ),
    },
    {
      title: t("HHName"),
      dataIndex: "HHName",
      key: "HHName",
      render: (text) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#96e0f7", padding: 0 }}
          searchWords={[keyword]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ),
    },
    {
      title: t("NumberOfMember"),
      dataIndex: "DistrictId",
      key: "HHCode",
      render: (text, record) => <span>{record.Members.length}</span>,
    },
    {
      dataIndex: "Village",
      title: t("Location"),
      render: (text, record) => (
        <span style={{ fontSize: "12px" }}>{`${
          dataLanguage === "la" ? record.Province : record.ProvinceEng
        } / ${dataLanguage === "la" ? record.District : record.DistrictEng} / ${
          dataLanguage === "la" ? record.Village : record.VillageEng
        }`}</span>
      ),
    },
  ];

  const onExpand = (expanded, { HHCode }) => {
    const expandedKeyss = expanded ? [HHCode] : [];
    setExpandedKeys(expandedKeyss);
  };

  const fetchDataObjectMember = async (memberId) => {
    const renderFirst = _.isEmpty(objUser);
    setLoading(true);
    if (renderFirst) {
      setCheckLoading(true);
    }
    return await houseHoldApi
      .getInformationOfIndividualMember({
        memberId: memberId,
      })
      .then((res) => {
        if (renderFirst) {
          setCheckLoading(false);
        }
        setLoading(false);
        setObjectUser(res.data.Data);
      });
  };

  const fetchDataCheckListMember = async () => {
    let cookies = new Cookies();
    cookies = cookies.get("user");
    setCheckLoading(true);
    return await houseHoldApi
      .CheckInsertMember({
        UserId: cookies.userId,
        Status: null,
        Message: null,
        Members: listMember.map((el) => ({
          cct_member_id: el.MemberId,
          cct_member_name: el.MemberName,
          cct_hh_member_id:
            [...`${el.PPId}`].length < 2 ? `0${el.PPId}` : el.PPId,
          created_date: null,
          expire_date: null,
          type_of_card: null,
          active: true,
          number_of_uses: null,
          hh_code: el.HHCode,
          user_create_id: null,
          modified_date: null,
          user_modified_id: null,
          have_card: false,
        })),
      })
      .then((res) => {
        dispatch({
          type: actionRedux.SET_LIST_MEMBER,
          payload: res.data.Members.map((el) => ({
            MemberId: `${el.cct_member_id}`,
            MemberName: el.cct_member_name,
            PPId: el.cct_hh_member_id,
            created_date: el.created_date,
            expire_date: el.expire_date,
            type_of_card: el.type_of_card,
            active: el.active,
            number_of_uses: el.number_of_uses,
            HHCode: el.hh_code,
            user_create_id: el.user_create_id,
            modified_date: el.modified_date,
            user_modified_id: el.user_modified_id,
            have_card: el.have_card,
          })),
        });
        if (res.data.Members.filter((el) => el.have_card).length !== 0) {
          message.success(
            `${
              res.data.Members.filter((el) => el.have_card).length
            } people are already CCT Program members !`
          );
        } else {
          message.success("Check List People Success!");
        }
        setCheckLoading(false);
        setCurrent(1);
      });
  };

  return (
    <div className="row mt-3">
      <div className="col-8 mb-2">
        <div className="d-flex flex-row align-items-center">
          <span className="mr-2">{t("SEARCH")}</span>
          <Input
            id="demo-foo-search"
            type="text"
            placeholder={t("PLEASE_INPUT_KEYWORD")}
            style={{ width: "200px" }}
            allowClear
            onChange={(event) => {
              const value = event.target.value;
              setKeyword(value);
              setObjectUser({});
              clearTimeout(timeOut);
              timeOut = setTimeout(() => {
                getApprovedHouseholds(value, 1);
              }, 400);
            }}
            value={keyword}
            disabled={disabled}
          />
          {listMember && listMember.length !== 0 ? (
            <Badge count={listMember.length} overflowCount={999}>
              <Button
                className="d-flex flex-row align-items-center ml-2"
                style={{ color: "blue", border: "1px solid blue" }}
                onClick={() => {
                  setVisibleModal(true);
                }}
              >
                <UnorderedListOutlined />
                <span>{t("See List Selected Member")}</span>
              </Button>
            </Badge>
          ) : null}
        </div>
      </div>
      <div className="col-4 mb-2 d-flex justify-content-end">
        <Button
          className="d-flex flex-row align-items-center"
          type="primary"
          onClick={(event) => {
            event.preventDefault();
            if (listMember.length === 0) {
              message.error("Please select people!");
              return;
            }
            fetchDataCheckListMember();
          }}
        >
          <span>{t("Next")}</span>
          <RightOutlined />
        </Button>
      </div>
      <div className="col mb-2">
        <Table
          style={{ overflow: "auto" }}
          className="container-table-CCT"
          columns={columns}
          dataSource={listHouseHold || []}
          size={"small"}
          onExpand={onExpand}
          expandable={{
            expandedRowRender: (record) => (
              <div className="pt-2 pb-2">
                <ListMemberComponents
                  listMemebr={record.Members}
                  fetchDataObjectMember={fetchDataObjectMember}
                />
              </div>
            ),
            rowExpandable: (record) => record.Members.length !== 0,
            expandedRowClassName: () => {
              return "red";
            },
          }}
          rowKey={"HHCode"}
          onRow={({ HHCode }) =>
            expandedKeys.includes(HHCode) && { className: "expand-parent" }
          }
          expandedRowKeys={expandedKeys}
          pagination={{
            current: Number(page),
            pageSize: 10,
            total: totalPage * 10,
            onChange: (value) => {
              getApprovedHouseholds(keyword, value);
            },
            showSizeChanger: false,
          }}
        />
      </div>
      {_.isEmpty(objUser) ? null : (
        <div className="col-xl-5 col-lg-5 col-12">
          <InformationMember
            loading={loading}
            objUser={objUser}
            setObjectUser={setObjectUser}
          />
        </div>
      )}
      <Modal
        title={t("List Member Selected")}
        width="50%"
        visible={visileModal}
        onCancel={() => {
          setVisibleModal(false);
        }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <ModalListMemberSelect />
      </Modal>
    </div>
  );
}
