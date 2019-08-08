"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var frame_1 = require("tns-core-modules/ui/frame");
var nativescript_ui_listview_1 = require("nativescript-ui-listview");
var appointments = require("../../../../../viewmodels/appointments").I;
var Type;
(function (Type) {
    Type[Type["Advisor"] = 0] = "Advisor";
    Type[Type["Tutor"] = 1] = "Tutor";
})(Type || (Type = {}));
var mentorViewModel = /** @class */ (function (_super) {
    __extends(mentorViewModel, _super);
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
    function mentorViewModel(context, page) {
        var _this = _super.call(this) || this;
        _this.mentorArray = [];
        var feed = frame_1.getViewById(page, 'feed');
        feed.loadOnDemandMode = nativescript_ui_listview_1.ListViewLoadOnDemandMode.None;
        switch (context.type) {
            case "ADVISOR":
                _this.set("advisorName", "Advisor");
                _this.setMentorArray(Type.Advisor);
                break;
            case "TUTORS":
                _this.set("advisorName", "Tutors");
                _this.setMentorArray(Type.Tutor);
                break;
            default:
                break;
        }
        return _this;
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
    mentorViewModel.prototype.setMentorArray = function (type) {
        var _this = this;
        if (type == Type.Tutor) {
            appointments.tutorRetrievedData ? this.set("mentorArray", appointments.getTutors())
                : appointments.setTutors()
                    .then(function () {
                    _this.set("mentorArray", appointments.getTutors());
                });
        }
        else {
            /* Set Advisors here! */
        }
    };
    mentorViewModel.prototype.onAdvisorTap = function (args) {
        var frame = frame_1.getFrameById('my-app-page');
        var advisor = this.mentorArray[args.index];
        frame.navigate({
            moduleName: "/views/home/app-page/choose-mentor-page/mentor/appointment/appointment",
            context: {
                advisor: advisor
            }
        });
    };
    mentorViewModel.prototype.goBack = function () {
        var frame = frame_1.getFrameById('my-app-page');
        frame.goBack();
    };
    return mentorViewModel;
}(observable_1.Observable));
exports.mentorViewModel = mentorViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudG9yLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZW50b3Itdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUE4RDtBQUc5RCxtREFBNkU7QUFFN0UscUVBQW1KO0FBRW5KLElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDLENBQXlCLENBQUM7QUFFakcsSUFBSyxJQUdKO0FBSEQsV0FBSyxJQUFJO0lBQ0wscUNBQU8sQ0FBQTtJQUNQLGlDQUFLLENBQUE7QUFDVCxDQUFDLEVBSEksSUFBSSxLQUFKLElBQUksUUFHUjtBQUdEO0lBQXFDLG1DQUFVO0lBSTNDLHVDQUF1QztJQUN2QyxRQUFRO0lBQ1IsNkJBQTZCO0lBQzdCLDJCQUEyQjtJQUMzQixxQ0FBcUM7SUFDckMsOENBQThDO0lBQzlDLHNDQUFzQztJQUN0Qyx5SUFBeUk7SUFDekksNEpBQTRKO0lBQzVKLCtCQUErQjtJQUMvQixTQUFTO0lBQ1QsUUFBUTtJQUNSLDhCQUE4QjtJQUM5QiwrQkFBK0I7SUFDL0IsMENBQTBDO0lBQzFDLDhDQUE4QztJQUM5Qyw2QkFBNkI7SUFDN0Isb0tBQW9LO0lBQ3BLLDRHQUE0RztJQUM1RywrQkFBK0I7SUFDL0IsU0FBUztJQUNULFFBQVE7SUFFUiw4QkFBOEI7SUFDOUIsK0JBQStCO0lBQy9CLDBDQUEwQztJQUMxQyw4Q0FBOEM7SUFDOUMsNkJBQTZCO0lBQzdCLG9LQUFvSztJQUNwSyw0R0FBNEc7SUFDNUcsK0JBQStCO0lBQy9CLFFBQVE7SUFDUixJQUFJO0lBRUoseUJBQVksT0FBWSxFQUFFLElBQUk7UUFBOUIsWUFDSSxpQkFBTyxTQStCVjtRQXBFTSxpQkFBVyxHQUFlLEVBQUUsQ0FBQztRQXVDaEMsSUFBSSxJQUFJLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFnQixDQUFDO1FBQ3BELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxtREFBd0IsQ0FBQyxJQUFJLENBQUM7UUFFdEQsUUFBUSxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ2xCLEtBQUssU0FBUztnQkFDVixLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDbkMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU07WUFFVixLQUFLLFFBQVE7Z0JBQ1QsS0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2xDLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQyxNQUFNO1lBRVY7Z0JBQ0ksTUFBTTtTQUNiOztRQUVEOzs7Ozs7Ozs7O1dBVUc7SUFDUCxDQUFDO0lBRU8sd0NBQWMsR0FBdEIsVUFBdUIsSUFBVTtRQUFqQyxpQkFXQztRQVZHLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDcEIsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQy9FLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFO3FCQUNyQixJQUFJLENBQUM7b0JBQ0YsS0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RELENBQUMsQ0FBQyxDQUFBO1NBQ2I7YUFDSTtZQUNELHdCQUF3QjtTQUMzQjtJQUNMLENBQUM7SUFFTSxzQ0FBWSxHQUFuQixVQUFvQixJQUFtQjtRQUNuQyxJQUFNLEtBQUssR0FBVSxvQkFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRWpELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDWCxVQUFVLEVBQUUsd0VBQXdFO1lBQ3BGLE9BQU8sRUFBRTtnQkFDTCxPQUFPLEVBQUUsT0FBTzthQUNuQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxnQ0FBTSxHQUFiO1FBQ0ksSUFBTSxLQUFLLEdBQVUsb0JBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRCxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQXRHRCxDQUFxQyx1QkFBVSxHQXNHOUM7QUF0R1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBMaXN0VmlldywgSXRlbUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlld1wiO1xyXG5pbXBvcnQgeyBGcmFtZSwgZ2V0RnJhbWVCeUlkLCBnZXRWaWV3QnlJZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ZyYW1lXCI7XHJcbmltcG9ydCB7IEFwcG9pbnRtZW50Vmlld01vZGVsIH0gZnJvbSBcIn4vdmlld21vZGVscy9hcHBvaW50bWVudHNcIjtcclxuaW1wb3J0IHsgUmFkTGlzdFZpZXcsIExpc3RWaWV3U2Nyb2xsRXZlbnREYXRhLCBMaXN0Vmlld0xvYWRPbkRlbWFuZE1vZGUsIExpc3RWaWV3SXRlbVNuYXBNb2RlLCBMaXN0Vmlld0V2ZW50RGF0YSB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1saXN0dmlldyc7XHJcblxyXG5jb25zdCBhcHBvaW50bWVudHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vdmlld21vZGVscy9hcHBvaW50bWVudHNcIikuSSBhcyBBcHBvaW50bWVudFZpZXdNb2RlbDtcclxuXHJcbmVudW0gVHlwZSB7XHJcbiAgICBBZHZpc29yLFxyXG4gICAgVHV0b3JcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBtZW50b3JWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcclxuXHJcbiAgICBwdWJsaWMgbWVudG9yQXJyYXk6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgICAvLyBwcml2YXRlIF9tZW50b3JBcnJheTogQXJyYXk8YW55PiA9IFtcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGZpcnN0TmFtZTogJ0h1bmcnLFxyXG4gICAgLy8gICAgICAgICBsYXN0TmFtZTogJ0x1dScsXHJcbiAgICAvLyAgICAgICAgIGVtYWlsOiAnaHVuZy5sdXVAd3N1LmVkdScsXHJcbiAgICAvLyAgICAgICAgIGhvdXJzOiAnTW9uLUZyaSA4OjAwIEFNIC0gNTowMCBQTScsXHJcbiAgICAvLyAgICAgICAgIGNvdXJzZTogJ0NvbXB1dGVyIFNjaWVuY2UnLFxyXG4gICAgLy8gICAgICAgICBkZXNjcmlwdGlvbjogJ0h1bmcgTHV1IGlzIGEgc29waG1vcmUgYXQgV1NVIFRyaWNpdGllcywgYW5kIGlzIGN1cnJlbnRseSBwdXJzdWluZyBhIEJhY2hlbG9ycyBvZiBTY2llbmNlIG9uIENvbXB1dGVyIFNjaWVuY2UuJyxcclxuICAgIC8vICAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy9jL2MwLzE5MDExMV8lRTUlOEMlOTclRTQlQkElQUMlRTUlOEYlQjAlRTYlOTglQTUlRTYlOTklOUElRTUlOEYlOTElRTUlQjglODMlRTQlQkMlOUEucG5nXCIsXHJcbiAgICAvLyAgICAgICAgIGRyb3BEb3duT3BlbjogZmFsc2UsXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGZpcnN0TmFtZTogJ0VkZ2FyJyxcclxuICAgIC8vICAgICAgICAgbGFzdE5hbWU6ICdSYW1pcmV6JyxcclxuICAgIC8vICAgICAgICAgZW1haWw6ICdlZGdhci5yYW1pcmV6QHdzdS5lZHUnLFxyXG4gICAgLy8gICAgICAgICBob3VyczogJ1R1ZS1GcmkgODowMCBBTSAtIDU6MDAgUE0nLFxyXG4gICAgLy8gICAgICAgICBjb3Vyc2U6ICdCaW9sb2d5JyxcclxuICAgIC8vICAgICAgICAgZGVzY3JpcHRpb246ICdFZGdhciBSYW1pcmV6IGlzIGEgc2Nob2xhciBhdCBXU1UgVHJpY2l0aWVzIHRyeWluZyB0byBnZXQgaW50byBNZWRpY2FsIFNjaG9vbC4gRmF2b3JpdGUgcGhyYXNlcyBpbmNsdWRlIFxcJ2JhZGFzc1xcJyBhbmQgb3RoZXIgY3J1ZGUgdGVybXMuJyxcclxuICAgIC8vICAgICAgICAgaW1hZ2U6IFwiaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy8zLzMxL0ZhaXNhbF9TaGVpa2hfU2FoYWJfV2FsbHBhcGVyczYuanBnXCIsXHJcbiAgICAvLyAgICAgICAgIGRyb3BEb3duT3BlbjogZmFsc2UsXHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICB7XHJcblxyXG4gICAgLy8gICAgICAgICBmaXJzdE5hbWU6ICdFZGdhcicsXHJcbiAgICAvLyAgICAgICAgIGxhc3ROYW1lOiAnUmFtaXJleicsXHJcbiAgICAvLyAgICAgICAgIGVtYWlsOiAnZWRnYXIucmFtaXJlekB3c3UuZWR1JyxcclxuICAgIC8vICAgICAgICAgaG91cnM6ICdUdWUtRnJpIDg6MDAgQU0gLSA1OjAwIFBNJyxcclxuICAgIC8vICAgICAgICAgY291cnNlOiAnQmlvbG9neScsXHJcbiAgICAvLyAgICAgICAgIGRlc2NyaXB0aW9uOiAnRWRnYXIgUmFtaXJleiBpcyBhIHNjaG9sYXIgYXQgV1NVIFRyaWNpdGllcyB0cnlpbmcgdG8gZ2V0IGludG8gTWVkaWNhbCBTY2hvb2wuIEZhdm9yaXRlIHBocmFzZXMgaW5jbHVkZSBcXCdiYWRhc3NcXCcgYW5kIG90aGVyIGNydWRlIHRlcm1zLicsXHJcbiAgICAvLyAgICAgICAgIGltYWdlOiBcImh0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvMy8zMS9GYWlzYWxfU2hlaWtoX1NhaGFiX1dhbGxwYXBlcnM2LmpwZ1wiLFxyXG4gICAgLy8gICAgICAgICBkcm9wRG93bk9wZW46IGZhbHNlLFxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIF1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0OiBhbnksIHBhZ2UpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBmZWVkID0gZ2V0Vmlld0J5SWQocGFnZSwgJ2ZlZWQnKSBhcyBSYWRMaXN0VmlldztcclxuICAgICAgICBmZWVkLmxvYWRPbkRlbWFuZE1vZGUgPSBMaXN0Vmlld0xvYWRPbkRlbWFuZE1vZGUuTm9uZTtcclxuICAgICAgICBcclxuICAgICAgICBzd2l0Y2ggKGNvbnRleHQudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiQURWSVNPUlwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoXCJhZHZpc29yTmFtZVwiLCBcIkFkdmlzb3JcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1lbnRvckFycmF5KFR5cGUuQWR2aXNvcik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgXCJUVVRPUlNcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KFwiYWR2aXNvck5hbWVcIiwgXCJUdXRvcnNcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1lbnRvckFycmF5KFR5cGUuVHV0b3IpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKmZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm1lbnRvckFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5tZW50b3JBcnJheS5nZXRJdGVtKGkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW50b3JBcnJheS5zZXRJdGVtKGksIHtcclxuICAgICAgICAgICAgICAgIC4uLml0ZW0sXHJcbiAgICAgICAgICAgICAgICBpbmRleDogaSxcclxuICAgICAgICAgICAgICAgIHRvZ2dsZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0qLyBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldE1lbnRvckFycmF5KHR5cGU6IFR5cGUpIHtcclxuICAgICAgICBpZiAodHlwZSA9PSBUeXBlLlR1dG9yKSB7XHJcbiAgICAgICAgICAgIGFwcG9pbnRtZW50cy50dXRvclJldHJpZXZlZERhdGEgPyB0aGlzLnNldChcIm1lbnRvckFycmF5XCIsIGFwcG9pbnRtZW50cy5nZXRUdXRvcnMoKSlcclxuICAgICAgICAgICAgICAgIDogYXBwb2ludG1lbnRzLnNldFR1dG9ycygpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldChcIm1lbnRvckFycmF5XCIsIGFwcG9pbnRtZW50cy5nZXRUdXRvcnMoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8qIFNldCBBZHZpc29ycyBoZXJlISAqL1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25BZHZpc29yVGFwKGFyZ3M6IEl0ZW1FdmVudERhdGEpIHtcclxuICAgICAgICBjb25zdCBmcmFtZTogRnJhbWUgPSBnZXRGcmFtZUJ5SWQoJ215LWFwcC1wYWdlJyk7XHJcblxyXG4gICAgICAgIGxldCBhZHZpc29yID0gdGhpcy5tZW50b3JBcnJheVthcmdzLmluZGV4XTtcclxuXHJcbiAgICAgICAgZnJhbWUubmF2aWdhdGUoe1xyXG4gICAgICAgICAgICBtb2R1bGVOYW1lOiBcIi92aWV3cy9ob21lL2FwcC1wYWdlL2Nob29zZS1tZW50b3ItcGFnZS9tZW50b3IvYXBwb2ludG1lbnQvYXBwb2ludG1lbnRcIixcclxuICAgICAgICAgICAgY29udGV4dDoge1xyXG4gICAgICAgICAgICAgICAgYWR2aXNvcjogYWR2aXNvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvQmFjaygpIHtcclxuICAgICAgICBjb25zdCBmcmFtZTogRnJhbWUgPSBnZXRGcmFtZUJ5SWQoJ215LWFwcC1wYWdlJyk7XHJcbiAgICAgICAgZnJhbWUuZ29CYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==