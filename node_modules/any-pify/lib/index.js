const pify = require('pify');
const P = require('any-promise');

module.exports = (fn, ops) => pify(fn, P, ops);
