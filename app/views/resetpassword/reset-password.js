"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resetViewModel = require("./reset-view-model");
function onLoaded(args) {
    var page = args.object;
    page.bindingContext = new resetViewModel.resetViewModel();
}
exports.onLoaded = onLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQtcGFzc3dvcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNldC1wYXNzd29yZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFzRDtBQUV0RCxTQUFnQixRQUFRLENBQUMsSUFBSTtJQUN6QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDOUQsQ0FBQztBQUhELDRCQUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlc2V0Vmlld01vZGVsID0gcmVxdWlyZSgnLi9yZXNldC12aWV3LW1vZGVsJyk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25Mb2FkZWQoYXJncykge1xyXG4gICAgY29uc3QgcGFnZSA9IGFyZ3Mub2JqZWN0O1xyXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IG5ldyByZXNldFZpZXdNb2RlbC5yZXNldFZpZXdNb2RlbCgpO1xyXG59XHJcblxyXG4iXX0=