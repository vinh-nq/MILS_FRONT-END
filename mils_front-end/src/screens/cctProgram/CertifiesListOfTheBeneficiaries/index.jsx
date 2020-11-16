import React, { useState } from "react";
import { Button, message, Steps } from "antd";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../../components/LoadingSpinner";
import CCTProgramApi from "../../../api/CCTProgramApi";
import CascaderFilter from "./components/CascaderFilter";
import SelectMemberHouseHold from "./components/SelectMemberHouseHold";
import ReconfirmMember from "./components/ReconfirmMember";
import SuccessScreen from "./components/SuccessScreen";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { actionRedux } from "../../../redux/actions";
import { useEffect } from "react";

export default function CertifiesListOfTheBeneficiaries(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [checkLoading, setCheckLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [listHouseHold, setListHouseHold] = useState([]);
  const { Step } = Steps;

  // Cascader Props
  const [valueLocation, setValueLocation] = useState([]);
  const [idLocation, setIdLocation] = useState(null);

  const steps = [
    {
      title: t("Select People"),
    },
    {
      title: t("Reconfirm"),
    },
    {
      title: t("Done"),
    },
  ];

  //Fetch Data Approved HouseHold
  const GetApprovedHouseholds = async (id, keyword, page) => {
    setCheckLoading(true);
    return await CCTProgramApi.GetApprovedHouseholds({
      id: id,
      text: keyword,
      currentPage: page,
    }).then((res) => {
      setCheckLoading(false);
      setTotalPage(res.data.Data.TotalPage);
      setPage(res.data.Data.CurrentPage);
      setListHouseHold(res.data.Data.HouseHolds);
    });
  };

  //Click To Select ID Fetch Data Approved HouseHold
  const genderDataHH = () => {
    if (!valueLocation || valueLocation.length === 0) {
      message.error("Please select Province/ Disytrict/ Village!");
      return;
    }
    dispatch({
      type: actionRedux.SET_LIST_MEMBER,
      payload: [],
    });
    setKeyword("");
    switch (valueLocation.length) {
      case 1:
        //Case Province
        setIdLocation(valueLocation[0]);
        GetApprovedHouseholds(valueLocation[0], "", 1);
        break;
      case 2:
        //Case District
        setIdLocation(valueLocation[1]);
        GetApprovedHouseholds(valueLocation[1], "", 1);
        break;
      case 3:
        //Case Village
        setIdLocation(valueLocation[2]);
        GetApprovedHouseholds(valueLocation[2], "", 1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setPage(1);
    setValueLocation([]);
    setKeyword("");
    setTotalPage(0);
    setListHouseHold([]);
    setCurrent(0);
    setListHouseHold(null);
    setIdLocation(null);
    dispatch({
      type: actionRedux.SET_LIST_MEMBER,
      payload: [],
    });
  }, [dispatch]);

  const resetData = () => {
    setPage(1);
    setValueLocation([]);
    setKeyword("");
    setTotalPage(0);
    setListHouseHold([]);
    setCurrent(0);
    setListHouseHold(null);
    setIdLocation(null);
    dispatch({
      type: actionRedux.SET_LIST_MEMBER,
      payload: [],
    });
  };

  return (
    <div className="w-100 h-100">
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <div className="d-flex flex-row align-items-center justify-content-between row">
        <div className="col-xl-6 col-md-3 col-12">
          <span className="h5 mb-0">
            {t("CERTIFIESLISTOFTHEBENEFICIARIES")}
          </span>
        </div>
        <div className="col-xl-6 col-md-9 col-12 d-flex flex-row justify-content-end align-items-end row pr-4">
          <CascaderFilter
            valueLocation={valueLocation}
            setValueLocation={setValueLocation}
            disabled={current !== 0}
          />
          <Button
            className="col-xl-2 col-md-2 col-2"
            style={{ fontSize: "12px" }}
            onClick={genderDataHH}
            type="primary"
            disabled={current !== 0}
          >
            {t("Get Data")}
          </Button>
        </div>
      </div>
      <Steps current={current} className="mt-3">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="w-100">
        {current === 0 ? (
          <SelectMemberHouseHold
            disabled={!idLocation ? true : false}
            listHouseHold={listHouseHold}
            totalPage={totalPage}
            page={page}
            setCurrent={setCurrent}
            keyword={keyword}
            setKeyword={setKeyword}
            setCheckLoading={setCheckLoading}
            getApprovedHouseholds={(keyword, page) => {
              GetApprovedHouseholds(idLocation, keyword, page);
            }}
          />
        ) : null}
        {current === 1 ? <ReconfirmMember setCurrent={setCurrent} /> : null}
        {current === 2 ? <SuccessScreen resetData={resetData} /> : null}
      </div>
    </div>
  );
}
