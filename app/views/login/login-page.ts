import { loginViewModel } from "./login-view-model";
import { Page } from "tns-core-modules/ui/page";

export function onNavigating(args: any) {
    let page = <Page>args.object;
    page.bindingContext = new loginViewModel();
}


