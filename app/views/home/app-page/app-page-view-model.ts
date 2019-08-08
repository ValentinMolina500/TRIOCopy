import { Observable } from "tns-core-modules/data/observable";
import { Page, getViewById } from "tns-core-modules/ui/page";
import { myFirebase } from "../../../utils/firebase";
import { ItemEventData, ListView } from "tns-core-modules/ui/list-view";
import { ObservableArray, ChangedData } from "tns-core-modules/data/observable-array"
import { UserViewModel } from "../../../viewmodels/user";
import { RadListView, ListViewLoadOnDemandMode, ListViewEventData } from "nativescript-ui-listview";
import { Button } from "tns-core-modules/ui/button/button";
import { AnimationDefinition, Animation } from "tns-core-modules/ui/animation/animation";
import firebase from "../../../utils/firebase";
import user from "../../../viewmodels/user";
import appointments from "../../../viewmodels/appointments";
import { dateParser } from "../../../utils/time";
import { Events } from "../../../constants/constants"
import { getFrameById } from "tns-core-modules/ui/frame/frame";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { Appointment } from "~/constants/appointmentConstants";


export class appViewModel extends Observable {
	public appointments: ObservableArray<any> = new ObservableArray();
	public upcomingAppointmentsListView: ListView;
	public faButton: Button;
	public faButtonAnimation: Array<AnimationDefinition> = new Array<AnimationDefinition>();
	public faButtonAnimationSet: Animation;

	private thisWeekCreated: boolean = false;
	private nextWeekCreated: boolean = false;
	private page: Page;

	constructor(page: Page, event) {
		super();
		this.upcomingAppointmentsListView = <ListView>getViewById(page, 'upcoming-appointments');
		this.page = page;
		this.setupAnimations();
		const { uid } = user.getTotalData();
		this.setUserAppointments(uid);
	}

	public fabTap(args) {
		const page: Page = args.object.page;
		console.log("click");
		this.faButtonAnimationSet.play().then(() => page.frame.navigate("/views/home/app-page/choose-mentor-page/choose-mentor-page"))
	}

	private setupAnimations() {
		this.faButton = <Button>getViewById(this.page, 'fa-button');

		this.faButtonAnimation.push({ target: this.faButton, scale: { x: 1.2, y: 1.2 }, duration: 190 });
		this.faButtonAnimation.push({ target: this.faButton, scale: { x: 1.01, y: 1.01 }, duration: 1 });

		this.faButtonAnimationSet = new Animation(this.faButtonAnimation, true);
	}

	private sortAppointmentsByTime(appointments: Array<any>): Array<any> {
		return appointments.sort((a, b) => {
			if (a.month < b.month) {
				return -1
			}

			if (a.month == b.month) {
				if (a.date < b.date) {
					return -1
				}

				if (a.date == b.date) {
					if (a.startTime < b.startTime) {
						return -1;
					}
					if (a.startTime == b.startTime) {
						return 0;
					}
					if (a.startTime > b.startTime) {
						return 1;
					}
				}

				if (a.date > b.date) {
					return 1;
				}
			}

			if (a.month > b.month) {
				return -1;
			}

			return 0;
		})
	}

	public onItemTap(args: ListViewEventData) {
		let frame = getFrameById('my-app-page');

		frame.navigate({
			moduleName: "/views/home/app-page/appointment-details/appointment-details",
			context: {
				appointmentData: this.appointments.getItem(args.index),
			}
		});
	}
	private setUserAppointments(uid: string) {
		if (appointments.userAppointmentsRetrievedData) {
			let sortedAppointments = this.sortAppointmentsByTime(appointments.getUserAppointments());
			this.set("appointments", new ObservableArray(sortedAppointments));
			this.parseUserAppointments();
		} else {
			appointments.setUserAppointments(uid)
				.then(() => {
					let sortedAppointments = this.sortAppointmentsByTime(appointments.getUserAppointments());
					this.set('appointments', new ObservableArray(sortedAppointments));
					this.parseUserAppointments();
				})
		}
	}

	private parseTimeIndicators(item: any): string {
		let date = new Date();

		let thisWeek: number = date.getDate() - date.getDay() + 1;
		let nextWeek: number = date.getDate() - date.getDay() + 7;

		if ((item.date >= thisWeek && item.date < thisWeek + 5) && !this.thisWeekCreated)  {
			this.thisWeekCreated = true;
			return "This Week"
		} else if ((item.date >= nextWeek) && !this.nextWeekCreated) {
			this.nextWeekCreated = true;
			return "Next Week";
		}
	}

	private parseUserAppointments() {
		let length = this.appointments.length;
		if(!length) {
			return;
		}

		for (let i = 0; i < length; i++) {
			let item = this.appointments.getItem(i);
			let timeIndicator = null;
			let lastItem = false;
			

			timeIndicator = this.parseTimeIndicators(item);
			if(i == length - 1) {
				lastItem = true;
			}


			this.appointments.setItem(i, {
				...item,
				lastItem,
				timeIndicator,
				subjects: item.subjects.join(" ")
			})
		}
		
	}
}