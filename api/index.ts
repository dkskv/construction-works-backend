import express from "express";
import bodyParser from "body-parser";
import { initControllers } from "../src/initControllers";

const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use("/", router);
initControllers(router);
export default app;
