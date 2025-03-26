export function renderPartialDate(date: Date) {
    return (`${date.toLocaleDateString("en-US", {month: "long"})} ${date.getFullYear()}`);
}

export function renderFullDate(date: Date) {
    return (`${date.toLocaleDateString("en-US", {month: "long"})} ${date.getDay()} ${date.getFullYear()}`);
}

