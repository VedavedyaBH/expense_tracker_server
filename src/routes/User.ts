import express from "express";
import { addUserHandler } from "../controllers/User";

const userRouter = express.Router();

userRouter.post("/api/register", addUserHandler);

export default userRouter;
