import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Tag, Tooltip } from "antd";
import HHMemberInfoDetail from "./HHMemberInfoDetail";
import houseHoldApi from "../../../../api/houseHoldApi";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { useTranslation } from "react-i18next";

function HouseHoldMemberList(props) {
  const {
    visibleMemberList,
    setVisibleMemberList,
    memberInHouseHold,
    dataLanguage,
  } = props;
  const [showDetailMember, setShowDetailMember] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [
    informationOfIndividualMember,
    setInformationOfIndividualMember,
  ] = useState({});

  const { t } = useTranslation();

  useEffect(() => {
    setShowDetailMember(false);
  }, [visibleMemberList]);

  const getInformationOfIndividualMember = async (id) => {
    setLoading(true);
    await houseHoldApi
      .getInformationOfIndividualMember({ memberId: id })
      .then((res) => {
        setInformationOfIndividualMember(res.data);
      });
    setShowDetailMember(true);
    setLoading(false);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "icon",
      key: "icon",
      render: () => (
        <Tag color="#337AB7">
          <i className="fas fa-user"></i>
        </Tag>
      ),
    },
    {
      title: t("ITEM"),
      dataIndex: "item",
      key: "item ",
      render: (data, record, index) => <span>{index + 1}</span>,
    },
    {
      title: t("MEMBER_NAME"),
      dataIndex: "MemberName",
      key: "MemberName",
      render: (data) => (
        <div style={{ minWidth: 120 }}>
          <span>{data}</span>
        </div>
      ),
    },
    {
      title: t("MARITAL_STATUS"),
      dataIndex: "maritalStatus",
      key: "maritalStatus",
      render: (data, record) => (
        <div style={{ minWidth: 100 }}>
          <span>
            {dataLanguage === "la"
              ? record.MaritalStatus
              : record.MaritalStatusEng}
          </span>
        </div>
      ),
    },
    {
      title: t("RELATION_TO_HOUSEHOLD"),
      dataIndex: "RelationToHosueHold",
      key: "RelationToHosueHold",
      render: (data, record) => (
        <div style={{ minWidth: 100 }}>
          <span>
            {dataLanguage === "la"
              ? record.RelationToHosueHold
              : record.RelationToHosueHoldEng}
          </span>
        </div>
      ),
    },
    {
      title: t("GENDER"),
      dataIndex: "gender",
      key: "gender",
      render: (data, record) => (
        <div style={{ minWidth: 100 }}>
          <span>
            {dataLanguage === "la" ? record.Gender : record.GenderEng}
          </span>
        </div>
      ),
    },
    {
      title: t("DOB"),
      dataIndex: "DateOfBirth",
      key: "DateOfBirth",
      render: (data) => (
        <div style={{ minWidth: 80 }}>
          <span>{data}</span>
        </div>
      ),
    },
    {
      title: t("AGE"),
      dataIndex: "Age",
      key: "Age",
    },
    {
      title: t("PREGNANT_WOMAN"),
      dataIndex: "Pregnant",
      key: "Pregnant",
      align: "center",
      render: (data, record) => (
        <div style={{ minWidth: 80 }}>
          <span>{record.Pregnant ? "Yes" : "No"}</span>
        </div>
      ),
    },
    {
      title: t("VIEW_DETAIL"),
      key: "view",
      align: "center",
      dataIndex: "view",
      render: (data, record) => (
        <div className="d-flex justify-content-center">
          <Tooltip placement="topLeft" title={"Member in family"}>
            <Button
              type="primary"
              className="set-center-content mr-1"
              size="small"
              onClick={() => {
                getInformationOfIndividualMember(record.MemberId);
              }}
            >
              <i className="fas fa-info-circle"></i>
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Modal
      title={t("HOUSEHOLD_MEMBER_LIST")}
      visible={visibleMemberList}
      onCancel={() => {
        setVisibleMemberList(false);
      }}
      width={showDetailMember ? "800px" : "80%"}
      footer={null}
    >
      {isLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      {showDetailMember ? (
        <HHMemberInfoDetail
          objUser={informationOfIndividualMember}
          setShowDetailMember={setShowDetailMember}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={memberInHouseHold}
          pagination={{ hideOnSinglePage: true }}
          style={{ overflowX: "auto", overflowY: "hidden" }}
          rowKey="MemberId"
        />
      )}
    </Modal>
  );
}

export default HouseHoldMemberList;
