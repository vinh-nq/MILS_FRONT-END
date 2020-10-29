import React from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "antd";
import {
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
import { useHistory } from "react-router-dom";
import { PATH } from "../../routers/Path";
import { useSelector } from "react-redux";

export default function MenuComponent(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const listBreadcrumb = useSelector(
    (state) => state.historyReducer.listBreadcrumb
  );

  return (
    <Menu
      mode="inline"
      selectedKeys={[`${listBreadcrumb[0]}`]}
      defaultOpenKeys={["sub1"]}
      style={{ flex: 1, borderRight: 0 }}
    >
      <Menu.Item
        key={"dashboard"}
        icon={<DesktopOutlined />}
        onClick={() => {
          history.push(PATH.DASHBOARD);
        }}
      >
        {t("DASHBOARD")}
      </Menu.Item>
      <Menu.Item
        key={"system"}
        icon={<SettingOutlined />}
        onClick={() => {
          history.push(PATH.SYSTEM);
        }}
      >
        {t("SYSTEM")}
      </Menu.Item>
      <Menu.Item key="DATA_DICTIONARY" icon={<DatabaseOutlined />}>
        {t("DATA_DICTIONARY")}
      </Menu.Item>
      <Menu.Item
        key={"householdManagement"}
        icon={<HomeOutlined />}
        onClick={() => {
          history.push(PATH.HOUSEHOLD_MANAGEMENT);
        }}
      >
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
    </Menu>
  );
}
