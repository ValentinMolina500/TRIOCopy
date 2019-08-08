"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observableModule = require("tns-core-modules/data/observable");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var firebase = require("../../../utils/firebase").I;
var messagesViewModel = /** @class */ (function (_super) {
    __extends(messagesViewModel, _super);
    function messagesViewModel() {
        var _this = _super.call(this) || this;
        _this.messages = new observable_array_1.ObservableArray();
        /**
         * If we have not yet retrieved the data from firebase, we want to set the posts in myFirebase,
         * then we want push the items from myFirebase into the events ObservableArray so that it can
         * be displayed in the ListView.
         */
        if (!firebase.retrievedData) {
            firebase.setMessages()
                .then(function () {
                for (var i = 0; i < firebase.getSizeOfMessages(); i++) {
                    _this.messages.unshift(firebase.messagesArray.getItem(i));
                }
            });
            firebase.retrievedData = true;
        }
        /**
         * Otherwise, simply just push the items from myFirebase into events. This saves needing to
         * request from firebase everytime the user moves to the News page.
         */
        else {
            for (var i = 0; i < firebase.getSizeOfMessages(); i++) {
                _this.messages.unshift(firebase.messagesArray.getItem(i));
            }
        }
        return _this;
    }
    return messagesViewModel;
}(observableModule.Observable));
exports.messagesViewModel = messagesViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2VnZXMtdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lc3NlZ2VzLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRUFBc0U7QUFDdEUsMkVBQXFGO0FBSXJGLElBQU0sUUFBUSxHQUFlLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUVsRTtJQUF1QyxxQ0FBMkI7SUFJOUQ7UUFBQSxZQUNJLGlCQUFPLFNBMEJWO1FBN0JPLGNBQVEsR0FBNEIsSUFBSSxrQ0FBZSxFQUFFLENBQUM7UUFLOUQ7Ozs7V0FJRztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQ3pCLFFBQVEsQ0FBQyxXQUFXLEVBQUU7aUJBQ2pCLElBQUksQ0FBQztnQkFDRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ25ELEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzVEO1lBQ0wsQ0FBQyxDQUFDLENBQUE7WUFDTixRQUFRLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUNqQztRQUNEOzs7V0FHRzthQUNFO1lBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuRCxLQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVEO1NBQ0o7O0lBRUwsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQWhDRCxDQUF1QyxnQkFBZ0IsQ0FBQyxVQUFVLEdBZ0NqRTtBQWhDWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2JzZXJ2YWJsZU1vZHVsZSA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiKTtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5LCBDaGFuZ2VkRGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiXHJcbmltcG9ydCB7IG15RmlyZWJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZmlyZWJhc2VcIjtcclxuXHJcblxyXG5jb25zdCBmaXJlYmFzZSA9IDxteUZpcmViYXNlPnJlcXVpcmUoXCIuLi8uLi8uLi91dGlscy9maXJlYmFzZVwiKS5JO1xyXG5cclxuZXhwb3J0IGNsYXNzIG1lc3NhZ2VzVmlld01vZGVsIGV4dGVuZHMgb2JzZXJ2YWJsZU1vZHVsZS5PYnNlcnZhYmxlIHtcclxuXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VzOiBPYnNlcnZhYmxlQXJyYXk8b2JqZWN0PiA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJZiB3ZSBoYXZlIG5vdCB5ZXQgcmV0cmlldmVkIHRoZSBkYXRhIGZyb20gZmlyZWJhc2UsIHdlIHdhbnQgdG8gc2V0IHRoZSBwb3N0cyBpbiBteUZpcmViYXNlLFxyXG4gICAgICAgICAqIHRoZW4gd2Ugd2FudCBwdXNoIHRoZSBpdGVtcyBmcm9tIG15RmlyZWJhc2UgaW50byB0aGUgZXZlbnRzIE9ic2VydmFibGVBcnJheSBzbyB0aGF0IGl0IGNhblxyXG4gICAgICAgICAqIGJlIGRpc3BsYXllZCBpbiB0aGUgTGlzdFZpZXcuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaWYgKCFmaXJlYmFzZS5yZXRyaWV2ZWREYXRhKSB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLnNldE1lc3NhZ2VzKClcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpcmViYXNlLmdldFNpemVPZk1lc3NhZ2VzKCk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzLnVuc2hpZnQoZmlyZWJhc2UubWVzc2FnZXNBcnJheS5nZXRJdGVtKGkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5yZXRyaWV2ZWREYXRhID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3RoZXJ3aXNlLCBzaW1wbHkganVzdCBwdXNoIHRoZSBpdGVtcyBmcm9tIG15RmlyZWJhc2UgaW50byBldmVudHMuIFRoaXMgc2F2ZXMgbmVlZGluZyB0b1xyXG4gICAgICAgICAqIHJlcXVlc3QgZnJvbSBmaXJlYmFzZSBldmVyeXRpbWUgdGhlIHVzZXIgbW92ZXMgdG8gdGhlIE5ld3MgcGFnZS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaXJlYmFzZS5nZXRTaXplT2ZNZXNzYWdlcygpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMudW5zaGlmdChmaXJlYmFzZS5tZXNzYWdlc0FycmF5LmdldEl0ZW0oaSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSJdfQ==