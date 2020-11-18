import React from "react";
import { Result, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export default function Page403(props) {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <Result
      status="403"
      title="403"
      subTitle={t("403_PAGE")}
      extra={
        <>
          <Button
            type="primary"
            onClick={() => {
              history.push("/");
            }}
          >
            {t("BACK_HOME_SCREEN")}
          </Button>
          <Button
            type="primary"
            onClick={() => {
              history.push("/login");
            }}
          >
            {t("BACK_LOGIN")}
          </Button>
        </>
      }
    />
  );
}
