import { Page } from "tns-core-modules/ui/page";
import { Observable } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { AppointmentViewModel } from "../../../../viewmodels/appointments";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { getFrameById, Frame, topmost } from "tns-core-modules/ui/frame";

export class mentorViewModel extends Observable {
    constructor() {
        super();
    }

    /**
     * Method that is called when the "Advisor" button is pressed. Navigates to mentor page passing
     * the users advisors that page.
     *
     */
    public advisorTap() {
        const frame: Frame = getFrameById('my-app-page');

        frame.navigate({
            moduleName: "/views/home/app-page/choose-mentor-page/mentor/mentor",
            context: {
                type: "ADVISOR"
            }
        });
    }

    public tutorTap() {
        const frame: Frame = getFrameById('my-app-page');

        frame.navigate({
            moduleName: "/views/home/app-page/choose-mentor-page/mentor/mentor",
            context: {
                type: "TUTORS"
            }
        });
    }

    // public supIntTap() {
    //     const frame: Frame = getFrameById('my-app-page');

    //     frame.navigate({
    //         moduleName: "/views/home/app-page/choose-mentor-page/mentor/mentor",
    //         context: {
    //             advisorArray: this.supInt,
    //             type: "SUPPLEMENTAL INSTRUCTOR"
    //         }
    //     });
    // }

    public goBack() {
        const frame: Frame = getFrameById('my-app-page');
        frame.goBack();
    }
}