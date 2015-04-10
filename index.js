// Control the response cache header

module.exports = function(res, time) {
  console.log(res.setHeader, time);
  if (!time || (0 - time > 0)) {
    return setHeaders(res, {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': 0
    });
  }
  if (!Number(time)) {
    switch (time) {
      case 'minute':// 10 minutes
        time = 600;
        break;
      case 'hour':
        time = 3600;
        break;
      case 'day':
        time = 86400;
        break;
      default:
        time = 86400; // default one day
    }
  } else {
    time = time - 0;
  }
  var now = new Date();
  var today = now.toGMTString();
  now.setTime(now.getTime() + time * 1000);
  var expires = now.toGMTString();

  setHeaders(res, {
    'Cache-Control': 'public, max-age=' + time,
    'Last-Modified': today,
    'Expires': expires
  });

};

function setHeaders(res, obj) {
  for (var k in obj) {
    res.setHeader(k, obj[k]);
  }
}