import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Divider,
  Input,
  Button,
  message,
  Tooltip,
  Menu,
  Transfer,
  Select,
  Modal,
  Tree,
  TreeSelect,
} from "antd";
import {
  SyncOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  LockOutlined,
  ExclamationCircleOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { getValueFromLink } from "../../../utils/getValueFromLink";
import { regexTemplate } from "../../../utils/regexTemplate";
import Highlighter from "react-highlight-words";
import LoadingSpinner from "../../../components/LoadingSpinner";
import CCTProgramApi from "../../../api/CCTProgramApi";
import dataDictionaryApi from "../../../api/dataDictionaryApi";
import moment from "moment";
import "./styles.scss";
import { PATH } from "../../../routers/Path";

let timeOut = "";
export default function CertifiesListOfTheBeneficiaries(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [listHHCCTProgram, setListHHCCTProgram] = useState([]);
  const [listCCTConfirm, setListCCTConfirm] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [checkLoading, setCheckLoading] = useState(false);
  const [selectStatusCCT, setSelectStatusCCT] = useState("all");
  const [selectLockCCT, setSelectLockCCT] = useState("all");
  const { confirm } = Modal;
  const { Option } = Select;
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  return (
    <div className="w-100 h-100">
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <div className="d-flex flex-row align-items-center justify-content-between row">
        <div className="col-xl-6 col-md-3 col-12">
          <span className="h5 mb-0">{t("ENROLLAUTOFROMPMTRESULT")}</span>
        </div>
        <div className="col-xl-6 col-md-9 col-12 d-flex justify-content-end">
          <Button
            onClick={() => {
              history.push(PATH.ENROLL_ON_DEMAND);
            }}
            type="primary"
          >
            {t("Enroll On Demand")}
          </Button>
        </div>
      </div>
      <Divider />
      
    </div>
  );
}
