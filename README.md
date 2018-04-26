# Discovery of RabbitMQ

## Installation

Launch the first RabbitMQ node

	docker run \
		-d \
		-v ./rabbitmq.config:/etc/rabbitmq/rabbitmq.config \
		--add-host rabbit-2: \
		--hostname my-rabbit-1 \
		--name my-rabbit-1 \
		-e RABBITMQ_ERLANG_COOKIE='ex8$i}9\dLYK/&&T94F7u42a.DW>y5Jd' rabbitmq:management

Launch the second RabbitMQ node

	docker run \
		-d \
		-v ./rabbitmq.config:/etc/rabbitmq/rabbitmq.config \
		--add-host rabbit-1: \
		--hostname my-rabbit-2 \
		--name my-rabbit-2 \
		-e RABBITMQ_ERLANG_COOKIE='ex8$i}9\dLYK/&&T94F7u42a.DW>y5Jd' rabbitmq:management
