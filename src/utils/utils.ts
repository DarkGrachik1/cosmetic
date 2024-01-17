export const pluralClinicalTrial = (value) => {
    if (value == -1) {
        return "Нет"
    } else if (value == 0) {
        return "Неуспешны"
    }

    return "Успешны"
}