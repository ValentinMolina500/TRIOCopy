import { Observable } from "tns-core-modules/data/observable";
import { myFirebase } from "../../../../../../utils/firebase";
import { getFrameById, Frame, topmost, visibilityProperty, getViewById, View } from "tns-core-modules/ui/frame";
import AdivsorInterface from "../../../../../../constants/advisorDatabaseConstants";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Appointment } from "../../../../../../constants/appointmentConstants";
import { AppointmentViewModel } from "../../../../../../viewmodels/appointments";
import { GestureTypes, SwipeGestureEventData, PanGestureEventData } from "tns-core-modules/ui/gestures";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { RadListView, ListViewScrollEventData, ListViewLoadOnDemandMode, ListViewItemSnapMode, ListViewEventData } from 'nativescript-ui-listview';
import { minutesToTime } from "../../../../../../utils/time";
import { ActionBar } from 'tns-core-modules/ui/action-bar';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { Label } from "tns-core-modules/ui/label";
import { ad } from "tns-core-modules/utils/utils";
//const firebase = require("../../../../../../utils/firebase").I as myFirebase;
//const user = require("../../../../../../viewmodels/user").I as UserViewModel;
export class AppointmentViewModelPage extends Observable {

  public calendarItems: Array<any>;
  public advisor: AdivsorInterface;

