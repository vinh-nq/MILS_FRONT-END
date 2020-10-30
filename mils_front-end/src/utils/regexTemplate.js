export const regexTemplate = {
  CURRENCY: /^[0-9,.]+$/,
  NUMBER: /^[0-9]+$/,
  EMAIL: /[a-zA-Z0-9]+[\\.]?([a-zA-Z0-9]+)?[\\@][a-z]{2,9}[\\.][a-z]{2,5}([\\.][a-z]{2,5})?/,
  PHONE: /^[\\+]?[0-9]{10,20}$/,
};
