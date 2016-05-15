const express = require('express');
const winston = require('winston');
const helmet = require('helmet');
const request = require('request');
const cheerio = require('cheerio');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 8081;

app.use(helmet());
app.listen(PORT, (err) => {
  if (err) {
    winston.error(err);
    return;
  }

  winston.info(`Listening on port ${PORT}`);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/image', function(req, res) {
  var url = req.query.url;

  var callback = function(response) {
    if (response.statusCode === 200) {
      res.writeHead(200, {
        'Content-Type': response.headers['content-type']
      });
      response.pipe(res);
    } else {
      res.writeHead(response.statusCode);
      res.end();
    }
  };

  http.get(url, callback).end();
});
