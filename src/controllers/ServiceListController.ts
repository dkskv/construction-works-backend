import { Router } from "express";
import { ConnectedSpreadsheet } from "../utils/ConnectedSpreadsheet";
import { idStore } from "../utils/IdStore";

interface IService {
  name: string;
  remark: string;
  description: string;
}

export class ServiceListController {
  private spreadsheet: ConnectedSpreadsheet;

  constructor(router: Router) {
    this.defineRoute(router);
    this.spreadsheet = new ConnectedSpreadsheet(
      idStore.serviceListSpreadsheetId
    );
  }

  private defineRoute(router: Router) {
    router.get("/api/service-list", async (_, res) => {
      res.send(await this.getServiceList());
    });
  }

  private async getServiceList(): Promise<IService[]> {
    const sheetRows = await (await this.loadSheet()).getRows();

    return sheetRows.map(({ name, remark, description }) => ({
      name,
      remark,
      description,
    }));
  }

  private async loadSheet() {
    return await this.spreadsheet.loadSheetByIndex(0);
  }
}
