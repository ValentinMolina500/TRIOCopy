"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observableModule = require("tns-core-modules/data/observable");
var User = require("../../viewmodels/user").I;
var Firebase = require("../../utils/firebase").I;
var dialogs = require("../../utils/messages").I;
var loginViewModel = /** @class */ (function (_super) {
    __extends(loginViewModel, _super);
    function loginViewModel() {
        var _this = _super.call(this) || this;
        _this.email = "valentinmolina83@gmail.com"; //temporary login
        _this.password = "Mario509"; //temporary login
        return _this;
    }
    loginViewModel.prototype.login = function (args) {
        var button = args.object;
        var page = button.page;
        User.setEmail(this.email);
        User.setPassword(this.password);
        Firebase.doLogin(User)
            .then(function () {
            page.frame.navigate("/views/home/home-page");
        })
            .catch(function (error) {
            console.log("Error in doLogin: " + error);
            dialogs.invalidCredentials()
                .then(function () { return console.log("dialog closed"); });
        });
    };
    loginViewModel.prototype.register = function (args) {
        var button = args.object;
        var page = button.page;
        page.frame.navigate({
            moduleName: "/views/register/register-page",
            clearHistory: false
        });
    };
    loginViewModel.prototype.forgotPassword = function (args) {
        var button = args.object;
        var page = button.page;
        console.log('click');
        page.frame.navigate("views/resetpassword/reset-password");
    };
    return loginViewModel;
}(observableModule.Observable));
exports.loginViewModel = loginViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ2luLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRUFBc0U7QUFNdEUsSUFBTSxJQUFJLEdBQWtCLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRCxJQUFNLFFBQVEsR0FBZSxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0QsSUFBTSxPQUFPLEdBQWMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTdEO0lBQW9DLGtDQUEyQjtJQUMzRDtRQUFBLFlBQ0ksaUJBQU8sU0FDVjtRQUVPLFdBQUssR0FBVyw0QkFBNEIsQ0FBQyxDQUFBLGlCQUFpQjtRQUM5RCxjQUFRLEdBQVcsVUFBVSxDQUFDLENBQUEsaUJBQWlCOztJQUh2RCxDQUFDO0lBS00sOEJBQUssR0FBWixVQUFhLElBQVM7UUFDbEIsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQixJQUFNLElBQUksR0FBUyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQ2pCLElBQUksQ0FBQztZQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXFCLEtBQU8sQ0FBQyxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRTtpQkFDdkIsSUFBSSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxFQUE1QixDQUE0QixDQUFDLENBQUE7UUFDakQsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0saUNBQVEsR0FBZixVQUFnQixJQUFJO1FBQ2hCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBTSxJQUFJLEdBQVMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUUvQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUNoQixVQUFVLEVBQUUsK0JBQStCO1lBQzNDLFlBQVksRUFBRSxLQUFLO1NBQ3RCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx1Q0FBYyxHQUFyQixVQUFzQixJQUFJO1FBQ3RCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBTSxJQUFJLEdBQVMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQXhDRCxDQUFvQyxnQkFBZ0IsQ0FBQyxVQUFVLEdBd0M5RDtBQXhDWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvYnNlcnZhYmxlTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCIpO1xyXG5pbXBvcnQgVXNlclZpZXdNb2RlbCBmcm9tIFwiLi4vLi4vdmlld21vZGVscy91c2VyXCI7XHJcbmltcG9ydCB7IG15RmlyZWJhc2UgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZmlyZWJhc2VcIjtcclxuaW1wb3J0IG15RGlhbG9ncyBmcm9tIFwiLi4vLi4vdXRpbHMvbWVzc2FnZXNcIjtcclxuaW1wb3J0IHtQYWdlfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XHJcblxyXG5jb25zdCBVc2VyID0gPFVzZXJWaWV3TW9kZWw+cmVxdWlyZShcIi4uLy4uL3ZpZXdtb2RlbHMvdXNlclwiKS5JO1xyXG5jb25zdCBGaXJlYmFzZSA9IDxteUZpcmViYXNlPnJlcXVpcmUoXCIuLi8uLi91dGlscy9maXJlYmFzZVwiKS5JO1xyXG5jb25zdCBkaWFsb2dzID0gPG15RGlhbG9ncz5yZXF1aXJlKFwiLi4vLi4vdXRpbHMvbWVzc2FnZXNcIikuSTtcclxuXHJcbmV4cG9ydCBjbGFzcyBsb2dpblZpZXdNb2RlbCBleHRlbmRzIG9ic2VydmFibGVNb2R1bGUuT2JzZXJ2YWJsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZW1haWw6IHN0cmluZyA9IFwidmFsZW50aW5tb2xpbmE4M0BnbWFpbC5jb21cIjsvL3RlbXBvcmFyeSBsb2dpblxyXG4gICAgcHJpdmF0ZSBwYXNzd29yZDogc3RyaW5nID0gXCJNYXJpbzUwOVwiOy8vdGVtcG9yYXJ5IGxvZ2luXHJcblxyXG4gICAgcHVibGljIGxvZ2luKGFyZ3M6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGNvbnN0IHBhZ2UgPSA8UGFnZT5idXR0b24ucGFnZTtcclxuICAgICAgICBVc2VyLnNldEVtYWlsKHRoaXMuZW1haWwpO1xyXG4gICAgICAgIFVzZXIuc2V0UGFzc3dvcmQodGhpcy5wYXNzd29yZCk7XHJcbiAgICAgICAgRmlyZWJhc2UuZG9Mb2dpbihVc2VyKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwYWdlLmZyYW1lLm5hdmlnYXRlKFwiL3ZpZXdzL2hvbWUvaG9tZS1wYWdlXCIpOyAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEVycm9yIGluIGRvTG9naW46ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgICAgICAgICBkaWFsb2dzLmludmFsaWRDcmVkZW50aWFscygpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gY29uc29sZS5sb2coXCJkaWFsb2cgY2xvc2VkXCIpKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXIoYXJncykge1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGNvbnN0IHBhZ2UgPSA8UGFnZT5idXR0b24ucGFnZTtcclxuXHJcbiAgICAgICAgcGFnZS5mcmFtZS5uYXZpZ2F0ZSh7XHJcbiAgICAgICAgICAgIG1vZHVsZU5hbWU6IFwiL3ZpZXdzL3JlZ2lzdGVyL3JlZ2lzdGVyLXBhZ2VcIixcclxuICAgICAgICAgICAgY2xlYXJIaXN0b3J5OiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmb3Jnb3RQYXNzd29yZChhcmdzKSB7XHJcbiAgICAgICAgY29uc3QgYnV0dG9uID0gYXJncy5vYmplY3Q7XHJcbiAgICAgICAgY29uc3QgcGFnZSA9IDxQYWdlPmJ1dHRvbi5wYWdlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGljaycpO1xyXG4gICAgICAgIHBhZ2UuZnJhbWUubmF2aWdhdGUoXCJ2aWV3cy9yZXNldHBhc3N3b3JkL3Jlc2V0LXBhc3N3b3JkXCIpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==