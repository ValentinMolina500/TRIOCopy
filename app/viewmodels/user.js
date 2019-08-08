"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observableModule = require("tns-core-modules/data/observable");
var dialogs = require("../utils/messages").I;
var couchbase = require("../utils/couchbase").I;
var UserViewModel = /** @class */ (function (_super) {
    __extends(UserViewModel, _super);
    function UserViewModel() {
        return _super.call(this) || this;
    }
    UserViewModel.prototype.getDataCouchbase = function () {
        this.document = couchbase.getDocument('User');
        if (this.document) {
            this.setData(this.document);
        }
    };
    UserViewModel.prototype.setData = function (view) {
        this.uid = view.uid || '';
        this.firstName = view.firstName;
        this.lastName = view.lastName;
        this.email = view.email;
        this.wsuId = view.wsuId;
        this.password = view.password || '';
        this.major = view.major || '';
        this.profilepic = view.profilepic || "";
    };
    UserViewModel.prototype.setEmail = function (email) {
        this.email = email;
    };
    UserViewModel.prototype.setPassword = function (password) {
        this.password = password;
    };
    UserViewModel.prototype.setFbId = function (uid) {
        this.uid = uid;
    };
    UserViewModel.prototype.getEmail = function () {
        return this.email;
    };
    UserViewModel.prototype.getData = function () {
        return {
            email: this.email.trim(),
            password: this.password,
            uid: this.uid
        };
    };
    UserViewModel.prototype.getTotalData = function () {
        return {
            uid: this.uid,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            wsuId: this.wsuId,
            major: this.major,
            profilepic: this.profilepic,
        };
    };
    UserViewModel.prototype.saveToCouchbase = function () {
        console.log("-----------------");
        console.dir(this.getTotalData());
        couchbase.createDocument('User', this.getTotalData());
    };
    return UserViewModel;
}(observableModule.Observable));
exports.default = UserViewModel;
exports.I = new UserViewModel();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRUFBc0U7QUFLdEUsSUFBTSxPQUFPLEdBQWMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFELElBQU0sU0FBUyxHQUFnQixPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFL0Q7SUFBMkMsaUNBQTJCO0lBWWxFO2VBQ0ksaUJBQU87SUFHWCxDQUFDO0lBRU0sd0NBQWdCLEdBQXZCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9CO0lBQ0wsQ0FBQztJQUNNLCtCQUFPLEdBQWQsVUFBZSxJQUFRO1FBRW5CLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBRSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBRSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFTSxnQ0FBUSxHQUFmLFVBQWdCLEtBQWE7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUNNLG1DQUFXLEdBQWxCLFVBQW1CLFFBQWdCO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFDTSwrQkFBTyxHQUFkLFVBQWUsR0FBVztRQUN0QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDO0lBRU0sZ0NBQVEsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBQ00sK0JBQU8sR0FBZDtRQUNJLE9BQU87WUFDQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDeEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztTQUNaLENBQUE7SUFDYixDQUFDO0lBQ00sb0NBQVksR0FBbkI7UUFDSSxPQUFPO1lBQ0gsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixVQUFVLEVBQUMsSUFBSSxDQUFDLFVBQVU7U0FDckIsQ0FBQTtJQUNiLENBQUM7SUFDTSx1Q0FBZSxHQUF0QjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTCxvQkFBQztBQUFELENBQUMsQUF6RUQsQ0FBMkMsZ0JBQWdCLENBQUMsVUFBVSxHQXlFckU7O0FBRUQsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9ic2VydmFibGVNb2R1bGUgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIik7XHJcbmltcG9ydCBteURpYWxvZ3MgZnJvbSBcIi4uL3V0aWxzL21lc3NhZ2VzXCI7XHJcbmltcG9ydCB7IG15Q291Y2hiYXNlIH0gZnJvbSBcIi4uL3V0aWxzL2NvdWNoYmFzZVwiO1xyXG5pbXBvcnQgeyBJbWFnZVNvdXJjZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLXNvdXJjZS9pbWFnZS1zb3VyY2VcIjtcclxuXHJcbmNvbnN0IGRpYWxvZ3MgPSA8bXlEaWFsb2dzPnJlcXVpcmUoXCIuLi91dGlscy9tZXNzYWdlc1wiKS5JO1xyXG5jb25zdCBjb3VjaGJhc2UgPSA8bXlDb3VjaGJhc2U+cmVxdWlyZShcIi4uL3V0aWxzL2NvdWNoYmFzZVwiKS5JO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlclZpZXdNb2RlbCBleHRlbmRzIG9ic2VydmFibGVNb2R1bGUuT2JzZXJ2YWJsZSB7XHJcblxyXG4gICAgcHJpdmF0ZSB1aWQ6IHN0cmluZyA7XHJcbiAgICBwcml2YXRlIGZpcnN0TmFtZTogc3RyaW5nIDtcclxuICAgIHByaXZhdGUgbGFzdE5hbWU6IHN0cmluZyA7XHJcbiAgICBwcml2YXRlIHdzdUlkOiBudW1iZXIgO1xyXG4gICAgcHJpdmF0ZSBlbWFpbDogc3RyaW5nIDtcclxuICAgIHByaXZhdGUgcGFzc3dvcmQ6IHN0cmluZyA7XHJcbiAgICBwcml2YXRlIGRvY3VtZW50OiBvYmplY3Q7XHJcbiAgICBwcml2YXRlIG1ham9yOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHByb2ZpbGVwaWM6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXREYXRhQ291Y2hiYXNlKCkge1xyXG4gICAgICAgIHRoaXMuZG9jdW1lbnQgPSBjb3VjaGJhc2UuZ2V0RG9jdW1lbnQoJ1VzZXInKTtcclxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEodGhpcy5kb2N1bWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNldERhdGEodmlldzphbnkpIHtcclxuXHJcbiAgICAgICAgdGhpcy51aWQgPSB2aWV3LnVpZHx8Jyc7XHJcbiAgICAgICAgdGhpcy5maXJzdE5hbWUgPSB2aWV3LmZpcnN0TmFtZTtcclxuICAgICAgICB0aGlzLmxhc3ROYW1lID0gdmlldy5sYXN0TmFtZTtcclxuICAgICAgICB0aGlzLmVtYWlsID0gdmlldy5lbWFpbDtcclxuICAgICAgICB0aGlzLndzdUlkID0gdmlldy53c3VJZDtcclxuICAgICAgICB0aGlzLnBhc3N3b3JkID0gdmlldy5wYXNzd29yZHx8Jyc7XHJcbiAgICAgICAgdGhpcy5tYWpvciA9IHZpZXcubWFqb3IgfHwgJyc7XHJcbiAgICAgICAgdGhpcy5wcm9maWxlcGljID0gdmlldy5wcm9maWxlcGljIHx8IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEVtYWlsKGVtYWlsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmVtYWlsID0gZW1haWw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0UGFzc3dvcmQocGFzc3dvcmQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRGYklkKHVpZDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51aWQgPSB1aWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEVtYWlsKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1haWw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0RGF0YSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBlbWFpbDogdGhpcy5lbWFpbC50cmltKCksXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcclxuICAgICAgICAgICAgICAgIHVpZDogdGhpcy51aWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUb3RhbERhdGEoKTogYW55IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB1aWQ6IHRoaXMudWlkLFxyXG4gICAgICAgICAgICBlbWFpbDogdGhpcy5lbWFpbCxcclxuICAgICAgICAgICAgZmlyc3ROYW1lOiB0aGlzLmZpcnN0TmFtZSxcclxuICAgICAgICAgICAgbGFzdE5hbWU6IHRoaXMubGFzdE5hbWUsXHJcbiAgICAgICAgICAgIHdzdUlkOiB0aGlzLndzdUlkLFxyXG4gICAgICAgICAgICBtYWpvcjogdGhpcy5tYWpvcixcclxuICAgICAgICAgICAgcHJvZmlsZXBpYzp0aGlzLnByb2ZpbGVwaWMsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2F2ZVRvQ291Y2hiYXNlKCk6IGFueSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICBjb25zb2xlLmRpcih0aGlzLmdldFRvdGFsRGF0YSgpKTtcclxuICAgICAgICBjb3VjaGJhc2UuY3JlYXRlRG9jdW1lbnQoJ1VzZXInLHRoaXMuZ2V0VG90YWxEYXRhKCkpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0cy5JID0gbmV3IFVzZXJWaWV3TW9kZWwoKTsiXX0=