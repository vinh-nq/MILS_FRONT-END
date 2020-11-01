import React, { useState } from "react";
import "./styles.scss";
import { Breadcrumb, Drawer, Layout } from "antd";
import MenuComponent from "../../components/MenuComponent";
import NavbarComponent from "../../components/NavbarComponent";
import SiderUserInformation from "../../components/SiderUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import upperCase from "lodash/upperCase";
import { useTranslation } from "react-i18next";
import { actionRedux } from "../../redux/actions";
import { PATH_BREADCRUM } from "../../routers/Path";

export default function MainLayout(props) {
  const [onBroken, setBroken] = useState(false);
  const [visible, setVisible] = useState(false);
  const listBreadcrumb = useSelector(
    (state) => state.historyReducer.listBreadcrumb
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const { Content, Sider } = Layout;

  useEffect(() => {
    const linkURL = history.location.pathname;
    if (linkURL && linkURL !== "/") {
      dispatch({
        type: actionRedux.FETCH_DATA_BREADCRUMB,
        payload: history.location.pathname.split("/").filter((el) => el),
      });
    } else {
      dispatch({
        type: actionRedux.FETCH_DATA_BREADCRUMB,
        payload: ["dashboard"],
      });
    }
  }, [dispatch, history.location.pathname]);

  return (
    <>
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
              <MenuComponent />
            </div>
          </Sider>
          <Layout style={{ padding: "0 24px 24px"}}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {listBreadcrumb.map((el) => (
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
            <MenuComponent />
          </div>
        </Sider>
      </Drawer>
    </>
  );
}
