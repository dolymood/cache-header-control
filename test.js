var setCacheHeader = require('./index.js');
var express = require('express');
var request = require('supertest');

describe('Control the response cache header', function () {
  
  it('set to no-cache if passed the value ""', function (done) {
    
    var app = express();
    
    app.use(function (req, res ,next) {
      setCacheHeader(res);
      next();
    });
    
    request(app)
      .get('/')
      .expect('cache-control', 'no-cache, no-store, must-revalidate')
      .expect('Expires', '0')
      .expect('Pragma', 'no-cache')
      .end(done);
  });

  it('set to no-cache if passed the value "false"', function (done) {
    
    var app = express();
    
    app.use(function (req, res ,next) {
      setCacheHeader(res, false);
      next();
    });
    
    request(app)
      .get('/')
      .expect('cache-control', 'no-cache, no-store, must-revalidate')
      .expect('Expires', '0')
      .expect('Pragma', 'no-cache')
      .end(done);
  });
  
  it('set to a max-age if passed a number value', function (done) {
    
    var app = express();
    
    app.use(function (req, res ,next) {
      setCacheHeader(res, 500);
      next();
    });
    
    request(app)
      .get('/')
      .expect('cache-control', 'public, max-age=500')
      .end(done);
  });
  
  it('set to a max-age if passed a string value that can be parsed to to a number', function (done) {
    
    var app = express();
    
    app.use(function (req, res ,next) {
      setCacheHeader(res, '500');
      next();
    });
    
    request(app)
      .get('/')
      .expect('cache-control', 'public, max-age=500')
      .end(done);
  });
  
  it('set to a max-age if passed the value "minute"', function (done) {
    
    var app = express();
    
    app.use(function (req, res ,next) {
      setCacheHeader(res, 'minute');
      next();
    });
    
    request(app)
      .get('/')
      .expect('cache-control', 'public, max-age=600')
      .end(done);
  });
  
  it('set to a max-age if passed the value "day"', function (done) {
    
    var app = express();
    
    app.use(function (req, res ,next) {
      setCacheHeader(res, 'day');
      next();
    });
    
    request(app)
      .get('/')
      .expect('cache-control', 'public, max-age=86400')
      .end(done);
  });

});