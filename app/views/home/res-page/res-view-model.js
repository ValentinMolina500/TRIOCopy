"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observableModule = require("tns-core-modules/data/observable");
var resViewModel = /** @class */ (function (_super) {
    __extends(resViewModel, _super);
    function resViewModel() {
        return _super.call(this) || this;
    }
    resViewModel.prototype.onQATap = function (args) {
        var tap = args.object;
        tap.page.frame.navigate({
            moduleName: "/views/home/res-page/res-template/res-template",
            context: {
                id: tap.id
            }
        });
    };
    return resViewModel;
}(observableModule.Observable));
exports.resViewModel = resViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzLXZpZXctbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXMtdmlldy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1FQUFzRTtBQUd0RTtJQUFrQyxnQ0FBMkI7SUFDekQ7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUFFTSw4QkFBTyxHQUFkLFVBQWUsSUFBSTtRQUNmLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFjLENBQUM7UUFFOUIsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQ3BCLFVBQVUsRUFBRSxnREFBZ0Q7WUFDNUQsT0FBTyxFQUFFO2dCQUNMLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRTthQUNiO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQWZELENBQWtDLGdCQUFnQixDQUFDLFVBQVUsR0FlNUQ7QUFmWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvYnNlcnZhYmxlTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCIpO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIHJlc1ZpZXdNb2RlbCBleHRlbmRzIG9ic2VydmFibGVNb2R1bGUuT2JzZXJ2YWJsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblFBVGFwKGFyZ3MpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdGFwID0gYXJncy5vYmplY3QgYXMgUGFnZTtcclxuXHJcbiAgICAgICAgdGFwLnBhZ2UuZnJhbWUubmF2aWdhdGUoe1xyXG4gICAgICAgICAgICBtb2R1bGVOYW1lOiBcIi92aWV3cy9ob21lL3Jlcy1wYWdlL3Jlcy10ZW1wbGF0ZS9yZXMtdGVtcGxhdGVcIixcclxuICAgICAgICAgICAgY29udGV4dDoge1xyXG4gICAgICAgICAgICAgICAgaWQ6IHRhcC5pZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=