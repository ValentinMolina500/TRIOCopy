import {AppointmentDetails} from "./appointment-details-view-model"
import { Page } from "tns-core-modules/ui/page";

export function onLoaded(args) {
    let page: Page = args.object;

    page.bindingContext = new AppointmentDetails(page.navigationContext.appointmentData);
}