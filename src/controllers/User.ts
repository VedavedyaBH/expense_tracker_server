import { Request, Response } from "express";
import { addUser } from "../services/User";
import { logger } from "../util/logger";

export async function addUserHandler(req: Request, res: Response) {
    const { number } = req.body;
    try {
        logger.info("reached handler");
        const response = await addUser(number);
        res.status(201).send(response);
    } catch (error: any) {
        logger.error(error.message);
        res.status(500).send({ message: "Something went wrong" });
    }
}
