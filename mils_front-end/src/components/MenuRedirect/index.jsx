import React from "react";
import { Button, Divider, List } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import "./styles.scss";

export default function MenuRedirect(props) {
  const { t } = useTranslation();
  const history = useHistory();

  const data = [
    {
      text: t("HOUSEHOLD_REGISTRATION"),
      url: "/householdManagement/householdRegistration",
    },
    {
      text: t("HOUSEHOLD_POVERTY"),
      url: "/householdManagement/householdPoverty",
    },
    {
      text: t("GENERATION_OF_PMT"),
      url: "/householdManagement/genarationOfPMT",
    },
  ];

  const dataSystem = [
    {
      text: "Function list management",
      url: "/system/functionListManagement",
    },
    {
      text: "Role Management",
      url: "/system/roleManagement",
    },
    {
      text: "User Management",
      url: "/system/userManagement",
    },
    {
      text: "System parameters",
      url: "/system/systemsParameters",
    },
    {
      text: "Backup Database",
      url: "/system/backupDatabase",
    },
  ];

  // console.log();

  const filterData = () => {
    if (history.location.pathname === "/system") {
      return dataSystem;
    } else {
      return data;
    }
  };

  return (
    <div className="menu-breadcrum-container">
      <span className="h5">{t("DATA_DICTIONARY")}</span>
      <Divider />
      <List
        header={null}
        footer={null}
        size="small"
        bordered
        dataSource={filterData().map((el) => el.text)}
        renderItem={(item) => {
          return (
            <List.Item
              key={item}
              className="d-flex flex-row align-items-center"
            >
              <div className="d-flex flex-row align-items-center">
                <i
                  className="far fa-folder"
                  style={{
                    color: "#adb5bd",
                    fontSize: "20px",
                  }}
                ></i>
                <Button
                  type="link"
                  onClick={() => {
                    history.push(
                      filterData().find((el) => el.text === item).url
                    );
                  }}
                >
                  <span style={{ fontWeight: "500", fontSize: "15px" }}>
                    {item}
                  </span>
                </Button>
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
