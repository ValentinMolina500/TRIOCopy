"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observableModule = require("tns-core-modules/data/observable");
var frame_1 = require("tns-core-modules/ui/frame");
var observable_array_1 = require("tns-core-modules/data/observable-array/observable-array");
var firebase = require("../../../../utils/firebase").I;
var resTempViewModel = /** @class */ (function (_super) {
    __extends(resTempViewModel, _super);
    function resTempViewModel(id) {
        var _this = _super.call(this) || this;
        _this.resources = new observable_array_1.ObservableArray();
        switch (id) {
            case "FAQ":
                console.log("this is FAQ");
                break;
            case "WSU":
                console.log("This is WSU");
                break;
            case "Aid":
                console.log("This is Aid");
                break;
            case "Browse":
                console.log("This is Browse");
                break;
            default:
                break;
        }
        if (!firebase.retrievedResources) {
            firebase.setResouces()
                .then(function () {
                for (var i = 0; i < firebase.getResourceLength(); i++) {
                    _this.resources.push(firebase.resourceArray.getItem(i));
                }
            });
            firebase.retrievedResources = true;
        }
        else {
            for (var i = 0; i < firebase.getResourceLength(); i++) {
                _this.resources.push(firebase.resourceArray.getItem(i));
            }
        }
        return _this;
    }
    resTempViewModel.prototype.onItemTap = function (args) {
        var event = this.resources.getItem(args.index);
        var frame = frame_1.getFrameById('topmost');
        frame.navigate({
            moduleName: "/views/webview/webview",
            context: {
                link: event.link
            }
        });
    };
    resTempViewModel.prototype.goBack = function (args) {
        var button = args.object;
        var page = button.page;
        page.frame.goBack();
    };
    return resTempViewModel;
}(observableModule.Observable));
exports.resTempViewModel = resTempViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzLXRlbXBsYXRlLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXMtdGVtcGxhdGUtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1FQUFzRTtBQUV0RSxtREFBd0Q7QUFDeEQsNEZBQTBGO0FBRzFGLElBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQWUsQ0FBQztBQUV2RTtJQUFzQyxvQ0FBMkI7SUFJN0QsMEJBQVksRUFBVTtRQUF0QixZQUNJLGlCQUFPLFNBc0NWO1FBekNNLGVBQVMsR0FBNEIsSUFBSSxrQ0FBZSxFQUFFLENBQUM7UUFLOUQsUUFBTyxFQUFFLEVBQUU7WUFDUCxLQUFLLEtBQUs7Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDM0IsTUFBTTtZQUNWLEtBQUssS0FBSztnQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMzQixNQUFNO1lBQ1YsS0FBSyxLQUFLO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzNCLE1BQU07WUFDVixLQUFLLFFBQVE7Z0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUM5QixNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTTtTQUNiO1FBRUQsSUFBRyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFDL0I7WUFDSSxRQUFRLENBQUMsV0FBVyxFQUFFO2lCQUNqQixJQUFJLENBQUM7Z0JBQ0YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUNyRDtvQkFDSSxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMxRDtZQUVMLENBQUMsQ0FBQyxDQUFBO1lBQ04sUUFBUSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztTQUN0QzthQUVEO1lBQ0ksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUNyRDtnQkFDSSxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzFEO1NBQ0o7O0lBQ0wsQ0FBQztJQUVNLG9DQUFTLEdBQWhCLFVBQWlCLElBQW1CO1FBRWhDLElBQU0sS0FBSyxHQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUVyRCxJQUFNLEtBQUssR0FBRyxvQkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXRDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDWCxVQUFVLEVBQUUsd0JBQXdCO1lBQ3BDLE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7YUFDbkI7U0FDSixDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0saUNBQU0sR0FBYixVQUFjLElBQUk7UUFFZCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQUFDLEFBbEVELENBQXNDLGdCQUFnQixDQUFDLFVBQVUsR0FrRWhFO0FBbEVZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvYnNlcnZhYmxlTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCIpO1xyXG5pbXBvcnQgeyBMaXN0VmlldywgSXRlbUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlld1wiO1xyXG5pbXBvcnR7IGdldEZyYW1lQnlJZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ZyYW1lXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IG15RmlyZWJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvZmlyZWJhc2VcIjtcclxuXHJcbmNvbnN0IGZpcmViYXNlID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uL3V0aWxzL2ZpcmViYXNlXCIpLkkgYXMgbXlGaXJlYmFzZTtcclxuXHJcbmV4cG9ydCBjbGFzcyByZXNUZW1wVmlld01vZGVsIGV4dGVuZHMgb2JzZXJ2YWJsZU1vZHVsZS5PYnNlcnZhYmxlIHtcclxuXHJcbiAgICBwdWJsaWMgcmVzb3VyY2VzOiBPYnNlcnZhYmxlQXJyYXk8b2JqZWN0PiA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgc3dpdGNoKGlkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJGQVFcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhpcyBpcyBGQVFcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIldTVVwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGlzIFdTVVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQWlkXCI6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRoaXMgaXMgQWlkXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJCcm93c2VcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpcyBCcm93c2VcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZighZmlyZWJhc2UucmV0cmlldmVkUmVzb3VyY2VzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0UmVzb3VjZXMoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciggbGV0IGkgPSAwOyBpIDwgZmlyZWJhc2UuZ2V0UmVzb3VyY2VMZW5ndGgoKTsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNvdXJjZXMucHVzaChmaXJlYmFzZS5yZXNvdXJjZUFycmF5LmdldEl0ZW0oaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBmaXJlYmFzZS5yZXRyaWV2ZWRSZXNvdXJjZXMgPSB0cnVlO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaXJlYmFzZS5nZXRSZXNvdXJjZUxlbmd0aCgpOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzb3VyY2VzLnB1c2goZmlyZWJhc2UucmVzb3VyY2VBcnJheS5nZXRJdGVtKGkpKTsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBvbkl0ZW1UYXAoYXJnczogSXRlbUV2ZW50RGF0YSlcclxuICAgIHtcclxuICAgICAgICBjb25zdCBldmVudDogYW55ID0gdGhpcy5yZXNvdXJjZXMuZ2V0SXRlbShhcmdzLmluZGV4KVxyXG5cclxuICAgICAgICBjb25zdCBmcmFtZSA9IGdldEZyYW1lQnlJZCgndG9wbW9zdCcpO1xyXG5cclxuICAgICAgICBmcmFtZS5uYXZpZ2F0ZSh7XHJcbiAgICAgICAgICAgIG1vZHVsZU5hbWU6IFwiL3ZpZXdzL3dlYnZpZXcvd2Vidmlld1wiLFxyXG4gICAgICAgICAgICBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgICAgICBsaW5rOiBldmVudC5saW5rXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2soYXJncylcclxuICAgIHtcclxuICAgICAgICBjb25zdCBidXR0b24gPSBhcmdzLm9iamVjdDtcclxuICAgICAgICBjb25zdCBwYWdlID0gYnV0dG9uLnBhZ2U7XHJcblxyXG4gICAgICAgIHBhZ2UuZnJhbWUuZ29CYWNrKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiAgICBcclxuIl19