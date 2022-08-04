import { config } from "dotenv"
config();

export const SERVICE_URIS = {
    quoteURI: String(process.env.QUOTE_API)
}

export const APP_VAR = {
    serverPort: Number(process.env.SERVER_PORT) || 4000,
    tokenSecret: process.env.TOKEN_SECRET
} 