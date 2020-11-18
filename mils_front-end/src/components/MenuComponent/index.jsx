import React from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "antd";
import "./styles.scss";
import { useHistory } from "react-router-dom";
import { PATH } from "../../routers/Path";
import { useSelector, useDispatch } from "react-redux";
import { actionRedux } from "../../redux/actions";
import Cookies from "universal-cookie";

export default function MenuComponent(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const { listMenu } = props;
  const dispatch = useDispatch();
  const listBreadcrumb = useSelector(
    (state) => state.historyReducer.listBreadcrumb
  );
  let cookies = new Cookies();
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  return (
    <>
      {/* <div
        style={{
          marginBottom: "10px",
          padding: "2px 2px 10px 22px",
          borderBottom: "1px #f3f3f3 solid",
        }}
      >
        <span style={{ color: "#98a6ad", fontWeight: "600", fontSize: "11px" }}>
          MENU NAVIGATION
        </span>
      </div> */}
      <Menu
        mode="inline"
        selectedKeys={[`${listBreadcrumb[0]}`]}
        style={{ flex: 1, borderRight: 0 }}
      >
        <Menu.Item
          key={"dashboard"}
          onClick={() => {
            history.push(PATH.DASHBOARD);
            dispatch({
              type: actionRedux.FETCH_DATA_BREADCRUMB,
              payload: {
                listBreadcrumb: [`dashboard`],
                id: "dashboard",
              },
            });
          }}
        >
          <i
            className="fas fa-chart-line"
            style={{ color: "#6e768e", width: "25px" }}
          ></i>
          <span className="ml-2" style={{ fontSize: "16px", color: "#6e768e" }}>
            {t("DASHBOARD")}
          </span>
        </Menu.Item>
        {(listMenu || []).map((elemente) => {
          const idMenuString = elemente.header_name_eng
            .replace(/ /g, "")
            .toLowerCase();
          return (
            <Menu.Item
              key={idMenuString}
              onClick={() => {
                if (idMenuString === "logout") {
                  history.push("/login");
                  cookies.remove("user");
                } else {
                  history.push(PATH[idMenuString]);
                  dispatch({
                    type: actionRedux.FETCH_DATA_BREADCRUMB,
                    payload: {
                      listBreadcrumb: [`${idMenuString}`],
                      id: elemente.header_id,
                    },
                  });
                }
              }}
            >
              <i
                className={elemente.icon}
                style={{ color: "#6e768e", width: "25px" }}
              ></i>
              <span
                className="ml-2"
                style={{ fontSize: "16px", color: "#6e768e" }}
              >
                {dataLanguage === "la"
                  ? elemente.header_name_lao
                  : elemente.header_name_eng}
              </span>
            </Menu.Item>
          );
        })}
      </Menu>
    </>
  );
}
