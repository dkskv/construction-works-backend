import { Router } from "express";
import { AuthorizedSpreadsheet } from "../utils/AuthorizedSpreadsheet";

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
  constructor(router: Router, private spreadsheet: AuthorizedSpreadsheet) {
    this.defineRoute(router);
  }

  private defineRoute(router: Router) {
    router.post("/api/service-request", async ({ body }, res) => {
      if (!body) {
        res.status(400).send({ message: "Body is missing" });
        return;
      }

      try {
        await this.save(body as IRequestData);
        res.status(200).send({ message: "Ok" });
      } catch (e) {
        res.status(500).send({ message: "Failed to save" });
      }
    });
  }

  private async save(data: Partial<IRequestData>) {
    const row: ITableRow = {
      time: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }),
      client_name: data.name ?? "",
      services: (data.serviceList ?? []).join(";"),
      phone_number: data.phone ?? "",
      comment: data.comment ?? "",
    };

    const sheet = await this.loadSheet();
    return await sheet.addRow(row);
  }

  private loadSheet() {
    return this.spreadsheet.loadSheetByIndex(0);
  }
}
