"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var routings_1 = require("../../../utils/routings");
var frame_1 = require("tns-core-modules/ui/frame");
var user = require("../../../viewmodels/user").I;
var firebase = require("../../../utils/firebase").I;
var dialogs = require("../../../utils/messages").I;
var currentuser = user.getTotalData();
console.log(currentuser);
var SettingsViewModel = /** @class */ (function (_super) {
    __extends(SettingsViewModel, _super);
    function SettingsViewModel() {
        var _this = _super.call(this) || this;
        _this.currentuser = user.getTotalData();
        _this.Name = _this.currentuser.firstName + " " + _this.currentuser.lastName;
        _this.Email = _this.currentuser.email;
        _this.wsuid = "WSU ID:" + _this.currentuser.wsuId;
        return _this;
    }
    SettingsViewModel.prototype.logout = function () {
        var frame = frame_1.getFrameById('topmost');
        firebase.doLogout()
            .then(function () {
            frame.navigate(routings_1.appRoutes['login'].to);
        });
    };
    SettingsViewModel.prototype.registerTutor = function () {
        var tutor = {
            email: 'edgar.ramirezg@wsu.edu',
            firstName: 'Edgar',
            lastName: 'Ramirez',
            info: {
                hours: "Variable",
                maincourse: "Biology",
                description: "Edgar Ramirez is a diligent worker if a bit crass sometimes. He'll get the job done, someway, somehow. Though his solutions may not be the most eloquent, they work... for the most part.",
            },
            dates: [
                {
                    day: 'Monday',
                    times: [
                        {
                            startTime: "4:30 PM",
                            endTime: "5:30 PM",
                            recurring: 'true'
                        },
                        {
                            startTime: "6:30 PM",
                            endTime: "7:00 PM",
                            recurring: 'true',
                        }
                    ]
                },
                {
                    day: 'Wednesday',
                    times: [
                        {
                            startTime: "8:30 AM",
                            endTime: "9:30 AM",
                            recurring: 'true',
                        },
                    ]
                },
                {
                    day: 'Friday',
                    times: [
                        {
                            startTime: "4:30 PM",
                            endTime: "5:30 PM",
                            recurring: 'true'
                        },
                        {
                            startTime: "6:30 PM",
                            endTime: "7:00 PM",
                            recurring: 'true',
                        },
                        {
                            startTime: "8:30 AM",
                            endTime: "9:30 AM",
                            recurring: 'true',
                        },
                    ]
                }
            ],
            subjects: [
                "English",
                "Art",
                "DTS"
            ]
        };
        firebase.addTutors(tutor)
            .then(function () { return console.log('Complete!'); })
            .catch(function () { return console.log('ERROR!'); });
    };
    return SettingsViewModel;
}(observable_1.Observable));
exports.SettingsViewModel = SettingsViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3Mtdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNldHRpbmdzLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrREFBOEQ7QUFHOUQsb0RBQW9EO0FBQ3BELG1EQUFnRTtBQUloRSxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFrQixDQUFDO0FBQ3BFLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQWUsQ0FBQztBQUNwRSxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFjLENBQUM7QUFFbEUsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFekI7SUFBdUMscUNBQVU7SUFNN0M7UUFBQSxZQUNJLGlCQUFPLFNBQ1Y7UUFQTSxpQkFBVyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNsQyxVQUFJLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBQ3BFLFdBQUssR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztRQUMvQixXQUFLLEdBQUUsU0FBUyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDOztJQUlqRCxDQUFDO0lBRU0sa0NBQU0sR0FBYjtRQUNJLElBQU0sS0FBSyxHQUFHLG9CQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFHdEMsUUFBUSxDQUFDLFFBQVEsRUFBRTthQUNkLElBQUksQ0FBQztZQUNGLEtBQUssQ0FBQyxRQUFRLENBQUMsb0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFTSx5Q0FBYSxHQUFwQjtRQUNJLElBQUksS0FBSyxHQUFHO1lBQ1IsS0FBSyxFQUFFLHdCQUF3QjtZQUMvQixTQUFTLEVBQUUsT0FBTztZQUNsQixRQUFRLEVBQUUsU0FBUztZQUNuQixJQUFJLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixXQUFXLEVBQUUsMkxBQTJMO2FBQzNNO1lBQ0QsS0FBSyxFQUFFO2dCQUNIO29CQUNJLEdBQUcsRUFBRSxRQUFRO29CQUNiLEtBQUssRUFBRTt3QkFDSDs0QkFDSSxTQUFTLEVBQUUsU0FBUzs0QkFDcEIsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLFNBQVMsRUFBRSxNQUFNO3lCQUNwQjt3QkFDRDs0QkFDSSxTQUFTLEVBQUUsU0FBUzs0QkFDcEIsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLFNBQVMsRUFBRSxNQUFNO3lCQUNwQjtxQkFDSjtpQkFDSjtnQkFDRDtvQkFDSSxHQUFHLEVBQUUsV0FBVztvQkFDaEIsS0FBSyxFQUFFO3dCQUNIOzRCQUNJLFNBQVMsRUFBRSxTQUFTOzRCQUNwQixPQUFPLEVBQUUsU0FBUzs0QkFDbEIsU0FBUyxFQUFFLE1BQU07eUJBQ3BCO3FCQUNKO2lCQUNKO2dCQUNEO29CQUNJLEdBQUcsRUFBRSxRQUFRO29CQUNiLEtBQUssRUFBRTt3QkFDSDs0QkFDSSxTQUFTLEVBQUUsU0FBUzs0QkFDcEIsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLFNBQVMsRUFBRSxNQUFNO3lCQUNwQjt3QkFDRDs0QkFDSSxTQUFTLEVBQUUsU0FBUzs0QkFDcEIsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLFNBQVMsRUFBRSxNQUFNO3lCQUNwQjt3QkFDRDs0QkFDSSxTQUFTLEVBQUUsU0FBUzs0QkFDcEIsT0FBTyxFQUFFLFNBQVM7NEJBQ2xCLFNBQVMsRUFBRSxNQUFNO3lCQUNwQjtxQkFDSjtpQkFDSjthQUNKO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFNBQVM7Z0JBQ1QsS0FBSztnQkFDTCxLQUFLO2FBQ1I7U0FDSixDQUFBO1FBRUQsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7YUFDcEIsSUFBSSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUF4QixDQUF3QixDQUFDO2FBQ3BDLEtBQUssQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUF4RkQsQ0FBdUMsdUJBQVUsR0F3RmhEO0FBeEZZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgbXlGaXJlYmFzZSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9maXJlYmFzZVwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlXCI7XHJcbmltcG9ydCB7IGFwcFJvdXRlcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yb3V0aW5nc1wiO1xyXG5pbXBvcnQgeyBGcmFtZSwgZ2V0RnJhbWVCeUlkIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIjtcclxuaW1wb3J0IG15RGlhbG9ncywgKiBhcyBEaWFsb2dzIGZyb20gXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlc1wiO1xyXG5pbXBvcnQgVXNlclZpZXdNb2RlbCBmcm9tIFwiLi4vLi4vLi4vdmlld21vZGVscy91c2VyXCI7XHJcblxyXG5jb25zdCB1c2VyID0gcmVxdWlyZShcIi4uLy4uLy4uL3ZpZXdtb2RlbHMvdXNlclwiKS5JIGFzIFVzZXJWaWV3TW9kZWw7XHJcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIi4uLy4uLy4uL3V0aWxzL2ZpcmViYXNlXCIpLkkgYXMgbXlGaXJlYmFzZTtcclxuY29uc3QgZGlhbG9ncyA9IHJlcXVpcmUoXCIuLi8uLi8uLi91dGlscy9tZXNzYWdlc1wiKS5JIGFzIG15RGlhbG9ncztcclxuXHJcbmxldCBjdXJyZW50dXNlciA9IHVzZXIuZ2V0VG90YWxEYXRhKCk7XHJcbmNvbnNvbGUubG9nKGN1cnJlbnR1c2VyKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5nc1ZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xyXG4gICAgcHVibGljIGN1cnJlbnR1c2VyID0gdXNlci5nZXRUb3RhbERhdGEoKTtcclxuICAgIHB1YmxpYyBOYW1lID0gdGhpcy5jdXJyZW50dXNlci5maXJzdE5hbWUgKyBcIiBcIiArIHRoaXMuY3VycmVudHVzZXIubGFzdE5hbWU7XHJcbiAgICBwdWJsaWMgRW1haWwgPSB0aGlzLmN1cnJlbnR1c2VyLmVtYWlsO1xyXG4gICAgcHVibGljIHdzdWlkID1cIldTVSBJRDpcIiArIHRoaXMuY3VycmVudHVzZXIud3N1SWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9nb3V0KCkge1xyXG4gICAgICAgIGNvbnN0IGZyYW1lID0gZ2V0RnJhbWVCeUlkKCd0b3Btb3N0Jyk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIGZpcmViYXNlLmRvTG9nb3V0KClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZnJhbWUubmF2aWdhdGUoYXBwUm91dGVzWydsb2dpbiddLnRvKTtcclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3RlclR1dG9yKCkge1xyXG4gICAgICAgIGxldCB0dXRvciA9IHtcclxuICAgICAgICAgICAgZW1haWw6ICdlZGdhci5yYW1pcmV6Z0B3c3UuZWR1JyxcclxuICAgICAgICAgICAgZmlyc3ROYW1lOiAnRWRnYXInLFxyXG4gICAgICAgICAgICBsYXN0TmFtZTogJ1JhbWlyZXonLFxyXG4gICAgICAgICAgICBpbmZvOiB7XHJcbiAgICAgICAgICAgICAgICBob3VyczogXCJWYXJpYWJsZVwiLFxyXG4gICAgICAgICAgICAgICAgbWFpbmNvdXJzZTogXCJCaW9sb2d5XCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJFZGdhciBSYW1pcmV6IGlzIGEgZGlsaWdlbnQgd29ya2VyIGlmIGEgYml0IGNyYXNzIHNvbWV0aW1lcy4gSGUnbGwgZ2V0IHRoZSBqb2IgZG9uZSwgc29tZXdheSwgc29tZWhvdy4gVGhvdWdoIGhpcyBzb2x1dGlvbnMgbWF5IG5vdCBiZSB0aGUgbW9zdCBlbG9xdWVudCwgdGhleSB3b3JrLi4uIGZvciB0aGUgbW9zdCBwYXJ0LlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRlczogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRheTogJ01vbmRheScsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lOiBcIjQ6MzAgUE1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZFRpbWU6IFwiNTozMCBQTVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjdXJyaW5nOiAndHJ1ZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lOiBcIjY6MzAgUE1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZFRpbWU6IFwiNzowMCBQTVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjdXJyaW5nOiAndHJ1ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRheTogJ1dlZG5lc2RheScsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lOiBcIjg6MzAgQU1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZFRpbWU6IFwiOTozMCBBTVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjdXJyaW5nOiAndHJ1ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXk6ICdGcmlkYXknLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZTogXCI0OjMwIFBNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRUaW1lOiBcIjU6MzAgUE1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY3VycmluZzogJ3RydWUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZTogXCI2OjMwIFBNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRUaW1lOiBcIjc6MDAgUE1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY3VycmluZzogJ3RydWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFRpbWU6IFwiODozMCBBTVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kVGltZTogXCI5OjMwIEFNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWN1cnJpbmc6ICd0cnVlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHN1YmplY3RzOiBbXHJcbiAgICAgICAgICAgICAgICBcIkVuZ2xpc2hcIixcclxuICAgICAgICAgICAgICAgIFwiQXJ0XCIsXHJcbiAgICAgICAgICAgICAgICBcIkRUU1wiXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpcmViYXNlLmFkZFR1dG9ycyh0dXRvcilcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gY29uc29sZS5sb2coJ0NvbXBsZXRlIScpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4gY29uc29sZS5sb2coJ0VSUk9SIScpKTtcclxuICAgIH1cclxufVxyXG4iXX0=