import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { logger } from "./src/util/logger";
import router from "./src/routes/Messaging";
import userRouter from "./src/routes/User";

const port = process.env.PORT || 8080;
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(router);
app.use(userRouter);

app.listen(port, () => {
    logger.info(`Server is running on ${port}`);
});

export default app;
