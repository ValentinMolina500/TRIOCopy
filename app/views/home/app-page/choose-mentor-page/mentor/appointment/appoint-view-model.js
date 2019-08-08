"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var frame_1 = require("tns-core-modules/ui/frame");
//const firebase = require("../../../../../../utils/firebase").I as myFirebase;
//const user = require("../../../../../../viewmodels/user").I as UserViewModel;
var AppointmentViewModelPage = /** @class */ (function (_super) {
    __extends(AppointmentViewModelPage, _super);
    function AppointmentViewModelPage(advisor, page) {
        var _this = _super.call(this) || this;
        // Used to get the day using the number returned by a date object
        _this.dayStrings = [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ];
        _this.dayStringsFull = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        // Used to get the month using the number returned by a date object
        _this.monthStrings = [
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
        ];
        /**
         * Counter used to hold how many times the user has moved the date foward by the right arrow button.
         * Used to prevent the user from going back in time more than the current week.
         */
        _this.timesDateMovedFoward = 0;
        /* Holds the current displayed date, not necessarily the actual current date */
        _this.CurrentDate = new Date();
        /* Holds the actual current date */
        _this.TodayDate = new Date();
        _this.page = page;
        _this.advisor = advisor;
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
        _this.setupCalendar();
        return _this;
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
    AppointmentViewModelPage.prototype.setupCalendar = function () {
        /**
         * Setting up some bounds for our for loop, iterator begins at current day,
         * endingDay at the last day of the month
         */
        var iterator = new Date(this.CurrentDate.getFullYear(), this.CurrentDate.getMonth(), this.CurrentDate.getDate());
        var endingDay = new Date(iterator.getFullYear(), iterator.getMonth() + 1, 1);
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
        var arr = [];
        var today;
        var firstDayOfMonth;
        var hasTimes;
        var times;
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
                firstDayOfMonth: firstDayOfMonth,
                testing: this.onAppointmentTapCallback.bind(this)
            });
        }
        // arr.push({
        //   date: iterator.getDate(),
        //   day: this.dayStrings[iterator.getDay()]
        // })
        var currentMonth = this.monthStrings[this.TodayDate.getMonth()] + ' ' + this.TodayDate.getFullYear();
        this.set('month', currentMonth);
        if (arr) {
            this.set('calendarItems', arr);
        }
        ;
    };
    AppointmentViewModelPage.prototype.calculateColor = function (index) {
        if (index % 3 == 0)
            return "RED";
        else if (index % 3 == 1)
            return "BLUE";
        else
            return "YELLOW";
    };
    /**
     * Private function that gets the available appointment times for a given day.
     *
     * @param advisor the current advisor
     * @param iterator the current iterator date object
     */
    AppointmentViewModelPage.prototype.getAppointmentTimes = function (advisor, iterator) {
        var times = [];
        for (var i = 0; i < advisor.dates.length; i++) {
            if (advisor.dates[i].day == this.dayStringsFull[iterator.getDay()]) {
                for (var j = 0; j < advisor.dates[i].times.length; j++) {
                    if (advisor.dates[i].times[j].recurring) {
                        advisor.dates[i].times[j].color = this.calculateColor(j);
                        advisor.dates[i].times[j].day = iterator.getDay(),
                            advisor.dates[i].times[j].date = iterator.getDate();
                        advisor.dates[i].times[j].month = iterator.getMonth();
                        times.push(advisor.dates[i].times[j]);
                    }
                }
            }
        }
        return times;
    };
    AppointmentViewModelPage.prototype.onAppointmentTapCallback = function (args) {
        var index = Number(args.object.id) - this.TodayDate.getDate();
        var data = this.calendarItems[index];
        var frame = frame_1.getFrameById('topmost');
        frame.navigate({
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
                name: "slideTop",
                duration: 380,
                curve: "easeIn"
            }
        });
    };
    AppointmentViewModelPage.prototype.goBack = function () {
        var frame = frame_1.getFrameById('my-app-page');
        frame.goBack();
    };
    return AppointmentViewModelPage;
}(observable_1.Observable));
exports.AppointmentViewModelPage = AppointmentViewModelPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludC12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwb2ludC12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQThEO0FBRTlELG1EQUF1SDtBQVl2SCwrRUFBK0U7QUFDL0UsK0VBQStFO0FBQy9FO0lBQThDLDRDQUFVO0lBK0R0RCxrQ0FBWSxPQUF5QixFQUFFLElBQUk7UUFBM0MsWUFDRSxpQkFBTyxTQWtEUjtRQTdHRCxpRUFBaUU7UUFDekQsZ0JBQVUsR0FBa0I7WUFDbEMsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztTQUNOLENBQUE7UUFFTyxvQkFBYyxHQUFrQjtZQUN0QyxRQUFRO1lBQ1IsUUFBUTtZQUNSLFNBQVM7WUFDVCxXQUFXO1lBQ1gsVUFBVTtZQUNWLFFBQVE7WUFDUixVQUFVO1NBQ1gsQ0FBQTtRQUVELG1FQUFtRTtRQUMzRCxrQkFBWSxHQUFrQjtZQUNwQyxTQUFTO1lBQ1QsVUFBVTtZQUNWLE9BQU87WUFDUCxPQUFPO1lBQ1AsS0FBSztZQUNMLE1BQU07WUFDTixNQUFNO1lBQ04sUUFBUTtZQUNSLFdBQVc7WUFDWCxTQUFTO1lBQ1QsVUFBVTtZQUNWLFVBQVU7U0FDWCxDQUFBO1FBRUQ7OztXQUdHO1FBQ0ssMEJBQW9CLEdBQVcsQ0FBQyxDQUFDO1FBS3pDLCtFQUErRTtRQUN2RSxpQkFBVyxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7UUFFdkMsbUNBQW1DO1FBQzNCLGVBQVMsR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBVW5DLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBRXZCLGlFQUFpRTtRQUNqRSxpRUFBaUU7UUFDakUsZ0NBQWdDO1FBQ2hDLGdDQUFnQztRQUdoQyxzRUFBc0U7UUFDdEUsa0NBQWtD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QWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyQyxJQUFNLEtBQUssR0FBVSxvQkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTdDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDYixVQUFVLEVBQUUsOEZBQThGO1lBQzFHLE9BQU8sRUFBRTtnQkFDUCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztvQkFDckMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO29CQUNiLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7aUJBQ2hDO2dCQUNELE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzthQUN0QjtZQUNELFFBQVEsRUFBRSxJQUFJO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxVQUFVO2dCQUNoQixRQUFRLEVBQUUsR0FBRztnQkFDYixLQUFLLEVBQUUsUUFBUTthQUNoQjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFHTSx5Q0FBTSxHQUFiO1FBQ0UsSUFBTSxLQUFLLEdBQVUsb0JBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRCxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUNILCtCQUFDO0FBQUQsQ0FBQyxBQXRRRCxDQUE4Qyx1QkFBVSxHQXNRdkQ7QUF0UVksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBteUZpcmViYXNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uL3V0aWxzL2ZpcmViYXNlXCI7XHJcbmltcG9ydCB7IGdldEZyYW1lQnlJZCwgRnJhbWUsIHRvcG1vc3QsIHN0YWNrLCB2aXNpYmlsaXR5UHJvcGVydHksIGdldFZpZXdCeUlkLCBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIjtcclxuaW1wb3J0IEFkaXZzb3JJbnRlcmZhY2UgZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uL2NvbnN0YW50cy9hZHZpc29yRGF0YWJhc2VDb25zdGFudHNcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5L29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgQXBwb2ludG1lbnQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vY29uc3RhbnRzL2FwcG9pbnRtZW50Q29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEFwcG9pbnRtZW50Vmlld01vZGVsIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uLy4uL3ZpZXdtb2RlbHMvYXBwb2ludG1lbnRzXCI7XHJcbmltcG9ydCB7IEdlc3R1cmVUeXBlcywgU3dpcGVHZXN0dXJlRXZlbnREYXRhLCBQYW5HZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uQ3VydmUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9lbnVtc1wiO1xyXG5pbXBvcnQgeyBSYWRMaXN0VmlldywgTGlzdFZpZXdTY3JvbGxFdmVudERhdGEsIExpc3RWaWV3TG9hZE9uRGVtYW5kTW9kZSwgTGlzdFZpZXdJdGVtU25hcE1vZGUsIExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3JztcclxuXHJcbmltcG9ydCB7IEFjdGlvbkJhciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvYWN0aW9uLWJhcic7XHJcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dCc7XHJcbmltcG9ydCB7IExhYmVsIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIjtcclxuLy9jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi91dGlscy9maXJlYmFzZVwiKS5JIGFzIG15RmlyZWJhc2U7XHJcbi8vY29uc3QgdXNlciA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi8uLi92aWV3bW9kZWxzL3VzZXJcIikuSSBhcyBVc2VyVmlld01vZGVsO1xyXG5leHBvcnQgY2xhc3MgQXBwb2ludG1lbnRWaWV3TW9kZWxQYWdlIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XHJcblxyXG4gIHB1YmxpYyBjYWxlbmRhckl0ZW1zOiBBcnJheTxhbnk+O1xyXG4gIHB1YmxpYyBhZHZpc29yOiBBZGl2c29ySW50ZXJmYWNlO1xyXG5cclxuICAvLyBVc2VkIHRvIGdldCB0aGUgZGF5IHVzaW5nIHRoZSBudW1iZXIgcmV0dXJuZWQgYnkgYSBkYXRlIG9iamVjdFxyXG4gIHByaXZhdGUgZGF5U3RyaW5nczogQXJyYXk8c3RyaW5nPiA9IFtcclxuICAgIFwiU3VuXCIsXHJcbiAgICBcIk1vblwiLFxyXG4gICAgXCJUdWVcIixcclxuICAgIFwiV2VkXCIsXHJcbiAgICBcIlRodVwiLFxyXG4gICAgXCJGcmlcIixcclxuICAgIFwiU2F0XCJcclxuICBdXHJcblxyXG4gIHByaXZhdGUgZGF5U3RyaW5nc0Z1bGw6IEFycmF5PHN0cmluZz4gPSBbXHJcbiAgICBcIlN1bmRheVwiLFxyXG4gICAgXCJNb25kYXlcIixcclxuICAgIFwiVHVlc2RheVwiLFxyXG4gICAgXCJXZWRuZXNkYXlcIixcclxuICAgIFwiVGh1cnNkYXlcIixcclxuICAgIFwiRnJpZGF5XCIsXHJcbiAgICBcIlNhdHVyZGF5XCJcclxuICBdXHJcblxyXG4gIC8vIFVzZWQgdG8gZ2V0IHRoZSBtb250aCB1c2luZyB0aGUgbnVtYmVyIHJldHVybmVkIGJ5IGEgZGF0ZSBvYmplY3RcclxuICBwcml2YXRlIG1vbnRoU3RyaW5nczogQXJyYXk8c3RyaW5nPiA9IFtcclxuICAgIFwiSmFudWFyeVwiLFxyXG4gICAgXCJGZWJydWFyeVwiLFxyXG4gICAgXCJNYXJjaFwiLFxyXG4gICAgXCJBcHJpbFwiLFxyXG4gICAgXCJNYXlcIixcclxuICAgIFwiSnVuZVwiLFxyXG4gICAgXCJKdWx5XCIsXHJcbiAgICBcIkF1Z3VzdFwiLFxyXG4gICAgXCJTZXB0ZW1iZXJcIixcclxuICAgIFwiT2N0b2JlclwiLFxyXG4gICAgXCJOb3ZlbWJlclwiLFxyXG4gICAgXCJEZWNlbWJlclwiXHJcbiAgXVxyXG5cclxuICAvKipcclxuICAgKiBDb3VudGVyIHVzZWQgdG8gaG9sZCBob3cgbWFueSB0aW1lcyB0aGUgdXNlciBoYXMgbW92ZWQgdGhlIGRhdGUgZm93YXJkIGJ5IHRoZSByaWdodCBhcnJvdyBidXR0b24uXHJcbiAgICogVXNlZCB0byBwcmV2ZW50IHRoZSB1c2VyIGZyb20gZ29pbmcgYmFjayBpbiB0aW1lIG1vcmUgdGhhbiB0aGUgY3VycmVudCB3ZWVrLiBcclxuICAgKi9cclxuICBwcml2YXRlIHRpbWVzRGF0ZU1vdmVkRm93YXJkOiBudW1iZXIgPSAwO1xyXG4gIHByaXZhdGUgcGFnZTtcclxuICAvKiBIb2xkcyBhIHJlZmVyZW5jZSB0byB0aGUgY2FsZW5kYXIgTGlzdFZpZXcgaW4gdGhlIGZyb250LWVuZCAqL1xyXG4gIHByaXZhdGUgQ2FsZW5kYXI6IFJhZExpc3RWaWV3O1xyXG5cclxuICAvKiBIb2xkcyB0aGUgY3VycmVudCBkaXNwbGF5ZWQgZGF0ZSwgbm90IG5lY2Vzc2FyaWx5IHRoZSBhY3R1YWwgY3VycmVudCBkYXRlICovXHJcbiAgcHJpdmF0ZSBDdXJyZW50RGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gIC8qIEhvbGRzIHRoZSBhY3R1YWwgY3VycmVudCBkYXRlICovXHJcbiAgcHJpdmF0ZSBUb2RheURhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICBwcml2YXRlIG1vbnRoVGV4dDogQWN0aW9uQmFyO1xyXG4gIHByaXZhdGUgaGVscFRleHQ6IFN0YWNrTGF5b3V0O1xyXG5cclxuICBwcml2YXRlIHByZXZYOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBwcmV2WTogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihhZHZpc29yOiBBZGl2c29ySW50ZXJmYWNlLCBwYWdlKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5wYWdlID0gcGFnZTtcclxuICAgIHRoaXMuYWR2aXNvciA9IGFkdmlzb3I7XHJcblxyXG4gICAgLy8gdGhpcy5tb250aFRleHQgPSBnZXRWaWV3QnlJZChwYWdlLCAnbW9udGgtdGV4dCcpIGFzIEFjdGlvbkJhcjtcclxuICAgIC8vIHRoaXMuaGVscFRleHQgPSBnZXRWaWV3QnlJZChwYWdlLCAnaGVscC10ZXh0JykgYXMgU3RhY2tMYXlvdXQ7XHJcbiAgICAvLyB0aGlzLmhlbHBUZXh0LnRyYW5zbGF0ZVggPSAwO1xyXG4gICAgLy8gdGhpcy5oZWxwVGV4dC50cmFuc2xhdGVZID0gMDtcclxuXHJcblxyXG4gICAgLy8gdGhpcy5oZWxwVGV4dC5vbihHZXN0dXJlVHlwZXMucGFuLCAoYXJnczogUGFuR2VzdHVyZUV2ZW50RGF0YSkgPT4ge1xyXG4gICAgLy8gICBpZiAoYXJncy5zdGF0ZSA9PT0gMSkgLy8gZG93blxyXG4gICAgLy8gICB7XHJcbiAgICAvLyAgICAgdGhpcy5wcmV2WCA9IDA7XHJcbiAgICAvLyAgICAgdGhpcy5wcmV2WSA9IDA7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vICAgaWYgKGFyZ3Muc3RhdGUgPT09IDIpIHtcclxuICAgIC8vICAgICB0aGlzLmhlbHBUZXh0LnRyYW5zbGF0ZVggKz0gYXJncy5kZWx0YVggLSB0aGlzLnByZXZYO1xyXG5cclxuICAgIC8vICAgICB0aGlzLnByZXZYID0gYXJncy5kZWx0YVg7XHJcblxyXG4gICAgLy8gICB9XHJcbiAgICAvLyAgIGlmIChhcmdzLnN0YXRlID09PSAzKSB7XHJcbiAgICAvLyAgICAgaWYgKHRoaXMuaGVscFRleHQudHJhbnNsYXRlWCA+PSAxMjApIHtcclxuICAgIC8vICAgICAgIHRoaXMuaGVscFRleHQuYW5pbWF0ZSh7XHJcbiAgICAvLyAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAyMDAwLCB5OiAwIH0sXHJcbiAgICAvLyAgICAgICAgIGR1cmF0aW9uOiA4MDAsXHJcbiAgICAvLyAgICAgICB9KVxyXG4gICAgLy8gICAgICAgLy90aGlzLmhlbHBUZXh0LnZpc2liaWxpdHkgPSAnY29sbGFwc2UnO1xyXG4gICAgLy8gICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICB0aGlzLmhlbHBUZXh0LnRyYW5zbGF0ZVggLT0gdGhpcy5oZWxwVGV4dC50cmFuc2xhdGVYO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgfVxyXG4gICAgLy8gfSlcclxuXHJcbiAgICB0aGlzLnNldHVwQ2FsZW5kYXIoKTtcclxuXHJcbiAgICAvLyAgIGZpcmViYXNlLmdldE1lbnRvckFwcG9pbnRtZW50cyhhZHZpc29yLnVpZClcclxuICAgIC8vICAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgIC8vICAgICAgIGZvciAobGV0IGtleSBpbiByZXN1bHQudmFsdWUpIHtcclxuICAgIC8vICAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWVGaXJlYmFzZSgnYXBwb2ludG1lbnRzLycgKyByZXN1bHQudmFsdWVba2V5XS5rZXkpXHJcbiAgICAvLyAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubWVudG9yQXBwb2ludG1lbnRzLnB1c2gocmVzdWx0LnZhbHVlKVxyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy51cGRhdGVEYXlzKCk7XHJcbiAgICAvLyAgICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICB9XHJcblxyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyB9XHJcbiAgXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHVwIHRoZSBjYWxlbmRhciBieSBwb3B1bGF0aW5nIHRoZSBMaXN0VmlldyB3aXRoIGFuIGl0ZW0gZm9yIGV2ZXJ5IGRheVxyXG4gICAqIG9mIHRoZSBjdXJyZW50IG1vbnRoXHJcbiAgICovXHJcbiAgcHVibGljIHNldHVwQ2FsZW5kYXIoKTogdm9pZCB7XHJcbiAgICAvKipcclxuICAgICAqIFNldHRpbmcgdXAgc29tZSBib3VuZHMgZm9yIG91ciBmb3IgbG9vcCwgaXRlcmF0b3IgYmVnaW5zIGF0IGN1cnJlbnQgZGF5LFxyXG4gICAgICogZW5kaW5nRGF5IGF0IHRoZSBsYXN0IGRheSBvZiB0aGUgbW9udGhcclxuICAgICAqL1xyXG4gICAgbGV0IGl0ZXJhdG9yOiBEYXRlID0gbmV3IERhdGUodGhpcy5DdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLCB0aGlzLkN1cnJlbnREYXRlLmdldE1vbnRoKCksIHRoaXMuQ3VycmVudERhdGUuZ2V0RGF0ZSgpKTtcclxuICAgIGxldCBlbmRpbmdEYXkgPSBuZXcgRGF0ZShpdGVyYXRvci5nZXRGdWxsWWVhcigpLCBpdGVyYXRvci5nZXRNb250aCgpICsgMSwgMSk7XHJcbiAgICBlbmRpbmdEYXkuc2V0RGF0ZShlbmRpbmdEYXkuZ2V0RGF0ZSgpIC0gMSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWNsYXJpbmcgc29tZSB1c2VmdWwgdmFyaWFibGVzIGZvciBlYWNoIGRheSBvZiB0aGUgbW9udGguXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBhcnIgaG9sZHMgYWxsIHRoZSBkYXlzIG9mIGEgZ2l2ZW4gbW9udGggZnJvbSB0b2RheVxyXG4gICAgICogQHBhcmFtIHRvZGF5IGluZGljYXRlcyB3aGV0aGVyIGEgZ2l2ZW4gZGF5IGlzIHRvZGF5XHJcbiAgICAgKiBAcGFyYW0gZmlyc3REYXlPZk1vbnRoIGluZGljYXRlcyB3aGV0aGVyIGEgZ2l2ZW4gZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIG1vbnRoXHJcbiAgICAgKiBAcGFyYW0gaGFzVGltZXMgaW5kaWNhdGVzIHdoZXRoZXIgYSBnaXZlbiBkYXkgaGFzIGF2YWlsYWJsZSB0aW1lc1xyXG4gICAgICogQHBhcmFtIHRpbWVzIGhvbGRzIHRoZSBjdXJyZW50IGF2YWlsYWJsZSB0aW1lcyBmb3IgZWFjaCBkYXksIGlmIGFueVxyXG4gICAgICovXHJcbiAgICBsZXQgYXJyOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBsZXQgdG9kYXk6IGJvb2xlYW47XHJcbiAgICBsZXQgZmlyc3REYXlPZk1vbnRoOiBib29sZWFuO1xyXG4gICAgbGV0IGhhc1RpbWVzOiBib29sZWFuO1xyXG4gICAgbGV0IHRpbWVzOiBBcnJheTxhbnk+O1xyXG5cclxuICAgIGZvciAoaXRlcmF0b3IuZ2V0RGF0ZSgpOyBpdGVyYXRvci5nZXREYXRlKCkgPCBlbmRpbmdEYXkuZ2V0RGF0ZSgpOyBpdGVyYXRvci5zZXREYXRlKGl0ZXJhdG9yLmdldERhdGUoKSArIDEpKSB7XHJcbiAgICAgIHRvZGF5ID0gZmFsc2U7XHJcbiAgICAgIGZpcnN0RGF5T2ZNb250aCA9IGZhbHNlO1xyXG4gICAgICBoYXNUaW1lcyA9IGZhbHNlO1xyXG4gICAgICB0aW1lcyA9IFtdO1xyXG5cclxuICAgICAgaWYgKGl0ZXJhdG9yLmdldERhdGUoKSA9PSB0aGlzLlRvZGF5RGF0ZS5nZXREYXRlKCkgJiYgaXRlcmF0b3IuZ2V0TW9udGgoKSA9PSB0aGlzLlRvZGF5RGF0ZS5nZXRNb250aCgpKSB7XHJcbiAgICAgICAgdG9kYXkgPSB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXRlcmF0b3IuZ2V0RGF0ZSgpID09IDEpIHtcclxuICAgICAgICBmaXJzdERheU9mTW9udGggPSB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aW1lcyA9IHRoaXMuZ2V0QXBwb2ludG1lbnRUaW1lcyh0aGlzLmFkdmlzb3IsIGl0ZXJhdG9yKTtcclxuXHJcbiAgICAgIGlmICh0aW1lcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgaGFzVGltZXMgPSB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gIFxyXG4gICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgZGF0ZTogaXRlcmF0b3IuZ2V0RGF0ZSgpLFxyXG4gICAgICAgIGlkOiBpdGVyYXRvci5nZXREYXRlKCksXHJcbiAgICAgICAgZGF5OiB0aGlzLmRheVN0cmluZ3NbaXRlcmF0b3IuZ2V0RGF5KCldLFxyXG4gICAgICAgIG1vbnRoOiBpdGVyYXRvci5nZXRNb250aCgpLFxyXG4gICAgICAgIHRvZGF5OiB0b2RheSxcclxuICAgICAgICBhdmFpbGFibGVUaW1lczogdGltZXMsXHJcbiAgICAgICAgaGFzSXRlbXM6IGhhc1RpbWVzLFxyXG4gICAgICAgIGZpcnN0RGF5T2ZNb250aCxcclxuICAgICAgICB0ZXN0aW5nOiB0aGlzLm9uQXBwb2ludG1lbnRUYXBDYWxsYmFjay5iaW5kKHRoaXMpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcnIucHVzaCh7XHJcbiAgICAvLyAgIGRhdGU6IGl0ZXJhdG9yLmdldERhdGUoKSxcclxuICAgIC8vICAgZGF5OiB0aGlzLmRheVN0cmluZ3NbaXRlcmF0b3IuZ2V0RGF5KCldXHJcbiAgICAvLyB9KVxyXG5cclxuICAgIGxldCBjdXJyZW50TW9udGggPSB0aGlzLm1vbnRoU3RyaW5nc1t0aGlzLlRvZGF5RGF0ZS5nZXRNb250aCgpXSArICcgJyArIHRoaXMuVG9kYXlEYXRlLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgdGhpcy5zZXQoJ21vbnRoJywgY3VycmVudE1vbnRoKTtcclxuXHJcbiAgICBpZiAoYXJyKSB7XHJcbiAgICAgIHRoaXMuc2V0KCdjYWxlbmRhckl0ZW1zJywgYXJyKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNhbGN1bGF0ZUNvbG9yKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmIChpbmRleCAlIDMgPT0gMClcclxuICAgICAgcmV0dXJuIFwiUkVEXCJcclxuICAgIGVsc2UgaWYgKGluZGV4ICUgMyA9PSAxKVxyXG4gICAgICByZXR1cm4gXCJCTFVFXCJcclxuICAgIGVsc2VcclxuICAgICAgcmV0dXJuIFwiWUVMTE9XXCJcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBnZXRzIHRoZSBhdmFpbGFibGUgYXBwb2ludG1lbnQgdGltZXMgZm9yIGEgZ2l2ZW4gZGF5LiBcclxuICAgKiBcclxuICAgKiBAcGFyYW0gYWR2aXNvciB0aGUgY3VycmVudCBhZHZpc29yXHJcbiAgICogQHBhcmFtIGl0ZXJhdG9yIHRoZSBjdXJyZW50IGl0ZXJhdG9yIGRhdGUgb2JqZWN0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRBcHBvaW50bWVudFRpbWVzKGFkdmlzb3I6IEFkaXZzb3JJbnRlcmZhY2UsIGl0ZXJhdG9yOiBEYXRlKTogQXJyYXk8YW55PiB7XHJcbiAgICBsZXQgdGltZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWR2aXNvci5kYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoYWR2aXNvci5kYXRlc1tpXS5kYXkgPT0gdGhpcy5kYXlTdHJpbmdzRnVsbFtpdGVyYXRvci5nZXREYXkoKV0pIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFkdmlzb3IuZGF0ZXNbaV0udGltZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgIGlmIChhZHZpc29yLmRhdGVzW2ldLnRpbWVzW2pdLnJlY3VycmluZykge1xyXG4gICAgICAgICAgICBhZHZpc29yLmRhdGVzW2ldLnRpbWVzW2pdLmNvbG9yID0gdGhpcy5jYWxjdWxhdGVDb2xvcihqKTtcclxuICAgICAgICAgICAgYWR2aXNvci5kYXRlc1tpXS50aW1lc1tqXS5kYXkgPSBpdGVyYXRvci5nZXREYXkoKSxcclxuICAgICAgICAgICAgYWR2aXNvci5kYXRlc1tpXS50aW1lc1tqXS5kYXRlID0gaXRlcmF0b3IuZ2V0RGF0ZSgpXHJcbiAgICAgICAgICAgIGFkdmlzb3IuZGF0ZXNbaV0udGltZXNbal0ubW9udGggPSBpdGVyYXRvci5nZXRNb250aCgpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRpbWVzLnB1c2goYWR2aXNvci5kYXRlc1tpXS50aW1lc1tqXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRpbWVzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkFwcG9pbnRtZW50VGFwQ2FsbGJhY2soYXJnczogTGlzdFZpZXdFdmVudERhdGEpOiB2b2lkIHtcclxuICAgIGxldCBpbmRleDogbnVtYmVyID0gTnVtYmVyKGFyZ3Mub2JqZWN0LmlkKSAtIHRoaXMuVG9kYXlEYXRlLmdldERhdGUoKTtcclxuICAgIGxldCBkYXRhID0gdGhpcy5jYWxlbmRhckl0ZW1zW2luZGV4XTtcclxuXHJcbiAgICBjb25zdCBmcmFtZTogRnJhbWUgPSBnZXRGcmFtZUJ5SWQoJ3RvcG1vc3QnKTtcclxuXHJcbiAgICBmcmFtZS5uYXZpZ2F0ZSh7XHJcbiAgICAgIG1vZHVsZU5hbWU6IFwiL3ZpZXdzL2hvbWUvYXBwLXBhZ2UvY2hvb3NlLW1lbnRvci1wYWdlL21lbnRvci9hcHBvaW50bWVudC9hcHBvaW50bWVudC1mb3JtL2FwcG9pbnRtZW50LWZvcm1cIixcclxuICAgICAgY29udGV4dDogeyBcclxuICAgICAgICB0aW1lRGF0YToge1xyXG4gICAgICAgICAgdGltZTogZGF0YS5hdmFpbGFibGVUaW1lc1thcmdzLmluZGV4XSxcclxuICAgICAgICAgIGRhdGU6IGRhdGEuZGF0ZSxcclxuICAgICAgICAgIG1vbnRoOiBkYXRhLm1vbnRoLFxyXG4gICAgICAgICAgZGF5OiBkYXRhLmRheSxcclxuICAgICAgICAgIHN1YmplY3RzOiB0aGlzLmFkdmlzb3Iuc3ViamVjdHNcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkdmlzb3I6IHRoaXMuYWR2aXNvclxyXG4gICAgICB9LFxyXG4gICAgICBhbmltYXRlZDogdHJ1ZSxcclxuICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgIG5hbWU6IFwic2xpZGVUb3BcIixcclxuICAgICAgICBkdXJhdGlvbjogMzgwLFxyXG4gICAgICAgIGN1cnZlOiBcImVhc2VJblwiXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICBjb25zdCBmcmFtZTogRnJhbWUgPSBnZXRGcmFtZUJ5SWQoJ215LWFwcC1wYWdlJyk7XHJcbiAgICBmcmFtZS5nb0JhY2soKTtcclxuICB9XHJcbn0iXX0=