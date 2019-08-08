import { Observable } from "tns-core-modules/data/observable";


/*
    startTime is the start time of the appointment
    endTime is the end time of the appointment
*/
interface AppointmentData {
    date: number;
    studentFirstName: string;
    studentLastName: string;
    recieverFirstName: string;
    recieverLastName: string;
    subjects: Array<any>;
    month: number;
    day: string;
    specificClass: string;
    startTime: number;
    endTime: number;
    message: string;
    fullName: string;
    timeString: string;
}

export class AppointmentDetails extends Observable {
    public appointmentData: AppointmentData;

    constructor(data) {
        super();

        console.dir(data);

        this.appointmentData = data;
    }



}
