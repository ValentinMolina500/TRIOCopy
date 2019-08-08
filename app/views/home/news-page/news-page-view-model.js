"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observableModule = require("tns-core-modules/data/observable");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var view_1 = require("tns-core-modules/ui/core/view");
var frame_1 = require("tns-core-modules/ui/frame");
var nativescript_ui_listview_1 = require("nativescript-ui-listview");
var firebase = require("../../../utils/firebase").I;
var newsViewModel = /** @class */ (function (_super) {
    __extends(newsViewModel, _super);
    function newsViewModel(page) {
        var _this = _super.call(this) || this;
        _this.events = new observable_array_1.ObservableArray();
        _this.loading = true;
        var feed = view_1.getViewById(page, 'feed');
        feed.loadOnDemandMode = nativescript_ui_listview_1.ListViewLoadOnDemandMode.Manual;
        //const spinner: ActivityIndicator = getViewById(page, 'spinner') as any;
        /**
         * If we have not yet retrieved the data from firebase, we want to set the posts in myFirebase,
         * then we want push the items from myFirebase into the events ObservableArray so that it can
         * be displayed in the ListView.
         */
        if (!firebase.retrievedData) {
            firebase.setPosts()
                .then(function () {
                for (var i = 0; i < firebase.getSizeOfPosts(); i++) {
                    _this.events.unshift(firebase.postArray.getItem(i));
                }
            });
            firebase.retrievedData = true;
        }
        /**
         * Otherwise, simply just push the items from myFirebase into events. This saves needing to
         * request from firebase everytime the user moves to the News page.
         */
        else {
            for (var i = 0; i < firebase.getSizeOfPosts(); i++) {
                _this.events.unshift(firebase.postArray.getItem(i));
            }
        }
        return _this;
    }
    newsViewModel.prototype.onItemTap = function (args) {
        var event = this.events.getItem(args.index);
        var frame = frame_1.getFrameById('topmost');
        if (event.type == "Events") {
            if (event.link) {
                frame.navigate({
                    moduleName: "/views/webview/webview",
                    context: {
                        link: event.link,
                    }
                });
            }
        }
        else {
            if (event.image) {
                // passing the image src from event to display to the imageView module
                frame.navigate({
                    moduleName: "/views/imageview/imageview",
                    context: {
                        image: event.image
                    }
                });
            }
        }
    };
    return newsViewModel;
}(observableModule.Observable));
exports.newsViewModel = newsViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3cy1wYWdlLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZXdzLXBhZ2Utdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1FQUFzRTtBQUd0RSwyRUFBcUY7QUFFckYsc0RBQTREO0FBSTVELG1EQUFnRjtBQUNoRixxRUFBbUo7QUFHbkosSUFBTSxRQUFRLEdBQWUsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRWxFO0lBQW1DLGlDQUEyQjtJQUkxRCx1QkFBWSxJQUFJO1FBQWhCLFlBQ0ksaUJBQU8sU0E2QlY7UUFqQ08sWUFBTSxHQUE0QixJQUFJLGtDQUFlLEVBQUUsQ0FBQztRQUN6RCxhQUFPLEdBQVksSUFBSSxDQUFDO1FBSTNCLElBQUksSUFBSSxHQUFHLGtCQUFXLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBZ0IsQ0FBQztRQUNwRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsbURBQXdCLENBQUMsTUFBTSxDQUFDO1FBQ3hELHlFQUF5RTtRQUV6RTs7OztXQUlHO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDekIsUUFBUSxDQUFDLFFBQVEsRUFBRTtpQkFDZCxJQUFJLENBQUM7Z0JBQ0YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDaEQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdEQ7WUFDTCxDQUFDLENBQUMsQ0FBQTtZQUNOLFFBQVEsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQ2pDO1FBQ0Q7OztXQUdHO2FBQ0U7WUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNoRCxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3REO1NBQ0o7O0lBRUwsQ0FBQztJQUdNLGlDQUFTLEdBQWhCLFVBQWlCLElBQW1CO1FBQ2hDLElBQUksS0FBSyxHQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRCxJQUFJLEtBQUssR0FBVSxvQkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTNDLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxRQUFRLEVBQUU7WUFDeEIsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUNaLEtBQUssQ0FBQyxRQUFRLENBQUM7b0JBQ1gsVUFBVSxFQUFFLHdCQUF3QjtvQkFDcEMsT0FBTyxFQUFFO3dCQUNMLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtxQkFDbkI7aUJBQ0osQ0FBQyxDQUFDO2FBQ047U0FDSjthQUNJO1lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUNiLHNFQUFzRTtnQkFDdEUsS0FBSyxDQUFDLFFBQVEsQ0FBQztvQkFDWCxVQUFVLEVBQUUsNEJBQTRCO29CQUN4QyxPQUFPLEVBQUU7d0JBQ0wsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO3FCQUNyQjtpQkFDSixDQUFDLENBQUM7YUFDTjtTQUNKO0lBQ0wsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQS9ERCxDQUFtQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBK0Q3RDtBQS9EWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvYnNlcnZhYmxlTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCIpO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9idXR0b25cIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5LCBDaGFuZ2VkRGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiXHJcbmltcG9ydCB7IG15RmlyZWJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvZmlyZWJhc2VcIjtcclxuaW1wb3J0IHsgZ2V0Vmlld0J5SWQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXZpZXdcIjtcclxuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IEl0ZW1FdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXZpZXdcIjtcclxuaW1wb3J0IHsgZ2V0RnJhbWVCeUlkLCBGcmFtZSwgdG9wbW9zdCwgc3RhY2sgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9mcmFtZVwiO1xyXG5pbXBvcnQgeyBSYWRMaXN0VmlldywgTGlzdFZpZXdTY3JvbGxFdmVudERhdGEsIExpc3RWaWV3TG9hZE9uRGVtYW5kTW9kZSwgTGlzdFZpZXdJdGVtU25hcE1vZGUsIExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3JztcclxuXHJcblxyXG5jb25zdCBmaXJlYmFzZSA9IDxteUZpcmViYXNlPnJlcXVpcmUoXCIuLi8uLi8uLi91dGlscy9maXJlYmFzZVwiKS5JO1xyXG5cclxuZXhwb3J0IGNsYXNzIG5ld3NWaWV3TW9kZWwgZXh0ZW5kcyBvYnNlcnZhYmxlTW9kdWxlLk9ic2VydmFibGUge1xyXG4gICAgcHJpdmF0ZSBldmVudHM6IE9ic2VydmFibGVBcnJheTxvYmplY3Q+ID0gbmV3IE9ic2VydmFibGVBcnJheSgpO1xyXG4gICAgcHVibGljIGxvYWRpbmc6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBhZ2UpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGxldCBmZWVkID0gZ2V0Vmlld0J5SWQocGFnZSwgJ2ZlZWQnKSBhcyBSYWRMaXN0VmlldztcclxuICAgICAgICBmZWVkLmxvYWRPbkRlbWFuZE1vZGUgPSBMaXN0Vmlld0xvYWRPbkRlbWFuZE1vZGUuTWFudWFsO1xyXG4gICAgICAgIC8vY29uc3Qgc3Bpbm5lcjogQWN0aXZpdHlJbmRpY2F0b3IgPSBnZXRWaWV3QnlJZChwYWdlLCAnc3Bpbm5lcicpIGFzIGFueTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSWYgd2UgaGF2ZSBub3QgeWV0IHJldHJpZXZlZCB0aGUgZGF0YSBmcm9tIGZpcmViYXNlLCB3ZSB3YW50IHRvIHNldCB0aGUgcG9zdHMgaW4gbXlGaXJlYmFzZSxcclxuICAgICAgICAgKiB0aGVuIHdlIHdhbnQgcHVzaCB0aGUgaXRlbXMgZnJvbSBteUZpcmViYXNlIGludG8gdGhlIGV2ZW50cyBPYnNlcnZhYmxlQXJyYXkgc28gdGhhdCBpdCBjYW5cclxuICAgICAgICAgKiBiZSBkaXNwbGF5ZWQgaW4gdGhlIExpc3RWaWV3LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlmICghZmlyZWJhc2UucmV0cmlldmVkRGF0YSkge1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5zZXRQb3N0cygpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaXJlYmFzZS5nZXRTaXplT2ZQb3N0cygpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHMudW5zaGlmdChmaXJlYmFzZS5wb3N0QXJyYXkuZ2V0SXRlbShpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZmlyZWJhc2UucmV0cmlldmVkRGF0YSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE90aGVyd2lzZSwgc2ltcGx5IGp1c3QgcHVzaCB0aGUgaXRlbXMgZnJvbSBteUZpcmViYXNlIGludG8gZXZlbnRzLiBUaGlzIHNhdmVzIG5lZWRpbmcgdG9cclxuICAgICAgICAgKiByZXF1ZXN0IGZyb20gZmlyZWJhc2UgZXZlcnl0aW1lIHRoZSB1c2VyIG1vdmVzIHRvIHRoZSBOZXdzIHBhZ2UuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlyZWJhc2UuZ2V0U2l6ZU9mUG9zdHMoKTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy51bnNoaWZ0KGZpcmViYXNlLnBvc3RBcnJheS5nZXRJdGVtKGkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBvbkl0ZW1UYXAoYXJnczogSXRlbUV2ZW50RGF0YSkge1xyXG4gICAgICAgIGxldCBldmVudDogYW55ID0gdGhpcy5ldmVudHMuZ2V0SXRlbShhcmdzLmluZGV4KTtcclxuICAgICAgICBsZXQgZnJhbWU6IEZyYW1lID0gZ2V0RnJhbWVCeUlkKCd0b3Btb3N0Jyk7XHJcblxyXG4gICAgICAgIGlmIChldmVudC50eXBlID09IFwiRXZlbnRzXCIpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmxpbmspIHtcclxuICAgICAgICAgICAgICAgIGZyYW1lLm5hdmlnYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiBcIi92aWV3cy93ZWJ2aWV3L3dlYnZpZXdcIixcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6IGV2ZW50LmxpbmssXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5pbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gcGFzc2luZyB0aGUgaW1hZ2Ugc3JjIGZyb20gZXZlbnQgdG8gZGlzcGxheSB0byB0aGUgaW1hZ2VWaWV3IG1vZHVsZVxyXG4gICAgICAgICAgICAgICAgZnJhbWUubmF2aWdhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6IFwiL3ZpZXdzL2ltYWdldmlldy9pbWFnZXZpZXdcIixcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlOiBldmVudC5pbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==