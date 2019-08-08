import { Page } from "tns-core-modules/ui/page";
import { Observable } from "tns-core-modules/data/observable";
import { imageViewModel } from "./image-view-model";

export function onNavigatedTo(args) {
    const page: Page = args.object as Page;

    page.bindingContext = new imageViewModel(page.navigationContext.image);
}