# defunct-aggregates

Aggregate operations for object-mode streams

[![build status](https://secure.travis-ci.org/eugeneware/defunct-aggregates.png)](http://travis-ci.org/eugeneware/defunct-aggregates)

## Installation

This module is installed via npm:

``` bash
$ npm install defunct-aggregates
```

## Example Usage

These functions are helper functions that work well with
[streamlined](https://github.com/eugeneware/streamlined), and provide ways to
`sum`, `count`, `max` etc, as you might in SQL, but with object streams!

### Group by and SUM by column

``` js
var dagg = require('defunct-aggregates'),
    sl = require('streamlined');
myObjectStream()
  .pipe(sl.aggregate('properties.$initial_referring_domain', dagg.sum('properties.time')))
  .on('data', function (data) {
    console.log(data);
    /*
       {
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
        'poczta.wp.pl': 2791781736 }
     */
  });
```

### Group by and AVERAGE by column

``` js
var dagg = require('defunct-aggregates'),
    sl = require('streamlined');
myObjectStream()
  .pipe(sl.aggregate('properties.$initial_referring_domain', dagg.avg('properties.time')))
  .on('data', function (data) {
    console.log(data);
    /*
      {
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
        'poczta.wp.pl': 1395800479.640079 }
     */
  });
```

### Group by and MAX by column

``` js
var dagg = require('defunct-aggregates'),
    sl = require('streamlined');
myObjectStream()
  .pipe(sl.aggregate('properties.$initial_referring_domain', dagg.max('properties.time')))
  .on('data', function (data) {
    console.log(data);
    /*
      {
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
        'poczta.wp.pl': 1395890868 }
     */
  });
```

### Group by and MIN by column

``` js
var dagg = require('defunct-aggregates'),
    sl = require('streamlined');
myObjectStream()
  .pipe(sl.aggregate('properties.$initial_referring_domain', dagg.min('properties.time')))
  .on('data', function (data) {
    console.log(data);
    /*
     {
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
        'poczta.wp.pl': 1395890868 }
     */
  });
```

### Group by and COUNT by column

``` js
var dagg = require('defunct-aggregates'),
    sl = require('streamlined');
myObjectStream()
  .pipe(sl.aggregate('properties.$initial_referring_domain', dagg.count('properties.time')))
  .on('data', function (data) {
    console.log(data);
    /*
    {
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
        'poczta.wp.pl': 2 }
     */
  });
```

### Group by and find the FIRST item by column

``` js
var dagg = require('defunct-aggregates'),
    sl = require('streamlined');
myObjectStream()
  .pipe(sl.aggregate('properties.$initial_referring_domain', dagg.first('properties.time')))
  .on('data', function (data) {
    console.log(data);
    /*
     {
        '$direct': 1395714685,
        'www.something.com': 1395714685,
        'mail.qq.com': 1395714685,
        'cwebmail.mail.163.com': 1395714685,
        'm.email.seznam.cz': 1395714685,
        undefined: 1395714685,
        'm.facebook.com': 1395714685,
        'www.google.co.uk': 1395714685,
        'nm20.abv.bg': 1395714685,
        'www.google.com': 1395714685,
        'webmailb.netzero.net': 1395714685,
        'webmail.kitchenrefacers.ca': 1395714685,
        'www.ekit.com': 1395714685,
        'webmail.myway.com': 1395714685,
        'poczta.wp.pl': 1395714685 }
     */
  });
```

### Group by and find the LAST item by column

``` js
var dagg = require('defunct-aggregates'),
    sl = require('streamlined');
myObjectStream()
  .pipe(sl.aggregate('properties.$initial_referring_domain', dagg.last('properties.time')))
  .on('data', function (data) {
    console.log(data);
    /*
    {
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
        'poczta.wp.pl': 1395890868 }
     */
  });
```

### Group by and collect an array of properties for each column

The following query will collect all the comments together as an array for
each initial referring domain:

``` js
var dagg = require('defunct-aggregates'),
    sl = require('streamlined');
myObjectStream()
    .pipe(sl.aggregate('properties.$initial_referring_domain',
      dagg.collect('properties.comment'), true))
  .on('data', function (data) {
    console.log(data);
    /*
   { '$direct':
       [ 'Log this sucker',
         'It\'s awesome!',
         'A brand new comment!' ],
      'www.facebook.com':
         [ 'Without even testing it I can see that this is an exceptional product and the idea of combining sales copy with video in one product is epic. This would definitely enhance the marketing efforts of struggling website marketers like myself who has tried a l',
         'I saw there were 4 script options 1) book, 2) software 3) coaching and something else.\n\nWhat if my product doesn\'t fit into any of those categories?\n\nNext point: once I write a script once with Something, why do I need Something again if the script is going to fo' ],
      'webmail.myway.com': [ 'Excited to see what it can do. This is definitely an awesome game-changer in design! Thank you for this opportunity...' ] }
     */
  });
```

### Calculate a marketing funnel

Given a stream of events, you can easily calculate marketing funnel metrics.

You just need to provide the path to the event name field, the path to a
property used to identify your users, and then a list of events that you wish
all your users to go through.

Counts will only be given if the user has gone through previous steps in the
funnel.

``` js
var dagg = require('defunct-aggregates'),
    sl = require('streamlined');
myObjectStream()
  .pipe(sl.aggregate('event',             // the event name
    dagg.funnel('properties.distinct_id', // the user id to link events
      // array of event names for the funnel
      ['Viewed Sales Page',
       'Clicked Add To Cart',
       'Viewed Beta Invite',
       'Submitted Beta Survey']), true))
  .on('data', function (data) {
    console.log(data);
    /*
      {
        'Viewed Sales Page': 399,
        'Clicked Add To Cart': 36,
        'Viewed Beta Invite': 36,
        'Submitted Beta Survey': 28 }
     */
  });
```
