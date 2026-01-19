const BASE_URL = process.env.NODE_ENV === "production"
    ? "https://messagingapp-tibe.onrender.com/api/v1"
    : "http://localhost:8080/api/v1";

export const USER_API_ENDPOINT = `${BASE_URL}/user`;
export const MSG_API_ENDPOINT = `${BASE_URL}/message`;
export const BASE_API_ENDPOINT = BASE_URL;