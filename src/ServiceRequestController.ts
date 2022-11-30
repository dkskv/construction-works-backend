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
    this.connectToGoogleSheet();
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
          res.status(500).send({
            message: "failed to save",
          });
        });
    });
  }

  private async save(data: IRequestData) {
    if (!this.googleSheet) {
      throw new Error("Не установлено подключение с GoogleSpreadsheet");
    }

    return this.googleSheet.addRow({
      client_name: data.name,
      services: data.serviceList.join(";"),
      phone_number: data.phone,
      comment: data.comment ?? "",
    });
  }

  private async connectToGoogleSheet() {
    const {
      GOOGLE_SPREADSHEET_ID,
      GOOGLE_SERVICES_CLIENT_EMAIL,
      GOOGLE_SERVICES_PRIVATE_KEY,
    } = process.env;

    if (
      !GOOGLE_SPREADSHEET_ID ||
      !GOOGLE_SERVICES_CLIENT_EMAIL ||
      !GOOGLE_SERVICES_PRIVATE_KEY
    ) {
      throw new Error("Не найдены необходимые переменные окружения");
    }

    const document = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_ID);

    try {
      await document.useServiceAccountAuth({
        client_email: GOOGLE_SERVICES_CLIENT_EMAIL,
        private_key: GOOGLE_SERVICES_PRIVATE_KEY.replace(/\\n/g, "\n"),
      });
    } catch (e) {
      throw new Error("Не удалось авторизоваться в GoogleSpreadsheet");
    }

    try {
      await document.loadInfo();
    } catch (e) {
      throw new Error(
        "Не удалось загрузить информацию о GoogleSpreadsheet документе"
      );
    }

    this.googleSheet = document.sheetsByIndex[0];
  }
}
