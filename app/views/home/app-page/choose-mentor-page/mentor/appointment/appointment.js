"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appoint_view_model_1 = require("./appoint-view-model");
var firebase = require("../../../../../../utils/firebase").I;
var User = require("../../../../../../viewmodels/user").I;
function onLoaded(args) {
    var page = args.object;
    page.bindingContext = new appoint_view_model_1.AppointmentViewModelPage(page.navigationContext.advisor, page);
}
exports.onLoaded = onLoaded;
function onListViewLoaded(args) {
    // const spinner = getViewById(args.object.page, 'spinner') as ActivityIndicator;
    // const calendar = getViewById(args.object.page, 'date-container') as ListView;
    // calendar.visibility = 'visible';
    // spinner.busy = false;
}
exports.onListViewLoaded = onListViewLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHBvaW50bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDJEQUFnRTtBQUtoRSxJQUFNLFFBQVEsR0FBZSxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0UsSUFBTSxJQUFJLEdBQWtCLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUUzRSxTQUFnQixRQUFRLENBQUMsSUFBSTtJQUV6QixJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBRy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSw2Q0FBd0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdGLENBQUM7QUFORCw0QkFNQztBQUVELFNBQWdCLGdCQUFnQixDQUFDLElBQUk7SUFDakMsaUZBQWlGO0lBQ2pGLGdGQUFnRjtJQUNoRixtQ0FBbUM7SUFDbkMsd0JBQXdCO0FBQzVCLENBQUM7QUFMRCw0Q0FLQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhZ2UsIGdldFZpZXdCeUlkIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiXHJcbmltcG9ydCBVc2VyVmlld01vZGVsIGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi92aWV3bW9kZWxzL3VzZXJcIjtcclxuaW1wb3J0IHsgbXlGaXJlYmFzZSB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi8uLi91dGlscy9maXJlYmFzZVwiO1xyXG5pbXBvcnQgeyBBcHBvaW50bWVudFZpZXdNb2RlbFBhZ2UgfSBmcm9tIFwiLi9hcHBvaW50LXZpZXctbW9kZWxcIjtcclxuaW1wb3J0IHsgQWN0aXZpdHlJbmRpY2F0b3IgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2FjdGl2aXR5LWluZGljYXRvcic7XHJcbmltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXZpZXcnO1xyXG5cclxuXHJcbmNvbnN0IGZpcmViYXNlID0gPG15RmlyZWJhc2U+cmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uLy4uL3V0aWxzL2ZpcmViYXNlXCIpLkk7XHJcbmNvbnN0IFVzZXIgPSA8VXNlclZpZXdNb2RlbD5yZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vLi4vdmlld21vZGVscy91c2VyXCIpLkk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25Mb2FkZWQoYXJncylcclxue1xyXG4gICAgY29uc3QgcGFnZTogUGFnZSA9IGFyZ3Mub2JqZWN0O1xyXG5cclxuXHJcbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gbmV3IEFwcG9pbnRtZW50Vmlld01vZGVsUGFnZShwYWdlLm5hdmlnYXRpb25Db250ZXh0LmFkdmlzb3IsIHBhZ2UpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25MaXN0Vmlld0xvYWRlZChhcmdzKSB7XHJcbiAgICAvLyBjb25zdCBzcGlubmVyID0gZ2V0Vmlld0J5SWQoYXJncy5vYmplY3QucGFnZSwgJ3NwaW5uZXInKSBhcyBBY3Rpdml0eUluZGljYXRvcjtcclxuICAgIC8vIGNvbnN0IGNhbGVuZGFyID0gZ2V0Vmlld0J5SWQoYXJncy5vYmplY3QucGFnZSwgJ2RhdGUtY29udGFpbmVyJykgYXMgTGlzdFZpZXc7XHJcbiAgICAvLyBjYWxlbmRhci52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG4gICAgLy8gc3Bpbm5lci5idXN5ID0gZmFsc2U7XHJcbn0iXX0=