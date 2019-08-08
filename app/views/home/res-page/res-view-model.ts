import { Observable } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";

export class resViewModel extends Observable {
    constructor() {
        super();
    }

    public onQATap(args): void {
        let tap = args.object as Page;

        tap.page.frame.navigate({
            moduleName: "/views/home/res-page/res-template/res-template",
            context: {
                id: tap.id
            }
        });
    }
}