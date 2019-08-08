import { Page } from "tns-core-modules/ui/page";
import { Observable } from "tns-core-modules/data/observable";
import { webViewModel } from "./webview-view-model";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view";


export function onNavigatedTo(args) {
    const page: Page = args.object as Page;
    page.bindingContext = new webViewModel(page.navigationContext.link);
}

 //fix setting activityIndicator to False via loaded event of WebView later!
// export function onWebViewLoaded(args) {
//     const webview: WebView = args.object;
//     console.log("loaded");
//     webview.visibility = "collapse";

// }
