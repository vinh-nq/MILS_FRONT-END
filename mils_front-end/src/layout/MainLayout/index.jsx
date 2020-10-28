import React from "react";
import "./styles.scss";
import { Layout, Breadcrumb } from "antd";
import MenuComponent from "../../components/MenuComponent";

export default function MainLayout(props) {
  const { Header, Content, Sider } = Layout;
  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="header">
        <div className="logo" />
      </Header>
      <Layout>
        <Sider width={250} className="site-layout-background" breakpoint="lg">
          <div style={{ backgroundColor: "#fff" }}>AAAA</div>
          <MenuComponent />
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
