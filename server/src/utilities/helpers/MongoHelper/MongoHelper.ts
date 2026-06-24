export function GetMongoUrl(databaseName: string): string {
    const url = process.env.MONGO_URL as string;
    return `${url}${databaseName}`;
}