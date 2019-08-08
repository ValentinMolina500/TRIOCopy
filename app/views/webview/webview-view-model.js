"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observableModule = require("tns-core-modules/data/observable");
var webViewModel = /** @class */ (function (_super) {
    __extends(webViewModel, _super);
    function webViewModel(link) {
        var _this = _super.call(this) || this;
        _this.set("link", link);
        return _this;
    }
    webViewModel.prototype.webGoBack = function (args) {
        var page = args.object.page;
        var webview = page.getViewById("myWebview");
        if (webview.canGoBack) {
            webview.goBack();
        }
    };
    webViewModel.prototype.closeWeb = function (args) {
        var page = args.object.page;
        page.frame.goBack();
    };
    return webViewModel;
}(observableModule.Observable));
exports.webViewModel = webViewModel;
/*export default function onWebViewLoaded(args) {
    const webview = args.object as WebView;
    console.log('******');
    this.set("isLoading", false);
}*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vidmlldy12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2Vidmlldy12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUVBQXNFO0FBS3RFO0lBQWtDLGdDQUEyQjtJQUV6RCxzQkFBWSxJQUFJO1FBQWhCLFlBQ0ksaUJBQU8sU0FFVjtRQURHLEtBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDOztJQUMzQixDQUFDO0lBRU0sZ0NBQVMsR0FBaEIsVUFBaUIsSUFBSTtRQUNqQixJQUFNLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQVksQ0FBQztRQUM1QyxJQUFNLE9BQU8sR0FBWSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBWSxDQUFDO1FBRWxFLElBQUcsT0FBTyxDQUFDLFNBQVMsRUFDcEI7WUFDSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRU0sK0JBQVEsR0FBZixVQUFnQixJQUFJO1FBQ2hCLElBQU0sSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBWSxDQUFDO1FBRTVDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQVFMLG1CQUFDO0FBQUQsQ0FBQyxBQTdCRCxDQUFrQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBNkI1RDtBQTdCWSxvQ0FBWTtBQStCekI7Ozs7R0FJRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvYnNlcnZhYmxlTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCIpO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBXZWJWaWV3LCBMb2FkRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvd2ViLXZpZXdcIjtcclxuaW1wb3J0IHsgTGFiZWwgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYWJlbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIHdlYlZpZXdNb2RlbCBleHRlbmRzIG9ic2VydmFibGVNb2R1bGUuT2JzZXJ2YWJsZVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcihsaW5rKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldChcImxpbmtcIiwgbGluayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdlYkdvQmFjayhhcmdzKSB7XHJcbiAgICAgICAgY29uc3QgcGFnZTogUGFnZSA9IGFyZ3Mub2JqZWN0LnBhZ2UgYXMgUGFnZTtcclxuICAgICAgICBjb25zdCB3ZWJ2aWV3OiBXZWJWaWV3ID0gcGFnZS5nZXRWaWV3QnlJZChcIm15V2Vidmlld1wiKSBhcyBXZWJWaWV3O1xyXG5cclxuICAgICAgICBpZih3ZWJ2aWV3LmNhbkdvQmFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdlYnZpZXcuZ29CYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZVdlYihhcmdzKSB7XHJcbiAgICAgICAgY29uc3QgcGFnZTogUGFnZSA9IGFyZ3Mub2JqZWN0LnBhZ2UgYXMgUGFnZTtcclxuXHJcbiAgICAgICAgcGFnZS5mcmFtZS5nb0JhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICAvKnB1YmxpYyBvbldlYlZpZXdMb2FkZWQoYXJncykge1xyXG4gICAgICAgIGNvbnN0IHdlYnZpZXc6IFdlYlZpZXcgPSBhcmdzLm9iamVjdCBhcyBXZWJWaWV3O1xyXG4gICAgICAgIHdlYnZpZXcub24oXCJsb2FkRmluaXNoZWRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIioqKlwiKTtcclxuICAgICAgICB9KVxyXG4gICAgfSovXHJcbn1cclxuXHJcbi8qZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb25XZWJWaWV3TG9hZGVkKGFyZ3MpIHtcclxuICAgIGNvbnN0IHdlYnZpZXcgPSBhcmdzLm9iamVjdCBhcyBXZWJWaWV3O1xyXG4gICAgY29uc29sZS5sb2coJyoqKioqKicpO1xyXG4gICAgdGhpcy5zZXQoXCJpc0xvYWRpbmdcIiwgZmFsc2UpO1xyXG59Ki8iXX0=