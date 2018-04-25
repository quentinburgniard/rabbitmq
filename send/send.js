#!/usr/bin/env node
var amqp = require('amqplib/callback_api');
amqp.connect('amqp://0.0.0.0', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'url';

    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q, new Buffer('https://medium.com/personal-growth/a-quick-beginners-guide-to-drawing-58213877715e'));
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
