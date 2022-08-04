import request from "../utils/axios";
import { SERVICE_URIS } from "../configs";

const quoteURI = SERVICE_URIS.quoteURI;
const quoteAPI = request(quoteURI);

export const getQuote = async () => {
    try {
        return await (await quoteAPI.get(quoteURI)).data;
    } catch (error) {
        throw error;
    }
}