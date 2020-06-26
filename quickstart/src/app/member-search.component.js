"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var member_search_service_1 = require("./member-search.service");
var MemberSearchComponent = (function () {
    function MemberSearchComponent(memberSearchService, router) {
        this.memberSearchService = memberSearchService;
        this.router = router;
        this.searchTerms = new Subject_1.Subject();
    }
    MemberSearchComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    MemberSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.members = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(function (term) {
            return term
                ? _this.memberSearchService.search(term)
                : Observable_1.Observable.of([]);
        })
            .catch(function (error) {
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    MemberSearchComponent.prototype.gotoDetail = function (member) {
        var link = ['detail', member.id];
        this.router.navigate(link);
    };
    return MemberSearchComponent;
}());
MemberSearchComponent = __decorate([
    core_1.Component({
        selector: 'member-search',
        templateUrl: './member-search.component.html',
        styleUrls: ['./member-search.component.css'],
        providers: [member_search_service_1.MemberSearchService],
    }),
    __metadata("design:paramtypes", [member_search_service_1.MemberSearchService,
        router_1.Router])
], MemberSearchComponent);
exports.MemberSearchComponent = MemberSearchComponent;
//# sourceMappingURL=member-search.component.js.map