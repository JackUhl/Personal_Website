import { Months } from "../../models/enums/Months"

export default class DateRenderer {
    public static renderPartialDate(date: Date) {
        return (`${Months[date.getMonth()]} ${date.getFullYear()}`);
    }

    public static renderFullDate(date: Date) {
        return (`${Months[date.getMonth()]} ${date.getDay()} ${date.getFullYear()}`);
    }
}