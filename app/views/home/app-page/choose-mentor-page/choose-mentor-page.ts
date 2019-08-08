import { Page } from "tns-core-modules/ui/page";
import { mentorViewModel } from "./choose-mentor-view-model";

export function onLoaded(args) {
    const page: Page  = args.object
    page.bindingContext = new mentorViewModel();
    
}

