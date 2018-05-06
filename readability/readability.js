#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
// module qui extrait le contenu textuel de l'article
var read = require('node-readability');

// connection cluster RabbitMQ
amqp.connect('amqp://0.0.0.0', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'url';

    // créer la file d'attente si elle n'existe pas
    ch.assertExchange(ex, 'fanout', {durable: false});

    // écouter la file d'attente
    ch.assertQueue('', {exclusive: true}, function(err, q) {

      ch.bindQueue(q.queue, ex, '');

      ch.consume(q.queue, function(msg) {
        // extraite le contenu de la page HTML
        read(msg.content.toString(), function(error, article, meta) {

          var ex2 = 'db';

          // échangeur P4 qui communique avec la base de donnée
          ch.assertExchange(ex2, 'topic');

          // envoyer à l'échangeur avec une clef spécifique
          ch.publish(ex2, 'db.save.txt', new Buffer(article.content));
          console.log(" [x] Sent %s:'%s'", 'db.save.txt');

          // module readability : vider le cache
          article.close();
        }, {noAck: true});
      });
    });
  });
});
