import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { logger } from "./logger";
import {
    expenseCategories,
    operation,
    RequestBody,
    today,
    type,
} from "./Constants";

dotenv.config();
const key = process.env.GEMINI_API_KEY;

if (!key || typeof key !== "string" || key.length === 0) {
    throw new Error(
        "Invalid GEMINI_API_KEY. Please check your environment variable."
    );
}

logger.info("Starting to initialize GoogleGenerativeAI...");

let genAI: any;
try {
    genAI = new GoogleGenerativeAI(key);
    logger.info("GoogleGenerativeAI initialized successfully.");
} catch (error: any) {
    logger.error("Error initializing GoogleGenerativeAI:", error);
    throw new Error(
        "Failed to initialize GoogleGenerativeAI: " + error.message
    );
}

export async function getJsonFromMString(content: string) {
    try {
        const model = await genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
        I will provide a sentence, often written in casual or texting language. Based on this sentence, generate a JSON object using the provided structure: ${JSON.stringify(
            RequestBody
        )}.
        For the "Type" field, select a value from the following options: ${JSON.stringify(
            type
        )}.
        For the "operation" field, select a value from the following options: ${JSON.stringify(
            operation
        )}.
        For the "transaction_date" field, based on the sentence, populate it.
        Populate all fields as accurately as possible. Pay special attention to the "amount" field, which may not explicitly mention the currency. Today's date is ${today}.
        If no information related to expense date, use ${today} as expense date.
        
        For category field, choose the most releant from this list - ${expenseCategories}
        Extract any other relevant information from the sentence. If a field is irrelevant or missing, set it to null. Return the result as a JSON object.
        
        Sentence: "${content}"
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response.candidates[0].content.parts[0]
            .text;
        const jsonString = await response
            .replace(/```(JSON|json)\n|\n```/g, "")
            .trim();

        return await JSON.parse(jsonString);
    } catch (error: any) {
        logger.error("Error generating content:", error);
        throw new Error("Failed to generate content: " + error.message);
    }
}

export async function setJSONtoString(content: string) {
    try {
        const model = await genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
        Given the following content (which is an array of JSON objects):
        ${JSON.stringify(content)}

        Using description and amount fields:
        - Create a summary message with the following:
            - Summary of total expenses
            - Highest expense
            Do not use description as it is. Create a sentence which relates to that description. Create a category if required. Give overall summary. Add a suggestion as well on how to go about spending.
        Ignore other fields. Do not add currency details like dollars, rupees etc
        `;

        const result = await model.generateContent(prompt);

        const response =
            result.response.candidates[0]?.content?.parts[0]?.text ||
            "No response generated";

        const formattedResponse = response
            .replace(/\*/g, "")
            .replace(/\n+/g, "\n")
            .trim();

        return formattedResponse;
    } catch (error: any) {
        logger.error("Error generating content:", error);
        throw new Error("Failed to generate content: " + error.message);
    }
}
