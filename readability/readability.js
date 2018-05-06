var amqp = require('amqplib/callback_api');
// module qui extrait le contenu textuel de l'article
var read = require('node-readability');

// connection cluster RabbitMQ
amqp.connect('amqp://0.0.0.0', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'url';

    // créer la file d'attente si elle n'existe pas
    ch.assertQueue(q, {durable: true});

    // écouter la file d'attente
    ch.consume(q, function(msg) {

      // extraite le contenu de la page HTML
      read(msg.content.toString(), function(error, article, meta) {

        var ex = 'db';

        // échangeur P4 qui communique avec la base de donnée
        ch.assertExchange(ex, 'topic');

        // envoyer à l'échangeur avec une clef spécifique
        ch.publish(ex, 'db.save.txt', new Buffer(article.content));
        console.log(" [x] Sent %s:'%s'", 'db.save.txt');

        // module readability : vider le cache
        article.close();
      });

    });
  });
}, {noAck: true});
