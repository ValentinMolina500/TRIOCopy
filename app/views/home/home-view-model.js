"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observableModule = require("tns-core-modules/data/observable");
var firebase = require("../../utils/firebase").I;
var homeViewModel = /** @class */ (function (_super) {
    __extends(homeViewModel, _super);
    function homeViewModel() {
        return _super.call(this) || this;
    }
    homeViewModel.prototype.logout = function (args) {
        var button = args.object;
        var page = button.page;
        firebase.doLogout()
            .then(function () {
            console.log('Logged out from home page');
            page.frame.navigate("/views/login/login-page");
        });
    };
    return homeViewModel;
}(observableModule.Observable));
exports.homeViewModel = homeViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUVBQXNFO0FBTXRFLElBQUksUUFBUSxHQUFlLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUU3RDtJQUFtQyxpQ0FBMkI7SUFDMUQ7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUFFTSw4QkFBTSxHQUFiLFVBQWMsSUFBSTtRQUNkLElBQUksTUFBTSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDL0IsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUV2QixRQUFRLENBQUMsUUFBUSxFQUFFO2FBQ2QsSUFBSSxDQUFDO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUE7SUFDVixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBZkQsQ0FBbUMsZ0JBQWdCLENBQUMsVUFBVSxHQWU3RDtBQWZZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9ic2VydmFibGVNb2R1bGUgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIik7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2J1dHRvblwiO1xyXG5pbXBvcnQgeyBteUZpcmViYXNlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2ZpcmViYXNlXCI7XHJcbmltcG9ydCB7IGFkZEJhY2tncm91bmRSZW1vdGVOb3RpZmljYXRpb25IYW5kbGVyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvbWVzc2FnaW5nL21lc3NhZ2luZ1wiO1xyXG5cclxubGV0IGZpcmViYXNlID0gPG15RmlyZWJhc2U+cmVxdWlyZShcIi4uLy4uL3V0aWxzL2ZpcmViYXNlXCIpLkk7XHJcblxyXG5leHBvcnQgY2xhc3MgaG9tZVZpZXdNb2RlbCBleHRlbmRzIG9ic2VydmFibGVNb2R1bGUuT2JzZXJ2YWJsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dvdXQoYXJncykge1xyXG4gICAgICAgIGxldCBidXR0b24gPSA8UGFnZT5hcmdzLm9iamVjdDtcclxuICAgICAgICBsZXQgcGFnZSA9IGJ1dHRvbi5wYWdlO1xyXG5cclxuICAgICAgICBmaXJlYmFzZS5kb0xvZ291dCgpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dnZWQgb3V0IGZyb20gaG9tZSBwYWdlJyk7XHJcbiAgICAgICAgICAgICAgICBwYWdlLmZyYW1lLm5hdmlnYXRlKFwiL3ZpZXdzL2xvZ2luL2xvZ2luLXBhZ2VcIik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbn0iXX0=