import React from "react";
import "./styles.scss";
import { Layout, Breadcrumb } from "antd";
import MenuComponent from "../../components/MenuComponent";
import NavbarComponent from "../../components/NavbarComponent";

export default function MainLayout(props) {
  const { Content, Sider } = Layout;
  // Header,
  return (
    <Layout style={{ height: "100vh" }}>
      <NavbarComponent />
      <Layout>
        <Sider width={230} className="site-layout-background" breakpoint="lg">
          <div style={{ height: "100%" }} className="d-flex flex-column">
            <div style={{ height: "100px", backgroundColor: "red" }}>AAAA</div>
            <MenuComponent />
          </div>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
