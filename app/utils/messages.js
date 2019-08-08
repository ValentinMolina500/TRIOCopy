"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorcodes_1 = require("./errorcodes");
var Dialogs = require("tns-core-modules/ui/dialogs");
var myDialogs = /** @class */ (function () {
    function myDialogs() {
    }
    myDialogs.prototype.genericDialog = function (alertProps) {
        return Dialogs.alert(alertProps);
    };
    myDialogs.prototype.invalidCredentials = function () {
        return Dialogs.alert(errorcodes_1.default["INV_CRED"]);
    };
    myDialogs.prototype.resetPasswordSuccess = function () {
        return Dialogs.alert(errorcodes_1.default["RESETPASS_OK"]);
    };
    return myDialogs;
}());
exports.default = myDialogs;
exports.I = new myDialogs();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZXNzYWdlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUF1QztBQUN2QyxxREFBdUQ7QUFPdkQ7SUFBQTtJQWFBLENBQUM7SUFaVSxpQ0FBYSxHQUFwQixVQUFxQixVQUF3QjtRQUN6QyxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLHNDQUFrQixHQUF6QjtRQUNJLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVNLHdDQUFvQixHQUEzQjtRQUNJLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVMLGdCQUFDO0FBQUQsQ0FBQyxBQWJELElBYUM7O0FBR0QsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVSUk9SX0NPREVTIGZyb20gXCIuL2Vycm9yY29kZXNcIjtcclxuaW1wb3J0ICogYXMgRGlhbG9ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XHJcblxyXG5pbnRlcmZhY2UgQWxlcnRPcHRpb25zIHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBva0J1dHRvblRleHQ6IHN0cmluZztcclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBteURpYWxvZ3Mge1xyXG4gICAgcHVibGljIGdlbmVyaWNEaWFsb2coYWxlcnRQcm9wczogQWxlcnRPcHRpb25zKTogYW55IHtcclxuICAgICAgICByZXR1cm4gRGlhbG9ncy5hbGVydChhbGVydFByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW52YWxpZENyZWRlbnRpYWxzKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIERpYWxvZ3MuYWxlcnQoRVJST1JfQ09ERVNbXCJJTlZfQ1JFRFwiXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0UGFzc3dvcmRTdWNjZXNzKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIERpYWxvZ3MuYWxlcnQoRVJST1JfQ09ERVNbXCJSRVNFVFBBU1NfT0tcIl0pO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydHMuSSA9IG5ldyBteURpYWxvZ3MoKTtcclxuIl19