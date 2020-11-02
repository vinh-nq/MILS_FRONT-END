export const objectValidateForm = {
    checkString: (length, checkEmpty, nameLabel) => (
        {
            maxLength: length,
            checkEmpty: checkEmpty,
            nameLabel: nameLabel,
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
