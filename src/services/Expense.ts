import { dateObj, today } from "../util/Constants";
import { logger } from "../util/logger";
import { findUser } from "./User";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function addExpense(data: any, userId: any) {
    try {
        logger.info("Creating expense:");

        const user_id = await findUser(userId);

        return prisma.expense.create({
            data: {
                description: data.description,
                amount: parseFloat(data.amount),
                date: dateObj(data.date) || dateObj(today),
                user: {
                    connect: {
                        id: user_id?.id,
                    },
                },
                ExpenseCategory: {
                    connect: {
                        id: data.expenseCategoryId,
                    },
                },
            },
        });
    } catch (error: any) {
        logger.error("Error creating expense:", error.message);
        throw new Error(error);
    }
}

export async function updateExpense(data: any) {
    try {
        const validExp = await findExpense(data);

        if (!validExp) {
            throw new Error("Invalid expense");
        }

        const updatedExp = await prisma.expense.update({
            data: {},
        });
    } catch (error: any) {}
}

export async function findExpense(data: any) {
    try {
        const exp = await prisma.expense.findMany({
            where: {
                amount: data.amount,
                date: data.date,
                description: data.description,
                expenseCategoryId: data.expenseCategoryId,
            },
        });

        return exp;
    } catch (error: any) {
        logger.error("Error finding expense:", error.message);
        throw new Error(error);
    }
}
export async function findExpenseByDate(startDate?: string, userId?: any) {
    try {
        const user_id = await findUser(userId);

        const expenses = await prisma.expense.findMany({
            where: {
                userId: user_id?.id,
                ...(startDate && {
                    date: {
                        gte: dateObj(startDate),
                        lte: dateObj(today),
                    },
                }),
            },
            orderBy: {
                date: "asc",
            },
        });

        return expenses;
    } catch (error: any) {
        logger.error("Error finding expenses:", error.message);
        throw new Error(error);
    }
}
