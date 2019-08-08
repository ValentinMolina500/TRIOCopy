"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var frame_1 = require("tns-core-modules/ui/frame");
var nativescript_checkbox_1 = require("nativescript-checkbox");
var firebase = require('../../../../../../../utils/firebase').I;
var user = require('../../../../../../../viewmodels/user').I;
// Used to get the day using the number returned by a date object
var dayStrings = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];
// Used to get the month using the number returned by a date object
var monthStrings = [
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
];
var AppointmentFormViewModel = /** @class */ (function (_super) {
    __extends(AppointmentFormViewModel, _super);
    function AppointmentFormViewModel(_a, advisor, page) {
        var time = _a.time, date = _a.date, month = _a.month, day = _a.day, subjects = _a.subjects;
        var _this = _super.call(this) || this;
        _this.message = "";
        _this.specificClass = "";
        _this.subject = [];
        _this.subjectError = false;
        _this.inProgress = false;
        _this.advisor = advisor;
        _this.stack = frame_1.getViewById(page, 'checkbox-container');
        var appointmentTime = day + ", " + monthStrings[month] + " " + date + ", 2019 " + time.startTime + " - " + time.endTime;
        _this.set('appointmentTime', appointmentTime);
        _this.handleSubjects(subjects);
        _this.user = user.getTotalData();
        _this.appointment = {
            startTime: time.startTime,
            endTime: time.endTime,
            month: month,
            day: day,
            date: date,
            recieverFirstName: _this.advisor.firstName,
            recieverLastName: _this.advisor.lastName,
            studentFirstName: _this.user.firstName,
            studentLastName: _this.user.lastName,
            studentId: _this.user.uid,
            recieverId: 'vnSQSl4rR5ggLwnoFJriAGqBPaz1'
        };
        return _this;
    }
    AppointmentFormViewModel.prototype.goBack = function () {
        var frame = frame_1.getFrameById('topmost');
        frame.goBack();
    };
    AppointmentFormViewModel.prototype.handleSubjects = function (subjects) {
        var length = subjects.length;
        for (var i = 0; i < length; i++) {
            var checkbox = new nativescript_checkbox_1.CheckBox();
            checkbox.text = subjects[i];
            checkbox.fillColor = "#981e32";
            this.subject.push(checkbox);
            this.stack.addChild(checkbox);
        }
    };
    AppointmentFormViewModel.prototype.addAppointment = function () {
        var _this = this;
        var subject = [];
        this.subject.forEach(function (checkbox) {
            if (checkbox.checked) {
                subject.push(checkbox.text);
            }
        });
        if (subject.length == 0) {
            this.set('subjectError', true);
        }
        else {
            this.appointment = __assign({}, this.appointment, { subjects: subject, message: this.message, specificClass: this.specificClass });
            this.inProgress = true;
            firebase.addAppointments(this.appointment)
                .then(function () {
                setTimeout(function () {
                    _this.inProgress = false;
                }, 300);
            });
        }
    };
    return AppointmentFormViewModel;
}(observable_1.Observable));
exports.AppointmentFormViewModel = AppointmentFormViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnQtZm9ybS12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwb2ludG1lbnQtZm9ybS12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQThEO0FBQzlELG1EQUEySjtBQUMzSiwrREFBaUQ7QUFNakQsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLHFDQUFxQyxDQUFDLENBQUMsQ0FBZSxDQUFDO0FBQ2hGLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLENBQWtCLENBQUM7QUFFaEYsaUVBQWlFO0FBQ2pFLElBQU0sVUFBVSxHQUFrQjtJQUNqQyxLQUFLO0lBQ0wsS0FBSztJQUNMLEtBQUs7SUFDTCxLQUFLO0lBQ0wsS0FBSztJQUNMLEtBQUs7SUFDTCxLQUFLO0NBQ0wsQ0FBQTtBQUVELG1FQUFtRTtBQUNuRSxJQUFNLFlBQVksR0FBa0I7SUFDbkMsS0FBSztJQUNMLEtBQUs7SUFDTCxLQUFLO0lBQ0wsS0FBSztJQUNMLEtBQUs7SUFDTCxLQUFLO0lBQ0wsS0FBSztJQUNMLE1BQU07SUFDTixLQUFLO0lBQ0wsS0FBSztJQUNMLEtBQUs7SUFDTCxLQUFLO0NBQ0wsQ0FBQTtBQUVEO0lBQThDLDRDQUFVO0lBWXZELGtDQUFZLEVBQW9DLEVBQUUsT0FBZ0IsRUFBRSxJQUFJO1lBQTFELGNBQUksRUFBRSxjQUFJLEVBQUUsZ0JBQUssRUFBRSxZQUFHLEVBQUUsc0JBQVE7UUFBOUMsWUFDQyxpQkFBTyxTQXlCUDtRQW5DTSxhQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLG1CQUFhLEdBQVcsRUFBRSxDQUFDO1FBQzNCLGFBQU8sR0FBZSxFQUFFLENBQUM7UUFJeEIsa0JBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsZ0JBQVUsR0FBWSxLQUFLLENBQUM7UUFJbkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsS0FBSSxDQUFDLEtBQUssR0FB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LEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDUixDQUFDLENBQUMsQ0FBQTtTQUNIO0lBQ0YsQ0FBQztJQUNGLCtCQUFDO0FBQUQsQ0FBQyxBQXJGRCxDQUE4Qyx1QkFBVSxHQXFGdkQ7QUFyRlksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBnZXRGcmFtZUJ5SWQsIEZyYW1lLCB0b3Btb3N0LCBzdGFjaywgdmlzaWJpbGl0eVByb3BlcnR5LCBnZXRWaWV3QnlJZCwgVmlldywgYW5kcm9pZFN0YXR1c0JhckJhY2tncm91bmRQcm9wZXJ0eSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ZyYW1lXCI7XHJcbmltcG9ydCB7IENoZWNrQm94IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1jaGVja2JveFwiO1xyXG5pbXBvcnQgeyBteUZpcmViYXNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vLi4vdXRpbHMvZmlyZWJhc2UnO1xyXG5pbXBvcnQgVXNlclZpZXdNb2RlbCBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi8uLi92aWV3bW9kZWxzL3VzZXInO1xyXG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XHJcbmltcG9ydCBBZHZpc29yIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25zdGFudHMvYWR2aXNvckRhdGFiYXNlQ29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCBmaXJlYmFzZSA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uLy4uLy4uLy4uL3V0aWxzL2ZpcmViYXNlJykuSSBhcyBteUZpcmViYXNlO1xyXG5jb25zdCB1c2VyID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vLi4vLi4vdmlld21vZGVscy91c2VyJykuSSBhcyBVc2VyVmlld01vZGVsO1xyXG5cclxuLy8gVXNlZCB0byBnZXQgdGhlIGRheSB1c2luZyB0aGUgbnVtYmVyIHJldHVybmVkIGJ5IGEgZGF0ZSBvYmplY3RcclxuY29uc3QgZGF5U3RyaW5nczogQXJyYXk8c3RyaW5nPiA9IFtcclxuXHRcIlN1blwiLFxyXG5cdFwiTW9uXCIsXHJcblx0XCJUdWVcIixcclxuXHRcIldlZFwiLFxyXG5cdFwiVGh1XCIsXHJcblx0XCJGcmlcIixcclxuXHRcIlNhdFwiXHJcbl1cclxuXHJcbi8vIFVzZWQgdG8gZ2V0IHRoZSBtb250aCB1c2luZyB0aGUgbnVtYmVyIHJldHVybmVkIGJ5IGEgZGF0ZSBvYmplY3RcclxuY29uc3QgbW9udGhTdHJpbmdzOiBBcnJheTxzdHJpbmc+ID0gW1xyXG5cdFwiSmFuXCIsXHJcblx0XCJGZWJcIixcclxuXHRcIk1hclwiLFxyXG5cdFwiQXByXCIsXHJcblx0XCJNYXlcIixcclxuXHRcIkp1blwiLFxyXG5cdFwiSnVsXCIsXHJcblx0XCJBdWd0XCIsXHJcblx0XCJTZXBcIixcclxuXHRcIk9jdFwiLFxyXG5cdFwiTm92XCIsXHJcblx0XCJEZWNcIlxyXG5dXHJcblxyXG5leHBvcnQgY2xhc3MgQXBwb2ludG1lbnRGb3JtVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XHJcblx0cHVibGljIGFwcG9pbnRtZW50O1xyXG5cdHB1YmxpYyB1c2VyO1xyXG5cdHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcgPSBcIlwiO1xyXG5cdHB1YmxpYyBzcGVjaWZpY0NsYXNzOiBzdHJpbmcgPSBcIlwiO1xyXG5cdHB1YmxpYyBzdWJqZWN0OiBBcnJheTxhbnk+ID0gW107XHJcblx0cHVibGljIGFkdmlzb3I6IEFkdmlzb3I7XHJcblx0cHJpdmF0ZSBzdGFjazogU3RhY2tMYXlvdXQ7XHJcblxyXG5cdHByaXZhdGUgc3ViamVjdEVycm9yOiBib29sZWFuID0gZmFsc2U7XHJcblx0cHJpdmF0ZSBpblByb2dyZXNzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHsgdGltZSwgZGF0ZSwgbW9udGgsIGRheSwgc3ViamVjdHMgfSwgYWR2aXNvcjogQWR2aXNvciwgcGFnZSkge1xyXG5cdFx0c3VwZXIoKTtcclxuXHRcdHRoaXMuYWR2aXNvciA9IGFkdmlzb3I7XHJcblx0XHR0aGlzLnN0YWNrID0gZ2V0Vmlld0J5SWQocGFnZSwgJ2NoZWNrYm94LWNvbnRhaW5lcicpIGFzIFN0YWNrTGF5b3V0O1xyXG5cclxuXHRcdGxldCBhcHBvaW50bWVudFRpbWUgPSBgJHtkYXl9LCAke21vbnRoU3RyaW5nc1ttb250aF19ICR7ZGF0ZX0sIDIwMTkgJHt0aW1lLnN0YXJ0VGltZX0gLSAke3RpbWUuZW5kVGltZX1gO1xyXG5cdFx0dGhpcy5zZXQoJ2FwcG9pbnRtZW50VGltZScsIGFwcG9pbnRtZW50VGltZSk7XHJcblx0XHR0aGlzLmhhbmRsZVN1YmplY3RzKHN1YmplY3RzKTtcclxuXHJcblx0XHR0aGlzLnVzZXIgPSB1c2VyLmdldFRvdGFsRGF0YSgpO1xyXG5cclxuXHRcdHRoaXMuYXBwb2ludG1lbnQgPSB7XHJcblx0XHRcdHN0YXJ0VGltZTogdGltZS5zdGFydFRpbWUsXHJcblx0XHRcdGVuZFRpbWU6IHRpbWUuZW5kVGltZSxcclxuXHRcdFx0bW9udGg6IG1vbnRoLFxyXG5cdFx0XHRkYXk6IGRheSxcclxuXHRcdFx0ZGF0ZTogZGF0ZSxcclxuXHRcdFx0cmVjaWV2ZXJGaXJzdE5hbWU6IHRoaXMuYWR2aXNvci5maXJzdE5hbWUsXHJcblx0XHRcdHJlY2lldmVyTGFzdE5hbWU6IHRoaXMuYWR2aXNvci5sYXN0TmFtZSxcclxuXHRcdFx0c3R1ZGVudEZpcnN0TmFtZTogdGhpcy51c2VyLmZpcnN0TmFtZSxcclxuXHRcdFx0c3R1ZGVudExhc3ROYW1lOiB0aGlzLnVzZXIubGFzdE5hbWUsXHJcblx0XHRcdHN0dWRlbnRJZDogdGhpcy51c2VyLnVpZCxcclxuXHRcdFx0cmVjaWV2ZXJJZDogJ3ZuU1FTbDRyUjVnZ0x3bm9GSnJpQUdxQlBhejEnXHJcblx0XHR9O1xyXG5cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ29CYWNrKCkge1xyXG5cdFx0Y29uc3QgZnJhbWU6IEZyYW1lID0gZ2V0RnJhbWVCeUlkKCd0b3Btb3N0Jyk7XHJcblx0XHRmcmFtZS5nb0JhY2soKVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBoYW5kbGVTdWJqZWN0cyhzdWJqZWN0czogQXJyYXk8YW55Pikge1xyXG5cdFx0bGV0IGxlbmd0aCA9IHN1YmplY3RzLmxlbmd0aDtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0bGV0IGNoZWNrYm94OiBhbnkgPSBuZXcgQ2hlY2tCb3goKTtcdFx0XHJcblx0XHRcdFxyXG5cdFx0XHRjaGVja2JveC50ZXh0ID0gc3ViamVjdHNbaV07XHJcblx0XHRcdGNoZWNrYm94LmZpbGxDb2xvciA9IFwiIzk4MWUzMlwiO1xyXG5cclxuXHRcdFx0dGhpcy5zdWJqZWN0LnB1c2goY2hlY2tib3gpO1xyXG5cdFx0XHR0aGlzLnN0YWNrLmFkZENoaWxkKGNoZWNrYm94KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhZGRBcHBvaW50bWVudCgpIHtcclxuXHRcdGxldCBzdWJqZWN0ID0gW107XHJcblxyXG5cdFx0dGhpcy5zdWJqZWN0LmZvckVhY2goKGNoZWNrYm94KSA9PiB7XHJcblx0XHRcdGlmKGNoZWNrYm94LmNoZWNrZWQpIHtcclxuXHRcdFx0XHRzdWJqZWN0LnB1c2goY2hlY2tib3gudGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblxyXG5cdFx0aWYoc3ViamVjdC5sZW5ndGggPT0gMCkge1xyXG5cdFx0XHR0aGlzLnNldCgnc3ViamVjdEVycm9yJywgdHJ1ZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmFwcG9pbnRtZW50ID0ge1xyXG5cdFx0XHRcdC4uLnRoaXMuYXBwb2ludG1lbnQsXHJcblx0XHRcdFx0c3ViamVjdHM6IHN1YmplY3QsXHJcblx0XHRcdFx0bWVzc2FnZTogdGhpcy5tZXNzYWdlLFxyXG5cdFx0XHRcdHNwZWNpZmljQ2xhc3M6IHRoaXMuc3BlY2lmaWNDbGFzcyxcclxuXHRcdFx0fTtcclxuXHRcdFx0dGhpcy5pblByb2dyZXNzID0gdHJ1ZTtcclxuXHRcdFx0ZmlyZWJhc2UuYWRkQXBwb2ludG1lbnRzKHRoaXMuYXBwb2ludG1lbnQpXHJcblx0XHRcdFx0LnRoZW4oKCkgPT4ge1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMuaW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fSwgMzAwKVxyXG5cdFx0XHRcdH0pXHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==