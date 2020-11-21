import React from "react";
import { Button, message } from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { actionRedux } from "../../../../../redux/actions";
import { messageError } from "../../../../../components/MessageError";
import { getValueOfQueryParams } from "../../../../../utils/getValueOfQueryParams";
import { PATH } from "../../../../../routers/Path";
import Cookies from "universal-cookie";
import approveHouseHoldApi from "../../../../../api/approveHouseHoldApi";

export default function ContainerButton(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { setCheckLoading, indexStatusApprove, permissionList } = props;
  const sendRequestStatus = ["000", "001"];
  const viewDistrictApprove = ["100", "201", "001"];
  const viewDistrictReject = ["100", "201"];
  const viewCentralApprove = ["210", "201"];
  const viewCentralReject = ["210"];

  const handleSendRequestFromCM = () => {
    const sendRequest = async () => {
      let cookies = new Cookies();
      cookies = cookies.get("user");
      message.loading({
        content: "Loading...",
        key: "message-form-approved-cm",
        duration: 30,
      });
      return await approveHouseHoldApi
        .SendRequetHHApprove(
          {
            HouseHolds: [
              getValueOfQueryParams(history.location, "hh_code", "STRING"),
            ],
            Status_Approve_District: 0,
            Status_Approve_Central: 0,
            Status_Reject: 0,
            Status_Block_Data: 0,
            DateTime_Approve_Action: 0,
            User_Approve_Action: Number(cookies.userId),
            district_status_name: 0,
            central_status_name: 0,
            full_name: cookies.fullName,
          },
          `Send Request CM -> District : 1 Household - [${getValueOfQueryParams(
            history.location,
            "hh_code",
            "STRING"
          )}]`
        )
        .then((res) => {
          message.success({
            content: t("ADD_SUCCESS"),
            key: "message-form-approved-cm",
            duration: 1,
          });
          history.push(PATH.CREATE_LIST_HOUSEHOLD_REQUEST);
          dispatch({
            type: actionRedux.UPDATE_STATUS_PAGE_ON_DEMEND,
            payload: {
              listItems: [],
              page: 1,
              keyword: "",
              region: "all",
            },
          });
        })
        .catch((error) => {
          setCheckLoading(false);
          messageError({
            content: error,
            key: "message-form-approved-cm",
            duration: 2,
          });
        });
    };
    sendRequest();
  };

  const handleRejectDistrict = () => {
    const sendRequest = async () => {
      let cookies = new Cookies();
      cookies = cookies.get("user");
      message.loading({
        content: "Loading...",
        key: "message-form-approved-cm",
        duration: 30,
      });
      return await approveHouseHoldApi
        .DistrictReject(
          {
            HouseHolds: [
              getValueOfQueryParams(history.location, "hh_code", "STRING"),
            ],
            Status_Approve_District: 0,
            Status_Approve_Central: 0,
            Status_Reject: 0,
            Status_Block_Data: 0,
            DateTime_Approve_Action: 0,
            User_Approve_Action: Number(cookies.userId),
            district_status_name: 0,
            central_status_name: 0,
            full_name: cookies.fullName,
          },
          `Reject Request District -> CM : 1 Household - [${getValueOfQueryParams(
            history.location,
            "hh_code",
            "STRING"
          )}]`
        )
        .then((res) => {
          message.success({
            content: t("REJECT_SUCCESS"),
            key: "message-form-approved-cm",
            duration: 1,
          });
          history.push(PATH.DISTRICT_APPROVE);
          dispatch({
            type: actionRedux.UPDATE_STATUS_PAGE_ON_DISTRICT_APPROVE,
            payload: {
              listItems: [],
              page: 1,
              keyword: "",
              region: "all",
            },
          });
        })
        .catch((error) => {
          setCheckLoading(false);
          messageError({
            content: error,
            key: "message-form-approved-cm",
            duration: 2,
          });
        });
    };
    sendRequest();
  };

  const handleApproveDistrict = () => {
    const sendRequest = async () => {
      let cookies = new Cookies();
      cookies = cookies.get("user");
      message.loading({
        content: "Loading...",
        key: "message-form-approved-cm",
        duration: 30,
      });
      return await approveHouseHoldApi
        .DistrictApprove(
          {
            HouseHolds: [
              getValueOfQueryParams(history.location, "hh_code", "STRING"),
            ],
            Status_Approve_District: 0,
            Status_Approve_Central: 0,
            Status_Reject: 0,
            Status_Block_Data: 0,
            DateTime_Approve_Action: 0,
            User_Approve_Action: Number(cookies.userId),
            district_status_name: 0,
            central_status_name: 0,
            full_name: cookies.fullName,
          },
          `Approve Request District : 1 Household - [${getValueOfQueryParams(
            history.location,
            "hh_code",
            "STRING"
          )}]`
        )
        .then((res) => {
          message.success({
            content: t("APPROVED_SUCCESS"),
            key: "message-form-approved-cm",
            duration: 1,
          });
          history.push(PATH.DISTRICT_APPROVE);
          dispatch({
            type: actionRedux.UPDATE_STATUS_PAGE_ON_DISTRICT_APPROVE,
            payload: {
              listItems: [],
              page: 1,
              keyword: "",
              region: "all",
            },
          });
        })
        .catch((error) => {
          setCheckLoading(false);
          messageError({
            content: error,
            key: "message-form-approved-cm",
            duration: 2,
          });
        });
    };
    sendRequest();
  };

  const handleRejectCentral = () => {
    const sendRequest = async () => {
      let cookies = new Cookies();
      cookies = cookies.get("user");
      message.loading({
        content: "Loading...",
        key: "message-form-approved-cm",
        duration: 30,
      });
      return await approveHouseHoldApi
        .CentralReject(
          {
            HouseHolds: [
              getValueOfQueryParams(history.location, "hh_code", "STRING"),
            ],
            Status_Approve_District: 0,
            Status_Approve_Central: 0,
            Status_Reject: 0,
            Status_Block_Data: 0,
            DateTime_Approve_Action: 0,
            User_Approve_Action: Number(cookies.userId),
            district_status_name: 0,
            central_status_name: 0,
            full_name: cookies.fullName,
          },
          `Reject Request Central -> District : 1 Household - [${getValueOfQueryParams(
            history.location,
            "hh_code",
            "STRING"
          )}]`
        )
        .then((res) => {
          message.success({
            content: t("REJECT_SUCCESS"),
            key: "message-form-approved-cm",
            duration: 1,
          });
          history.push(PATH.CENTRAL_APPROVE);
          dispatch({
            type: actionRedux.UPDATE_STATUS_PAGE_ON_CENTRAL_APPROVE,
            payload: {
              listItems: [],
              page: 1,
              keyword: "",
              region: "all",
            },
          });
        })
        .catch((error) => {
          setCheckLoading(false);
          messageError({
            content: error,
            key: "message-form-approved-cm",
            duration: 2,
          });
        });
    };
    sendRequest();
  };

  const handleApproveCentral = () => {
    const sendRequest = async () => {
      let cookies = new Cookies();
      cookies = cookies.get("user");
      message.loading({
        content: "Loading...",
        key: "message-form-approved-cm",
        duration: 30,
      });
      return await approveHouseHoldApi
        .CentralApprove(
          {
            HouseHolds: [
              getValueOfQueryParams(history.location, "hh_code", "STRING"),
            ],
            Status_Approve_District: 0,
            Status_Approve_Central: 0,
            Status_Reject: 0,
            Status_Block_Data: 0,
            DateTime_Approve_Action: 0,
            User_Approve_Action: Number(cookies.userId),
            district_status_name: 0,
            central_status_name: 0,
            full_name: cookies.fullName,
          },
          `Approve Request Central : 1 Household - [${getValueOfQueryParams(
            history.location,
            "hh_code",
            "STRING"
          )}]`
        )
        .then((res) => {
          message.success({
            content: t("APPROVED_SUCCESS"),
            key: "message-form-approved-cm",
            duration: 1,
          });
          history.push(PATH.CENTRAL_APPROVE);
          dispatch({
            type: actionRedux.UPDATE_STATUS_PAGE_ON_CENTRAL_APPROVE,
            payload: {
              listItems: [],
              page: 1,
              keyword: "",
              region: "all",
            },
          });
        })
        .catch((error) => {
          setCheckLoading(false);
          messageError({
            content: error,
            key: "message-form-approved-cm",
            duration: 2,
          });
        });
    };
    sendRequest();
  };

  return (
    <>
      {permissionList.includes("sendrequestapprove") &&
      sendRequestStatus.includes(`${indexStatusApprove}`) ? (
        <Button
          style={{ color: "#52c41a", borderColor: "#52c41a" }}
          onClick={handleSendRequestFromCM}
          className="mr-2"
        >
          <div className="d-flex flex-row justify-content-center align-items-center">
            <i className="fas fa-check"></i>
            <span className="ml-2">{t("Send Request")}</span>
          </div>
        </Button>
      ) : null}
      {permissionList.includes("districtapprove") &&
      viewDistrictReject.includes(`${indexStatusApprove}`) ? (
        <Button onClick={handleRejectDistrict} danger className="mr-2">
          <div className="d-flex flex-row justify-content-center align-items-center">
            <i className="fas fa-reply"></i>
            <span className="ml-2">{t("Reject (District)")}</span>
          </div>
        </Button>
      ) : null}
      {permissionList.includes("districtapprove") &&
      viewDistrictApprove.includes(`${indexStatusApprove}`) ? (
        <Button
          style={{ color: "#52c41a", borderColor: "#52c41a" }}
          onClick={handleApproveDistrict}
          className="mr-2"
        >
          <div className="d-flex flex-row justify-content-center align-items-center">
            <i className="fas fa-check"></i>
            <span className="ml-2">{t("Approved (District)")}</span>
          </div>
        </Button>
      ) : null}
      {permissionList.includes("centralapprove") &&
      viewCentralReject.includes(`${indexStatusApprove}`) ? (
        <Button onClick={handleRejectCentral} danger className="mr-2">
          <div className="d-flex flex-row justify-content-center align-items-center">
            <i className="fas fa-reply"></i>
            <span className="ml-2">{t("Reject (Central)")}</span>
          </div>
        </Button>
      ) : null}
      {permissionList.includes("centralapprove") &&
      viewCentralApprove.includes(`${indexStatusApprove}`) ? (
        <Button
          style={{ color: "#52c41a", borderColor: "#52c41a" }}
          onClick={handleApproveCentral}
        >
          <div className="d-flex flex-row justify-content-center align-items-center">
            <i className="fas fa-check"></i>
            <span className="ml-2">{t("Approved (Central)")}</span>
          </div>
        </Button>
      ) : null}
    </>
  );
}
