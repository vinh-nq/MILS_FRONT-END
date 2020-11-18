import { message } from "antd";
import i18n from "i18next";

export const messageError = (props) => {
  message.error({
    content: (props.content || {}).message || i18n.t("Error"),
    key: props.key,
    duration: props.duration,
  });
};
