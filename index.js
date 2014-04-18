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

exports.max = max;
function max(selectorExpr) {
  var locator = selector(selectorExpr);
  return function (acc, data) {
    var val = locator(data);
    if (typeof val === 'number') {
      acc = acc || val;
      acc = Math.max(acc, val);
    }
    return acc;
  };
}

exports.min = min;
function min(selectorExpr) {
  var locator = selector(selectorExpr);
  return function (acc, data) {
    var val = locator(data);
    if (typeof val === 'number') {
      acc = acc || val;
      acc = Math.min(acc, val);
    }
    return acc;
  };
}

exports.count = count;
function count(selectorExpr) {
  var locator = selector(selectorExpr);
  return function (acc, data) {
    acc = acc || 0;
    var val = locator(data);
    if (typeof val !== 'undefined') {
      acc++;
    }
    return acc;
  };
}

exports.avg = avg;
function avg(selectorExpr) {
  var locator = selector(selectorExpr);
  var count = 0;
  var sum = 0;
  return function (acc, data) {
    acc = acc || 0;
    var val = locator(data);
    if (typeof val === 'number') {
      count++;
      sum += val;
      acc = sum / count;
    }
    return acc;
  };
}

exports.first = first;
function first(selectorExpr) {
  var locator = selector(selectorExpr);
  var _first;
  return function (acc, data) {
    var val = locator(data);
    if (typeof val !== 'undefined' && typeof _first === 'undefined') {
      _first  = val;
    }
    acc = _first;
    return acc;
  };
}

exports.last = last;
function last(selectorExpr) {
  var _last;
  var locator = selector(selectorExpr);
  return function (acc, data) {
    var val = locator(data);
    if (typeof val !== 'undefined') {
      _last = val;
    }
    return _last;
  };
}

exports.collect = collect;
function collect(selectorExpr) {
  var locator = selector(selectorExpr);
  return function (acc, data) {
    var val = locator(data);
    if (typeof val !== 'undefined') {
      acc = acc || [];
      acc.push(val);
    }
    return acc;
  };
}

exports.funnel = funnel;
function funnel(userSelector, events) {
  var userLocator = selector(userSelector);
  var users = {}
  return function (acc, data, evt) {
    var userId = userLocator(data);
    users[userId] = users[userId] || 0;
    var funnelEvent = events.indexOf(evt);

    if (funnelEvent !== -1) {
      // if event is in right order then increment stats
      if (funnelEvent === users[userId]) {
        acc = acc || 0;
        users[userId] = funnelEvent + 1;
        acc++;
      }
    }

    return acc;
  }
}
