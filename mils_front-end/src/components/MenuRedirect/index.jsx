import React, {useState} from "react";
import { Button, Divider, List } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import menuManagementApi from "../../api/menuManagementApi";
import "./styles.scss";
import { useEffect } from "react";
import * as _ from "lodash";
import LoadingSpinner from "../LoadingSpinner";

export default function MenuRedirect(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const [checkLoading, setCheckLoading] = useState(false);
  const [listFunctionOfGroup, setListFunctionOfGroup] = useState([]);
  const idItem = useSelector((state) => state.historyReducer.id);
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
        });
    };
    fetchDataFunction();
  }, [props.location, idItem]);

  return (
    <div className="menu-breadcrum-container">
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <span className="h5">
        {t(
          _.upperCase(
            history.location.pathname.replace(/\//g, "") || "DASHBOARD"
          )
        )}
      </span>
      <Divider />
      <List
        header={null}
        footer={null}
        size="small"
        bordered
        dataSource={(listFunctionOfGroup || []).map((el) =>
          dataLanguage === "la" ? el.list_name_lao : el.list_name_eng
        )}
        renderItem={(item) => {
          return (
            <List.Item
              key={item}
              className="d-flex flex-row align-items-center"
            >
              <div className="d-flex flex-row align-items-center">
                <i
                  className="far fa-folder"
                  style={{
                    color: "#adb5bd",
                    fontSize: "20px",
                  }}
                ></i>
                <Button
                  type="link"
                  onClick={() => {
                    const textSearch = (listFunctionOfGroup || []).find(
                      (el) => {
                        if (dataLanguage === "la") {
                          return el.list_name_lao === item;
                        } else {
                          return el.list_name_eng === item;
                        }
                      }
                    ).list_name_eng;
                    history.push(
                      `/${listBreadcrumb[0]}/${textSearch
                        .replace(/ /g, "")
                        .toLowerCase()}`
                    );
                  }}
                >
                  <span style={{ fontWeight: "500", fontSize: "15px" }}>
                    {item}
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
