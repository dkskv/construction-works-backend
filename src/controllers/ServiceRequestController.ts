import { Router } from "express";
import { ConnectedSpreadsheet } from "../utils/ConnectedSpreadsheet";
import { idStore } from "../utils/IdStore";

interface IRequestData {
  serviceList: string[];
  name: string;
  phone: string;
  comment: string;
}

interface ITableRow
  extends Record<
    "time" | "client_name" | "services" | "phone_number" | "comment",
    string
  > {}

export class ServiceRequestController {
  private spreadsheet: ConnectedSpreadsheet;

  constructor(router: Router) {
    this.defineRoute(router);
    this.spreadsheet = new ConnectedSpreadsheet(
      idStore.serviceRequestsSpreadsheetId
    );
  }

  private defineRoute(router: Router) {
    router.post("/api/service-request", ({ body }, res) => {
      if (!body) {
        res.status(400).send({ message: "Body is missing" });
        return;
      }

      this.save(body as IRequestData)
        .then(() => {
          res.status(200).send({ message: "Ok" });
        })
        .catch((e) => {
          res.status(500).send({
            message: "Failed to save because of: " + e.message,
          });
        });
    });
  }

  private async getSheet() {
    return this.spreadsheet.sheetByIndex(0);
  }

  private async save(data: Partial<IRequestData>) {
    const row: ITableRow = {
      time: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }),
      client_name: data.name ?? "",
      services: (data.serviceList ?? []).join(";"),
      phone_number: data.phone ?? "",
      comment: data.comment ?? "",
    };

    (await this.getSheet()).addRow(row);
  }
}