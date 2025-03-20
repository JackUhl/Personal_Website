export default class DateRenderer {
    public static renderPartialDate(date: Date) {
        return (`${date.toLocaleDateString("en-US", {month: "long"})} ${date.getFullYear()}`);
    }

    public static renderFullDate(date: Date) {
        return (`${date.toLocaleDateString("en-US", {month: "long"})} ${date.getDay()} ${date.getFullYear()}`);
    }
}

