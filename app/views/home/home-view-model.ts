import { Observable } from "tns-core-modules/data/observable";
import { Button } from "tns-core-modules/ui/button";
import { myFirebase } from "../../utils/firebase";
import { addBackgroundRemoteNotificationHandler } from "nativescript-plugin-firebase/messaging/messaging";
import firebase from "../../utils/firebase";

export class homeViewModel extends Observable {
    constructor() {
        super();
    }

    public logout(args) {
        let button = args.object;
        let page = button.page;

        firebase.doLogout()
            .then(() => {
                console.log('Logged out from home page');
                page.frame.navigate("/views/login/login-page");
            })
    }
}