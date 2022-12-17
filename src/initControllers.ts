import { Router } from "express";
import { BenefitsController } from "./controllers/BenefitsController";
import { ServiceDeliveryStagesController } from "./controllers/ServiceDeliveryStagesController";
import { ServiceRequestController } from "./controllers/ServiceRequestController";
import { ServicesController } from "./controllers/ServicesController";
import { AuthorizedSpreadsheet } from "./utils/AuthorizedSpreadsheet";
import { idStore } from "./utils/IdStore";

export function initControllers(router: Router) {
  const serviceRequestsSpreadsheet = new AuthorizedSpreadsheet(
    idStore.serviceRequestsSpreadsheetId
  );
  const contentSpreadsheet = new AuthorizedSpreadsheet(
    idStore.contentSpreadsheetId
  );

  new ServiceRequestController(router, serviceRequestsSpreadsheet);
  new ServicesController(router, contentSpreadsheet);
  new BenefitsController(router, contentSpreadsheet);
  new ServiceDeliveryStagesController(router, contentSpreadsheet);
}
