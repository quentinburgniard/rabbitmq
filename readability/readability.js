var amqp = require('amqplib/callback_api');
var read = require('node-readability');

amqp.connect('amqp://0.0.0.0', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'url';

    ch.assertQueue(q, {durable: false});
    ch.consume(q, function(msg) {

      read(msg.content.toString(), function(error, article, meta) {

        var ex = 'db';

        ch.assertExchange(ex, 'topic');
        ch.publish(ex, 'db.save.txt', new Buffer(article.content));
        console.log(" [x] Sent %s:'%s'", 'db.save.txt', article.content);
        article.close();
      });

    });



  });
}, {noAck: true});
