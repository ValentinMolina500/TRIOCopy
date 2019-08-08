import { Page } from "tns-core-modules/ui/page";
import { resViewModel } from "./res-view-model";

export function onLoaded(args) {
    let page: Page = args.object as Page;
    page.bindingContext = new resViewModel();
}