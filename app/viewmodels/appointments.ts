import firebase from "../utils/firebase"
import * as Firebase from "nativescript-plugin-firebase";
import { dateParser, minutesToTime } from "../utils/time";
// const firebase = require("../utils/firebase").I as myFirebase;
import user from "../viewmodels/user";
export class AppointmentViewModel {
    /**
     * Arrays to hold the tutors, advisors etc... at TRIO
     * 
     * @author valentinMolina500
     */
    private AdvisorsArray: Array<any> = [];
    private TutorsArray: Array<any> = [];
    private UserAppointments: Array<any> = [];


    /**
     * These variables tells us if have retrived the data from the database.
     * This is to prevent calling the database more than once in session.
     * 
     * @author valentinMolina500
     */
    public advisorRetrievedData: boolean = false;
    public tutorRetrievedData: boolean = false;
    public userAppointmentsRetrievedData: boolean = false;

    private advisorCollection: any;

    constructor() {
        this.advisorCollection = firebase.getCollection("advisors");
        const { uid } = user.getTotalData();
    }

    private setAdvisors() {
        return this.advisorCollection.get()
            .then(documentRef => {
                documentRef.forEach(doc => {
                    this.AdvisorsArray.push(doc.data());
                })
            });
    }

    /**
     * Retrieves the tutors from Firebase and pushes them to the TutorArray
     */
    public setTutors() {
        return firebase.queryTutors()
            .then(result => {
                for (let key in result.value) {
                    console.log(key + " ->" + result.value[key]);
                    this.TutorsArray.push(result.value[key]);
                }

                this.tutorRetrievedData = true;
            })
    }

    /**
     * Helper function used to get the amount of advisors in the advisor array
     * 
     * @return number of Advisors in the AdvisorArray
     */
    public getAdvisorLength(): number {
        return this.AdvisorsArray.length;
    }

    /**
     * Helper function used to get the amount of tutors in the tutor array
     * 
     * @return number of Tutors in the TutorArray
     */
    public getTutorLength() {
        return this.TutorsArray.length;
    }

    /**
     * Gets the tutors retrived from Firebase.
     * 
     * @return The tutors registered with TRIO
     */
    public getTutors() {
        return this.TutorsArray;
    }

    public async setUserAppointments(uid: string) {
        return firebase.getAppointments(uid)
            .then(async (result) => {
                let keys = Object.keys(result.value);
                let appointments = await Promise.all(keys.map(async (value) => {
                    const app = await firebase.getValueFirebase('appointments/' + result.value[value].key);

                    app.value.fullName = app.value.recieverFirstName + ' ' + app.value.recieverLastName;
                    app.value.dateString = dateParser(app.value.date, app.value.month, app.value.day);
                    app.value.timeString = minutesToTime(app.value.startTime) + "-" + minutesToTime(app.value.endTime);
                    app.value.type = 'regular'
                    return app.value;
                }))

                this.UserAppointments = appointments;
                this.userAppointmentsRetrievedData = true;
            })
    }

    public getUserAppointments() {
        return this.UserAppointments;
    }

    /**
     * Gets the number of items in the user appointment array
     * 
     * @returns how many appointments a user has
     */
    public getUserAppointmentsLength(): number {
        return this.UserAppointments.length;
    }
}
let appointments = new AppointmentViewModel();
export default appointments;