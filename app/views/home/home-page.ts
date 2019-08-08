import { homeViewModel } from  "./home-view-model";
import { myFirebase } from "../../utils/firebase";
import { Page, NavigatedData } from "tns-core-modules/ui/page";
import { myCouchbase } from "../../utils/couchbase";
import { Frame, getFrameById } from "tns-core-modules/ui/frame";
import { appRoutes } from "../../utils/routings";
import { Navigation } from "../../utils/navigation";
import UserViewModel from "../../viewmodels/user";
import firebase from "../../utils/firebase";
import couchbase from "../../utils/couchbase"
import User from "../../viewmodels/user";
// let firebase = <myFirebase>require("../../utils/firebase").I;
// let navigate = <Navigation>require("../../utils/navigation").I;
// const couchbase = <myCouchbase>require("../../utils/couchbase").I;
// const User = require("../../viewmodels/user").I as UserViewModel;

export function onLoaded(args) {
    const page = args.object as Page;
    let frame = getFrameById('topmost');
/*  startMonitoring((newConnectionType) => {
        switch (newConnectionType) {
            case connectionType.none:
                console.log("Connection type changed to none.");
                break;
            case connectionType.wifi:
                console.log("Connection type changed to WiFi.");
                break;
            case connectionType.mobile:
                console.log("Connection type changed to mobile.");
                break;
            case connectionType.ethernet:
                console.log("Connection type changed to ethernet.");
                break;
            default:
                break;
        }
    });*/
    console.log('HEEY');
    firebase.isLoggedIn()
            .then(user => {   
                if (!user) {
                    page.frame.navigate(appRoutes["login"].to);
                    return;
                }
                else {
                    firebase.getUser(user.uid)
                        .then(result => {
                            firebase.User = result.value;
                            User.setData(result.value);
                            User.saveToCouchbase();
                            User.getDataCouchbase();
                            firebase.savePushToken();
                        })
                }
            })
            .catch(error => {
                // page.page.frame.navigate(appRoutes["login"].to)
                console.log('navigating....');
                frame.navigate("/views/login/login-page");

            });
    page.bindingContext = new homeViewModel();   
}