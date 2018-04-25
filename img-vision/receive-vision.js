#!/usr/bin/env node
var amqp = require('amqplib/callback_api');
amqp.connect('amqp://0.0.0.0', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'url';

    ch.assertQueue(q, {durable: false});
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});
