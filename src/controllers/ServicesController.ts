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

  protected get sheetName() {
    return "Services";
  }

  protected buildRow({ name, remark, description }: any) {
    return {
      name,
      remark,
      description,
    };
  }
}
