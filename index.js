var selector = require('defunct/selector');

exports.sum = sum;
function sum(selectorExpr) {
  var locator = selector(selectorExpr);
  return function (acc, data) {
    acc = acc || 0;
    var val = locator(data);
    if (typeof val === 'number') {
      acc += val;
    }
    return acc;
  };
}
