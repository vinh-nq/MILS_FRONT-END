import React from "react";
import { Result, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export default function Page404(props) {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle={t("404_PAGE")}
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.push("/");
          }}
        >
          {t("BACK_HOME_SCREEN")}
        </Button>
      }
    />
  );
}
