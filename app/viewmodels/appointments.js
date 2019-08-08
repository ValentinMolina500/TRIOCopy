"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("../utils/firebase").I;
var AppointmentViewModel = /** @class */ (function () {
    function AppointmentViewModel() {
        /**
         * Arrays to hold the tutors, advisors etc... at TRIO
         *
         * @author valentinMolina500
         */
        this.AdvisorsArray = new Array();
        this.TutorsArray = new Array();
        /**
         * These variables tells us if have retrived the data from the database.
         * This is to prevent calling the database more than once in session.
         *
         * @author valentinMolina500
         */
        this.advisorRetrievedData = false;
        this.tutorRetrievedData = false;
        this.advisorCollection = firebase.getCollection("advisors");
    }
    AppointmentViewModel.prototype.setAdvisors = function () {
        var _this = this;
        return this.advisorCollection.get()
            .then(function (documentRef) {
            documentRef.forEach(function (doc) {
                _this.AdvisorsArray.push(doc.data());
            });
        });
    };
    /**
     * Retrieves the tutors from Firebase and pushes them to the TutorArray
     */
    AppointmentViewModel.prototype.setTutors = function () {
        var _this = this;
        return firebase.queryTutors()
            .then(function (result) {
            for (var key in result.value) {
                console.log(key + " ->" + result.value[key]);
                _this.TutorsArray.push(result.value[key]);
            }
            _this.tutorRetrievedData = true;
        });
    };
    /**
     * Helper function used to get the amount of advisors in the advisor array
     *
     * @return number of Advisors in the AdvisorArray
     */
    AppointmentViewModel.prototype.getAdvisorLength = function () {
        return this.AdvisorsArray.length;
    };
    /**
     * Helper function used to get the amount of tutors in the tutor array
     *
     * @return number of Tutors in the TutorArray
     */
    AppointmentViewModel.prototype.getTutorLength = function () {
        return this.TutorsArray.length;
    };
    /**
     * Gets the tutors retrived from Firebase.
     *
     * @return The tutors registered with TRIO
     */
    AppointmentViewModel.prototype.getTutors = function () {
        return this.TutorsArray;
    };
    return AppointmentViewModel;
}());
exports.AppointmentViewModel = AppointmentViewModel;
exports.I = new AppointmentViewModel();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwb2ludG1lbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBZSxDQUFDO0FBRTlEO0lBcUJJO1FBcEJBOzs7O1dBSUc7UUFDSyxrQkFBYSxHQUFlLElBQUksS0FBSyxFQUFFLENBQUE7UUFDdkMsZ0JBQVcsR0FBZSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBRzlDOzs7OztXQUtHO1FBQ0kseUJBQW9CLEdBQVksS0FBSyxDQUFDO1FBQ3RDLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUt2QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU8sMENBQVcsR0FBbkI7UUFBQSxpQkFPQztRQU5HLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTthQUM5QixJQUFJLENBQUMsVUFBQSxXQUFXO1lBQ2IsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7Z0JBQ25CLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQ7O09BRUc7SUFDSSx3Q0FBUyxHQUFoQjtRQUFBLGlCQVdDO1FBVkcsT0FBTyxRQUFRLENBQUMsV0FBVyxFQUFFO2FBQ3hCLElBQUksQ0FBRSxVQUFBLE1BQU07WUFDVCxLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQzVCO2dCQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUM1QztZQUVELEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUE7SUFDVixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLCtDQUFnQixHQUF2QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSw2Q0FBYyxHQUFyQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSx3Q0FBUyxHQUFoQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBR0wsMkJBQUM7QUFBRCxDQUFDLEFBOUVELElBOEVDO0FBOUVZLG9EQUFvQjtBQWdGakMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgIHsgbXlGaXJlYmFzZSB9ICBmcm9tIFwiLi4vdXRpbHMvZmlyZWJhc2VcIlxyXG5cclxuY29uc3QgZmlyZWJhc2UgPSByZXF1aXJlKFwiLi4vdXRpbHMvZmlyZWJhc2VcIikuSSBhcyBteUZpcmViYXNlO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwcG9pbnRtZW50Vmlld01vZGVsIHtcclxuICAgIC8qKlxyXG4gICAgICogQXJyYXlzIHRvIGhvbGQgdGhlIHR1dG9ycywgYWR2aXNvcnMgZXRjLi4uIGF0IFRSSU9cclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciB2YWxlbnRpbk1vbGluYTUwMFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIEFkdmlzb3JzQXJyYXk6IEFycmF5PGFueT4gPSBuZXcgQXJyYXkoKVxyXG4gICAgcHJpdmF0ZSBUdXRvcnNBcnJheTogQXJyYXk8YW55PiA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGVzZSB2YXJpYWJsZXMgdGVsbHMgdXMgaWYgaGF2ZSByZXRyaXZlZCB0aGUgZGF0YSBmcm9tIHRoZSBkYXRhYmFzZS5cclxuICAgICAqIFRoaXMgaXMgdG8gcHJldmVudCBjYWxsaW5nIHRoZSBkYXRhYmFzZSBtb3JlIHRoYW4gb25jZSBpbiBzZXNzaW9uLlxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIHZhbGVudGluTW9saW5hNTAwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZHZpc29yUmV0cmlldmVkRGF0YTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHR1dG9yUmV0cmlldmVkRGF0YTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgYWR2aXNvckNvbGxlY3Rpb246IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmFkdmlzb3JDb2xsZWN0aW9uID0gZmlyZWJhc2UuZ2V0Q29sbGVjdGlvbihcImFkdmlzb3JzXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0QWR2aXNvcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWR2aXNvckNvbGxlY3Rpb24uZ2V0KClcclxuICAgICAgICAgICAgLnRoZW4oZG9jdW1lbnRSZWYgPT4ge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnRSZWYuZm9yRWFjaChkb2MgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQWR2aXNvcnNBcnJheS5wdXNoKGRvYy5kYXRhKCkpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIHR1dG9ycyBmcm9tIEZpcmViYXNlIGFuZCBwdXNoZXMgdGhlbSB0byB0aGUgVHV0b3JBcnJheVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VHV0b3JzKCkge1xyXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5xdWVyeVR1dG9ycygpXHJcbiAgICAgICAgICAgIC50aGVuKCByZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHJlc3VsdC52YWx1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhrZXkgKyBcIiAtPlwiICsgcmVzdWx0LnZhbHVlW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVHV0b3JzQXJyYXkucHVzaChyZXN1bHQudmFsdWVba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy50dXRvclJldHJpZXZlZERhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGVscGVyIGZ1bmN0aW9uIHVzZWQgdG8gZ2V0IHRoZSBhbW91bnQgb2YgYWR2aXNvcnMgaW4gdGhlIGFkdmlzb3IgYXJyYXlcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybiBudW1iZXIgb2YgQWR2aXNvcnMgaW4gdGhlIEFkdmlzb3JBcnJheVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QWR2aXNvckxlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkFkdmlzb3JzQXJyYXkubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGVscGVyIGZ1bmN0aW9uIHVzZWQgdG8gZ2V0IHRoZSBhbW91bnQgb2YgdHV0b3JzIGluIHRoZSB0dXRvciBhcnJheVxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJuIG51bWJlciBvZiBUdXRvcnMgaW4gdGhlIFR1dG9yQXJyYXlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFR1dG9yTGVuZ3RoKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlR1dG9yc0FycmF5Lmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHR1dG9ycyByZXRyaXZlZCBmcm9tIEZpcmViYXNlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJuIFRoZSB0dXRvcnMgcmVnaXN0ZXJlZCB3aXRoIFRSSU9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFR1dG9ycygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5UdXRvcnNBcnJheTtcclxuICAgIH1cclxuXHJcbiAgICAvL3B1YmxpYyBnZXRNZW50b3JBcHBvaW50bWVudHModWlkKVxyXG59XHJcblxyXG5leHBvcnRzLkkgPSBuZXcgQXBwb2ludG1lbnRWaWV3TW9kZWwoKTsiXX0=