  // Used to get the day using the number returned by a date object
  private dayStrings: Array<string> = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ]

  private dayStringsFull: Array<string> = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  // Used to get the month using the number returned by a date object
  private monthStrings: Array<string> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  /**
   * Counter used to hold how many times the user has moved the date foward by the right arrow button.
   * Used to prevent the user from going back in time more than the current week. 
   */
  private timesDateMovedFoward: number = 0;
  private page;
  /* Holds a reference to the calendar ListView in the front-end */
  private Calendar: RadListView;

  /* Holds the current displayed date, not necessarily the actual current date */
  private CurrentDate: Date = new Date();

  /* Holds the actual current date */
  private TodayDate: Date = new Date();

  private monthText: ActionBar;
  private helpText: StackLayout;

  private prevX: number;
  private prevY: number;

  constructor(advisor: AdivsorInterface, page) {
    super();
    this.page = page;
    this.advisor = advisor;

    // this.monthText = getViewById(page, 'month-text') as ActionBar;
    // this.helpText = getViewById(page, 'help-text') as StackLayout;
    // this.helpText.translateX = 0;
    // this.helpText.translateY = 0;


    // this.helpText.on(GestureTypes.pan, (args: PanGestureEventData) => {
    //   if (args.state === 1) // down
    //   {
    //     this.prevX = 0;
    //     this.prevY = 0;
    //   }
    //   if (args.state === 2) {
    //     this.helpText.translateX += args.deltaX - this.prevX;

    //     this.prevX = args.deltaX;

    //   }
    //   if (args.state === 3) {
    //     if (this.helpText.translateX >= 120) {
    //       this.helpText.animate({
    //         translate: { x: 2000, y: 0 },
    //         duration: 800,
    //       })
    //       //this.helpText.visibility = 'collapse';
    //     } else {
    //       this.helpText.translateX -= this.helpText.translateX;
    //     }
    //   }
    // })

    this.setupCalendar();

    //   firebase.getMentorAppointments(advisor.uid)
    //     .then((result: any) => {
    //       for (let key in result.value) {
    //         firebase.getValueFirebase('appointments/' + result.value[key].key)
    //           .then(result => {
    //             this.mentorAppointments.push(result.value)
    //             this.updateDays();
    //           });
    //       }

    //     })
    // }
  
  }

  /**
   * Sets up the calendar by populating the ListView with an item for every day
   * of the current month
   */
  public setupCalendar(): void {
    /**
     * Setting up some bounds for our for loop, iterator begins at current day,
     * endingDay at the last day of the month
     */
    let iterator: Date = new Date(this.CurrentDate.getFullYear(), this.CurrentDate.getMonth(), this.CurrentDate.getDate());
    let endingDay = new Date(iterator.getFullYear(), iterator.getMonth() + 1, 1);
    endingDay.setDate(endingDay.getDate() - 1);

    /**
     * Declaring some useful variables for each day of the month.
     * 
     * @param arr holds all the days of a given month from today
     * @param today indicates whether a given day is today
     * @param firstDayOfMonth indicates whether a given day is the first day of the month
     * @param hasTimes indicates whether a given day has available times
     * @param times holds the current available times for each day, if any
     */
    let arr: Array<any> = [];
    let today: boolean;
    let firstDayOfMonth: boolean;
    let hasTimes: boolean;
    let times: Array<any>;

    for (iterator.getDate(); iterator.getDate() < endingDay.getDate(); iterator.setDate(iterator.getDate() + 1)) {
      today = false;
      firstDayOfMonth = false;
      hasTimes = false;
      times = [];

      if (iterator.getDate() == this.TodayDate.getDate() && iterator.getMonth() == this.TodayDate.getMonth()) {
        today = true;
      }

      if (iterator.getDate() == 1) {
        firstDayOfMonth = true;
      }

      times = this.getAppointmentTimes(this.advisor, iterator);

      if (times.length > 0) {
        hasTimes = true;
      }

  
      arr.push({
        date: iterator.getDate(),
        id: iterator.getDate(),
        day: this.dayStrings[iterator.getDay()],
        month: iterator.getMonth(),
        today: today,
        availableTimes: times,
        hasItems: hasTimes,
        firstDayOfMonth,
        testing: this.onAppointmentTapCallback.bind(this)
      })

      
    }

    // arr.push({
    //   date: iterator.getDate(),
    //   day: this.dayStrings[iterator.getDay()]
    // })

    let currentMonth = this.monthStrings[this.TodayDate.getMonth()] + ' ' + this.TodayDate.getFullYear();

    this.set('month', currentMonth);

    if (arr) {
      this.set('calendarItems', arr);
    };
  }

  private calculateColor(index: number) {
    if (index % 3 == 0)
      return "RED"
    else if (index % 3 == 1)
      return "BLUE"
    else
      return "YELLOW"
  }

  /**
   * Private function that gets the available appointment times for a given day. 
   * 
   * @param advisor the current advisor
   * @param iterator the current iterator date object
   */
  private getAppointmentTimes(advisor: AdivsorInterface, iterator: Date): Array<any> {
    let times = [];
    for (let i = 0; i < advisor.dates.length; i++) {
      if (advisor.dates[i].day == this.dayStringsFull[iterator.getDay()]) {
        for (let j = 0; j < advisor.dates[i].times.length; j++) {
          if (advisor.dates[i].times[j].recurring) {
            advisor.dates[i].times[j].startTimeVisible = minutesToTime(advisor.dates[i].times[j].startTime)
            advisor.dates[i].times[j].endTimeVisible = minutesToTime(advisor.dates[i].times[j].endTime)
            advisor.dates[i].times[j].color = this.calculateColor(j);
            advisor.dates[i].times[j].day = iterator.getDay(),
            advisor.dates[i].times[j].date = iterator.getDate()
            advisor.dates[i].times[j].month = iterator.getMonth();


            times.push(advisor.dates[i].times[j]);
          }
        }
      }
    }

    return times;
  }

  private onAppointmentTapCallback(args: ListViewEventData): void {
    let index: number = Number(args.object.id) - this.TodayDate.getDate();
    let data = this.calendarItems[index];
    const page = args.object

    // const frame: Frame = getFrameById('app-page');

    page.page.frame.navigate({
      moduleName: "/views/home/app-page/choose-mentor-page/mentor/appointment/appointment-form/appointment-form",
      context: { 
        timeData: {
          time: data.availableTimes[args.index],
          date: data.date,
          month: data.month,
          day: data.day,
          subjects: this.advisor.subjects
        },
        advisor: this.advisor
      },
      animated: true,
      transition: {
        name: "slideLeft",
        duration: 380,
        curve: "easeIn"
      }
    });
  }


  public goBack() {
    const frame: Frame = getFrameById('my-app-page');
    frame.goBack();
  }
}