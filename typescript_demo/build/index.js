"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var addTwoNumbers = function (a, b) { return a + b; };
// TypeScript allows your autocomplete in your IDE to be on steroids.
// console.log(addTwoNumbers(1, 1));
var students = ['Patricia', 'Yahya', 'Levi', 'Chris'];
var studentAttendance = students.reduce(function (classList, student) {
    var _a;
    return __assign(__assign({}, classList), (_a = {}, _a[student] = 0, _a));
}, {});
var Stonks = /** @class */ (function () {
    function Stonks() {
        this.value = 0;
    }
    Stonks.prototype.goUp = function () {
        ++this.value;
    };
    Stonks.prototype.readValue = function () {
        return this.value;
    };
    return Stonks;
}());
// const wallStreet = new Stonks();
//
// wallStreet.goUp();
// console.log(wallStreet.readValue());
var Tesla = /** @class */ (function (_super) {
    __extends(Tesla, _super);
    function Tesla() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tesla.prototype.tweet = function () {
        this.value *= Math.ceil(Math.random() * 10);
    };
    return Tesla;
}(Stonks));
var teslaTicker = new Tesla();
teslaTicker.goUp();
teslaTicker.tweet();
console.log(teslaTicker.readValue());
