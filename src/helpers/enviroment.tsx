export function GetApiUrl(): string {
    const env = process.env.REACT_APP_API_URL_DEVELOPMENT?.toString().toLowerCase().trim();
    return env as string;
}  