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

### Group by and sum by column

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
