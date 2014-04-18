var redtape = require('redtape'),
    path = require('path'),
    fs = require('fs'),
    sl = require('streamlined'),
    JSONStream = require('JSONStream'),
    dagg = require('..');

var it = redtape({
  beforeEach: function (cb) {
    var events =
      fs.createReadStream(path.join(__dirname, 'fixtures', 'events.json'))
      .pipe(JSONStream.parse());
    cb(null, events);
  }
});

it('should be able to sum things', 1, function(t, events) {
  events
    .pipe(sl.aggregate('properties.$initial_referring_domain',
      dagg.sum('properties.time')))
    .on('data', function (data) {
      var expected = {
        '$direct': 2465011296034,
        'www.something.com': 8374730552,
        'mail.qq.com': 18145722876,
        'cwebmail.mail.163.com': 2791450358,
        'm.email.seznam.cz': 4187199003,
        undefined: 2791546093,
        'm.facebook.com': 2791563670,
        'www.google.co.uk': 2791596886,
        'nm20.abv.bg': 2791603002,
        'www.google.com': 18146059483,
        'webmailb.netzero.net': 13958396912,
        'webmail.kitchenrefacers.ca': 4187590206,
        'www.ekit.com': 2791762707,
        'webmail.myway.com': 13958909358,
        'poczta.wp.pl': 2791781736 };
      t.deepEquals(data, expected, 'sum of times by referring domain');
    })
    .on('end', function () {
      t.end();
    });
});

it('should be able to average things', 1, function(t, events) {
  events
    .pipe(sl.aggregate('properties.$initial_referring_domain',
      dagg.avg('properties.time')))
    .on('data', function (data) {
      var expected = {
        '$direct': 1395816762.1741023,
        'www.something.com': 1395792122.3065798,
        'mail.qq.com': 1395808558.685697,
        'cwebmail.mail.163.com': 1395719382.9555554,
        'm.email.seznam.cz': 1395722009.2992127,
        undefined: 1395731044,
        'm.facebook.com': 1395742777.6879845,
        'www.google.co.uk': 1395750843.6849759,
        'nm20.abv.bg': 1395753471.0198777,
        'www.google.com': 1395814767.0117123,
        'webmailb.netzero.net': 1395784809.0298629,
        'webmail.kitchenrefacers.ca': 1395790448.8373983,
        'www.ekit.com': 1395794118.8418078,
        'webmail.myway.com': 1395802863.8613608,
        'poczta.wp.pl': 1395800479.640079 };
      t.deepEquals(data, expected, 'average of times by referring domain');
    })
    .on('end', function () {
      t.end();
    });
});

it('should be able to find the maximum of things', 1, function(t, events) {
  events
    .pipe(sl.aggregate('properties.$initial_referring_domain',
      dagg.max('properties.time')))
    .on('data', function (data) {
      var expected = {
        '$direct': 1395896611,
        'www.something.com': 1395871232,
        'mail.qq.com': 1395893241,
        'cwebmail.mail.163.com': 1395725179,
        'm.email.seznam.cz': 1395733001,
        undefined: 1395773053,
        'm.facebook.com': 1395781835,
        'www.google.co.uk': 1395798443,
        'nm20.abv.bg': 1395801501,
        'www.google.com': 1395895873,
        'webmailb.netzero.net': 1395839884,
        'webmail.kitchenrefacers.ca': 1395863906,
        'www.ekit.com': 1395881354,
        'webmail.myway.com': 1395891210,
        'poczta.wp.pl': 1395890868 };
      t.deepEquals(data, expected, 'max of times by referring domain');
    })
    .on('end', function () {
      t.end();
    });
});

it('should be able to find the minimum of things', 1, function(t, events) {
  events
    .pipe(sl.aggregate('properties.$initial_referring_domain',
      dagg.min('properties.time')))
    .on('data', function (data) {
      var expected = {
        '$direct': 1395714685,
        'www.something.com': 1395718749,
        'mail.qq.com': 1395720281,
        'cwebmail.mail.163.com': 1395725179,
        'm.email.seznam.cz': 1395733001,
        undefined: 1395773040,
        'm.facebook.com': 1395781835,
        'www.google.co.uk': 1395798443,
        'nm20.abv.bg': 1395801501,
        'www.google.com': 1395836355,
        'webmailb.netzero.net': 1395839062,
        'webmail.kitchenrefacers.ca': 1395863150,
        'www.ekit.com': 1395881353,
        'webmail.myway.com': 1395890232,
        'poczta.wp.pl': 1395890868 };
      t.deepEquals(data, expected, 'min of times by referring domain');
    })
    .on('end', function () {
      t.end();
    });
});

it('should be able to find the count of things', 1, function(t, events) {
  events
    .pipe(sl.aggregate('properties.$initial_referring_domain',
      dagg.count('properties.time')))
    .on('data', function (data) {
      var expected = {
        '$direct': 1766,
        'www.something.com': 6,
        'mail.qq.com': 13,
        'cwebmail.mail.163.com': 2,
        'm.email.seznam.cz': 3,
        undefined: 2,
        'm.facebook.com': 2,
        'www.google.co.uk': 2,
        'nm20.abv.bg': 2,
        'www.google.com': 13,
        'webmailb.netzero.net': 10,
        'webmail.kitchenrefacers.ca': 3,
        'www.ekit.com': 2,
        'webmail.myway.com': 10,
        'poczta.wp.pl': 2 };
      t.deepEquals(data, expected, 'count of times by referring domain');
    })
    .on('end', function () {
      t.end();
    });
});

it('should be able to collect values', 1, function(t, events) {
  events
    .pipe(sl.aggregate('properties.$initial_referring_domain',
      dagg.collect('properties.comment'), true))
    .on('data', function (data) {
      var expected = require('./fixtures/comments.js');
      t.deepEquals(data, expected, 'comments by domain');
    })
    .on('end', function () {
      t.end();
    });
});

it('should be able to produce a marketing funnel', 1, function(t, events) {
  events
    .pipe(sl.aggregate('event',
      dagg.funnel('properties.distinct_id',
        ['Viewed Sales Page',
         'Clicked Add To Cart',
         'Viewed Beta Invite',
         'Submitted Beta Survey']), true))
    .on('data', function (data) {
      var expected = {
        'Viewed Sales Page': 399,
        'Clicked Add To Cart': 36,
        'Viewed Beta Invite': 36,
        'Submitted Beta Survey': 28 };
      t.deepEquals(data, expected, 'correct funnel metrics');
    })
    .on('end', function () {
      t.end();
    });
});
