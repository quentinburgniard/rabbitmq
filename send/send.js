#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
// connection cluster RabbitMQ
amqp.connect('amqp://0.0.0.0', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'url';

    // créer la file d'attente si elle n'existe pas
    ch.assertExchange(ex, 'fanout', {durable: false});
    // envoyer à la file d'attente
    ch.publish(ex, '', new Buffer('https://medium.com/netflix-techblog/titus-the-netflix-container-management-platform-is-now-open-source-f868c9fb5436'));
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
