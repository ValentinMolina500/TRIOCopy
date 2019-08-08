"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var imageViewModel = /** @class */ (function (_super) {
    __extends(imageViewModel, _super);
    function imageViewModel(image) {
        var _this = _super.call(this) || this;
        _this.set("image", image);
        return _this;
    }
    imageViewModel.prototype.goBack = function (args) {
        var page = args.object.page;
        page.frame.goBack();
    };
    return imageViewModel;
}(observable_1.Observable));
exports.imageViewModel = imageViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2Utdmlldy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltYWdlLXZpZXctbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrREFBOEQ7QUFHOUQ7SUFBb0Msa0NBQVU7SUFDMUMsd0JBQVksS0FBSztRQUFqQixZQUNJLGlCQUFPLFNBRVY7UUFERyxLQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQzs7SUFDN0IsQ0FBQztJQUVNLCtCQUFNLEdBQWIsVUFBYyxJQUFJO1FBQ2QsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBWEQsQ0FBb0MsdUJBQVUsR0FXN0M7QUFYWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBpbWFnZVZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xyXG4gICAgY29uc3RydWN0b3IoaW1hZ2UpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0KFwiaW1hZ2VcIiwgaW1hZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb0JhY2soYXJncykge1xyXG4gICAgICAgIGxldCBwYWdlOiBQYWdlID0gYXJncy5vYmplY3QucGFnZTtcclxuXHJcbiAgICAgICAgcGFnZS5mcmFtZS5nb0JhY2soKTtcclxuICAgIH1cclxufSJdfQ==