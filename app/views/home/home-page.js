"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var homeViewModel = require("./home-view-model");
var routings_1 = require("../../utils/routings");
var firebase = require("../../utils/firebase").I;
var navigate = require("../../utils/navigation").I;
var couchbase = require("../../utils/couchbase").I;
var User = require("../../viewmodels/user").I;
function onLoaded(args) {
    var page = args.object;
    /*  startMonitoring((newConnectionType) => {
            switch (newConnectionType) {
                case connectionType.none:
                    console.log("Connection type changed to none.");
                    break;
                case connectionType.wifi:
                    console.log("Connection type changed to WiFi.");
                    break;
                case connectionType.mobile:
                    console.log("Connection type changed to mobile.");
                    break;
                case connectionType.ethernet:
                    console.log("Connection type changed to ethernet.");
                    break;
                default:
                    break;
            }
        });*/
    firebase.isLoggedIn()
        .then(function (user) {
        if (!user) {
            page.page.frame.navigate(routings_1.appRoutes["login"].to);
            return;
        }
        else {
            firebase.getUser(user.uid)
                .then(function (result) {
                firebase.User = result.value;
                User.setData(result.value);
                User.saveToCouchbase();
                User.getDataCouchbase();
                firebase.savePushToken();
            });
        }
    })
        .catch(function (error) {
        page.page.frame.navigate(routings_1.appRoutes["login"].to);
    });
    page.bindingContext = new homeViewModel.homeViewModel();
}
exports.onLoaded = onLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQW9EO0FBS3BELGlEQUFpRDtBQUlqRCxJQUFJLFFBQVEsR0FBZSxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0QsSUFBSSxRQUFRLEdBQWUsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9ELElBQU0sU0FBUyxHQUFnQixPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEUsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBa0IsQ0FBQztBQUVqRSxTQUFnQixRQUFRLENBQUMsSUFBSTtJQUN6QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBYyxDQUFDO0lBRXJDOzs7Ozs7Ozs7Ozs7Ozs7OzthQWlCUztJQUNMLFFBQVEsQ0FBQyxVQUFVLEVBQUU7U0FDWixJQUFJLENBQUMsVUFBQSxJQUFJO1FBQ04sSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxvQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELE9BQU87U0FDVjthQUNJO1lBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNyQixJQUFJLENBQUMsVUFBQSxNQUFNO2dCQUNSLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3hCLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQTtTQUNUO0lBQ0wsQ0FBQyxDQUFDO1NBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSztRQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxvQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ1gsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUc1RCxDQUFDO0FBNUNELDRCQTRDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBob21lVmlld01vZGVsID0gcmVxdWlyZShcIi4vaG9tZS12aWV3LW1vZGVsXCIpO1xyXG5pbXBvcnQgeyBteUZpcmViYXNlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2ZpcmViYXNlXCI7XHJcbmltcG9ydCB7IFBhZ2UsIE5hdmlnYXRlZERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XHJcbmltcG9ydCB7IG15Q291Y2hiYXNlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NvdWNoYmFzZVwiO1xyXG5pbXBvcnQgeyBGcmFtZSwgZ2V0RnJhbWVCeUlkIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIjtcclxuaW1wb3J0IHsgYXBwUm91dGVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3JvdXRpbmdzXCI7XHJcbmltcG9ydCB7IE5hdmlnYXRpb24gfSBmcm9tIFwiLi4vLi4vdXRpbHMvbmF2aWdhdGlvblwiO1xyXG5pbXBvcnQgVXNlclZpZXdNb2RlbCBmcm9tIFwiLi4vLi4vdmlld21vZGVscy91c2VyXCI7XHJcblxyXG5sZXQgZmlyZWJhc2UgPSA8bXlGaXJlYmFzZT5yZXF1aXJlKFwiLi4vLi4vdXRpbHMvZmlyZWJhc2VcIikuSTtcclxubGV0IG5hdmlnYXRlID0gPE5hdmlnYXRpb24+cmVxdWlyZShcIi4uLy4uL3V0aWxzL25hdmlnYXRpb25cIikuSTtcclxuY29uc3QgY291Y2hiYXNlID0gPG15Q291Y2hiYXNlPnJlcXVpcmUoXCIuLi8uLi91dGlscy9jb3VjaGJhc2VcIikuSTtcclxuY29uc3QgVXNlciA9IHJlcXVpcmUoXCIuLi8uLi92aWV3bW9kZWxzL3VzZXJcIikuSSBhcyBVc2VyVmlld01vZGVsO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uTG9hZGVkKGFyZ3MpIHtcclxuICAgIGNvbnN0IHBhZ2UgPSBhcmdzLm9iamVjdCBhcyBQYWdlO1xyXG5cclxuLyogIHN0YXJ0TW9uaXRvcmluZygobmV3Q29ubmVjdGlvblR5cGUpID0+IHtcclxuICAgICAgICBzd2l0Y2ggKG5ld0Nvbm5lY3Rpb25UeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgY29ubmVjdGlvblR5cGUubm9uZTpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiB0eXBlIGNoYW5nZWQgdG8gbm9uZS5cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjb25uZWN0aW9uVHlwZS53aWZpOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIHR5cGUgY2hhbmdlZCB0byBXaUZpLlwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNvbm5lY3Rpb25UeXBlLm1vYmlsZTpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGlvbiB0eXBlIGNoYW5nZWQgdG8gbW9iaWxlLlwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNvbm5lY3Rpb25UeXBlLmV0aGVybmV0OlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIHR5cGUgY2hhbmdlZCB0byBldGhlcm5ldC5cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0pOyovXHJcbiAgICBmaXJlYmFzZS5pc0xvZ2dlZEluKClcclxuICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlLnBhZ2UuZnJhbWUubmF2aWdhdGUoYXBwUm91dGVzW1wibG9naW5cIl0udG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmdldFVzZXIodXNlci51aWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5Vc2VyID0gcmVzdWx0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVXNlci5zZXREYXRhKHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVc2VyLnNhdmVUb0NvdWNoYmFzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVXNlci5nZXREYXRhQ291Y2hiYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS5zYXZlUHVzaFRva2VuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBwYWdlLnBhZ2UuZnJhbWUubmF2aWdhdGUoYXBwUm91dGVzW1wibG9naW5cIl0udG8pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBuZXcgaG9tZVZpZXdNb2RlbC5ob21lVmlld01vZGVsKCk7ICAgXHJcblxyXG4gICAgXHJcbn0iXX0=