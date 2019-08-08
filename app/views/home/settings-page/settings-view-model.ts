import { Observable } from "tns-core-modules/data/observable";
import firebase  from "../../../utils/firebase";
import { Page } from "tns-core-modules/ui/page/page";
import { appRoutes } from "../../../utils/routings";
import { Frame, getFrameById } from "tns-core-modules/ui/frame";
import myDialogs, * as Dialogs from "../../../utils/messages";
import user from "../../../viewmodels/user";

// const user = require("../../../viewmodels/user").I as UserViewModel;
// const firebase = require("../../../utils/firebase").I as myFirebase;
// const dialogs = require("../../../utils/messages").I as myDialogs;

let currentuser = user.getTotalData();
console.log(currentuser);

export class SettingsViewModel extends Observable {
    public currentuser = user.getTotalData();
    public Name = this.currentuser.firstName + " " + this.currentuser.lastName;
    public Email = this.currentuser.email;
    public wsuid ="WSU ID:" + this.currentuser.wsuId;

    constructor() {
        super();
    }

    public logout() {
        const frame = getFrameById('topmost');

        
        firebase.doLogout()
            .then(() => {
                frame.navigate(appRoutes['login'].to);
            }); 
    }

    public registerTutor() {
        let tutor = {
            email: 'edgar.ramirezg@wsu.edu',
            firstName: 'Testing',
            lastName: 'Tester',
            info: {
                hours: "Variable",
                maincourse: "Biology",
                description: "Edgar Ramirez is a diligent worker if a bit crass sometimes. He'll get the job done, someway, somehow. Though his solutions may not be the most eloquent, they work... for the most part.",
            },
            dates: [
                {
                    day: 'Monday',
                    times: [
                        {
                            startTime: 990,
                            endTime: 1050,
                            recurring: 'true'
                        },
                        {
                            startTime: 1110,
                            endTime: 1170,
                            recurring: 'true',
                        }
                    ]
                },
                {
                    day: 'Wednesday',
                    times: [
                        {
                            startTime: 510,
                            endTime: 570,
                            recurring: 'true',
                        },
                    ]
                },
                {
                    day: 'Friday',
                    times: [
                        {
                            startTime: 990,
                            endTime: 1050,
                            recurring: 'true'
                        },
                        {
                            startTime: 1110,
                            endTime: 1140,
                            recurring: 'true',
                        },
                    ]
                }
            ],
            subjects: [
                "English",
                "Art",
                "DTS"
            ]
        }

        firebase.addTutors(tutor)
            .then(() => console.log('Complete!'))
            .catch(() => console.log('ERROR!'));
    }
}
