"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webview_view_model_1 = require("./webview-view-model");
function onNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = new webview_view_model_1.webViewModel(page.navigationContext.link);
}
exports.onNavigatedTo = onNavigatedTo;
//fix setting activityIndicator to False via loaded event of WebView later!
// export function onWebViewLoaded(args) {
//     const webview: WebView = args.object;
//     console.log("loaded");
//     webview.visibility = "collapse";
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlYnZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSwyREFBb0Q7QUFJcEQsU0FBZ0IsYUFBYSxDQUFDLElBQUk7SUFDOUIsSUFBTSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQWMsQ0FBQztJQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksaUNBQVksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEUsQ0FBQztBQUhELHNDQUdDO0FBRUEsMkVBQTJFO0FBQzVFLDBDQUEwQztBQUMxQyw0Q0FBNEM7QUFDNUMsNkJBQTZCO0FBQzdCLHVDQUF1QztBQUV2QyxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyB3ZWJWaWV3TW9kZWwgfSBmcm9tIFwiLi93ZWJ2aWV3LXZpZXctbW9kZWxcIjtcclxuaW1wb3J0IHsgV2ViVmlldywgTG9hZEV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3dlYi12aWV3XCI7XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTmF2aWdhdGVkVG8oYXJncykge1xyXG4gICAgY29uc3QgcGFnZTogUGFnZSA9IGFyZ3Mub2JqZWN0IGFzIFBhZ2U7XHJcbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gbmV3IHdlYlZpZXdNb2RlbChwYWdlLm5hdmlnYXRpb25Db250ZXh0LmxpbmspO1xyXG59XHJcblxyXG4gLy9maXggc2V0dGluZyBhY3Rpdml0eUluZGljYXRvciB0byBGYWxzZSB2aWEgbG9hZGVkIGV2ZW50IG9mIFdlYlZpZXcgbGF0ZXIhXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBvbldlYlZpZXdMb2FkZWQoYXJncykge1xyXG4vLyAgICAgY29uc3Qgd2VidmlldzogV2ViVmlldyA9IGFyZ3Mub2JqZWN0O1xyXG4vLyAgICAgY29uc29sZS5sb2coXCJsb2FkZWRcIik7XHJcbi8vICAgICB3ZWJ2aWV3LnZpc2liaWxpdHkgPSBcImNvbGxhcHNlXCI7XHJcblxyXG4vLyB9XHJcbiJdfQ==