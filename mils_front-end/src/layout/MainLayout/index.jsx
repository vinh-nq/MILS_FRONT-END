import React, { useState } from "react";
import "./styles.scss";
import { Breadcrumb, Drawer, Layout } from "antd";
import MenuComponent from "../../components/MenuComponent";
import NavbarComponent from "../../components/NavbarComponent";
import SiderUserInformation from "../../components/SiderUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useTranslation } from "react-i18next";
import { actionRedux } from "../../redux/actions";
import { PATH, PATH_BREADCRUM } from "../../routers/Path";
import menuManagementApi from "../../api/menuManagementApi";
import upperCase from "lodash/upperCase";
import { messageError } from "../../components/MessageError";

export default function MainLayout(props) {
  const [onBroken, setBroken] = useState(false);
  const [visible, setVisible] = useState(false);
  const [listMenu, setListMenu] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const { Content, Sider } = Layout;
  const [checkLoading, setCheckLoading] = useState(false);
  const dataStatusPageOnDemend = useSelector((state) => {
    return {
      page: state.CMRequestReducer.page,
      keyword: state.CMRequestReducer.keyword,
      region: state.CMRequestReducer.region,
    };
  });
  const dataStatusPageOnRequested = useSelector((state) => {
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

  useEffect(() => {
    const fetchDataMenu = async () => {
      setCheckLoading(true);
      await menuManagementApi
        .GetMenu({})
        .then((res) => {
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
        })
        .catch((error) => {
          setCheckLoading(false);
          messageError({
            content: error,
            duration: 2,
          });
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
                    if (
                      `${PATH_BREADCRUM[el]}` ===
                      `${PATH["CREATE_LIST_HOUSEHOLD_REQUEST"]}`
                    ) {
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
                      return null;
                    }
                    if (
                      `${PATH_BREADCRUM[el]}` ===
                      `${PATH["HOUSEHOLD_REQUESTED"]}`
                    ) {
                      const region =
                        dataStatusPageOnRequested.region === "all"
                          ? ""
                          : `&region=${dataStatusPageOnRequested.region}`;
                      const keywordData = dataStatusPageOnRequested.keyword
                        ? `&keyword=${dataStatusPageOnRequested.keyword}`
                        : "";
                      const pageData = dataStatusPageOnRequested.page
                        ? `page=${dataStatusPageOnRequested.page}`
                        : "page=1";
                      history.push(
                        `${PATH.HOUSEHOLD_REQUESTED}?${pageData}${region}${keywordData}`
                      );
                      return null;
                    }
                    if (
                      `${PATH_BREADCRUM[el]}` === `${PATH["DISTRICT_APPROVE"]}`
                    ) {
                      const region =
                        dataDistrictApproveReducer.region === "all"
                          ? ""
                          : `&region=${dataDistrictApproveReducer.region}`;
                      const keywordData = dataDistrictApproveReducer.keyword
                        ? `&keyword=${dataDistrictApproveReducer.keyword}`
                        : "";
                      const pageData = dataDistrictApproveReducer.page
                        ? `page=${dataDistrictApproveReducer.page}`
                        : "page=1";
                      history.push(
                        `${PATH.DISTRICT_APPROVE}?${pageData}${region}${keywordData}`
                      );
                      return null;
                    }
                    if (
                      `${PATH_BREADCRUM[el]}` === `${PATH["CENTRAL_APPROVE"]}`
                    ) {
                      const region =
                        dataCentralApproveReducer.region === "all"
                          ? ""
                          : `&region=${dataCentralApproveReducer.region}`;
                      const keywordData = dataCentralApproveReducer.keyword
                        ? `&keyword=${dataCentralApproveReducer.keyword}`
                        : "";
                      const pageData = dataCentralApproveReducer.page
                        ? `page=${dataCentralApproveReducer.page}`
                        : "page=1";
                      history.push(
                        `${PATH.DISTRICT_APPROVE}?${pageData}${region}${keywordData}`
                      );
                      return null;
                    }
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
