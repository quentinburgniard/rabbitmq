import imageresolver.MainImageResolver;
import java.util.Optional;
import com.rabbitmq.client.*;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class App {
  private static final String EXCHANGE_NAME = "db";

  public static void main(String[] args) throws Exception {
    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("rabbit-1");
    Connection connection = factory.newConnection();
    Channel channel = connection.createChannel();

    channel.exchangeDeclare("url", "fanout", true);
    String queueName = channel.queueDeclare().getQueue();
    channel.queueBind(queueName, "url", "");


    Consumer consumer = new DefaultConsumer(channel) {
      @Override
      public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body)
      throws IOException {
        String message = new String(body, "UTF-8");
        System.out.println(" [x] Received '" + message + "'");
        String url = new String(body, "UTF-8");
        Optional<String> mainImage = MainImageResolver.resolveMainImage(url);

        channel.exchangeDeclare(EXCHANGE_NAME, "topic", true);

        if (mainImage.isPresent()) {
          channel.basicPublish(EXCHANGE_NAME, "db.save.img", null, mainImage.get().getBytes());
        }

        connection.close();
      }
    };
    channel.basicConsume(queueName, true, consumer);
  }
}
