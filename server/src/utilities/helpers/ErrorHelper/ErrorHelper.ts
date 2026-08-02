export function HasErrorName(error: unknown, name: string) {
    return error instanceof Error && error.name === name;
};