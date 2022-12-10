import { Router } from "express";
import { AuthorizedSpreadsheet } from "../utils/AuthorizedSpreadsheet";
import { idStore } from "../utils/IdStore";

interface IService {
  name: string;
  remark: string;
  description: string;
}

export class ServiceListController {
  private spreadsheet: AuthorizedSpreadsheet;

  constructor(router: Router) {
    this.defineRoute(router);
    this.spreadsheet = new AuthorizedSpreadsheet(
      idStore.serviceListSpreadsheetId
    );
  }

  private defineRoute(router: Router) {
    router.get("/api/service-list", async (_, res) => {
      const serviceList = await this.getServiceList();
      res.send(serviceList);
    });
  }

  private async getServiceList(): Promise<IService[]> {
    const sheet = await this.loadSheet();
    const sheetRows = await sheet.getRows();

    return sheetRows.map(({ name, remark, description }) => ({
      name,
      remark,
      description,
    }));
  }

  private loadSheet() {
    return this.spreadsheet.loadSheetByIndex(0);
  }
}
