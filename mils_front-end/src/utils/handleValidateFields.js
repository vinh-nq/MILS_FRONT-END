import { paserValue } from "./formatNumber";

export const handleValidateFields = (rule, value, objectValidate, t) => {
  if (objectValidate.checkEmpty && !value) {
    if (value !== 0) {
      return Promise.reject(
        `${t(objectValidate.nameLabel)} ${t("is_not_empty")}`
      );
    }
  }

  if (!objectValidate.checkEmpty && !value) {
    return Promise.resolve();
  }

  if (!value) {
    return Promise.reject();
  }
  const valueParser = paserValue(`${value}`);
  if (
    objectValidate.type === "number" &&
    (valueParser === "-" || valueParser === ".")
  ) {
    return Promise.reject(
      `${t(objectValidate.nameLabel)} ${t("is_not_number")}`
    );
  }
  if (
    objectValidate.type === "number" &&
    !RegExp("^[-]?[0-9]*$").test(valueParser)
  ) {
    if (Number(Math.ceil(valueParser)) !== Number(valueParser)) {
      return Promise.reject(
        `${t(objectValidate.nameLabel)} ${t("is_not_number")}`
      );
    }
  }
  if (
    objectValidate.minValue !== null &&
    valueParser < objectValidate.minValue
  ) {
    return Promise.reject(
      `${t(objectValidate.nameLabel)} ${t("must_be_greater_than")} ${
        objectValidate.minValue
      }.`
    );
  }
  if (
    objectValidate.maxValue !== null &&
    valueParser > objectValidate.maxValue
  ) {
    return Promise.reject(
      `${t(objectValidate.nameLabel)} ${t("must_be_less_than")} ${
        objectValidate.maxValue
      }.`
    );
  }
  if (
    objectValidate.minLength !== null &&
    [...valueParser].length < objectValidate.minLength
  ) {
    return Promise.reject(
      `${t(objectValidate.nameLabel)} ${t("minimum")} ${
        objectValidate.minLength
      } ${t("character")}`
    );
  }
  if (
    objectValidate.maxLength !== null &&
    [...valueParser].length > objectValidate.maxLength
  ) {
    return Promise.reject(
      `${t(objectValidate.nameLabel)} ${t("maximum")} ${
        objectValidate.maxLength
      } ${t("character")}`
    );
  }
  if (
    objectValidate.checkDuplicate &&
    objectValidate.arrayDuplicate.includes(valueParser.toLowerCase().trim())
  ) {
    if (valueParser.toLowerCase() !== objectValidate.authCodeOld) {
      return Promise.reject(
        `${t(objectValidate.nameLabel)} ${t("already_exists")}`
      );
    }
  }
  return Promise.resolve();
};
