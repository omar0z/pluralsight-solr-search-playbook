"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var FoamTreeClusteringComponent = (function () {
    function FoamTreeClusteringComponent() {
    }
    FoamTreeClusteringComponent.prototype.ngInit = function () {
        this.foamtree = new CarrotSearchFoamTree({
            id: 'foamtree',
            dataObject: this.clusters
        });
    };
    __decorate([
        core_1.Input()
    ], FoamTreeClusteringComponent.prototype, "clusters", void 0);
    FoamTreeClusteringComponent = __decorate([
        core_1.Component({
            selector: '[carrot]',
            templateUrl: './foamtree.component.html',
            styleUrls: ['./dashboard-page.component.css']
        })
    ], FoamTreeClusteringComponent);
    return FoamTreeClusteringComponent;
}());
exports.FoamTreeClusteringComponent = FoamTreeClusteringComponent;
//# sourceMappingURL=foamtree.component.js.map