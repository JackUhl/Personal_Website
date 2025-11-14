export const isAuthorized = (id: string) => {
    return id == process.env.GOOGLE_AUTHORIZED_ID as string;
}