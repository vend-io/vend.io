"use strict";
var chalk = require('chalk');
var _ = require('lodash');
exports.terminal = _.cloneDeep(console);
exports.terminal.log = function log() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUMvQixJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUVmLGdCQUFRLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUU3QyxnQkFBUSxDQUFDLEdBQUcsR0FBRztJQUNiLElBQU0sT0FBTyxHQUFHLGNBQWMsRUFBRSxXQUFXLEdBQUcsY0FBYyxDQUFDO0lBQzdELElBQU0sWUFBWSxHQUFHLFVBQUMsQ0FBUztRQUM3QixPQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUFyRCxDQUFxRCxDQUFDO0lBQ3hELElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxDQUFTO1FBQ2pDLE9BQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQTlELENBQThELENBQUM7SUFFakUsSUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBQyxLQUFhO1FBQzFDLE1BQU0sQ0FBQyxLQUFLO2FBQ1QsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3hDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN2QyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDM0MsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLEdBQUcsQ0FBQyxVQUFBLENBQUM7WUFDSixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLENBQUM7cUJBQ0wsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixHQUFHLENBQUMsWUFBWSxDQUFDO3FCQUNqQixHQUFHLENBQUMsZ0JBQWdCLENBQUM7cUJBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNmLENBQUM7WUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUNULE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQyJ9