"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCounter = addCounter;
var counter = exports.counter = 3;
function addCounter() {
  exports.counter = counter += 1;
}