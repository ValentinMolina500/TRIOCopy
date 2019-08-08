import { Observable } from "tns-core-modules/data/observable";
import { getFrameById, Frame, topmost,  visibilityProperty, getViewById, View, androidStatusBarBackgroundProperty } from "tns-core-modules/ui/frame";
import { Events } from "../../../../../../../constants/constants";
import { CheckBox } from "@nstudio/nativescript-checkbox";
import firebase from '../../../../../../../utils/firebase';
import user from '../../../../../../../viewmodels/user';
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import Advisor from "../../../../../../../constants/advisorDatabaseConstants";
import dialogs from "~/utils/messages";
import { minutesToTime } from "../../../../../../../utils/time";

// const firebase = require('../../../../../../../utils/firebase').I as myFirebase;
// const user = require('../../../../../../../viewmodels/user').I as UserViewModel;

// Used to get the day using the number returned by a date object
const dayStrings: Array<string> = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
]

// Used to get the month using the number returned by a date object
const monthStrings: Array<string> = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Augt",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
]

export class AppointmentFormViewModel extends Observable {
	public appointment;
	public user;
	public message: string = "";
	public specificClass: string = "";
	public subject: Array<any> = [];
	public advisor: Advisor;
	private stack: StackLayout;

	private subjectError: boolean = false;
	private inProgress: boolean = false;

	constructor({ time, date, month, day, subjects }, advisor: Advisor, page) {
		super();
		this.advisor = advisor;
		this.stack = getViewById(page, 'checkbox-container') as StackLayout;
		let startTime = minutesToTime(time.startTime);
		let endTime = minutesToTime(time.endTime);

		let appointmentTime = `${day}, ${monthStrings[month]} ${date}, 2019 ${startTime} - ${endTime}`;
		this.set('appointmentTime', appointmentTime);
		this.handleSubjects(subjects);

		this.user = user.getTotalData();

		this.appointment = {
			startTime: time.startTime,
			endTime: time.endTime,
			month: month,
			day: day,
			date: date,
			recieverFirstName: this.advisor.firstName,
			recieverLastName: this.advisor.lastName,
			studentFirstName: this.user.firstName,
			studentLastName: this.user.lastName,
			studentId: this.user.uid,
			recieverId: this.advisor.uid
		};


	}

	public goBack() {
		const frame: Frame = getFrameById('topmost');
		frame.goBack()
	}

	private handleSubjects(subjects: Array<any>) {
		
		let length = subjects.length;
		let temp = [];
		for (let i = 0; i < length; i++) {
			let checkbox: any = new CheckBox();		
			
			checkbox.text = subjects[i];
			checkbox.fillColor = "#981e32";

			this.subject.push(checkbox);
			this.stack.addChild(checkbox);
		}
		
		
	}

	public addAppointment(args) {
		let subject = [];
		let frame = args.object.page.frame;
		this.subject.forEach((checkbox) => {
			if(checkbox.checked) {
				subject.push(checkbox.text);
			}
		})

		if(subject.length == 0) {
			this.set('subjectError', true);
		} else {
			this.appointment = {
				...this.appointment,
				subjects: subject,
				message: this.message,
				specificClass: this.specificClass,
			};
			this.set('inProgress', true);
			firebase.addAppointments(this.appointment)
				.then(() => {
					setTimeout(() => {
						this.set('inProgress', false);
						dialogs.genericDialog({
							title: 'Succesfully made appointment!',
							message: `${this.advisor.firstName} ${this.advisor.lastName} will get back to you soon!`,
							okButtonText: 'OK'
						}).then(() => frame.navigate({
							moduleName: "/views/home/app-page/app-page",
							context: {
								event: Events.ADDED_APPOINTMENT
							}
						}));
					}, 3500)
				})
			
		}
	}
}
