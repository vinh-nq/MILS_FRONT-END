import React from "react";
import { Dropdown, Menu, Image } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  CaretDownOutlined,
} from "@ant-design/icons/lib/icons";
import { useTranslation } from "react-i18next";
import linkImageLogo from "./team-work.jpg";
import Cookies from "universal-cookie";

function SiderUserInformation() {
  const { t } = useTranslation();
  let cookies = new Cookies();
  cookies = cookies.get("user");

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
      <div className="w-100 d-flex flex-row align-items-center justify-content-center imageLogo">
        <Image
          width={100}
          height={100}
          style={{ borderRadius: "50%" }}
          src={linkImageLogo}
          alt="apisLogo"
          className="pointer"
        />
      </div>
      <div className="d-flex align-items-center justify-content-center mt-1">
        <Dropdown className="ml-auto" overlay={menu}>
          <span
            className="d-flex w-100 align-items-center justify-content-center pointer"
            onClick={(e) => e.preventDefault()}
            style={{ color: "#fff", fontWeight: "500", fontSize: "17px" }}
          >
            {cookies.fullName}
            <CaretDownOutlined className="text-white font-weight-bold pointer ml-2" />
          </span>
        </Dropdown>
      </div>
    </div>
  );
}

export default SiderUserInformation;
