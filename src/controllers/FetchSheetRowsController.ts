import { Router } from "express";
import { GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { AuthorizedSpreadsheet } from "../utils/AuthorizedSpreadsheet";

export abstract class FetchSheetRowsController<T> {
  /** Url, по которому контроллер возвращает данные */
  protected abstract get url(): string;
  /** Загрузка конкретного листа из документа */
  protected abstract loadSheet(
    spreadsheet: AuthorizedSpreadsheet
  ): Promise<GoogleSpreadsheetWorksheet>;
  /** Построение строки на основе загруженных данных */
  protected abstract buildRow(data: any): T;

  constructor(router: Router, private spreadsheet: AuthorizedSpreadsheet) {
    this.defineRoute(router);
  }

  private defineRoute(router: Router) {
    router.get(this.url, async (_, res) => {
      res.send(await this.fetchList());
    });
  }

  protected async fetchList(): Promise<T[]> {
    const sheet = await this.loadSheet(this.spreadsheet);
    const sheetRows = await sheet.getRows();
    return sheetRows.map((data) => this.buildRow(data));
  }
}
