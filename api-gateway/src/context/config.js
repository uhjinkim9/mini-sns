import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const CLIENT_URL = process.env.CLIENT_URL;

export const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
export const BOARD_SERVICE_URL = process.env.BOARD_SERVICE_URL;
export const CHAT_SERVICE_URL = process.env.CHAT_SERVICE_URL;

export const JWT_KEY = process.env.JWT_KEY;
