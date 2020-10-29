import React from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "antd";
import {
  LogoutOutlined,
  DesktopOutlined,
  MailOutlined,
  SettingOutlined,
  DatabaseOutlined,
  HomeOutlined,
  GroupOutlined,
  BankOutlined,
  SnippetsOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import "./styles.scss";

export default function MenuComponent(props) {
  const { t } = useTranslation();

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ flex: 1, borderRight: 0 }}
    >
      <Menu.Item key="DASHBOARD" icon={<DesktopOutlined />}>
        {t("DASHBOARD")}
      </Menu.Item>
      <Menu.Item key="SYSTEM" icon={<SettingOutlined />}>
        {t("SYSTEM")}
      </Menu.Item>
      <Menu.Item key="DATA_DICTIONARY" icon={<DatabaseOutlined />}>
        {t("DATA_DICTIONARY")}
      </Menu.Item>
      <Menu.Item key="HOUSEHOLD_MANAGEMENT" icon={<HomeOutlined />}>
        {t("HOUSEHOLD_MANAGEMENT")}
      </Menu.Item>
      <Menu.Item key="CCT_PROGRAM" icon={<GroupOutlined />}>
        {t("CCT_PROGRAM")}
      </Menu.Item>
      <Menu.Item key="PAYMENT" icon={<BankOutlined />}>
        {t("PAYMENT")}
      </Menu.Item>
      <Menu.Item key="GRIEVANCE_MANAGEMENT" icon={<SnippetsOutlined />}>
        {t("GRIEVANCE_MANAGEMENT")}
      </Menu.Item>
      <Menu.Item key="REPORT_BI" icon={<FileDoneOutlined />}>
        {t("REPORT_BI")}
      </Menu.Item>
      <Menu.Item key="SMS_BROADCAST" icon={<MailOutlined />}>
        {t("SMS_BROADCAST")}
      </Menu.Item>
      <Menu.Item key="LOGOUT" icon={<LogoutOutlined />}>
        {t("LOGOUT")}
      </Menu.Item>
    </Menu>
  );
}
