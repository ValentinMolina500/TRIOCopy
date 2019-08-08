
interface AppointmentFormat {
    endTime: number;
    recurring: boolean;
    startTime: number;
    color?: string;
    testing?: Function;
    id?: string;
    day: number;
    date: number,
    month: number
    startTimeVisible: string;
    endTimeVisible: string;
};

interface DateFormat {
    day: string;
    times: Array<AppointmentFormat>;
};

export default interface Advisor {
    email: string;
    firstName: string;
    lastName: string;
    info: {
        description: string;
        hours: string;
        maincourse: string;
    };
    dates: Array<DateFormat>;
    subjects: Array<string>;
    uid: string;
};