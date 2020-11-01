import { paserValue } from "./formatNumber";

export const handleValidateFrom = (rule, value, objectValidate, t) => {
  if (objectValidate.checkEmpty && !value) {
    if (value !== 0) {
      return Promise.reject(
        `${t(objectValidate.nameLabel)} ${t("is_not_empty")}`
      );
    }
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
    (objectValidate.minValue !== null) &
    (valueParser < objectValidate.minValue)
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

// export const handleValidateArray = (rule, value, objectValidate, t) => {
//   if (objectValidate.checkArrayEmpty && !value) {
//     if (value !== 0) {
//       return Promise.reject(
//         `${t(objectValidate.nameLabel)} ${t("is_not_empty")}`
//       );
//     }
//   }
//   if (!value) {
//     return Promise.reject();
//   }
//   if (objectValidate.checkArrayEmpty && value.length === 0) {
//     return Promise.reject(
//       `${t(objectValidate.nameLabel)} ${t("is_not_empty")}`
//     );
//   }
//   return Promise.resolve();
// };

// export const handleValidateBoolean = (value, objectValidate) => {
//   if (objectValidate.checkEmpty) {
//     if (value === undefined) {
//       return true;
//     } else {
//       if (!value) {
//         return false;
//       }
//     }
//   }
//   if (!value) {
//     return true;
//   }
//   const valueParser = paserValue(`${value}`);
//   if (
//     objectValidate.type === "number" &&
//     !RegExp("^[-]?[0-9.]*$").test(valueParser)
//   ) {
//     return false;
//   }
//   if (
//     (objectValidate.minValue !== null) &
//     (valueParser < objectValidate.minValue)
//   ) {
//     return false;
//   }
//   if (
//     objectValidate.maxValue !== null &&
//     valueParser > objectValidate.maxValue
//   ) {
//     return false;
//   }
//   if (
//     objectValidate.maxLength !== null &&
//     [...valueParser].length > objectValidate.maxLength
//   ) {
//     return false;
//   }
//   return true;
// };
