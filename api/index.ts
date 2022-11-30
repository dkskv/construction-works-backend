import express from "express";
import bodyParser from "body-parser";
import { ServiceRequestController } from "../src/ServiceRequestController";
// @ts-ignore
import { config } from "dotenv";

config();
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use("/", router);

router.get("/api", function (_, res) {
  res.status(200).send("api works!");
});

new ServiceRequestController(router);

app.listen(4000);
