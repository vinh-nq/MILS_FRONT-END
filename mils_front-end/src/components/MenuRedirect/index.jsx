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
      text: "Household registration",
      url: "/householdManagement/householdRegistration",
    },
    {
      text: "Household poverty assessment",
      url: "/householdManagement/householdPoverty",
    },
    {
      text: "Generation of PMT scorecard",
      url: "/householdManagement/genarationOfPMT",
    },
  ];

  const dataSystem = [
    {
      text: "Function list management",
      url: "/system/functionListManagement",
    },
    {
      text: "Rights Management",
      url: "/system/rightsManagement",
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

  return (
    <div className="menu-breadcrum-container">
      <span className="h5">{t("DATA_DICTIONARY")}</span>
      <Divider />
      <List
        header={null}
        footer={null}
        size="small"
        bordered
        dataSource={dataSystem.map((el) => el.text)}
        renderItem={(item) => {
          return (
            <List.Item
              key={item}
              className="d-flex flex-row align-items-center"
            >
              <div className="d-flex flex-row align-items-center">
                <i
                  className="fas fa-file-alt"
                  style={{ color: "#f79602", fontSize: "20px" }}
                ></i>
                <Button
                  type="link"
                  onClick={() => {
                    history.push(dataSystem.find((el) => el.text === item).url);
                  }}
                >
                  <span style={{ textDecorationLine: "underline" }}>
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