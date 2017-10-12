"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var DashboardPageComponent = (function () {
    function DashboardPageComponent(service) {
        this.service = service;
        this.documents = new Array();
        this.clusters = new Array();
        this.queryString = "";
    }
    DashboardPageComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    DashboardPageComponent.prototype.getData = function () {
        var _this = this;
        console.log(this.queryString);
        this.service.getData(this.queryString).subscribe(function (result) {
            var object = result.json();
            _this.documents = object.response.docs;
            _this.clusters = object.clusters;
            console.log(_this.clusters);
        });
    };
    DashboardPageComponent = __decorate([
        core_1.Component({
            selector: 'dashboard-page',
            templateUrl: './dashboard-page.component.html',
            styleUrls: ['./dashboard-page.component.css']
        })
    ], DashboardPageComponent);
    return DashboardPageComponent;
}());
exports.DashboardPageComponent = DashboardPageComponent;
//# sourceMappingURL=dashboard-page.component.js.map