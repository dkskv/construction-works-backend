import { Router } from "express";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";

interface IRequestData {
  serviceList: string[];
  name: string;
  phone: string;
  comment: string | null;
}

export class ServiceRequestController {
  private googleSheet: GoogleSpreadsheetWorksheet | null = null;

  constructor(private router: Router) {
    this.defineRoute();
    // this.connectToGoogleSheet();
  }

  private defineRoute() {
    this.router.post("/api/service-request", (req, res) => {
      if (!req.body) {
        res.status(400).send({ message: "body is missing" });
        return;
      }

      this.save(req.body as IRequestData)
        .then(() => {
          res.status(200).send({ message: "ok" });
        })
        .catch(() => {
          res.status(500).send({ message: "failed to save" });
        });
    });
  }

  private async save(data: IRequestData) {
    if (!this.googleSheet) {
      throw new Error();
    }

    return this.googleSheet.addRow({
      client_name: data.name,
      services: data.serviceList.join(";"),
      phone_number: data.phone,
      comment: data.comment ?? "",
    });
  }

  private async connectToGoogleSheet() {
    const { SPREADSHEET_ID, CLIENT_EMAIL, PRIVATE_KEY } = process.env;

    if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
      throw new Error("Не найдены необходимые переменные окружения");
    }

    const document = new GoogleSpreadsheet(SPREADSHEET_ID);

    await document.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });

    await document.loadInfo();

    this.googleSheet = document.sheetsByIndex[0];
  }
}
