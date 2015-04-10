# cache-header-control
Control the response cache header

## Install

```
npm install cache-header-control --save
```

## Usage

```js
var express = require('express');
var setCacheHeader = require('cache-header-control');

var app = express();

app.use(function (req, res, next) {
  // Sets `Cache-Control` header to `public, max-age=600` and `Expires` too
  // 'minute' -> 10 minutes -> 600 seconds
  setCacheHeader(res, 'minute');
  next();
});

app.listen(3000, function () {
  
});
```

### setCacheHeader(responseObject, timeValue)

* `responseObject` - the response object passed through by Node
* `timeValue` - the `max-age`, `Expires` value to set the headers. Can be the following types:
  * `false`|`undefined`|`null`|`''`|`0`|negative number:`-2`,`'-3'` - sets value to `no-cache, no-store, must-revalidate`
  * `number` - a number or a string can be parse to a number. Sets the `Cache-Control` header to `public, max-age={number}` and `Expires` header to `{number}`
  * `string` can be:
  	* `'minute'` - 600(10 minutes)
  	* `'hour'` - 3600(1 hour)
  	* `'day'` - 86400(1 day)

## Run Tests

```
npm install
npm test
```

