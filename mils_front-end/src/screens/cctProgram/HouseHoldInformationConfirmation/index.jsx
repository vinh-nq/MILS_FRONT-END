import React, { useEffect, useState } from "react";
import { Button, BackTop } from "antd";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import DetailHouseHold from "./components/DetailHouseHold";
import DetailLogStatusHouseHold from "./components/DetailLogStatusHouseHold";
import houseHoldApi from "../../../api/houseHoldApi";
import { getValueOfQueryParams } from "../../../utils/getValueOfQueryParams";
import LoadingSpinner from "../../../components/LoadingSpinner";
import householdLogApi from "../../../api/householdLogApi";
import { messageError } from "../../../components/MessageError";
import { PATH } from "../../../routers/Path";
import ContainerButton from "./components/ContainerButton";

export default function HouseHoldInformationConfirmation(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [detailHouseHold, setDetailHouseHold] = useState({});
  const [isLoading, setCheckLoading] = useState(false);
  const [timeLineAccount, setTimeLineAccount] = useState([]);
  const dataStatusPageOnDemend = useSelector((state) => {
    return {
      page: state.CMRequestReducer.page,
      keyword: state.CMRequestReducer.keyword,
      region: state.CMRequestReducer.region,
    };
  });
  const dataStatusHouseHoldRequested = useSelector((state) => {
    return {
      page: state.HouseholdRequestedReducer.page,
      keyword: state.HouseholdRequestedReducer.keyword,
      region: state.HouseholdRequestedReducer.region,
    };
  });
  const dataDistrictApproveReducer = useSelector((state) => {
    return {
      page: state.districtApproveReducer.page,
      keyword: state.districtApproveReducer.keyword,
      region: state.districtApproveReducer.region,
    };
  });
  const dataCentralApproveReducer = useSelector((state) => {
    return {
      page: state.centralApproveReducer.page,
      keyword: state.centralApproveReducer.keyword,
      region: state.centralApproveReducer.region,
    };
  });
  const [defaultProps, setDefaultProps] = useState({
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 10,
  });
  const [statusId, setStatusId] = useState("AAA");
  const [permissionList, setPermissionList] = useState([]);

  useEffect(() => {
    const hh_code = getValueOfQueryParams(
      history.location,
      "hh_code",
      "STRING"
    );
    if (hh_code) {
      const getDetailHouseHold = (hh_code) => {
        return houseHoldApi.GetDetailHouseHold({ hhCode: hh_code });
      };
      const getTimeLineHouseHold = (hh_code) => {
        return householdLogApi.GetHHLog({
          hh_code: hh_code,
        });
      };
      const fetchDataHouseHoldDetailAndLog = async (hh_code) => {
        setCheckLoading(true);
        return await Promise.all([
          getTimeLineHouseHold(hh_code),
          getDetailHouseHold(hh_code),
        ])
          .then(([resTimeLine, resDetailHouseHold]) => {
            setTimeLineAccount(resTimeLine.data);
            setCheckLoading(false);
            const { LatLongForBeneficiary } = resDetailHouseHold.data.Data;
            setDefaultProps((defaultProps) => {
              return {
                ...defaultProps,
                center: {
                  lat: Number(LatLongForBeneficiary.Lat),
                  lng: Number(LatLongForBeneficiary.Long),
                },
              };
            });
            setDetailHouseHold(resDetailHouseHold.data.Data);
            setStatusId(
              `${
                (resDetailHouseHold.data.Data.HHStatusApprove || {})
                  .StatusApproveDistrict
              }${
                (resDetailHouseHold.data.Data.HHStatusApprove || {})
                  .StatusApproveCentral
              }${
                (resDetailHouseHold.data.Data.HHStatusApprove || {})
                  .StatusReject
              }`
            );
            setPermissionList(
              resDetailHouseHold.data.Data.PermissionCodes || []
            );
          })
          .catch((error) => {
            setCheckLoading(false);
            messageError({
              content: error,
              duration: 3,
            });
          });
      };
      fetchDataHouseHoldDetailAndLog(hh_code);
    }
  }, [history.location]);

  const BackHandle = () => {
    switch (history.location.pathname) {
      case PATH.HOUSEHOLD_DETAIL_ON_CREATE_LIST_HOUSEHOLD_REQUEST:
        const region =
          dataStatusPageOnDemend.region === "all"
            ? ""
            : `&region=${dataStatusPageOnDemend.region}`;
        const keywordData = dataStatusPageOnDemend.keyword
          ? `&keyword=${dataStatusPageOnDemend.keyword}`
          : "";
        const pageData = dataStatusPageOnDemend.page
          ? `page=${dataStatusPageOnDemend.page}`
          : "page=1";
        history.push(
          `${PATH.CREATE_LIST_HOUSEHOLD_REQUEST}?${pageData}${region}${keywordData}`
        );
        break;
      case PATH.HOUSEHOLD_DETAIL_ON_REQUESTED:
        const region1 =
          dataStatusHouseHoldRequested.region === "all"
            ? ""
            : `&region=${dataStatusHouseHoldRequested.region}`;
        const keywordData1 = dataStatusHouseHoldRequested.keyword
          ? `&keyword=${dataStatusHouseHoldRequested.keyword}`
          : "";
        const pageData1 = dataStatusHouseHoldRequested.page
          ? `page=${dataStatusHouseHoldRequested.page}`
          : "page=1";
        history.push(
          `${PATH.HOUSEHOLD_REQUESTED}?${pageData1}${region1}${keywordData1}`
        );
        break;
      case PATH.HOUSEHOLD_DETAIL_ON_DISTRICT_APPROVE:
        const region2 =
          dataDistrictApproveReducer.region === "all"
            ? ""
            : `&region=${dataDistrictApproveReducer.region}`;
        const keywordData2 = dataDistrictApproveReducer.keyword
          ? `&keyword=${dataDistrictApproveReducer.keyword}`
          : "";
        const pageData2 = dataDistrictApproveReducer.page
          ? `page=${dataDistrictApproveReducer.page}`
          : "page=1";
        history.push(
          `${PATH.DISTRICT_APPROVE}?${pageData2}${region2}${keywordData2}`
        );
        break;
      case PATH.HOUSEHOLD_DETAIL_ON_CENTRAL_APPROVE:
        const region3 =
          dataCentralApproveReducer.region === "all"
            ? ""
            : `&region=${dataCentralApproveReducer.region}`;
        const keywordData3 = dataCentralApproveReducer.keyword
          ? `&keyword=${dataCentralApproveReducer.keyword}`
          : "";
        const pageData3 = dataCentralApproveReducer.page
          ? `page=${dataCentralApproveReducer.page}`
          : "page=1";
        history.push(
          `${PATH.CENTRAL_APPROVE}?${pageData3}${region3}${keywordData3}`
        );
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <BackTop
        className="scroll-top"
        target={() => document.getElementById("my-layout")}
      />
      <section className="border-bottom mb-3">
        <div className="d-md-flex align-items-center justify-content-between mb-3">
          <span className="h5 mb-0">{t("DETAILHOUSEHOLD")}</span>
          <div className="d-flex align-items-center">
            <Button className="mr-2" onClick={BackHandle}>
              <div className="d-flex flex-row justify-content-center align-items-center">
                <i className="fas fa-arrow-left"></i>
                <span className="ml-2">{t("Back")}</span>
              </div>
            </Button>
            <ContainerButton
              objectHHStatusApprove={detailHouseHold.HHStatusApprove || {}}
              indexStatusApprove={statusId}
              setCheckLoading={setCheckLoading}
              permissionList={permissionList || []}
            />
          </div>
        </div>
      </section>
      <div className="row">
        <div className="col">
          <DetailHouseHold
            defaultProps={defaultProps}
            detailHouseHold={detailHouseHold}
          />
        </div>
        <div className="col-xl-4 col-lg-4 col-sm-12 col-12">
          <DetailLogStatusHouseHold timeLineAccount={timeLineAccount} />
        </div>
      </div>
    </div>
  );
}
