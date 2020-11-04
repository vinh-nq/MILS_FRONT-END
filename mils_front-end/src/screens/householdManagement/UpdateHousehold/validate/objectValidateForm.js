export const objectValidateForm = {
    checkString: (length, checkEmpty, nameLabel) => (
        {
            maxLength: length,
            checkEmpty: checkEmpty,
            nameLabel: nameLabel,
        }
    ),
    checkNumber: (length, minValue, nameLabel, checkEmpty) => (
        {
            maxLength: length,
            minValue: minValue,
            nameLabel: nameLabel,
            checkEmpty: checkEmpty,
            type: "number"
        }
    ),
    telephone: {
        checkEmpty: true,
        nameLabel: "TELEPHONE",
    },
    Department: {
        maxLength: 50,
        checkEmpty: true,
        nameLabel: "Department",
    },
    Type: {
        maxLength: 1,
        checkEmpty: true,
        nameLabel: "Type",
    },
    Password: {
        maxLength: 30,
        checkEmpty: true,
        nameLabel: "Password",
    },
};
