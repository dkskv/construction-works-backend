import { FetchSheetRowsController } from "./FetchSheetRowsController";

interface IServiceDeliveryStage {
  name: string;
  icon: string;
  description: string;
}

export class ServiceDeliveryStagesController extends FetchSheetRowsController<IServiceDeliveryStage> {
  protected get url() {
    return "/api/service-delivery-stages";
  }

  protected get sheetName() {
    return "ServiceDeliveryStages";
  }

  protected buildRow({ name, icon, description }: any) {
    return {
      name,
      icon,
      description,
    };
  }
}
