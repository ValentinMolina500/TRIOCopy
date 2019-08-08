"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observableModule = require("tns-core-modules/data/observable");
var frame_1 = require("tns-core-modules/ui/frame");
var Firebase = require("../../utils/firebase").I;
var User = require("../../viewmodels/user").I;
var dialogs = require("../../utils/messages").I;
var registerViewModel = /** @class */ (function (_super) {
    __extends(registerViewModel, _super);
    function registerViewModel() {
        var _this = _super.call(this) || this;
        _this.firstName = "Valentin";
        _this.lastName = "Molina";
        _this.wsuId = 17413;
        _this.email = "valentinmolina83@gmail.com";
        _this.password = "luigi509";
        _this.confirmPassword = "luigi509";
        _this.uid = "";
        _this.major = "";
        _this.WSU_Majors = [
            'Biology',
            'Biological Sciences',
            'Business Administration',
            'Civil Engineering',
            'Computer Science',
            'Digital Technology and Culture',
            'Earth & Environmental Science',
            'Education',
            'Electrical Engineering',
            'English',
            'Fine Arts',
            'History',
            'Hospitality Business Management',
            'Humanities',
            'Mathematics � General Studies',
            'Management',
            'Mechanical Engineering',
            'Nursing',
            'Physical Sciences � General Studies',
            'Pre-Health Sciences',
            'Psychology',
            'Social Sciences',
            'Wine & Beverage Business Management',
            'Wine Science (Viticulture & Enology)',
            'Undecided'
        ];
        return _this;
    }
    registerViewModel.prototype.dropDownSelectedIndexChanged = function (args) {
        console.log("Drop Down selected index changed from " + args.oldIndex + " to " + args.newIndex);
        this.major = this.WSU_Majors[args.newIndex];
        console.log(this.WSU_Majors[args.newIndex]);
    };
    registerViewModel.prototype.register = function (args) {
        var button = args.object;
        var page = button.page;
        try {
            User.setData(this);
        }
        catch (err) {
            return;
        }
        Firebase.doRegister(User)
            .then(function (result) {
            console.dir(result);
            User.setFbId(result.uid);
            User.saveToCouchbase();
            Firebase.addUserToColllection(User);
            page.frame.navigate("/views/home/home-page");
        })
            .catch(function (err) {
            dialogs.genericDialog({
                title: "Error registering",
                message: err,
                okButtonText: "OK"
            });
        });
    };
    registerViewModel.prototype.goBack = function (args) {
        var button = args.object;
        var page = button.page;
        page.frame.goBack();
    };
    registerViewModel.prototype.onLinkTap = function () {
        console.log("heyyy!");
        var frame = frame_1.getFrameById('topmost');
        frame.navigate({
            moduleName: "/views/webview/webview",
            context: {
                link: "https://wsu.co1.qualtrics.com/jfe/form/SV_2ahWlZ52iE4gftz"
            }
        });
    };
    return registerViewModel;
}(observableModule.Observable));
exports.registerViewModel = registerViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZ2lzdGVyLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRUFBc0U7QUFPdEUsbURBQWdGO0FBR2hGLElBQU0sUUFBUSxHQUFlLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRCxJQUFNLElBQUksR0FBa0IsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9ELElBQU0sT0FBTyxHQUFjLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUU3RDtJQUFnQyxxQ0FBMkI7SUE2Q25EO1FBQUEsWUFDQSxpQkFBTyxTQUNWO1FBOUNPLGVBQVMsR0FBVyxVQUFVLENBQUM7UUFDL0IsY0FBUSxHQUFXLFFBQVEsQ0FBQztRQUM1QixXQUFLLEdBQVcsS0FBSyxDQUFDO1FBQ3RCLFdBQUssR0FBVyw0QkFBNEIsQ0FBQztRQUM3QyxjQUFRLEdBQVcsVUFBVSxDQUFDO1FBQzlCLHFCQUFlLEdBQVcsVUFBVSxDQUFDO1FBQ3JDLFNBQUcsR0FBVyxFQUFFLENBQUM7UUFDakIsV0FBSyxHQUFVLEVBQUUsQ0FBRTtRQUdwQixnQkFBVSxHQUFHO1lBQ2hCLFNBQVM7WUFDVCxxQkFBcUI7WUFDckIseUJBQXlCO1lBQ3pCLG1CQUFtQjtZQUNuQixrQkFBa0I7WUFDbEIsZ0NBQWdDO1lBQ2hDLCtCQUErQjtZQUMvQixXQUFXO1lBQ1gsd0JBQXdCO1lBQ3hCLFNBQVM7WUFDVCxXQUFXO1lBQ1gsU0FBUztZQUNULGlDQUFpQztZQUNqQyxZQUFZO1lBQ1osK0JBQStCO1lBQy9CLFlBQVk7WUFDWix3QkFBd0I7WUFDeEIsU0FBUztZQUNULHFDQUFxQztZQUNyQyxxQkFBcUI7WUFDckIsWUFBWTtZQUNaLGlCQUFpQjtZQUNqQixxQ0FBcUM7WUFDckMsc0NBQXNDO1lBQ3RDLFdBQVc7U0FDZCxDQUFBOztJQVVELENBQUM7SUFSTSx3REFBNEIsR0FBbkMsVUFBb0MsSUFBbUM7UUFDbkUsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBeUMsSUFBSSxDQUFDLFFBQVEsWUFBTyxJQUFJLENBQUMsUUFBVSxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUtNLG9DQUFRLEdBQWYsVUFBZ0IsSUFBSTtRQUNoQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3pCLElBQUksSUFBSSxHQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFN0IsSUFBSTtZQUNBLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEI7UUFDRCxPQUFPLEdBQUcsRUFBRTtZQUNSLE9BQU87U0FDVjtRQUVELFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2FBQ3BCLElBQUksQ0FBQyxVQUFDLE1BQVc7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUV2QixRQUFRLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtRQUNoRCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxHQUFHO1lBQ04sT0FBTyxDQUFDLGFBQWEsQ0FBQztnQkFDbEIsS0FBSyxFQUFFLG1CQUFtQjtnQkFDMUIsT0FBTyxFQUFFLEdBQUc7Z0JBQ1osWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sa0NBQU0sR0FBYixVQUFjLElBQUk7UUFDZCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3pCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUV4QixDQUFDO0lBRU0scUNBQVMsR0FBaEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLElBQUksS0FBSyxHQUFVLG9CQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUNYLFVBQVUsRUFBRSx3QkFBd0I7WUFDcEMsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSwyREFBMkQ7YUFBQztTQUN6RSxDQUFDLENBQUM7SUFDZixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBOUZELENBQWdDLGdCQUFnQixDQUFDLFVBQVUsR0E4RjFEO0FBRVEsOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9ic2VydmFibGVNb2R1bGUgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIik7XHJcbmltcG9ydCB7IG15RmlyZWJhc2UgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZmlyZWJhc2VcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuaW1wb3J0IFVzZXJWaWV3TW9kZWwgZnJvbSBcIi4uLy4uL3ZpZXdtb2RlbHMvdXNlclwiO1xyXG5pbXBvcnQgbXlEaWFsb2dzIGZyb20gXCJ+L3V0aWxzL21lc3NhZ2VzXCI7XHJcbmltcG9ydCB7IFdlYlZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS93ZWItdmlld1wiO1xyXG5pbXBvcnQgeyBJdGVtRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCI7XHJcbmltcG9ydCB7IGdldEZyYW1lQnlJZCwgRnJhbWUsIHRvcG1vc3QsIHN0YWNrIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIjtcclxuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWRyb3AtZG93blwiO1xyXG5cclxuY29uc3QgRmlyZWJhc2UgPSA8bXlGaXJlYmFzZT5yZXF1aXJlKFwiLi4vLi4vdXRpbHMvZmlyZWJhc2VcIikuSTtcclxuY29uc3QgVXNlciA9IDxVc2VyVmlld01vZGVsPnJlcXVpcmUoXCIuLi8uLi92aWV3bW9kZWxzL3VzZXJcIikuSTtcclxuY29uc3QgZGlhbG9ncyA9IDxteURpYWxvZ3M+cmVxdWlyZShcIi4uLy4uL3V0aWxzL21lc3NhZ2VzXCIpLkk7XHJcblxyXG5jbGFzcyByZWdpc3RlclZpZXdNb2RlbCBleHRlbmRzIG9ic2VydmFibGVNb2R1bGUuT2JzZXJ2YWJsZSB7XHJcbiAgICBwcml2YXRlIGZpcnN0TmFtZTogc3RyaW5nID0gXCJWYWxlbnRpblwiO1xyXG4gICAgcHJpdmF0ZSBsYXN0TmFtZTogc3RyaW5nID0gXCJNb2xpbmFcIjtcclxuICAgIHByaXZhdGUgd3N1SWQ6IG51bWJlciA9IDE3NDEzO1xyXG4gICAgcHJpdmF0ZSBlbWFpbDogc3RyaW5nID0gXCJ2YWxlbnRpbm1vbGluYTgzQGdtYWlsLmNvbVwiO1xyXG4gICAgcHJpdmF0ZSBwYXNzd29yZDogc3RyaW5nID0gXCJsdWlnaTUwOVwiO1xyXG4gICAgcHJpdmF0ZSBjb25maXJtUGFzc3dvcmQ6IHN0cmluZyA9IFwibHVpZ2k1MDlcIjtcclxuICAgIHByaXZhdGUgdWlkOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBtYWpvcjogc3RyaW5nID1cIlwiIDtcclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBXU1VfTWFqb3JzID0gW1xyXG4gICAgICAgICdCaW9sb2d5JyxcclxuICAgICAgICAnQmlvbG9naWNhbCBTY2llbmNlcycsXHJcbiAgICAgICAgJ0J1c2luZXNzIEFkbWluaXN0cmF0aW9uJyxcclxuICAgICAgICAnQ2l2aWwgRW5naW5lZXJpbmcnLFxyXG4gICAgICAgICdDb21wdXRlciBTY2llbmNlJyxcclxuICAgICAgICAnRGlnaXRhbCBUZWNobm9sb2d5IGFuZCBDdWx0dXJlJyxcclxuICAgICAgICAnRWFydGggJiBFbnZpcm9ubWVudGFsIFNjaWVuY2UnLFxyXG4gICAgICAgICdFZHVjYXRpb24nLFxyXG4gICAgICAgICdFbGVjdHJpY2FsIEVuZ2luZWVyaW5nJyxcclxuICAgICAgICAnRW5nbGlzaCcsXHJcbiAgICAgICAgJ0ZpbmUgQXJ0cycsXHJcbiAgICAgICAgJ0hpc3RvcnknLFxyXG4gICAgICAgICdIb3NwaXRhbGl0eSBCdXNpbmVzcyBNYW5hZ2VtZW50JyxcclxuICAgICAgICAnSHVtYW5pdGllcycsXHJcbiAgICAgICAgJ01hdGhlbWF0aWNzIO+/vSBHZW5lcmFsIFN0dWRpZXMnLFxyXG4gICAgICAgICdNYW5hZ2VtZW50JyxcclxuICAgICAgICAnTWVjaGFuaWNhbCBFbmdpbmVlcmluZycsXHJcbiAgICAgICAgJ051cnNpbmcnLFxyXG4gICAgICAgICdQaHlzaWNhbCBTY2llbmNlcyDvv70gR2VuZXJhbCBTdHVkaWVzJyxcclxuICAgICAgICAnUHJlLUhlYWx0aCBTY2llbmNlcycsXHJcbiAgICAgICAgJ1BzeWNob2xvZ3knLFxyXG4gICAgICAgICdTb2NpYWwgU2NpZW5jZXMnLFxyXG4gICAgICAgICdXaW5lICYgQmV2ZXJhZ2UgQnVzaW5lc3MgTWFuYWdlbWVudCcsXHJcbiAgICAgICAgJ1dpbmUgU2NpZW5jZSAoVml0aWN1bHR1cmUgJiBFbm9sb2d5KScsXHJcbiAgICAgICAgJ1VuZGVjaWRlZCdcclxuICAgIF1cclxuXHJcbiAgICBwdWJsaWMgZHJvcERvd25TZWxlY3RlZEluZGV4Q2hhbmdlZChhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBEcm9wIERvd24gc2VsZWN0ZWQgaW5kZXggY2hhbmdlZCBmcm9tICR7YXJncy5vbGRJbmRleH0gdG8gJHthcmdzLm5ld0luZGV4fWApO1xyXG4gICAgICAgIHRoaXMubWFqb3IgPSB0aGlzLldTVV9NYWpvcnNbYXJncy5uZXdJbmRleF07XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5XU1VfTWFqb3JzW2FyZ3MubmV3SW5kZXhdKTtcclxuICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZWdpc3RlcihhcmdzKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGJ1dHRvbiA9IGFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGxldCBwYWdlID0gPFBhZ2U+YnV0dG9uLnBhZ2U7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIFVzZXIuc2V0RGF0YSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBGaXJlYmFzZS5kb1JlZ2lzdGVyKFVzZXIpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5kaXIocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIFVzZXIuc2V0RmJJZChyZXN1bHQudWlkKTtcclxuICAgICAgICAgICAgICAgIFVzZXIuc2F2ZVRvQ291Y2hiYXNlKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgRmlyZWJhc2UuYWRkVXNlclRvQ29sbGxlY3Rpb24oVXNlcik7XHJcbiAgICAgICAgICAgICAgICBwYWdlLmZyYW1lLm5hdmlnYXRlKFwiL3ZpZXdzL2hvbWUvaG9tZS1wYWdlXCIpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGlhbG9ncy5nZW5lcmljRGlhbG9nKHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvciByZWdpc3RlcmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGVycixcclxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2soYXJncyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBidXR0b24gPSBhcmdzLm9iamVjdDtcclxuICAgICAgICBsZXQgcGFnZSA9IGJ1dHRvbi5wYWdlO1xyXG5cclxuICAgICAgICBwYWdlLmZyYW1lLmdvQmFjaygpO1xyXG4gICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25MaW5rVGFwKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGV5eXkhXCIpO1xyXG4gICAgICAgIGxldCBmcmFtZTogRnJhbWUgPSBnZXRGcmFtZUJ5SWQoJ3RvcG1vc3QnKTtcclxuICAgICAgICAgICAgICAgIGZyYW1lLm5hdmlnYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBtb2R1bGVOYW1lOiBcIi92aWV3cy93ZWJ2aWV3L3dlYnZpZXdcIixcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6IFwiaHR0cHM6Ly93c3UuY28xLnF1YWx0cmljcy5jb20vamZlL2Zvcm0vU1ZfMmFoV2xaNTJpRTRnZnR6XCJ9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgcmVnaXN0ZXJWaWV3TW9kZWwgfTsiXX0=