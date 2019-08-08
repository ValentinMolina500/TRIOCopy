import { Observable } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListView, ItemEventData } from "tns-core-modules/ui/list-view";
import { Frame, getFrameById, getViewById } from "tns-core-modules/ui/frame";
import  appointments  from "~/viewmodels/appointments";
import { RadListView, ListViewScrollEventData, ListViewLoadOnDemandMode, ListViewItemSnapMode, ListViewEventData } from 'nativescript-ui-listview';

// const appointments = require("../../../../../viewmodels/appointments").I as AppointmentViewModel;

enum Type {
    Advisor,
    Tutor
}


export class mentorViewModel extends Observable {

    public mentorArray: Array<any> = [];

    // private _mentorArray: Array<any> = [
    //     {
    //         firstName: 'Hung',
    //         lastName: 'Luu',
    //         email: 'hung.luu@wsu.edu',
    //         hours: 'Mon-Fri 8:00 AM - 5:00 PM',
    //         course: 'Computer Science',
    //         description: 'Hung Luu is a sophmore at WSU Tricities, and is currently pursuing a Bachelors of Science on Computer Science.',
    //         image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/190111_%E5%8C%97%E4%BA%AC%E5%8F%B0%E6%98%A5%E6%99%9A%E5%8F%91%E5%B8%83%E4%BC%9A.png",
    //         dropDownOpen: false,
    //     },
    //     {
    //         firstName: 'Edgar',
    //         lastName: 'Ramirez',
    //         email: 'edgar.ramirez@wsu.edu',
    //         hours: 'Tue-Fri 8:00 AM - 5:00 PM',
    //         course: 'Biology',
    //         description: 'Edgar Ramirez is a scholar at WSU Tricities trying to get into Medical School. Favorite phrases include \'badass\' and other crude terms.',
    //         image: "https://upload.wikimedia.org/wikipedia/commons/3/31/Faisal_Sheikh_Sahab_Wallpapers6.jpg",
    //         dropDownOpen: false,
    //     },
    //     {

    //         firstName: 'Edgar',
    //         lastName: 'Ramirez',
    //         email: 'edgar.ramirez@wsu.edu',
    //         hours: 'Tue-Fri 8:00 AM - 5:00 PM',
    //         course: 'Biology',
    //         description: 'Edgar Ramirez is a scholar at WSU Tricities trying to get into Medical School. Favorite phrases include \'badass\' and other crude terms.',
    //         image: "https://upload.wikimedia.org/wikipedia/commons/3/31/Faisal_Sheikh_Sahab_Wallpapers6.jpg",
    //         dropDownOpen: false,
    //     }
    // ]

    constructor(context: any, page) {
        super();
        
        let feed = getViewById(page, 'feed') as RadListView;
        feed.loadOnDemandMode = ListViewLoadOnDemandMode.None;
        
        switch (context.type) {
            case "ADVISOR":
                this.set("advisorName", "Advisor");
                this.setMentorArray(Type.Advisor);
                break;

            case "TUTORS":
                this.set("advisorName", "Tutors");
                this.setMentorArray(Type.Tutor);
                break;

            default:
                break;
        }

        /*for(let i = 0; i < this.mentorArray.length; i++) {
            let item = this.mentorArray.getItem(i);

            this.mentorArray.setItem(i, {
                ...item,
                index: i,
                toggle: () => {
                    
                }
            })
        }*/ 
    }

    private setMentorArray(type: Type) {
        if (type == Type.Tutor) {
            appointments.tutorRetrievedData ? this.set("mentorArray", appointments.getTutors())
                : appointments.setTutors()
                    .then(() => {
                        this.set("mentorArray", appointments.getTutors());
                    })
        }
        else {
            /* Set Advisors here! */
        }
    }

    public onAdvisorTap(args: ItemEventData) {
        const frame: Frame = getFrameById('my-app-page');

        let advisor = this.mentorArray[args.index];

        frame.navigate({
            moduleName: "/views/home/app-page/choose-mentor-page/mentor/appointment/appointment",
            context: {
                advisor: advisor
            }
        });
    }

    public goBack() {
        const frame: Frame = getFrameById('my-app-page');
        frame.goBack();
    }
}

