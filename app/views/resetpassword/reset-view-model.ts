import observableModule = require('tns-core-modules/data/observable');
import { myFirebase } from "../../utils/firebase";
import UserViewModel from "../../viewmodels/user";
import myDialogs from "../../utils/messages";

const User = <UserViewModel>require("../../viewmodels/user").I;
const firebase = <myFirebase>require('../../utils/firebase').I;
const dialogs = <myDialogs>require("../../utils/messages").I;

export class resetViewModel extends observableModule.Observable {

    private userEmail:string = User.getEmail();

    constructor() {
        super();
    }

    public goBack(args) {
        const button = args.object;
        const page = button.page;
        page.frame.goBack();
    }

    public resetPassword() {
        firebase.doResetPassword(this.userEmail.trim())
            .then(() => console.log('done resetting password!'));
    }
}