import React, { useState } from "react";
import { Tooltip, Button, Divider, Table, Input, Modal } from "antd";
import { useTranslation } from "react-i18next";
import Highlighter from "react-highlight-words";
import LoadingSpinner from "../../../components/LoadingSpinner";
import userTrackingLogApi from "../../../api/userTrackingLogApi";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { PATH } from "../../../routers/Path";
import { getValueFromLink } from "../../../utils/getValueFromLink";
import { regexTemplate } from "../../../utils/regexTemplate";
import { messageError } from "../../../components/MessageError";

let timeOut = "";
export default function UserTrackingLog(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [keyword, setKeyword] = useState(null);
  const [listUserLog, setListUserLog] = useState([]);
  const [checkLoading, setCheckLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(1);
  //Modal Log
  const [visileModal, setVisibleModal] = useState(false);
  const [locationAddress, setlocationAddress] = useState({
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 13,
  });

  useEffect(() => {
    let pageCheck = getValueFromLink(props.location, "page");
    if (!regexTemplate.NUMBER.test(pageCheck)) {
      props.history.push(PATH.USER_TRACKING_LOG);
    } else {
      setPage(pageCheck);
    }
  }, [props.location, props.history]);

  useEffect(() => {
    return history.listen((location) => {
      if (`${location.pathname}${location.search}` === PATH.USER_TRACKING_LOG) {
        setKeyword("");
      }
    });
  }, [history]);

  useEffect(() => {
    setKeyword(getValueFromLink(props.location, "keyword", "STRING"));
    fetchDataLog(props.location);
  }, [props.location]);

  const fetchDataLog = async (location) => {
    setCheckLoading(true);
    return await userTrackingLogApi
      .GetAllUserLog({
        keyword: getValueFromLink(location, "keyword", "STRING"),
        pageNum: getValueFromLink(location, "page", "STRING"),
        pageSize: 12,
      })
      .then((res) => {
        setCheckLoading(false);
        setTotalItem(res.data.Total);
        setListUserLog(res.data.listOfObj);
      })
      .catch((error) => {
        setCheckLoading(false);
        messageError({
          content: error,
          duration: 2,
        });
      });
  };

  const columns = [
    {
      title: t("ID"),
      dataIndex: "Id",
      key: "Id",
      render: (text) => (
        <div className="d-flex align-items-center">
          <span style={{ fontWeight: "600" }}>{text}</span>
        </div>
      ),
    },
    {
      title: t("UserName"),
      dataIndex: "username",
      key: "username",
      render: (text) => (
        <div className="d-flex align-items-center">
          <i
            className="fas fa-address-card mr-2"
            style={{ color: "#a2a6b7" }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: t("DATETIME"),
      dataIndex: "date_time",
      key: "date_time",
      render: (text) => (
        <div className="d-flex align-items-center">
          <i className="far fa-clock mr-2" style={{ color: "#a2a6b7" }}></i>
          <span style={{ fontSize: "12px" }}>
            {text ? moment(text).format("DD/MM/YYYY HH:mm:ss") : "-"}
          </span>
        </div>
      ),
    },
    {
      title: t("IP_ADDRESS"),
      dataIndex: "IP_Address",
      key: "IP_Address",
      render: (text) => (
        <div className="d-flex align-items-center">
          <i className="fas fa-laptop mr-2" style={{ color: "#a2a6b7" }} />
          <span style={{ fontSize: "12px" }}>{text}</span>
        </div>
      ),
    },
    {
      title: t("country_code"),
      dataIndex: "country_code",
      key: "country_code",
      render: (text) => (
        <div className="d-flex align-items-center">
          <i
            className="fas fa-globe-europe mr-2"
            style={{ color: "#a2a6b7" }}
          ></i>
          <Highlighter
            highlightStyle={{ backgroundColor: "#96e0f7", padding: 0 }}
            searchWords={[keyword]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        </div>
      ),
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
      render: (text) => (
        <div className="d-flex align-items-center">
          <i
            className="fas fa-file-medical-alt mr-2"
            style={{ color: "#a2a6b7" }}
          ></i>
          <Highlighter
            highlightStyle={{ backgroundColor: "#96e0f7", padding: 0 }}
            searchWords={[keyword]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        </div>
      ),
    },
    {
      title: "",
      render: (text, record) => (
        <div className="d-flex justify-content-end">
          {record.location ? (
            <Tooltip placement="top" title={t("View Map Location")}>
              <Button
                style={{ color: "#3d9aff" }}
                icon={<i className="fas fa-map-marked-alt" />}
                size={"small"}
                className="d-flex align-items-center justify-content-center mr-2"
                onClick={(event) => {
                  const arrayLatLong = record.location.split("-");
                  setlocationAddress({
                    ...locationAddress,
                    center: {
                      lat: Number(arrayLatLong[0]),
                      lng: Number(arrayLatLong[1]),
                    },
                  });
                  setVisibleModal(true);
                }}
              />
            </Tooltip>
          ) : null}
        </div>
      ),
    },
  ];

  const onSearchChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setPage(1);
      const link = value ? `?keyword=${value}&page=1` : ``;
      props.history.push({
        pathName: PATH.USER_TRACKING_LOG,
        search: link,
      });
    }, 400);
  };

  const Marker = (props) => {
    const { name } = props;
    return (
      <span className="text-danger pointer" title={name}>
        <i className="fas fa-map-marker-alt font-24"></i>
      </span>
    );
  };

  const handlePageChange = (values) => {
    const value = keyword ? `keyword=${keyword}&` : "";
    props.history.push(`${PATH.USER_TRACKING_LOG}?${value}page=${values}`);
    setPage(values);
  };

  return (
    <div className="role-management-container">
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="h5 mb-0">{t("USERTRACKINGLOG")}</span>
      </div>
      <Divider />
      <div className="d-flex flex-row align-items-center mb-3">
        <span className="mr-2">{t("SEARCH")}</span>
        <Input
          id="demo-foo-search"
          type="text"
          placeholder={t("PLEASE_INPUT_KEYWORD")}
          style={{ width: "200px" }}
          allowClear
          onChange={onSearchChange}
          value={keyword}
        />
      </div>
      <Table
        dataSource={listUserLog || []}
        columns={columns}
        style={{ overflow: "auto" }}
        rowKey="Id"
        size="small"
        pagination={{
          current: Number(page),
          pageSize: 12,
          total: totalItem,
          onChange: (value) => {
            handlePageChange(value);
          },
          showSizeChanger: false,
        }}
      />
      <Modal
        title="Location"
        width="60%"
        visible={visileModal}
        onCancel={() => {
          setVisibleModal(false);
        }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div style={{ height: "400px", width: "100%" }}>
          <div className="d-flex flex-row w-100 justify-content-center mb-1">
            <div className="d-flex flex-row">
              <span style={{ fontWeight: "500" }}>Latitude :</span>
              <span className="ml-1">{locationAddress.center.lat}</span>
            </div>
            <div className="d-flex flex-row ml-3">
              <span style={{ fontWeight: "500" }}>Longitude :</span>
              <span className="ml-1">{locationAddress.center.lng}</span>
            </div>
          </div>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDFscFGDtZL1daD8iYZKxFrGn2FXdHbMbw",
            }}
            center={locationAddress.center}
            defaultZoom={locationAddress.zoom}
          >
            <Marker
              lat={locationAddress.center.lat}
              lng={locationAddress.center.lng}
              name="Location"
            />
          </GoogleMapReact>
        </div>
      </Modal>
    </div>
  );
}
