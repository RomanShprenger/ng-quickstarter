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
var translate_1 = require("../../translate");
var HeaderComponent = (function () {
    function HeaderComponent(_translate) {
        this._translate = _translate;
    }
    HeaderComponent.prototype.selectLang = function (lang) {
        // set default;
        this._translate.use(lang);
        this.refreshText();
    };
    HeaderComponent.prototype.refreshText = function () {
        this.translatedText = this._translate.instant('m_search');
        this.translatedText = this._translate.instant('m_editions');
        this.translatedText = this._translate.instant('m_categories');
        this.translatedText = this._translate.instant('m_about_us');
        this.translatedText = this._translate.instant('m_contacts');
    };
    HeaderComponent.prototype.ngOnInit = function () {
        // standing data
        this.supportedLangs = [
            { display: 'English', value: 'en' },
            { display: 'Русский', value: 'ru' }
        ];
        this.selectLang('en');
    };
    HeaderComponent.prototype.onChange = function (value) {
        this.selectLang(value);
    };
    HeaderComponent.prototype.navbarCollapse = function (event) {
        if (event.target.parentElement.className == 'navbar-brand') {
            if (!$('#menu').hasClass('collapse')) {
                $('#menu').toggleClass('collapse');
            }
        }
        else {
            $('#menu').toggleClass('collapse');
        }
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'awd-header',
        templateUrl: './app/components/header/header.component.html',
        styles: [require('./header.component.styl')],
    }),
    __metadata("design:paramtypes", [translate_1.TranslateService])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map