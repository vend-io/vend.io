"use strict";
var chalk = require("chalk");
var _ = require("lodash");
exports.logger = _.cloneDeep(console);
exports.logger.log = function log() {
    var bracket = /\[[\s\S]*\]/g, parenthesis = /\([\s\S]*\)/g;
    var matchBracket = function (x) {
        return x.match(bracket) ? chalk.blue(bracket.exec(x)[0]) : x;
    };
    var matchParenthesis = function (x) {
        return x.match(parenthesis) ? chalk.green(parenthesis.exec(x)[0]) : x;
    };
    var args = _.map(arguments, function (value) {
        return value
            .replace('enter', chalk.magenta('enter'))
            .replace('leave', chalk.yellow('leave'))
            .replace('evaluate', chalk.cyan('evaluate'))
            .split(' ')
            .map(function (s) {
            if (s.indexOf('.')) {
                return s
                    .split('.')
                    .map(matchBracket)
                    .map(matchParenthesis)
                    .join('.');
            }
            return s;
        })
            .join(' ')
            .replace(/[.]/g, chalk.magenta('->'));
    });
    console.log.apply(console, args);
};
