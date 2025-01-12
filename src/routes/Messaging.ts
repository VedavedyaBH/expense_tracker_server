import express, { Request, Response } from "express";
import { queryHandler } from "../controllers/Messages";

const router = express.Router();

router.post("/api/inbond", queryHandler);

export default router;
