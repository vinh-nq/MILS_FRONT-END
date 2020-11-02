export const objectValidateForm = {
  villageId : {
    maxLength: 3,
    minLength: 3,
    checkEmpty: true,
    nameLabel: "villageId",
    checkDuplicate: true,
  },
  villageLa: {
    maxLength: 40,
    checkEmpty: true,
    nameLabel: "villageLa",
  },
  villageEn: {
    maxLength: 40,
    checkEmpty: true,
    nameLabel: "villageEn",
  },
};
