import { Page, Color } from "tns-core-modules/ui/page";
import { mentorViewModel } from "./mentor-view-model";
import { ListView } from "tns-core-modules/ui/list-view";

export function onNavigatingTo(args) {
    const page: Page = args.object;
    page.bindingContext = new mentorViewModel(page.navigationContext, page);
}

/**
 * Fixes bug where a button in a listView blocks the onTap
 * event for the listView items
 */
export function buttonLoaded(args) {
    let btn = args.object;
    btn.android.setFocusable(false);
}

export function onListViewLoaded(args) {
    const ListView = args.object as ListView;
    ListView.separatorColor = new Color('white');
    ListView.android.setVerticalScrollBarEnabled(false);
}