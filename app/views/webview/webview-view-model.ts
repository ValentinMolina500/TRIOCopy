import observableModule = require("tns-core-modules/data/observable");
import { Page } from "tns-core-modules/ui/page";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view";
import { Label } from "tns-core-modules/ui/label";

export class webViewModel extends observableModule.Observable
{
    constructor(link) {
        super();
        this.set("link", link);
    }

    public webGoBack(args) {
        const page: Page = args.object.page as Page;
        const webview: WebView = page.getViewById("myWebview") as WebView;

        if(webview.canGoBack)
        {
            webview.goBack();
        }
    }

    public closeWeb(args) {
        const page: Page = args.object.page as Page;

        page.frame.goBack();
    }

    /*public onWebViewLoaded(args) {
        const webview: WebView = args.object as WebView;
        webview.on("loadFinished", () => {
            console.log("***");
        })
    }*/
}

/*export default function onWebViewLoaded(args) {
    const webview = args.object as WebView;
    console.log('******');
    this.set("isLoading", false);
}*/