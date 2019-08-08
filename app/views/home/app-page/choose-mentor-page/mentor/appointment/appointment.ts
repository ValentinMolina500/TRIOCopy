import { Page, getViewById } from "tns-core-modules/ui/page"
import UserViewModel from "../../../../../../viewmodels/user";
import { myFirebase } from "../../../../../../utils/firebase";
import { AppointmentViewModelPage } from "./appoint-view-model";
import { ActivityIndicator } from 'tns-core-modules/ui/activity-indicator';
import { ListView } from 'tns-core-modules/ui/list-view';


// const firebase = <myFirebase>require("../../../../../../utils/firebase").I;
// const User = <UserViewModel>require("../../../../../../viewmodels/user").I;

export function onLoaded(args)
{
    const page: Page = args.object;


    page.bindingContext = new AppointmentViewModelPage(page.navigationContext.advisor, page);
}

export function onListViewLoaded(args) {
    // const spinner = getViewById(args.object.page, 'spinner') as ActivityIndicator;
    // const calendar = getViewById(args.object.page, 'date-container') as ListView;
    // calendar.visibility = 'visible';
    // spinner.busy = false;
}