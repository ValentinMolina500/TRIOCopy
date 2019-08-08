"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var frame_1 = require("tns-core-modules/ui/frame");
var mentorViewModel = /** @class */ (function (_super) {
    __extends(mentorViewModel, _super);
    function mentorViewModel() {
        return _super.call(this) || this;
    }
    /**
     * Method that is called when the "Advisor" button is pressed. Navigates to mentor page passing
     * the users advisors that page.
     *
     */
    mentorViewModel.prototype.advisorTap = function () {
        var frame = frame_1.getFrameById('my-app-page');
        frame.navigate({
            moduleName: "/views/home/app-page/choose-mentor-page/mentor/mentor",
            context: {
                type: "ADVISOR"
            }
        });
    };
    mentorViewModel.prototype.tutorTap = function () {
        var frame = frame_1.getFrameById('my-app-page');
        frame.navigate({
            moduleName: "/views/home/app-page/choose-mentor-page/mentor/mentor",
            context: {
                type: "TUTORS"
            }
        });
    };
    // public supIntTap() {
    //     const frame: Frame = getFrameById('my-app-page');
    //     frame.navigate({
    //         moduleName: "/views/home/app-page/choose-mentor-page/mentor/mentor",
    //         context: {
    //             advisorArray: this.supInt,
    //             type: "SUPPLEMENTAL INSTRUCTOR"
    //         }
    //     });
    // }
    mentorViewModel.prototype.goBack = function () {
        var frame = frame_1.getFrameById('my-app-page');
        frame.goBack();
    };
    return mentorViewModel;
}(observable_1.Observable));
exports.mentorViewModel = mentorViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvb3NlLW1lbnRvci12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hvb3NlLW1lbnRvci12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0RBQThEO0FBSTlELG1EQUF5RTtBQUV6RTtJQUFxQyxtQ0FBVTtJQUMzQztlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxvQ0FBVSxHQUFqQjtRQUNJLElBQU0sS0FBSyxHQUFVLG9CQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFakQsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUNYLFVBQVUsRUFBRSx1REFBdUQ7WUFDbkUsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxTQUFTO2FBQ2xCO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLGtDQUFRLEdBQWY7UUFDSSxJQUFNLEtBQUssR0FBVSxvQkFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRWpELEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDWCxVQUFVLEVBQUUsdURBQXVEO1lBQ25FLE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx1QkFBdUI7SUFDdkIsd0RBQXdEO0lBRXhELHVCQUF1QjtJQUN2QiwrRUFBK0U7SUFDL0UscUJBQXFCO0lBQ3JCLHlDQUF5QztJQUN6Qyw4Q0FBOEM7SUFDOUMsWUFBWTtJQUNaLFVBQVU7SUFDVixJQUFJO0lBRUcsZ0NBQU0sR0FBYjtRQUNJLElBQU0sS0FBSyxHQUFVLG9CQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakQsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUFoREQsQ0FBcUMsdUJBQVUsR0FnRDlDO0FBaERZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgQXBwb2ludG1lbnRWaWV3TW9kZWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdmlld21vZGVscy9hcHBvaW50bWVudHNcIjtcclxuaW1wb3J0IHsgSXRlbUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlld1wiO1xyXG5pbXBvcnQgeyBnZXRGcmFtZUJ5SWQsIEZyYW1lLCB0b3Btb3N0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBtZW50b3JWaWV3TW9kZWwgZXh0ZW5kcyBPYnNlcnZhYmxlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNZXRob2QgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgXCJBZHZpc29yXCIgYnV0dG9uIGlzIHByZXNzZWQuIE5hdmlnYXRlcyB0byBtZW50b3IgcGFnZSBwYXNzaW5nXHJcbiAgICAgKiB0aGUgdXNlcnMgYWR2aXNvcnMgdGhhdCBwYWdlLlxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkdmlzb3JUYXAoKSB7XHJcbiAgICAgICAgY29uc3QgZnJhbWU6IEZyYW1lID0gZ2V0RnJhbWVCeUlkKCdteS1hcHAtcGFnZScpO1xyXG5cclxuICAgICAgICBmcmFtZS5uYXZpZ2F0ZSh7XHJcbiAgICAgICAgICAgIG1vZHVsZU5hbWU6IFwiL3ZpZXdzL2hvbWUvYXBwLXBhZ2UvY2hvb3NlLW1lbnRvci1wYWdlL21lbnRvci9tZW50b3JcIixcclxuICAgICAgICAgICAgY29udGV4dDoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJBRFZJU09SXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0dXRvclRhcCgpIHtcclxuICAgICAgICBjb25zdCBmcmFtZTogRnJhbWUgPSBnZXRGcmFtZUJ5SWQoJ215LWFwcC1wYWdlJyk7XHJcblxyXG4gICAgICAgIGZyYW1lLm5hdmlnYXRlKHtcclxuICAgICAgICAgICAgbW9kdWxlTmFtZTogXCIvdmlld3MvaG9tZS9hcHAtcGFnZS9jaG9vc2UtbWVudG9yLXBhZ2UvbWVudG9yL21lbnRvclwiLFxyXG4gICAgICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlRVVE9SU1wiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgc3VwSW50VGFwKCkge1xyXG4gICAgLy8gICAgIGNvbnN0IGZyYW1lOiBGcmFtZSA9IGdldEZyYW1lQnlJZCgnbXktYXBwLXBhZ2UnKTtcclxuXHJcbiAgICAvLyAgICAgZnJhbWUubmF2aWdhdGUoe1xyXG4gICAgLy8gICAgICAgICBtb2R1bGVOYW1lOiBcIi92aWV3cy9ob21lL2FwcC1wYWdlL2Nob29zZS1tZW50b3ItcGFnZS9tZW50b3IvbWVudG9yXCIsXHJcbiAgICAvLyAgICAgICAgIGNvbnRleHQ6IHtcclxuICAgIC8vICAgICAgICAgICAgIGFkdmlzb3JBcnJheTogdGhpcy5zdXBJbnQsXHJcbiAgICAvLyAgICAgICAgICAgICB0eXBlOiBcIlNVUFBMRU1FTlRBTCBJTlNUUlVDVE9SXCJcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICAgICAgY29uc3QgZnJhbWU6IEZyYW1lID0gZ2V0RnJhbWVCeUlkKCdteS1hcHAtcGFnZScpO1xyXG4gICAgICAgIGZyYW1lLmdvQmFjaygpO1xyXG4gICAgfVxyXG59Il19