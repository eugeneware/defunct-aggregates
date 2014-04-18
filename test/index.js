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
    .pipe(sl.aggregate('properties.$initial_referring_domain', dagg.sum('properties.time')))
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
