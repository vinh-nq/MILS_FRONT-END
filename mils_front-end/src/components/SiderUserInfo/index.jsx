import { Dropdown, Menu } from "antd";
import CaretDownOutlined from "@ant-design/icons/lib/icons/CaretDownOutlined";
import React from "react";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import LogoutOutlined from "@ant-design/icons/lib/icons/LogoutOutlined";
import { useTranslation } from "react-i18next";
import linkImageLogo from "./apisLogo.jpg";

function SiderUserInformation() {
  const { t } = useTranslation();
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <UserOutlined className="mr-2 font-16 ant--icon__middle" />{" "}
        <span className="font-weight-400">{t("PROFILE")}</span>
      </Menu.Item>
      <Menu.Item key="1">
        <LogoutOutlined className="mr-2 font-16 ant--icon__middle" />{" "}
        <span className="font-weight-400">{t("LOGOUT")}</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="user-info-sidebar w-100">
      <div className="mb-5">
        <img src={linkImageLogo} alt="apisLogo" />
      </div>
      <p className="text-white font-12 mb-0 font-weight-500">admin</p>
      <div className="d-flex">
        <span className="text-white font-12 mb-0 font-weight-500">
          admin@apislaos.com
        </span>
        <Dropdown className="ml-auto" overlay={menu}>
          <CaretDownOutlined className="text-white font-weight-bold" />
        </Dropdown>
      </div>
    </div>
  );
}

export default SiderUserInformation;
