// https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex

const escapeRegExp = (string: string): string =>
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default escapeRegExp;
