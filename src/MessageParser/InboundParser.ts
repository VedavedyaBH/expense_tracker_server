import { getJsonFromMString } from "../util/gemini";
import { logger } from "../util/logger";

export async function parseBody(message: string) {
    try {
        if (message.trim() != "") {
            logger.info("Parsing the body");
            const response = await getJsonFromMString(message);
            return await response;
        } else {
            throw new Error("Message cannot be empty");
        }
    } catch (error: any) {
        throw new Error(error);
    }
}
