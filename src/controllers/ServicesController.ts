import { AuthorizedSpreadsheet } from "../utils/AuthorizedSpreadsheet";
import { FetchSheetRowsController } from "./FetchSheetRowsController";

interface IService {
  name: string;
  remark: string;
  description: string;
}

export class ServicesController extends FetchSheetRowsController<IService> {
  protected get url() {
    return "/api/services";
  }

  protected loadSheet(spreadsheet: AuthorizedSpreadsheet) {
    return spreadsheet.loadSheetByIndex(0);
  }

  protected buildRow({ name, remark, description }: any) {
    return {
      name,
      remark,
      description,
    };
  }
}
