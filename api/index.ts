import express from "express";
import bodyParser from "body-parser";
import { ServiceRequestController } from "../src/controllers/ServiceRequestController";
// @ts-ignore
import { config } from "dotenv";
import { ServicesController } from "../src/controllers/ServicesController";
import cors from "cors";
import { BenefitsController } from "../src/controllers/BenefitsController";
import { CooperationStagesController } from "../src/controllers/CooperationStagesController";
import { idStore } from "../src/utils/IdStore";
import { AuthorizedSpreadsheet } from "../src/utils/AuthorizedSpreadsheet";

config();
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use("/", router);

router.get("/api", function (_, res) {
  res.status(200).send("api works!");
});

const requestSpreadsheet = new AuthorizedSpreadsheet(
  idStore.serviceRequestsSpreadsheetId
);
const fetchSpreadsheet = new AuthorizedSpreadsheet(
  idStore.contentSpreadsheetId
);

new ServiceRequestController(router, requestSpreadsheet);
new ServicesController(router, fetchSpreadsheet);
new BenefitsController(router, fetchSpreadsheet);
new CooperationStagesController(router, fetchSpreadsheet);

app.listen(4000);
