#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
var mariadb = require('mysql');
var escape = require('escape-html');
const toSingleQuotes = require('to-single-quotes');


amqp.connect('amqp://0.0.0.0', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var exchange = 'db';

    ch.assertExchange(exchange, 'topic');

    // générer une file d'attente avec un nom aléatoire
    ch.assertQueue('', {exclusive: true}, function(error, queue) {

      // la file d'attente recevra les messages qui correspondent au pattern suivant
      ch.bindQueue(queue.queue, exchange, 'db.save.*');

      ch.consume(queue.queue, function(msg) {

        // [module mysql] connection à la base de donnée
        var connection = new mariadb.createConnection({
          host: '172.17.0.4',
          user: 'root',
          password: 'root',
          db: 'rabbitmq'
        });

        // [module mysql] gestion des erreurs
        connection.connect(function(err) {
          if (err) {
            console.error('error connecting: ' + err.stack);
            return;
          }

          console.log('connected as id ' + connection.threadId);

          connection.query('USE rabbitmq');

          connection.query("CREATE TABLE IF NOT EXISTS pictures ( url VARCHAR(255) )", function (error, result) {
            console.error('error connecting: ' + error);
            if (error) throw error;
          });
          connection.query("CREATE TABLE IF NOT EXISTS articles ( content TEXT )", function (error, result) {
            if (error) throw error;
          });

          // selon la clef de routage, sauvegarder dans tellle ou telle table
          if (msg.fields.routingKey == "db.save.img") {
            connection.query("INSERT INTO pictures (url) VALUES (\"" + toSingleQuotes(msg.content.toString()) + "\")", function(err, result) {
              console.dir(err);
            });
          }

          if (msg.fields.routingKey == "db.save.txt") {
            console.log(msg.content.toString());
            connection.query("INSERT INTO articles (content) VALUES (\""+ escape( msg.content.toString() ) + "\")", function(err, result) {
              console.dir(err);
            });
          }

          connection.end();
        }, {noAck: true, exclusive: true});
      });
    });
  });
});
