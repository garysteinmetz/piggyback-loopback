//console.log("What's up?");
var https = require('https');
var pem = require('pem');
//var JsonCircular = require('json-circular');

var processIncomingRequest = function(req, res) {
  //https://stackoverflow.com/questions/17251553/node-js-request-object-documentation
  var headers = req.headers;
  var method = req.method;
  var url = req.url;
  var body = "";
  req.on('data', function(chunk) {
    body += chunk;
  });
  req.on('end', function() {
    var reqOptions= {};
    reqOptions.hostname = "10.10.10.10";
    reqOptions.method = method;
    reqOptions.post = 443;
    reqOptions.path = url;
    reqOptions.headers = {};
    reqOptions.rejectUnauthorized = false;
    for (var nextHeader in headers) {
      reqOptions.headers[nextHeader] = headers[nextHeader];
    }
    //console.log('[' + url + ', METHOD = ' + method + ', BODY_LENGTH = ' + body.length + ']');
    var innerRequest = https.request(
      reqOptions,
      function(innerResponse) {
        res.statusCode = innerResponse.statusCode;
        //
        for (var nextHeader in innerResponse.headers) {
          //console.log('res = ' + res);
          //console.log('innerResponse = ' + innerResponse);
          //console.log('res.headers = ' + res.headers);
          //console.log('innerResponse.headers = ' + innerResponse.headers);
          //console.log('nextHeader = ' + nextHeader);
          //console.log('  [' + nextHeader + '] = ' + innerResponse.headers[nextHeader]);
          res.setHeader(nextHeader, innerResponse.headers[nextHeader]);
          //console.log('AfterSetHeader');
        }
        //console.log('STATUS = ' + innerResponse.statusCode);
        var innerResponseBody = "";
        innerResponse.on('data', function(chunk) {
          innerResponseBody += chunk;
        });
        innerResponse.on('end', function() {
          res.end(innerResponseBody);
        });
      });
    innerRequest.end(body);
    //console.log('body: ' + body);
    //var jsonObj = JSON.parse(body);
    //console.log(jsonObj.$key);
  });
  //console.log(Object.keys(req));
  //console.log('req.url = ' + req.url);
  //console.log('req.method = ' + req.method);
  //console.log('req.headers = ' + JSON.stringify(req.headers));
  //console.log('req.read = ' + req.read);
  //console.log(Object.keys(req.connection));
  //console.log('req.connection.read = ' + req.connection.read);
  //console.log('req.on = ' + req.on);
};

pem.createCertificate(
  {days:1, selfSigned:true},
  function(err, keys) {
    https.createServer(
      {key: keys.serviceKey, cert: keys.certificate},
      function(req, res) {
        processIncomingRequest(req, res);
      }
    ).listen(443);
  });
