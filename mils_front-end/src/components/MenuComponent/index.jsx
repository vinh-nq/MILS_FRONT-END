import React from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "antd";
import "./styles.scss";
import { useHistory } from "react-router-dom";
import { PATH } from "../../routers/Path";
import { useSelector, useDispatch } from "react-redux";
import { actionRedux } from "../../redux/actions";

export default function MenuComponent(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const { listMenu } = props;
  const dispatch = useDispatch();
  const listBreadcrumb = useSelector(
    (state) => state.historyReducer.listBreadcrumb
  );
  const dataLanguage =
    useSelector((state) => state.languageReducer.objectLanguage.value) ||
    localStorage.getItem("i18nextLng");

  return (
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
        <i className="fas fa-chart-line"></i>
        <span className="ml-2">{t("DASHBOARD")}</span>
      </Menu.Item>
      {(listMenu || []).map((elemente) => {
        const idMenuString = elemente.header_name_eng
          .replace(/ /g, "")
          .toLowerCase();
        return (
          <Menu.Item
            key={idMenuString}
            onClick={() => {
              history.push(PATH[idMenuString]);
              dispatch({
                type: actionRedux.FETCH_DATA_BREADCRUMB,
                payload: {
                  listBreadcrumb: [`${idMenuString}`],
                  id: elemente.header_id,
                },
              });
            }}
          >
            <i className={elemente.icon}></i>
            <span className="ml-2">
              {dataLanguage === "la"
                ? elemente.header_name_lao
                : elemente.header_name_eng}
            </span>
          </Menu.Item>
        );
      })}
    </Menu>
  );
}
