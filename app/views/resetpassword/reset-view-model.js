"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observableModule = require("tns-core-modules/data/observable");
var User = require("../../viewmodels/user").I;
var firebase = require('../../utils/firebase').I;
var dialogs = require("../../utils/messages").I;
var resetViewModel = /** @class */ (function (_super) {
    __extends(resetViewModel, _super);
    function resetViewModel() {
        var _this = _super.call(this) || this;
        _this.userEmail = User.getEmail();
        return _this;
    }
    resetViewModel.prototype.goBack = function (args) {
        var button = args.object;
        var page = button.page;
        page.frame.goBack();
    };
    resetViewModel.prototype.resetPassword = function () {
        firebase.doResetPassword(this.userEmail.trim())
            .then(function () { return console.log('done resetting password!'); });
    };
    return resetViewModel;
}(observableModule.Observable));
exports.resetViewModel = resetViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlc2V0LXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRUFBc0U7QUFLdEUsSUFBTSxJQUFJLEdBQWtCLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRCxJQUFNLFFBQVEsR0FBZSxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0QsSUFBTSxPQUFPLEdBQWMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTdEO0lBQW9DLGtDQUEyQjtJQUkzRDtRQUFBLFlBQ0ksaUJBQU8sU0FDVjtRQUpPLGVBQVMsR0FBVSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7O0lBSTNDLENBQUM7SUFFTSwrQkFBTSxHQUFiLFVBQWMsSUFBSTtRQUNkLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxzQ0FBYSxHQUFwQjtRQUNJLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMxQyxJQUFJLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsRUFBdkMsQ0FBdUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFDTCxxQkFBQztBQUFELENBQUMsQUFsQkQsQ0FBb0MsZ0JBQWdCLENBQUMsVUFBVSxHQWtCOUQ7QUFsQlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2JzZXJ2YWJsZU1vZHVsZSA9IHJlcXVpcmUoJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlJyk7XHJcbmltcG9ydCB7IG15RmlyZWJhc2UgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZmlyZWJhc2VcIjtcclxuaW1wb3J0IFVzZXJWaWV3TW9kZWwgZnJvbSBcIi4uLy4uL3ZpZXdtb2RlbHMvdXNlclwiO1xyXG5pbXBvcnQgbXlEaWFsb2dzIGZyb20gXCIuLi8uLi91dGlscy9tZXNzYWdlc1wiO1xyXG5cclxuY29uc3QgVXNlciA9IDxVc2VyVmlld01vZGVsPnJlcXVpcmUoXCIuLi8uLi92aWV3bW9kZWxzL3VzZXJcIikuSTtcclxuY29uc3QgZmlyZWJhc2UgPSA8bXlGaXJlYmFzZT5yZXF1aXJlKCcuLi8uLi91dGlscy9maXJlYmFzZScpLkk7XHJcbmNvbnN0IGRpYWxvZ3MgPSA8bXlEaWFsb2dzPnJlcXVpcmUoXCIuLi8uLi91dGlscy9tZXNzYWdlc1wiKS5JO1xyXG5cclxuZXhwb3J0IGNsYXNzIHJlc2V0Vmlld01vZGVsIGV4dGVuZHMgb2JzZXJ2YWJsZU1vZHVsZS5PYnNlcnZhYmxlIHtcclxuXHJcbiAgICBwcml2YXRlIHVzZXJFbWFpbDpzdHJpbmcgPSBVc2VyLmdldEVtYWlsKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29CYWNrKGFyZ3MpIHtcclxuICAgICAgICBjb25zdCBidXR0b24gPSBhcmdzLm9iamVjdDtcclxuICAgICAgICBjb25zdCBwYWdlID0gYnV0dG9uLnBhZ2U7XHJcbiAgICAgICAgcGFnZS5mcmFtZS5nb0JhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRQYXNzd29yZCgpIHtcclxuICAgICAgICBmaXJlYmFzZS5kb1Jlc2V0UGFzc3dvcmQodGhpcy51c2VyRW1haWwudHJpbSgpKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiBjb25zb2xlLmxvZygnZG9uZSByZXNldHRpbmcgcGFzc3dvcmQhJykpO1xyXG4gICAgfVxyXG59Il19