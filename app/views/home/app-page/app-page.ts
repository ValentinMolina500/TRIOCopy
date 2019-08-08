import { Page } from "tns-core-modules/ui/page";
import { appViewModel } from "./app-page-view-model";
import  user  from "../../../viewmodels/user";


export function onLoaded(args) {
    let page: Page = args.object as Page;
    if(page.navigationContext)
    {
        page.bindingContext = new appViewModel(page, page.navigationContext.event);
    } else {
        page.bindingContext = new appViewModel(page, null);
    }
}

export function selector(item, index, items) {
	//const { uid } = user.getTotalData();
    //return uid === item.studentId ? 'student' : 'reciever';
    

    return item.type;
}

