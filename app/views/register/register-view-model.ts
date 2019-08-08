import observableModule = require("tns-core-modules/data/observable");
import { myFirebase } from "../../utils/firebase";
import { Page } from "tns-core-modules/ui/page";
import UserViewModel from "../../viewmodels/user";
import myDialogs from "~/utils/messages";
import { WebView } from "tns-core-modules/ui/web-view";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { getFrameById, Frame, topmost, stack } from "tns-core-modules/ui/frame";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

const Firebase = <myFirebase>require("../../utils/firebase").I;
const User = <UserViewModel>require("../../viewmodels/user").I;
const dialogs = <myDialogs>require("../../utils/messages").I;

class registerViewModel extends observableModule.Observable {
    private firstName: string = "Valentin";
    private lastName: string = "Molina";
    private wsuId: number = 17413;
    private email: string = "valentinmolina83@gmail.com";
    private password: string = "luigi509";
    private confirmPassword: string = "luigi509";
    private uid: string = "";
    private major: string ="" ;

    
    public WSU_Majors = [
        'Biology',
        'Biological Sciences',
        'Business Administration',
        'Civil Engineering',
        'Computer Science',
        'Digital Technology and Culture',
        'Earth & Environmental Science',
        'Education',
        'Electrical Engineering',
        'English',
        'Fine Arts',
        'History',
        'Hospitality Business Management',
        'Humanities',
        'Mathematics – General Studies',
        'Management',
        'Mechanical Engineering',
        'Nursing',
        'Physical Sciences – General Studies',
        'Pre-Health Sciences',
        'Psychology',
        'Social Sciences',
        'Wine & Beverage Business Management',
        'Wine Science (Viticulture & Enology)',
        'Undecided'
    ]

    public dropDownSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
        this.major = this.WSU_Majors[args.newIndex];
        console.log(this.WSU_Majors[args.newIndex]);
    }

        constructor() {
        super();
    }
    public register(args): void {
        let button = args.object;
        let page = <Page>button.page;

        try {
            User.setData(this);
        }
        catch (err) {
            return;
        }

        Firebase.doRegister(User)
            .then((result: any) => {
                console.dir(result);
                User.setFbId(result.uid);
                User.saveToCouchbase();
            
                Firebase.addUserToColllection(User);
                page.frame.navigate("/views/home/home-page")
            })
            .catch(err => {
                dialogs.genericDialog({
                    title: "Error registering",
                    message: err,
                    okButtonText: "OK"
                });
            });
    }

    public goBack(args): void {
        let button = args.object;
        let page = button.page;

        page.frame.goBack();
   
    }

    public onLinkTap() {
        console.log("heyyy!");
        let frame: Frame = getFrameById('topmost');
                frame.navigate({
                    moduleName: "/views/webview/webview",
                    context: {
                        link: "https://wsu.co1.qualtrics.com/jfe/form/SV_2ahWlZ52iE4gftz"}
                });
    }
}

export { registerViewModel };