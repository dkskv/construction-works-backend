import { GoogleSpreadsheet } from "google-spreadsheet";

export class AuthorizedSpreadsheet {
  private document: GoogleSpreadsheet;
  private authorization: Promise<void>;

  constructor(id: string) {
    this.document = new GoogleSpreadsheet(id);
    this.authorization = this.authorize();
  }

  private async authorize() {
    const { GOOGLE_SERVICES_CLIENT_EMAIL, GOOGLE_SERVICES_PRIVATE_KEY } =
      process.env;

    if (!GOOGLE_SERVICES_CLIENT_EMAIL || !GOOGLE_SERVICES_PRIVATE_KEY) {
      throw new Error("Credentials not found in env");
    }

    try {
      return await this.document.useServiceAccountAuth({
        client_email: GOOGLE_SERVICES_CLIENT_EMAIL,
        private_key: GOOGLE_SERVICES_PRIVATE_KEY.replace(/\\n/g, "\n"),
      });
    } catch (e) {
      throw new Error("Failed to auth to Google Spreadsheet");
    }
  }

  private async loadInfo() {
    await this.authorization;
    await this.document.loadInfo();
  }

  async loadSheetByIndex(index: number) {
    await this.loadInfo();
    const sheet = this.document.sheetsByIndex[index];

    if (!sheet) {
      throw new Error("There is no sheet");
    }

    return sheet;
  }
}
