import React from "react";
import { Result, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { PATH } from "../../../../../routers/Path";

export default function SuccessScreen(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const { resetData } = props;
  return (
    <Result
      status="success"
      title={t("Successfully Add List Member To CCT Program!")}
      extra={[
        <Button
          key="console-back"
          onClick={() => {
            resetData();
          }}
        >
          {t("Add More Member")}
        </Button>,
        <Button
          type="primary"
          key="console-add"
          onClick={() => {
            history.push(PATH.LIST_OF_CCT_MEMBER);
          }}
        >
          {t("See List Member")}
        </Button>,
      ]}
    />
  );
}
