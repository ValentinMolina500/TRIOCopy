"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var page_1 = require("tns-core-modules/ui/page");
var appointment_form_view_model_1 = require("./appointment-form-view-model");
function onLoaded(args) {
    var page = args.object;
    var scrollview = page_1.getViewById(page, 'main-scrollview');
    scrollview.scrollBarIndicatorVisible = false;
    // page.bindingContext = new AppointmentFormViewModel(page.navigationContext.time, page.navigationContext.date, page.navigationContext.month, page.navigationContext.day);
    page.bindingContext = new appointment_form_view_model_1.AppointmentFormViewModel(page.navigationContext.timeData, page.navigationContext.advisor, page);
}
exports.onLoaded = onLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnQtZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcG9pbnRtZW50LWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBNkQ7QUFDN0QsNkVBQXlFO0FBR3pFLFNBQWdCLFFBQVEsQ0FBQyxJQUFJO0lBQzVCLElBQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFFL0IsSUFBSSxVQUFVLEdBQWUsa0JBQVcsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQWUsQ0FBQztJQUNoRixVQUFVLENBQUMseUJBQXlCLEdBQUcsS0FBSyxDQUFDO0lBRTdDLDBLQUEwSztJQUMxSyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksc0RBQXdCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzNILENBQUM7QUFSRCw0QkFRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhZ2UsIGdldFZpZXdCeUlkIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBBcHBvaW50bWVudEZvcm1WaWV3TW9kZWwgfSBmcm9tICcuL2FwcG9pbnRtZW50LWZvcm0tdmlldy1tb2RlbCc7XHJcbmltcG9ydCB7IFNjcm9sbFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zY3JvbGwtdmlld1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTG9hZGVkKGFyZ3MpIHtcclxuXHRjb25zdCBwYWdlOiBQYWdlID0gYXJncy5vYmplY3Q7XHJcblxyXG5cdGxldCBzY3JvbGx2aWV3OiBTY3JvbGxWaWV3ID0gZ2V0Vmlld0J5SWQocGFnZSwgJ21haW4tc2Nyb2xsdmlldycpIGFzIFNjcm9sbFZpZXc7XHJcblx0c2Nyb2xsdmlldy5zY3JvbGxCYXJJbmRpY2F0b3JWaXNpYmxlID0gZmFsc2U7XHJcblx0XHJcblx0Ly8gcGFnZS5iaW5kaW5nQ29udGV4dCA9IG5ldyBBcHBvaW50bWVudEZvcm1WaWV3TW9kZWwocGFnZS5uYXZpZ2F0aW9uQ29udGV4dC50aW1lLCBwYWdlLm5hdmlnYXRpb25Db250ZXh0LmRhdGUsIHBhZ2UubmF2aWdhdGlvbkNvbnRleHQubW9udGgsIHBhZ2UubmF2aWdhdGlvbkNvbnRleHQuZGF5KTtcclxuXHRwYWdlLmJpbmRpbmdDb250ZXh0ID0gbmV3IEFwcG9pbnRtZW50Rm9ybVZpZXdNb2RlbChwYWdlLm5hdmlnYXRpb25Db250ZXh0LnRpbWVEYXRhLCBwYWdlLm5hdmlnYXRpb25Db250ZXh0LmFkdmlzb3IsIHBhZ2UpO1xyXG59Il19