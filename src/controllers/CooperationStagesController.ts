import { AuthorizedSpreadsheet } from "../utils/AuthorizedSpreadsheet";
import { FetchSheetRowsController } from "./FetchSheetRowsController";

interface ICooperationStage {
  name: string;
  icon: string;
  description: string;
}

export class CooperationStagesController extends FetchSheetRowsController<ICooperationStage> {
  protected get url() {
    return "/api/cooperation-stages";
  }

  protected loadSheet(spreadsheet: AuthorizedSpreadsheet) {
    return spreadsheet.loadSheetByIndex(2);
  }

  protected buildRow({ name, icon, description }: any) {
    return {
      name,
      icon,
      description,
    };
  }
}
