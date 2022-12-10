import express from "express";
import bodyParser from "body-parser";
import { ServiceRequestController } from "../src/controllers/ServiceRequestController";
// @ts-ignore
import { config } from "dotenv";
import { ServiceListController } from "../src/controllers/ServiceListController";
import cors from "cors";

config();
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use("/", router);

router.get("/api", function (_, res) {
  res.status(200).send("api works!");
});

new ServiceRequestController(router);
new ServiceListController(router);

app.listen(4000);
