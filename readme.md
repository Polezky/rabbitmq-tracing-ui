# RabbitMQ plugin to view and filter traces

## Linux/MacOS installation

- Download plugin zip [from here](https://github.com/Polezky/rabbitmq-tracing-ui/raw/master/dist/rabbitmq_tracing_ui.zip)
- Stop RabbitMQ:

```shell
sudo systemctl stop rabbitmq-server
```

- Navigate to RabbitMQ installation folder. Default is /usr/lib/rabbitmq
- Navigate to plugins folder inside the RabbitMQ folder
- Unzip the content of the downloaded rabbitmq_tracing_ui.zip to rabbitmq_tracing_ui folder
- Navigate back to the RabbitMQ folder and then navigate to the 'sbin' folder
- Enable plugin:

```shell
rabbitmq-plugins enable rabbitmq_management rabbitmq_tracing rabbitmq_tracing_ui
```

- Start RabbitMQ. E.g. in the same cmd run:

```console
sudo systemctl start rabbitmq-server
```

## Windows installation
- Download plugin zip [from here](https://github.com/Polezky/rabbitmq-tracing-ui/raw/master/dist/rabbitmq_tracing_ui.zip)
- Stop RabbitMQ. E.g. in cmd with administrator privileges run:

```console
net stop RabbitMQ
```

- Navigate to RabbitMQ installation folder. Default is C:\Program Files\RabbitMQ Server\rabbitmq_server-{x.y.z}
- Navigate to plugins folder inside the RabbitMQ folder
- Unzip the content of the downloaded rabbitmq_tracing_ui.zip to rabbitmq_tracing_ui folder
- Navigate back to the RabbitMQ folder and then navigate to the 'sbin' folder
- Open cmd for that folder with administrator privileges and run:

```console
rabbitmq-plugins enable rabbitmq_management rabbitmq_tracing rabbitmq_tracing_ui
```

- Start RabbitMQ. E.g. in the same cmd run:

```console
net start RabbitMQ
```

## Features
tbd

## How to use
tbd


