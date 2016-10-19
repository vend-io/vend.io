import * as chalk from 'chalk';
import * as _ from 'lodash';

export const terminal = _.cloneDeep(console);

terminal.log = function log() {
  const bracket = /\[[\s\S]*\]/g, parenthesis = /\([\s\S]*\)/g;
  const matchBracket = (x: string) =>
    x.match(bracket) ? chalk.blue(bracket.exec(x)[0]) : x;
  const matchParenthesis = (x: string) =>
    x.match(parenthesis) ? chalk.green(parenthesis.exec(x)[0]) : x;

  const args = _.map(arguments, (value: string) => {
    return value
      .replace('enter', chalk.magenta('enter'))
      .replace('leave', chalk.yellow('leave'))
      .replace('evaluate', chalk.cyan('evaluate'))
      .split(' ')
      .map(s => {
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
