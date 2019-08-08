import { Observable } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";

export class imageViewModel extends Observable {
    constructor(image) {
        super();
        this.set("image", image);
    }

    public goBack(args) {
        let page: Page = args.object.page;

        page.frame.goBack();
    }
}