import React, { useState } from "react";
import { Button, List } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import menuManagementApi from "../../api/menuManagementApi";
import { actionRedux } from "../../redux/actions";
import "./styles.scss";
import { useEffect } from "react";
import * as _ from "lodash";
import LoadingSpinner from "../LoadingSpinner";
import { messageError } from "../MessageError";
import { useDispatch } from "react-redux";

export default function MenuRedirect(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [checkLoading, setCheckLoading] = useState(false);
  const [listFunctionOfGroup, setListFunctionOfGroup] = useState([]);
  const idItem = useSelector((state) => state.historyReducer.id);
  const dispatch = useDispatch();
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");
  const listBreadcrumb = useSelector(
    (state) => state.historyReducer.listBreadcrumb
  );

  useEffect(() => {
    const fetchDataFunction = async () => {
      setCheckLoading(true);
      setListFunctionOfGroup([]);
      await menuManagementApi
        .GetMenuListByHeader({
          header_id: idItem,
        })
        .then((res) => {
          setCheckLoading(false);
          setListFunctionOfGroup(res.data.Data);
        })
        .catch((error) => {
          setCheckLoading(false);
          messageError({
            content: error,
            duration: 2,
          });
        });
    };
    fetchDataFunction();
  }, [props.location, idItem]);

  return (
    <div className="menu-breadcrum-container">
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <span className="h5" style={{ color: "#b0b1b1" }}>
        {t(
          _.upperCase(
            history.location.pathname.replace(/\//g, "") || "DASHBOARD"
          )
        )}
      </span>
      <List
        className="mt-4"
        header={null}
        footer={null}
        size="small"
        dataSource={(listFunctionOfGroup || []).map((el) => `${el.list_id}`)}
        renderItem={(item) => {
          return (
            <List.Item
              key={item}
              className="d-flex flex-row align-items-center listItem"
            >
              <div className="d-flex flex-row align-items-center listItemHover">
                <i
                  className="far fa-folder-open"
                  style={{
                    color: "#757e94",
                    fontSize: "15px",
                  }}
                ></i>
                <Button
                  type="link"
                  onClick={() => {
                    const textSearch = (listFunctionOfGroup || []).find(
                      (el) => `${el.list_id}` === `${item}`
                    ).list_name_eng;
                    if (
                      textSearch.replace(/ /g, "").toLowerCase() ===
                      "createlisthouseholdrequest"
                    ) {
                      dispatch({
                        type: actionRedux.UPDATE_STATUS_PAGE_ON_DEMEND,
                        payload: {
                          page: 1,
                          region: "all",
                          keyword: "",
                          listItems: [],
                        },
                      });
                    }
                    if (
                      textSearch.replace(/ /g, "").toLowerCase() ===
                      "householdrequested"
                    ) {
                      dispatch({
                        type: actionRedux.UPDATE_STATUS_PAGE_ON_REQUESTED,
                        payload: {
                          page: 1,
                          region: "all",
                          keyword: "",
                          listItems: [],
                        },
                      });
                    }
                    if (
                      textSearch.replace(/ /g, "").toLowerCase() ===
                      "districtapprove"
                    ) {
                      dispatch({
                        type:
                          actionRedux.UPDATE_STATUS_PAGE_ON_DISTRICT_APPROVE,
                        payload: {
                          page: 1,
                          region: "all",
                          keyword: "",
                          listItems: [],
                        },
                      });
                    }
                    if (
                      textSearch.replace(/ /g, "").toLowerCase() ===
                      "centralapprove"
                    ) {
                      dispatch({
                        type: actionRedux.UPDATE_STATUS_PAGE_ON_CENTRAL_APPROVE,
                        payload: {
                          page: 1,
                          region: "all",
                          keyword: "",
                          listItems: [],
                        },
                      });
                    }
                    history.push(
                      `/${listBreadcrumb[0]}/${textSearch
                        .replace(/ /g, "")
                        .toLowerCase()}`
                    );
                  }}
                  className="listItemHover"
                >
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "15px",
                    }}
                  >
                    {dataLanguage !== "la"
                      ? (listFunctionOfGroup || []).find(
                          (el) => `${el.list_id}` === `${item}`
                        ).list_name_eng
                      : (listFunctionOfGroup || []).find(
                          (el) => `${el.list_id}` === `${item}`
                        ).list_name_lao}
                  </span>
                </Button>
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
