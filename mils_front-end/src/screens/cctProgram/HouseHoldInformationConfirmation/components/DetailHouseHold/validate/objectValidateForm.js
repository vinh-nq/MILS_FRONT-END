export const objectValidateForm = {
    checkString: (length, checkEmpty, nameLabel) => (
        {
            maxLength: length,
            checkEmpty: checkEmpty,
            nameLabel: nameLabel,
        }
    ),
    checkNumber: (maxValue, minValue, nameLabel, checkEmpty) => (
        {
            maxValue: maxValue,
            minValue: minValue,
            nameLabel: nameLabel,
            checkEmpty: checkEmpty,
            type: "number"
        }
    )
};
