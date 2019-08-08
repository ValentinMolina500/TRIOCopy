import { Page, getViewById, Color } from "tns-core-modules/ui/page";
import { newsViewModel } from "./news-page-view-model";
import * as SocialShare from "nativescript-social-share";
import { ImageSource } from "image-source";
import { ListView, ItemEventData } from "tns-core-modules/ui/list-view";
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";

export function onLoaded(args) {
    const page = args.object;

    page.bindingContext = new newsViewModel(page);
}

export function typeOfEvent(item, index, items) {
    if (item.type == "Facebook") {
        return item.type = "Facebook";
    }

    if (item.type == "Instagram") {
        return item.type = "Instagram";
    }

    if (item.type == "Twitter") {
        return item.type = "Twitter";
    }

    else {
        return item.type === "News" ? "News" : "Events";
    }
}

export function onListViewLoaded(args: any) {
    const spinner = getViewById(args.object.page, 'spinner') as ActivityIndicator;
    console.log('done!');
    spinner.busy = false

    const Feed = args.object as ListView;

    Feed.visibility = 'visible';
    Feed.android.setVerticalScrollBarEnabled(false);
    Feed.separatorColor = new Color('white');
}

