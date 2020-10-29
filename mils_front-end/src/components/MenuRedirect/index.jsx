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

  return (
    <div className="menu-breadcrum-container">
      <span className="title-content">{t("DATA_DICTIONARY")}</span>
      <Divider />
      <List
        header={null}
        footer={null}
        size="small"
        bordered
        dataSource={data.map((el) => el.text)}
        renderItem={(item) => {
          return (
            <List.Item
              key={item}
              className="d-flex flex-row align-items-center"
            >
              <div className="d-flex flex-row align-items-center">
                <i
                  className="fas fa-paper-plane"
                  style={{ color: "#82c91e", fontSize: "20px" }}
                ></i>
                <Button
                  type="link"
                  onClick={() => {
                    history.push(data.find((el) => el.text === item).url);
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
