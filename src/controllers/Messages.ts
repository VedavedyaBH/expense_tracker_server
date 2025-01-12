import { Request, Response } from "express";
import { parseBody } from "../MessageParser/InboundParser";
import { addExpense, findExpenseByDate } from "../services/Expense";
import { logger } from "../util/logger";
import { validateOrAddCategory } from "../services/ExpenseCategory";
import { addJSONboilerPlate, operation, today } from "../util/Constants";
import { setJSONtoString } from "../util/gemini";
import { addUser, findUser } from "../services/User";

export async function queryHandler(req: Request, res: Response): Promise<void> {
    const { data } = req.body;
    try {
        logger.info("Query Handler");
        console.log(data.userId);

        const user = await findUser(data.userId);
        if (!user) {
            await addUser(data.userId);
        }

        let query: any;
        let response: any;

        if (!data.operation) {
            query = await parseBody(data.content);
        }
        if (!query) {
            query = {};
            query.type = "Expense";
            query.operation = "VIEW";
        }

        if (query.type === "Expense") {
            logger.info("Expense Handler");
            let category: any;
            if (query.operation != "VIEW") {
                category = await validateOrAddCategory(query.category);
            }
            if (query.operation === "ADD") {
                const addQuery = await populateQueryPropsForNewExpense(
                    query,
                    category
                );
                response = await addExpense(addQuery, data.userId);
                res.status(201).send({ response });
            } else if (query.operation === "VIEW") {
                let queryDate = calculateStartDate(today, data.operation);
                response = await findExpenseByDate(queryDate, data.userId);
                const summary = await setJSONtoString(response);
                res.status(200).send(summary);
            } else {
                res.status(201).send(
                    "You can just add and retrive your expenses for now. Thank you!"
                );
            }
        }
    } catch (error: any) {
        console.log(error.message);

        logger.error("Error processing query:", error.message);
        res.status(500).send({ message: "Something went wrong" });
    }
}
function calculateStartDate(fromDate: any, viewType: string) {
    const date = new Date(fromDate);

    switch (viewType.toLowerCase()) {
        case "VIEW_MONTH": {
            date.setDate(1);
            break;
        }
        case "VIEW_WEEK": {
            const dayOfWeek = date.getDay();
            date.setDate(date.getDate() - dayOfWeek);
            break;
        }
        case "VIEW_TODAY": {
            break;
        }
        case "VIEW_ALL": {
            return undefined;
        }
        // default: {
        //     throw new Error(
        //         "Invalid viewType. Use 'month', 'week', 'day', or 'view all'."
        //     );
        // }
    }
    return date.toISOString().split("T")[0];
}

async function populateQueryPropsForNewExpense(query: any, category: any) {
    const populatedProps = {
        ...addJSONboilerPlate,
        amount: query.amount,
        date: query.transaction_date,
        description: query.description,
        expenseCategoryId: category.id,
    };

    return populatedProps;
}
