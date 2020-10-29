import React, {useState} from "react";
import "./styles.scss";
import {Breadcrumb, Layout} from "antd";
import MenuComponent from "../../components/MenuComponent";
import NavbarComponent from "../../components/NavbarComponent";
import SiderUserInformation from "../../components/SiderUserInfo";

export default function MainLayout(props) {
    const [onBroken, setBroken] = useState(false);
    const {Content, Sider} = Layout;

    return (
        <Layout style={{height: "100vh"}}>
            <NavbarComponent/>
            <Layout>
                <Sider width={250} className="site-layout-background" breakpoint="lg" onBreakpoint={broken => {
                    setBroken(broken);
                }}>
                   <div className="d-flex flex-column h-100">
                       {
                           onBroken ? null : <SiderUserInformation />
                       }
                       <MenuComponent onBreakpoint={onBroken}/>
                   </div>
                </Sider>
                <Layout style={{padding: "0 24px 24px"}}>
                    <Breadcrumb style={{margin: "16px 0"}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280
                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
