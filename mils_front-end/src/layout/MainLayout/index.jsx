import React, { useState } from "react";
import "./styles.scss";
import { Breadcrumb, Drawer, Layout } from "antd";
import MenuComponent from "../../components/MenuComponent";
import NavbarComponent from "../../components/NavbarComponent";
import SiderUserInformation from "../../components/SiderUserInfo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useTranslation } from "react-i18next";
import { actionRedux } from "../../redux/actions";
import { PATH_BREADCRUM } from "../../routers/Path";
import menuManagementApi from "../../api/menuManagementApi";
import upperCase from "lodash/upperCase";

export default function MainLayout(props) {
  const [onBroken, setBroken] = useState(false);
  const [visible, setVisible] = useState(false);
  const [listMenu, setListMenu] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const { Content, Sider } = Layout;
  const [checkLoading, setCheckLoading] = useState(false);

  useEffect(() => {
    const fetchDataMenu = async () => {
      setCheckLoading(true);
      await menuManagementApi.GetMenu({}).then((res) => {
        setListMenu(res.data.Data);
        setCheckLoading(false);
        const linkURL = history.location.pathname;
        if (linkURL && linkURL !== "/") {
          dispatch({
            type: actionRedux.FETCH_DATA_BREADCRUMB,
            payload: {
              listBreadcrumb: history.location.pathname
                .split("/")
                .filter((el) => el),
              id: (
                res.data.Data.find(
                  (el) =>
                    el.header_name_eng.replace(/ /g, "").toLowerCase() ===
                    history.location.pathname.split("/").filter((el) => el)[0]
                ) || {}
              ).header_id,
            },
          });
        } else {
          dispatch({
            type: actionRedux.FETCH_DATA_BREADCRUMB,
            payload: {
              listBreadcrumb: [`dashboard`],
              id: "dashboard",
            },
          });
        }
      });
    };
    fetchDataMenu();
  }, [dispatch, history.location.pathname]);

  return (
    <>
      {checkLoading ? (
        <LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />
      ) : null}
      <Layout style={{ height: "100vh" }}>
        <NavbarComponent
          visible={visible}
          setVisible={setVisible}
          onBreakPoint={onBroken}
        />
        <Layout>
          <Sider
            width={250}
            className="site-layout-background"
            breakpoint="lg"
            onBreakpoint={(broken) => {
              setBroken(broken);
              if (!broken) {
                setVisible(broken);
              }
            }}
            collapsedWidth={0}
            trigger={null}
          >
            <div className="d-flex flex-column h-100">
              <SiderUserInformation />
              <MenuComponent listMenu={listMenu} />
            </div>
          </Sider>
          <Layout id="my-layout" style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {(history.location.pathname.split("/").filter((el) => el).length
                ? history.location.pathname.split("/").filter((el) => el)
                : ["dashboard"]
              ).map((el) => (
                <Breadcrumb.Item
                  key={el}
                  className="pointer"
                  onClick={() => {
                    history.push(`${PATH_BREADCRUM[el]}`);
                  }}
                >
                  {t(upperCase(el))}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
              }}
            >
              {props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <Drawer
        placement="left"
        closable={false}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        key="left"
        width={251}
        bodyStyle={{ padding: 0 }}
      >
        <Sider width={250} className="site-layout-background">
          <div className="d-flex flex-column h-100">
            <SiderUserInformation />
            <MenuComponent listMenu={listMenu} />
          </div>
        </Sider>
      </Drawer>
    </>
  );
}
