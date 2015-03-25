// Copyright (c) 2015 Kevin D. Williams
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var http2 = require('http2');
var http = require('http');
// var request = require('request');
var fs = require('fs');

var args = require('minimist')(
    process.argv.slice(2),
    {default:{'p':443,'h':'127.0.0.1:8080'}});

var cipherSuites = [
    'ECDHE-RSA-AES128-GCM-SHA256',
    'ECDHE-ECDSA-AES128-GCM-SHA256',
    'ECDHE-RSA-AES256-GCM-SHA384',
    'ECDHE-ECDSA-AES256-GCM-SHA384',
    'DHE-RSA-AES128-GCM-SHA256',
    'DHE-DSS-AES128-GCM-SHA256',
    'kEDH+AESGCM',
    'ECDHE-RSA-AES128-SHA256',
    'ECDHE-ECDSA-AES128-SHA256',
    'ECDHE-RSA-AES128-SHA',
    'ECDHE-ECDSA-AES128-SHA',
    'ECDHE-RSA-AES256-SHA384',
    'ECDHE-ECDSA-AES256-SHA384',
    'ECDHE-RSA-AES256-SHA',
    'ECDHE-ECDSA-AES256-SHA',
    'DHE-RSA-AES128-SHA256',
    'DHE-RSA-AES128-SHA',
    'DHE-DSS-AES128-SHA256',
    'DHE-RSA-AES256-SHA256',
    'DHE-DSS-AES256-SHA',
    'DHE-RSA-AES256-SHA',
    '!aNULL',
    '!eNULL',
    '!EXPORT',
    '!DES',
    '!RC4',
    '!3DES',
    '!MD5',
    '!PSK'
].join(':');

// not including http/1.0
var supportedProtocols = [http2.protocol.VERSION, 'http/1.1'];


var options = {
    key: fs.readFileSync(args.k),
    cert: fs.readFileSync(args.c),
    ciphers: cipherSuites,
    ALPNProtocols: supportedProtocols,
    NPNProtocols: supportedProtocols,
    honorCipherOrder: true
};

http2.createServer(options, function(req, resp){
    var newReq = http.request('http://' + args.h + req.url, function(newResp){
        var headers = newResp.headers;
        delete headers['connection'];
        resp.writeHead(newResp.statusCode, headers);
        newResp.pipe(resp);
    })
    req.pipe(newReq);
    // req.pipe(request('http://' + args.h + req.url)).pipe(resp);
}).listen(args.p, '0.0.0.0');
