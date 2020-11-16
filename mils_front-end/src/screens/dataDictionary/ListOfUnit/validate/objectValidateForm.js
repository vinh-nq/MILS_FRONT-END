export const objectValidateForm = {
  UnitId: {
    maxLength: 3,
    minLength: 3,
    checkEmpty: true,
  },
  UnitName: {
    maxLength: 2,
    checkEmpty: true,
    nameLabel: "UnitName",
  },
  UnitNameEng: {
    maxLength: 10,
    checkEmpty: true,
    nameLabel: "UnitNameEng",
  },
};
