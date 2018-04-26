var amqp = require('amqplib/callback_api');
var imagemagick = require('imagemagick');
const fs = require('fs');

amqp.connect('amqp://host.docker.internal', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'url';

    convert('unQTdu2lCSQ.jpg');
    ch.assertQueue(q, {durable: false});
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});

function convert(img) {
  fs.writeFileSync('after.png', imagemagick.convert({
    srcData: fs.readFileSync(img),
    format: 'PNG',
    quality: 100
  }));
  fs.writeFileSync(
}
