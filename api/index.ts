import express from "express";
import bodyParser from "body-parser";
import { ServiceRequestController } from "../src/ServiceRequestController";
import cors from "cors";
// @ts-ignore
import { config } from "dotenv";

config();
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use("/", router);
app.use(cors());

router.get("/api", function (_, res) {
  res.status(200).send("api!");
});

router.get("/api/hello", function (_, res) {
  res.status(200).send("api hello!");
});

new ServiceRequestController(router);

app.listen(4000);
