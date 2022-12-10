import { GoogleSpreadsheet } from "google-spreadsheet";

export class ConnectedSpreadsheet {
  private document: GoogleSpreadsheet;

  constructor(id: string) {
    this.document = new GoogleSpreadsheet(id);
    this.init();
  }

  private async init() {
    await this.connect();
    this.loadInfo();
  }

  private async connect() {
    const { GOOGLE_SERVICES_CLIENT_EMAIL, GOOGLE_SERVICES_PRIVATE_KEY } =
      process.env;

    if (!GOOGLE_SERVICES_CLIENT_EMAIL || !GOOGLE_SERVICES_PRIVATE_KEY) {
      throw new Error("Credentials not found in env");
    }

    try {
      await this.document.useServiceAccountAuth({
        client_email: GOOGLE_SERVICES_CLIENT_EMAIL,
        private_key: GOOGLE_SERVICES_PRIVATE_KEY.replace(/\\n/g, "\n"),
      });
    } catch (e) {
      throw new Error("Failed to auth to Google Spreadsheet");
    }
  }

  private async loadInfo() {
    await this.document.loadInfo();
  }

  async sheetByIndex(index: number) {
    const sheet = this.document.sheetsByIndex[index];

    // todo: подумать, можно ли избавиться
    if (!sheet) {
      await this.loadInfo();
    }

    if (!sheet) {
      throw new Error("There is no sheet");
    }

    return sheet;
  }
}
