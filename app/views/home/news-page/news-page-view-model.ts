import { Observable } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { Button } from "tns-core-modules/ui/button";
import { ObservableArray, ChangedData } from "tns-core-modules/data/observable-array"
import { myFirebase } from "../../../utils/firebase";
import { getViewById } from "tns-core-modules/ui/core/view";
import { ListView } from "tns-core-modules/ui/list-view";
import { EventData } from "tns-core-modules/data/observable";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { getFrameById, Frame, topmost } from "tns-core-modules/ui/frame";
import { RadListView, ListViewScrollEventData, ListViewLoadOnDemandMode, ListViewItemSnapMode, ListViewEventData } from 'nativescript-ui-listview';
import firebase from "../../../utils/firebase";

// const firebase = <myFirebase>require("../../../utils/firebase").I;

export class newsViewModel extends Observable {
    private events: ObservableArray<object> = new ObservableArray();
    public loading: boolean = true;

    constructor(page) {
        super();
        let feed = getViewById(page, 'feed') as RadListView;
        feed.loadOnDemandMode = ListViewLoadOnDemandMode.Manual;
        //const spinner: ActivityIndicator = getViewById(page, 'spinner') as any;

        /**
         * If we have not yet retrieved the data from firebase, we want to set the posts in myFirebase,
         * then we want push the items from myFirebase into the events ObservableArray so that it can
         * be displayed in the ListView.
         */
        if (!firebase.retrievedData) {
            firebase.setPosts()
                .then(() => {
                    for (let i = 0; i < firebase.getSizeOfPosts(); i++) {
                        this.events.unshift(firebase.postArray.getItem(i));
                    }
                })
            firebase.retrievedData = true;
        }
        /**
         * Otherwise, simply just push the items from myFirebase into events. This saves needing to
         * request from firebase everytime the user moves to the News page.
         */
        else {
            for (let i = 0; i < firebase.getSizeOfPosts(); i++) {
                this.events.unshift(firebase.postArray.getItem(i));
            }
        }

    }


    public onItemTap(args: ItemEventData) {
        let event: any = this.events.getItem(args.index);
        let frame: Frame = getFrameById('topmost');

        if (event.type == "Events") {
            if (event.link) {
                frame.navigate({
                    moduleName: "/views/webview/webview",
                    context: {
                        link: event.link,
                    }
                });
            }
        }
        else {
            if (event.image) {
                // passing the image src from event to display to the imageView module
                frame.navigate({
                    moduleName: "/views/imageview/imageview",
                    context: {
                        image: event.image
                    }
                });
            }
        }
    }
}
