import { Router } from "express";
import { AuthorizedSpreadsheet } from "../utils/AuthorizedSpreadsheet";

export abstract class FetchSheetRowsController<T> {
  /** url-путь до контроллера */
  protected abstract get url(): string;
  /** имя листа */
  protected abstract get sheetName(): string;
  /** построить объект строки на основе загруженных данных строки */
  protected abstract buildRow(data: any): T;

  constructor(router: Router, private document: AuthorizedSpreadsheet) {
    this.defineRoute(router);
  }

  private defineRoute(router: Router) {
    router.get(this.url, async (_, res) => {
      res.send(await this.fetchList());
    });
  }

  protected async fetchList(): Promise<T[]> {
    const sheet = await this.document.loadSheetByName(this.sheetName);
    const sheetRows = await sheet.getRows();
    return sheetRows.map((data) => this.buildRow(data));
  }
}
