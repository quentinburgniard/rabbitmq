#!/usr/bin/env node
var amqp = require('amqplib/callback_api');
amqp.connect('amqp://0.0.0.0', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'url';

    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q, new Buffer('https://medium.com/netflix-techblog/titus-the-netflix-container-management-platform-is-now-open-source-f868c9fb5436'));
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
