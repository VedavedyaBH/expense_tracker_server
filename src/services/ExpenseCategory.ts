const { PrismaClient } = require("@prisma/client");
import { logger } from "../util/logger";

const prisma = new PrismaClient();

export async function validateOrAddCategory(category: string) {
    try {
        const exists = await findCategory(category);
        if (exists) {
            return exists;
        }

        logger.info("Creating new category");

        const newCategory = prisma.expenseCategory.create({
            data: {
                name: category,
            },
        });
        return newCategory;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function findCategory(category: string) {
    try {
        logger.info("Checking if category already exists in the list");

        const result = await prisma.expenseCategory.findUnique({
            where: {
                name: category,
            },
        });
        return result;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
