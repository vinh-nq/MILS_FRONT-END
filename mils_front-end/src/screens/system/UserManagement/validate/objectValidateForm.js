export const objectValidateForm = {
  UserId: {
    nameLabel: "UserId",
    // checkDuplicate: true,
    type: "number",
  },
  DevideId: {
    nameLabel: "DevideId",
    // checkDuplicate: true,
  },
  UserName: {
    maxLength: 30,
    checkEmpty: true,
    nameLabel: "UserName",
    checkDuplicate: true,
  },
  FullName: {
    maxLength: 30,
    checkEmpty: true,
    nameLabel: "FullName",
  },
  Email: {
    maxLength: 30,
    checkEmpty: true,
    nameLabel: "Email",
  },
  Mobilephone: {
    checkEmpty: true,
    nameLabel: "Mobilephone",
  },
  Department: {
    maxLength: 50,
    checkEmpty: true,
    nameLabel: "Department",
  },
  Type: {
    maxLength: 100,
    checkEmpty: true,
    nameLabel: "Type",
  },
  DeviceId: {
    maxLength: 100,
    checkEmpty: true,
    nameLabel: "DeviceId",
    checkDuplicate: true,
  },
  Password: {
    maxLength: 30,
    checkEmpty: true,
    nameLabel: "Password",
  },
};
