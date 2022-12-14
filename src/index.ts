import express from "express";
import bodyParser from "body-parser";
// @ts-ignore
import { config } from "dotenv";
import cors from "cors";
import { initControllers } from "./initControllers";

config();
const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use("/", router);
initControllers(router);
app.listen(4000);
