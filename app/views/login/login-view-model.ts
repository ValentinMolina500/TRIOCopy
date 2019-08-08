import { Observable } from "tns-core-modules/data/observable";
import User from "../../viewmodels/user";
import Firebase from "../../utils/firebase";
import dialogs from "../../utils/messages";
import {Page} from "tns-core-modules/ui/page";

// const User = <UserViewModel>require("../../viewmodels/user").I;
// const Firebase = <myFirebase>require("../../utils/firebase").I;
// const dialogs = <myDialogs>require("../../utils/messages").I;

export class loginViewModel extends Observable {
    constructor() {
        super();
    }

    private email: string = "valentinmolina83@gmail.com";//temporary login
    private password: string = "Mario509";//temporary login

    public login(args: any) {
        const button = args.object;
        const page = <Page>button.page;
        User.setEmail(this.email);
        User.setPassword(this.password);
        Firebase.doLogin(User)
            .then(() => {
                page.frame.navigate("/views/home/home-page");   
            })
            .catch(error => {
                console.log(`Error in doLogin: ${error}`);
                dialogs.invalidCredentials()
                    .then(() => console.log("dialog closed"))
            });
    }

    public register(args) {
        const button = args.object;
        const page = <Page>button.page;

        page.frame.navigate({
            moduleName: "/views/register/register-page",
            clearHistory: false
        });
    }

    public forgotPassword(args) {
        const button = args.object;
        const page = <Page>button.page;
        console.log('click');
        page.frame.navigate("views/resetpassword/reset-password");
    }
}
