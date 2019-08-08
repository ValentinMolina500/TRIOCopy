import { Page, getViewById, Color } from "tns-core-modules/ui/page";
import { AppRootViewModel } from "./app-root-viewmodel";
export function onLoaded(args) {
    const page = args.object;

    
    page.bindingContext = new AppRootViewModel(page);
}
