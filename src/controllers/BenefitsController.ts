import { FetchSheetRowsController } from "./FetchSheetRowsController";

interface IBenefit {
  name: string;
  icon: string;
  description: string;
}

export class BenefitsController extends FetchSheetRowsController<IBenefit> {
  protected get url() {
    return "/api/benefits";
  }

  protected get sheetName() {
    return "Benefits";
  }

  protected buildRow({ name, icon, description }: any) {
    return {
      name,
      icon,
      description,
    };
  }
}
